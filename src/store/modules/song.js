import { musicPolyfill, processLyric } from "@/utils/tools";
import NProgress from "nprogress";
import http from "@/api/http";
import local from "@/storage/local";
import player from "@/lib/player";

NProgress.configure({ showSpinner: false, parent: "#footer" });

const proxy = process.env.VUE_APP_API_PROXY || "";

const song = {
  namespaced: true,
  state: () => {
    return {
      // 播放列表
      songList: local.get("songList") || [],
      // 当前播放歌曲的 index
      songIndex: local.get("songIndex") || 0,
      // 歌曲对象
      song: local.get("song") || {},
      // 歌词数组
      songLyricList: local.get("songLyricList") || [],
      // 显示 播放音量，修改此值，同步修改Audio元素的音量 需在组件内监听此值
      songVolume: local.get("songVolume") || 50,
      // 显示 播放模式
      songMode: local.get("songMode") || 0,
      // 歌曲播放状态 不存储 修改此值用于控制播放
      songIsPlay: false,
      // 显示 播放时间，此值跟随 Audio 的进度
      songCurrentTime: 0,
      // 显示 歌曲总时间
      songTotalTime: 0,
      // 显示 修改此值，不存储 同步修改 Audio 的播放时间 需在组件内监听此值
      songCurrentPercent: 0,
      // 显示
      songLoadedPercent: 0
    };
  },
  mutations: {
    setSongList(state, payload) {
      state.songList = payload;
      local.set("songList", payload);
    },
    setSongIndex(state, payload) {
      state.songIndex = payload;
      local.set("songIndex", payload);
    },
    setSong(state, payload) {
      state.song = payload;
      player.setAudioSrc(payload.audioUrl);
      local.set("song", payload);
    },
    setSongMode(state, payload) {
      state.songMode = payload;
      local.set("songMode", payload);
    },
    setSongVolume(state, payload) {
      state.songVolume = payload;
      player.setVolume(payload);
      local.set("songVolume", payload);
    },
    setSongIsPlay(state, payload) {
      state.songIsPlay = payload;
      if (payload) {
        player.play();
      } else {
        player.pause();
      }
    },
    setSongTargetTime(state, payload) {
      player.setTargetTime(payload);
    },
    // on audio event
    setSongCurrentTime(state, payload) {
      state.songCurrentTime = payload;
    },
    setSongTotalTime(state, payload) {
      state.songTotalTime = payload;
    },
    setSongCurrentPercent(state, payload) {
      state.songCurrentPercent = payload;
    },
    setSongLoadedPercent(state, payload) {
      state.songLoadedPercent = payload;
    },
    // 歌词处理
    setSongLyricList(state, payload) {
      state.songLyricList = payload;
      local.set("songLyricList", payload);
    },
    addListToSongList(state, tracks) {
      if (tracks.constructor != Array) return;
      let list_new = tracks.map((track) => {
        return musicPolyfill(track);
      });
      let list = JSON.parse(JSON.stringify(state.songList));
      list.unshift(...list_new);
      let map = {};
      list = list.filter((item) => {
        if (map[item.musicId] == true) return false;
        map[item.musicId] = true;
        return true;
      });
      state.songList = list;
      state.songIndex = 0;
      this.commit("song/setSongIndex", 0);
      this.dispatch("song/getMusic", list[0]);
    }
  },
  actions: {
    async getMusic(store, payload) {
      console.log(1);
      let song = musicPolyfill(payload);
      const { musicId } = song;
      // update render
      store.commit("setSong", song);
      store.commit("setSongLyricList", []);
      // getAudioSrc
      NProgress.start();
      console.log("[ajax ] 歌曲信息请求中");
      const resSong = await http.getSongUrl({ id: musicId });
      if (resSong.data.data && resSong.data.data[0].url) {
        let url = resSong.data.data[0].url;
        url = url.replace(/https{0,1}:/, location.protocol);
        song.audioUrlOrigin = url;
        song.audioUrlProxy = location.protocol + proxy + url;
        // song.audioUrl = song.audioUrlOrigin;
        song.audioUrl = song.audioUrlProxy
      }

      // update render
      store.commit("setSong", song);
      NProgress.done();
      console.log("[ajax ] 歌曲信息请求完成");

      // send play message
      setTimeout(() => {
        store.commit("setSongIsPlay", false);
        setTimeout(() => {
          store.commit("setSongIsPlay", true);
        }, 0);
      }, 0);

      // getSongDetail
      NProgress.start();
      if (!(song.picUrl && song.albumName)) {
        const resDetail = await http.getSongDetail({ ids: musicId });
        if (resDetail.data.songs && resDetail.data.songs[0]) {
          song.albumName = resDetail.data.songs[0].al.name;
          song.picUrl = resDetail.data.songs[0].al.picUrl;
          song.author = resDetail.data.songs[0].ar;
        }
      }
      store.commit("setSong", song);

      // getLyric
      NProgress.start();
      console.log("[ajax ] 歌词请求中");

      if (!song.lyricList.length) {
        const resLyric = await http.getLyric({ id: musicId });
        const lyricText = resLyric.data.lrc.lyric;
        song.lyricList = processLyric(lyricText);
      }
      store.commit("setSong", song);
      store.commit("setSongLyricList", song.lyricList);
      NProgress.done();
      console.log("[ajax ] 歌词请求完成");

      let list = [];
      try {
        list = JSON.parse(JSON.stringify(store.state.songList));
      } catch (error) {
        console.log(error);
      }
      // 去重检查 找到时更新 index
      let flag = true;
      list.forEach((item, index) => {
        if (item.musicId == song.musicId) {
          flag = false;
          store.commit("setSongIndex", index);
          store.commit("setSongCurrentTime", 0);
        }
      });

      // 添加
      if (flag) {
        list.unshift(song);
        store.commit("setSongIndex", 0);
        store.commit("setSongCurrentTime", 0);
      }

      store.commit("setSongList", list);
    }
  }
};

export default song;
