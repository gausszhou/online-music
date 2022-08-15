const ui = {
  namespaced: true,
  state: () => {
    return {
      songDrawerVisible: false,
      songLyricVisible: false,
      songListVisible: false
    };
  },
  mutations: {
    setSongDrawerVisible(state, payload) {
      state.songDrawerVisible = payload;
    },
    setSongLyricVisible(state, payload) {
      state.songLyricVisible = payload;
    },
    setSongListVisible(state, payload) {
      state.songListVisible = payload;
    }
  },
  actions: {}
};

export default ui;
