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
        :class="{ disable: songMode == 1 || !song.audioUrl }"
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
        :class="{ disable: songMode == 1 || !song.audioUrl }"
        @click="nextSong()"
      ></i>
      <i
        class="control-button control-button-text"
        :class="{ disable: !song.audioUrl }"
        @click="toggleLyricFloat()"
        >浮动歌词
      </i>
    </div>
    <div class="progress">
      <span class="time">{{ songCurrentTime | stotime }}</span>
      <el-slider
        class="control-progress"
        v-model="percent"
        :min="0"
        :max="100"
        :show-tooltip="false"
        @change="onAudioSliderChange(percent)"
      ></el-slider>
      <span class="time">{{ songTotalTime | stotime }}</span>
    </div>
    <!-- 真正的audio标签，不显示 -->
    <audio
      id="audioSource"
      v-show="false"
      ref="audio"
      :src="song.audioUrl"
      @timeupdate="onAudioTimeUpdate"
      @loadeddata="onAudioLoaded"
      @ended="onAudioEnded"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { songModeList } from "./SongData";
export default {
  data() {
    return {
      // mode
      songModeList: songModeList,
      // audio element
      loaded: false,
      percent: 0,
      //
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
      songTotalTime: (state) => state.songTotalTime
    }),
    ...mapGetters("song", ["songCurrentPercent"]),
    ...mapState("ui", {
      songLyricVisible: (state) => state.songLyricVisible
    })
  },
  watch: {
    song: {
      handler() {
        this.loaded = false;
      }
    },
    songIndex(newV) {
      if (newV == -1) {
        this.$refs.audio.pause();
        this.$store.commit("song/setSongIsPlay", false);
        return;
      }
      const next = this.songList[newV];
      this.$store.dispatch("song/getMusic", next);
    },
    songIsPlay(newV) {
      if (!this.$refs.audio) return false;
      if (!this.loaded) {
        this.actions.push({ play: newV });
        return false;
      }
      newV ? this.$refs.audio.play() : this.$refs.audio.pause();
    },
    songTargetTime(newV) {
      if (!this.$refs.audio) return false;
      if (!this.loaded) {
        this.actions.push({ time: newV });
        return false;
      }
      this.$refs.audio.currentTime = newV;
    },
    songCurrentPercent(newV) {
      this.percent = newV;
    },
    songVolume(newV) {
      let v = newV / 100;
      v = Math.max(0, v);
      v = Math.min(v, 1);
      this.$refs.audio.volume = newV / 100;
    }
  },
  mounted() {
    this.$refs.audio.volume = this.songVolume / 100;
  },
  methods: {
    onAudioLoaded() {
      console.log("audio.onloaded");
      this.loaded = true;
      const totalTime = this.$refs.audio.duration;
      this.$store.commit("song/setSongTotalTime", totalTime);
    },
    onAudioTimeUpdate() {
      const currentTime = this.$refs.audio.currentTime;
      if (this.songIsPlay)
        this.$store.commit("song/setSongCurrentTime", currentTime);
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
              console.log(1);
              // this.$store.commit("song/setSongTargetTime", 1);
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
        this.$store.commit("song/setSongIsPlay", false);
        this.$store.commit("song/setSongCurrentTime", 0);
        setTimeout(() => {
          this.$store.commit("song/setSongIndex", targetIndex);
        });
      }
    },
    toggleSongPlay() {
      if (!this.song.audioUrl) return;
      this.$store.commit("song/setSongIsPlay", !this.songIsPlay);
    },
    toggleLyricFloat() {
      if (!this.song.audioUrl) return;
      this.$store.commit("ui/setSongLyricVisible", !this.songLyricVisible);
    },
    onAudioSliderChange(percent) {
      let songTargetTime = (percent * this.songTotalTime) / 100;
      this.$store.commit("song/setSongTargetTime", songTargetTime);
    }
  }
};
</script>

<style></style>
