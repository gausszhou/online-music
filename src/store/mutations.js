export default {
  setMessage(state, payload) {
    state.message = payload;
  },
  setSong(state, payload) {
    state.song = payload;
  },
  setPlayList(state, payload) {
    state.playList = payload;
  },
  setIsPlay(state, payload) {
    state.isPlay = payload;
  },
  setQuery(state, payload) {
    state.query = payload;
  },
  setMenuVisible(state, payload) {
    state.menuVisible = payload;
  },
  setIndex(state, payload) {
    state.activeIndex = payload;
  },
  // 歌词处理
  setLyric(state, payload) {
    let arr = payload.split('\n');
    let reg = /^\[.*]/;
    let newArr = arr.map(item => {
      let time = item.match(reg) && item.match(reg)[0] && item.match(reg)[0].slice(1, -1) || null;
      if (time) {
        let timeArr = time.split(':');
        time = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]); // 转化为秒钟
        return {
          time,
          word: item.split(reg)[1]
        };
      } else {
        return {
          time: 9999,
          word: "..."
        };
      }
    });
    state.lyric = newArr;
  }
};
