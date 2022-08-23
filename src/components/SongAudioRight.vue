<template>
  <!-- 音量控制和播放列表 -->
  <div class="list-control display-flex">
    <div class="flex-1"></div>
    <i class="button-volume iconfont icon-volume"></i>
    <el-slider
      class="slider-volume"
      v-model="volume"
      :min="0"
      :max="100"
      :show-tooltip="true"
      @input="onVolumeSliderChange(volume)"
    ></el-slider>
    <i
      class="button-menu iconfont icon-menu"
      @click="toggleSongListVisible"
      :class="{ active: songListVisible }"
    ></i>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      volume: 50
    };
  },
  computed: {
    ...mapState("song", {
      songVolume: (state) => state.songVolume
    }),
    ...mapState("ui", {
      songListVisible: (state) => state.songListVisible
    })
  },
  mounted() {
    this.volume = this.songVolume;
  },
  methods: {
    onVolumeSliderChange(e) {
      this.$store.commit("song/setSongVolume", e);
    },
    toggleSongListVisible() {
      this.$store.commit("ui/setSongListVisible", !this.songListVisible);
    }
  }
};
</script>

<style lang="scss" scoped></style>
