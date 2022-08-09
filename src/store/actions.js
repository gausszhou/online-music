import http from "@/api/http";
export default {
  async getMusic(store, payload) {
    console.log("action.getMusic",payload)
    let name = payload.name;
    let albumname = payload.albumname || '';
    let picUrl = payload.picUrl || '';
    let audioUrl = '';
    let author = [payload.author];
    let musicId = payload.musicId || payload.id;
    store.commit('setIsPlay', false);
    await  http.getSongUrl({ id: musicId }).then(res => {
      console.log(res)
      if (res.data.data[0].url) {
        audioUrl = res.data.data[0].url;
        http.getLyric({ id: musicId }).then(res => {
          let lyric = res.data.lrc.lyric;
          store.commit('setLyric', lyric);
        });
      } else {
        store.commit('setMessage', '歌曲资源获取失败！！！' + '当前时间' + Date.now());
      }
    });

    // 如果没有传递图片地址，则根据musicId主动获取
    if (!(picUrl && author[0] && albumname)) {
      await http.getSongDetail({ ids: musicId }).then(res => {
        albumname = res.data.songs[0].al.name;
        picUrl = res.data.songs[0].al.picUrl;
        author = res.data.songs[0].ar;
      });
    }
    let song = { name, albumname, picUrl, audioUrl, author, musicId };

    let list = JSON.parse(JSON.stringify(store.state.playList));
    let flag = true;
    // 去重检查
    list.forEach((item, index) => {
      if (item.musicId == song.musicId) {
        flag = false;
        store.commit('setIndex', index);
      }
    });
    // 添加
    if (flag && audioUrl) {
      list.push(song);
      store.commit('setIndex', list.length - 1);
    }
    if (audioUrl) {
      store.commit('setSong', song);
      store.commit('setPlayList', list);
      store.commit('setIsPlay', true);
    }
  },

  // 从播放列表点击播放，走这里
  async playMusic(store, payload) {
    let name = payload.name;
    let albumname = payload.albumname;
    let picUrl = payload.picUrl;
    let audioUrl = payload.audioUrl;
    let author = payload.author;
    let musicId = payload.musicId;
    await http.getSongUrl({ id: musicId }).then(res => {
      if (res.data.data[0].url) {
        audioUrl = res.data.data[0].url;
        http.getLyric({ id: musicId }).then(res => {
          let lyric = res.data.lrc.lyric;
          store.commit('setLyric', lyric);
        });
      }
    });

    let song = { name, albumname, picUrl, audioUrl, author, musicId };
    if (audioUrl) {
      store.commit('setSong', song);
      store.commit('setIsPlay', true);
      store.commit('setIsShow', true);
    }
  }

};
