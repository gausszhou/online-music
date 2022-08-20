<template>
  <!-- 播放控制 -->
  <div
    class="song-control"
    :class="{
      nosongs: this.songList.length == 0,
      single: this.songList.length == 1
    }"
  >
    <div class="switch-control">
      <span class="control-button-text">
        {{ songModeList[songMode].label }}
      </span>
      <i
        class="control-button iconfont"
        @click="toggleSongMode()"
        :class="songModeList[songMode].class"
      ></i>
      <i
        class="control-button iconfont icon-pre"
        :class="{ disable: songMode === 1 || songList.length === 0 }"
        @click="prevSong()"
      ></i>
      <i
        class="control-button iconfont button-toggle"
        :class="{
          'icon-pause': songIsPlay,
          'icon-play': !songIsPlay,
          disable: !song.audioUrl
        }"
        @click="toggleSongPlay()"
      ></i>
      <i
        class="control-button iconfont icon-next"
        :class="{ disable: songMode === 1 || songList.length === 0 }"
        @click="nextSong()"
      ></i>
      <i
        class="control-button control-button-text"
        :class="{
          disable: songList.length === 0 || songLyricList.length === 0
        }"
        @click="toggleLyricFloat()"
        >浮动歌词
      </i>
    </div>
    <div class="song-progress">
      <span class="time">{{ songCurrentTime | stotime }}</span>
      <el-slider
        ref="progress"
        class="control-progress"
        v-model="percent"
        :min="0"
        :max="100"
        :show-tooltip="false"
        @change="onAudioSliderChange(percent)"
      ></el-slider>
      <span class="time">{{ songTotalTime | stotime }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { songModeList } from "./SongData";
export default {
  data() {
    return {
      // mode
      songModeList: songModeList,
      // play progress percent
      percent: 0,
      actions: []
    };
  },
  computed: {
    ...mapState("song", {
      songList: (state) => state.songList,
      songIndex: (state) => state.songIndex,
      song: (state) => state.song,
      songIsPlay: (state) => state.songIsPlay,
      songMode: (state) => state.songMode,
      songVolume: (state) => state.songVolume,
      songTargetTime: (state) => state.songTargetTime,
      songCurrentTime: (state) => state.songCurrentTime,
      songTotalTime: (state) => state.songTotalTime,
      songCurrentPercent: (state) => state.songCurrentPercent,
      songLoadedPercent: (state) => state.songLoadedPercent,
      songLyricList: (state) => state.songLyricList
    }),
    ...mapState("ui", {
      songLyricVisible: (state) => state.songLyricVisible
    })
  },
  watch: {
    songCurrentPercent(newV) {
      this.percent = newV;
    },
    songLoadedPercent() {
      this.drawCallProgress();
    }
  },
  mounted() {
    this.drawCallProgress();
  },
  methods: {
    drawCallProgress() {
      this.$refs.progress.$el.style.setProperty(
        "--progress",
        this.songLoadedPercent + "%"
      );
    },
    onAudioEnded() {
      this.nextSongAuto();
    },
    toggleSongMode() {
      const mode = this.songMode;
      const length = this.songModeList.length;
      const modeNew = (mode + length + 1) % length;
      this.$store.commit("song/setSongMode", modeNew);
    },
    prevSong() {
      this.switchSong(-1, false);
    },
    nextSong() {
      this.switchSong(1, false);
    },
    nextSongAuto() {
      this.switchSong(1, true);
    },
    // 区分手动和自动
    switchSong(num, auto) {
      let number = 0;
      switch (this.songMode) {
        case 0: // loop
          number = num;
          this.setSong(number);
          break;
        case 1: // single-loop
          if (auto) {
            this.$store.commit("song/setSongIsPlay", false);
            setTimeout(() => {
              this.$store.commit("song/setSongIsPlay", true);
            });
          } else {
            setTimeout(() => {
              this.onAudioSliderChange(0);
            });
          }
          break;
        case 2: // order
          const lastIndex = this.songList.length - 1;
          if (this.songIndex == lastIndex && auto) {
            this.$store.commit("song/setSongIndex", -1);
            return;
          }
          number = 1;
          this.setSong(number);
          break;
        case 3: // random
          // number [0, lenght) == [0, lenght-1]
          const length = this.$store.state.songList.length;
          number = Math.floor(Math.random() * length);
          this.setSong(number);
          break;
        default:
          break;
      }
    },
    // -1 0 1
    setSong(number) {
      const songList = this.songList;
      const songIndex = this.songIndex;
      const length = songList.length;
      if (length > 1) {
        const targetIndex = (songIndex + length + number) % length;
        this.$store.commit("song/setSongCurrentTime", 0);
        this.$store.commit("song/setSongIndex", targetIndex);
        const next = this.songList[targetIndex];
        this.$store.dispatch("song/getMusic", next);
      }
    },
    toggleSongPlay() {
      if (!this.song.audioUrl) return;
      this.$store.commit("song/setSongIsPlay", !this.songIsPlay);
    },
    toggleLyricFloat() {
      if (!this.song.audioUrl || this.songLyricList.length === 0) return;
      this.$store.commit("ui/setSongLyricVisible", !this.songLyricVisible);
    },
    onAudioSliderChange(percent) {
      let songTargetTime = Math.floor((percent / 100) * this.songTotalTime);
      this.$store.commit("song/setSongTargetTime", songTargetTime);
    }
  }
};
</script>

<style></style>
