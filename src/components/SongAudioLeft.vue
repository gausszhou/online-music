<template>
  <div class="song-info">
    <div
      class="img-box"
      @click="toggleSongDrawer()"
      :class="{ show: songCurrent.picUrl, open: songDrawerVisible }"
    >
      <i class="arrow iconfont icon-arrow-right-top"></i>
      <img
        class="img"
        :class="{ running: songIsPlay && !songDrawerVisible }"
        :src="songCurrent.picUrl"
      />
    </div>
    <div class="name-box">
      <div class="text-over-elli song-name">{{ songCurrent.name }}</div>
      <div>
        <span
          class="text-over-elli song-author"
          v-for="(item, index) in songCurrent.author"
          :key="index"
          >{{ item.name }}&nbsp;&nbsp;</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState("song", {
      songList: (state) => state.songList,
      songCurrent: (state) => state.songCurrent,
      songIsPlay: (state) => state.songIsPlay
    }),
    ...mapState("ui", {
      songDrawerVisible: (state) => state.songDrawerVisible
    })
  },
  methods: {
    toggleSongDrawer() {
      this.$store.commit("ui/setSongDrawerVisible", !this.songDrawerVisible)
    }
  }
}
</script>

<style lang="scss" scoped></style>
