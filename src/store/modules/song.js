import http from "@/api/http";
import local from "@/storage/local";
import { musicPolyfill } from "@/utils/tools";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

const proxy = "http://api.gausszhou.top/_proxy/";

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
      // 播放音量，修改此值，同步修改Audio元素的音量 需在组件内监听此值
      songVolume: local.get("songVolume") || 50,
      // 播放模式
      songMode: local.get("songMode") || 0,
      // 歌曲播放状态 不存储 修改此值用于控制播放
      songIsPlay: false,
      // 歌曲总时间
      songTotalTime: Infinity,
      // 修改此值，不存储 同步修改 Audio 的播放时间 需在组件内监听此值
      songTargetTime: 0,
      // 播放时间，此值跟随 Audio 的进度
      songCurrentTime: 0
    };
  },
  getters: {
    // 播放百分比，此值跟随 Audio 的进度
    songCurrentPercent(state) {
      let percent = 100 * (state.songCurrentTime / state.songTotalTime);
      if (percent >= 100) percent = 0;
      return percent;
    }
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
      local.set("song", payload);
    },
    setSongMode(state, payload) {
      state.songMode = payload;
      local.set("songMode", payload);
    },
    setSongIsPlay(state, payload) {
      state.songIsPlay = payload;
    },
    setSongCurrentTime(state, payload) {
      state.songCurrentTime = payload;
    },
    setSongTotalTime(state, payload) {
      state.songTotalTime = payload;
    },
    setSongTargetTime(state, payload) {
      state.songTargetTime = payload;
    },
    setSongVolume(state, payload) {
      state.songVolume = payload;
      local.set("songVolume", payload);
    },
    // 歌词处理
    setSongLyricList(state, payload) {
      let arr = payload.split("\n");
      let reg = /^\[.*]/;
      let list = arr.map((item) => {
        let time =
          (item.match(reg) &&
            item.match(reg)[0] &&
            item.match(reg)[0].slice(1, -1)) ||
          null;
        if (time) {
          let timeArr = time.split(":");
          time = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]); // 转化为秒钟
          return {
            time,
            word: item.split(reg)[1]
          };
        } else {
          return {
            time: 9999,
            word: ""
          };
        }
      });
      const lyricList = list.filter((item) => item.word != "");
      state.songLyricList = lyricList;
      local.set("songLyricList", lyricList);
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
    }
  },
  actions: {
    async getMusic(store, payload) {
      NProgress.start();
      let song = musicPolyfill(payload);
      let { name, albumname, picUrl, audioUrl, audioUrls, author, musicId } =
        song;
      // pause
      store.commit("setSongIsPlay", false);

      const resSong = await http.getSongUrl({ id: musicId });
      if (resSong.data.data && resSong.data.data[0].url) {
        audioUrl = resSong.data.data[0].url;
        let audioUrlProxy = proxy + audioUrl;
        audioUrls = [audioUrl, audioUrlProxy];
      }

      // getLyric
      const resLyric = await http.getLyric({ id: musicId });
      let lyric = resLyric.data.lrc.lyric;
      store.commit("setSongLyricList", lyric);

      // getSongDetail 如果没有传递图片地址，则根据 musicId 主动获取
      if (!(picUrl && albumname)) {
        const resDetail = await http.getSongDetail({ ids: musicId });
        if (resDetail.data.songs && resDetail.data.songs[0]) {
          albumname = resDetail.data.songs[0].al.name;
          picUrl = resDetail.data.songs[0].al.picUrl;
          author = resDetail.data.songs[0].ar;
        }
      }
      song = { name, albumname, picUrl, audioUrl, audioUrls, author, musicId };
      let list = [];
      try {
        list = JSON.parse(JSON.stringify(store.state.songList));
      } catch (error) {
        console.log(error);
      }

      let flag = true;
      // 去重检查 找到时更新 index
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

      if (audioUrl) {
        store.commit("setSong", song);
        store.commit("setSongIsPlay", true);
      }

      store.commit("setSongList", list);
      NProgress.done();
    }
  }
};

export default song;
