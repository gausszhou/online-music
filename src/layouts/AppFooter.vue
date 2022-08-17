<template>
  <div class="app-footer" id="footer">
    <SongAudioLeft></SongAudioLeft>
    <SongAudio></SongAudio>
    <SongAudioRight></SongAudioRight>
    <transition name="drawer-left">
      <SongDrawer key="drawer" v-if="songDrawerVisible" />
    </transition>
    <transition name="fade">
      <SongLyricFloat key="lyric" v-if="songLyricVisible" />
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

import SongAudio from "@/components/SongAudio.vue";
import SongAudioLeft from "@/components/SongAudioLeft.vue";
import SongAudioRight from "@/components/SongAudioRight.vue";
import SongLyricFloat from "@/components/SongLyricFloat.vue";
import SongDrawer from "@/components/SongDrawer.vue";

export default {
  name: "AppFooter",
  components: {
    SongAudio,
    SongAudioLeft,
    SongAudioRight,
    SongDrawer,
    SongLyricFloat
  },
  computed: {
    ...mapState("ui", {
      songDrawerVisible: (state) => state.songDrawerVisible,
      songLyricVisible: (state) => state.songLyricVisible,
    })
  }
};
</script>

