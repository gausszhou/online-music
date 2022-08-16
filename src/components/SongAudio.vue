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
        :class="{ disable: songMode == 1 || !songList.length }"
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
        :class="{ disable: songMode == 1 || !songList.length }"
        @click="nextSong()"
      ></i>
      <i
        class="control-button control-button-text"
        :class="{ disable: !songList.length }"
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
    <!-- 真正的audio标签，不显示 -->
    <audio
      id="audioSource"
      v-show="false"
      ref="audio"
      :src="song.audioUrl"
      @timeupdate="onAudioTimeUpdate"
      @canplay="onAudioCanplay"
      @progress="onAudioProgress"
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
      canplay: false,
      loadedProgress: 0,
      // play progress percent
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
        console.log("[audio] 切换了歌曲");
        this.canplay = false;
      }
    },
    songIndex(newV) {
      if (newV == -1) {
        this.$refs.audio.pause();
        this.$store.commit("song/setSongIsPlay", false);
        return;
      }
      this.$store.commit("song/setSongIsPlay", true);
    },
    songIsPlay(newV) {
      console.log("songIsPlay");
      if (this.$refs.audio) {
        console.log("[audio] 调用播放", newV);
        newV ? this.$refs.audio.play() : this.$refs.audio.pause();
      } else {
        this.actions.push({ type: "play", value: newV });
      }
    },
    songTargetTime(newV) {
      if (!this.$refs.audio) return false;
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
    this.drawCallProgress();
  },
  methods: {
    onAudioCanplay() {
      console.log("[audio] 歌曲可以播放");
      this.canplay = true;
      const totalTime = this.$refs.audio.duration;
      this.$store.commit("song/setSongTotalTime", totalTime);
      this.excuateAction();
    },
    excuateAction() {
      let actions = this.actions;
      while (actions.length) {
        const action = actions.pop();
        console.log("[audio]", JSON.stringify(action));
        switch (action.type) {
          case "play":
            console.log("[audio] 调用播放", newV);
            action.value ? this.$refs.audio.play() : this.$refs.audio.pause();
            break;

          default:
            break;
        }
        actions = actions.filter((item) => item.type != action.type);
      }
    },
    onAudioTimeUpdate() {
      // console.log("[audio] 播放时间更新");
      const currentTime = this.$refs.audio.currentTime;
      this.canplay = true;
      if (this.songIsPlay) {
        this.$store.commit("song/setSongCurrentTime", currentTime);
      }
      if (this.canplay) {
        this.caclLoadProgress(this.$refs.audio);
      }
    },
    onAudioProgress(e) {
      console.log("[audio] 资源加载更新");
      this.caclLoadProgress(e.target);
    },
    caclLoadProgress(audio) {
      const buffered = audio.buffered;
      if (buffered.length) {
        this.loadedProgress =
          100 * (audio.buffered.end(0) / this.songTotalTime);
        this.drawCallProgress();
      }
    },
    drawCallProgress() {
      this.$refs.progress.$el.style.setProperty(
        "--progress",
        this.loadedProgress + "%"
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
      if (!this.song.audioUrl) return;
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
