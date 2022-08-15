import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

// TODO patch import use  webpakc require
import ui from "./modules/ui";
import song from "./modules/song";

export default new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  actions,
  modules: {
    ui,
    song
  }
});
