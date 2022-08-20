import Vue from "vue";
import Vuex from "vuex";
import local from "@/storage/local"
// options
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

// modules
import ui from "./modules/ui";
import song from "./modules/song";

Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  actions,
  modules: {
    ui,
    song
  }
});

setTimeout(()=>{store.commit("song/setSong",local.get("song"))})

export default store;
