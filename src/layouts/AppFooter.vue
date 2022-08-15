<template>
  <div
    class="app-footer"
 
  >
    <SongAudioLeft></SongAudioLeft>
    <SongAudio></SongAudio>
    <SongAudioRight></SongAudioRight>
    <transition name="drawer-left">
      <SongDrawer key="drawer" v-if="songDrawerVisible" />
    </transition>
    <transition name="fade">
      <SongLyricFloat key="lyric" v-if="songLyricVisible" />
    </transition>
    <transition name="drawer-right">
      <SongList key="playList" class="play-list" v-if="songListVisible" />
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex"

import SongAudio from "@/components/SongAudio.vue"
import SongAudioLeft from "@/components/SongAudioLeft.vue"
import SongAudioRight from "@/components/SongAudioRight.vue"
import SongList from "@/components/SongList.vue"
import SongLyricFloat from "@/components/SongLyricFloat.vue"
import SongDrawer from "@/components/SongDrawer.vue"

export default {
  name: "AppFooter",
  components: {
    SongAudio,
    SongAudioLeft,
    SongAudioRight,
    SongDrawer,
    SongLyricFloat,
    SongList
  },
  computed: {
    ...mapState("ui", {
      songDrawerVisible: (state) => state.songDrawerVisible,
      songListVisible: (state) => state.songListVisible,
      songLyricVisible: (state) => state.songLyricVisible
    })
  }
}
</script>

<style lang="scss" scoped>
// 过渡
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.drawer-left-enter-active,
.drawer-left-leave-active {
  transition: transform 0.5s ease-out;
  transform-origin: left bottom;
  transform: scaleX(1) scaleY(1);
}
.drawer-left-enter,
.drawer-left-leave-to {
  transition: transform 0.5s ease-in;
  transform-origin: left bottom;
  transform: scaleX(0) scaleY(0);
}
.drawer-right-enter-active,
.drawer-right-leave-active {
  transition: transform 0.5s ease-in;
  transform-origin: right bottom;
  transform: scaleX(1) scaleY(1);
}

.drawer-right-enter,
.drawer-right-leave-to {
  transition: transform 0.5s ease-out;
  transform-origin: right bottom;
  transform: scaleX(0) scaleY(0);
}
</style>
