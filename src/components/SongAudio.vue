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
      <span class="button-text">
        {{ songModeList[songMode].label }}
      </span>
      <i
        class="button-control iconfont"
        @click="toggleSongMode()"
        :class="songModeList[songMode].class"
      ></i>
      <i class="button-control iconfont icon-pre" @click="prevSong()"></i>
      <i
        class="button-control iconfont button-toggle"
        :class="songIsPlay ? 'icon-pause' : 'icon-play'"
        @click="toggleSongPlay()"
      ></i>
      <i class="button-control iconfont icon-next" @click="nextSong()"></i>
      <i class="button-control button-text" @click="toggleLyricFloat()"
        >浮动歌词</i
      >
    </div>
    <div class="progress">
      <span class="time">{{ currentTime | stotime }}</span>
      <el-slider
        class="control-progress"
        v-model="percent"
        :show-tooltip="false"
        @change="onAudioSliderChange"
      ></el-slider>
      <span class="time">{{ totalTime | stotime }}</span>
    </div>
    <!-- 真正的audio标签，不显示 -->
    <audio
      id="audioSource"
      v-show="false"
      ref="audio"
      :src="songCurrent.audioUrl"
      autoplay
      @timeupdate="onAudioTimeUpdate"
      @loadeddata="onAudioLoaded"
      @ended="onAudioEnded"
    ></audio>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { songModeList } from "./SongData"
export default {
  data() {
    return {
      // mode
      songModeList: songModeList,
      // time
      currentTime: 0,
      totalTime: 0,
      percent: 0,
      // audio element
      loaded: false
    }
  },
  computed: {
    ...mapState("song", {
      songList: (state) => state.songList,
      songIndex: (state) => state.songIndex,
      songCurrent: (state) => state.songCurrent,
      songIsPlay: (state) => state.songIsPlay,
      songMode: (state) => state.songMode,
      songVolume: (state) => state.songVolume,
      songTargetTime: (state) => state.songTargetTime,
      songTargetPercent: (state) => state.songTargetPercent
    }),
    ...mapState("ui", {
      songLyricVisible: (state) => state.songLyricVisible
    })
  },
  watch: {
    songIndex(newV) {
      if (newV == -1) {
        this.$refs.audio.pause()
        this.$store.commit("song/setSongIsPlay",false)
        return
      }
      const next = this.songList[newV]
      this.$store.dispatch("song/getMusic", next)
    },
    songCurrent: {
      handler() {
        this.loaded = false
      }
    },
    songIsPlay(newV) {
      if (!this.$refs.audio) return false
      // if (!this.loaded) return false
      newV ? this.$refs.audio.play() : this.$refs.audio.pause()
    },
    songTargetTime(newV) {
      if (!this.$refs.audio) return false
      // if (!this.loaded) return false
      this.$refs.audio.currentTime = newV
    },
    songTargetPercent(newV) {
      if (!this.$refs.audio) return false
      // if (!this.loaded) return false
      let targetTime = (newV * this.totalTime) / 100
      this.$refs.audio.currentTime = targetTime
    },
    songVolume(newV) {
      let v = newV / 100
      v = Math.max(0, v)
      v = Math.min(v, 1)
      this.$refs.audio.volume = newV / 100
    }
  },
  mounted() {
    this.$refs.audio.volume = this.songVolume / 100
  },
  methods: {
    onAudioLoaded() {
      console.log("audio.onloaded")
      this.loaded = true
    },
    onAudioTimeUpdate() {
      // if (!this.loaded) return false
      this.totalTime = this.$refs.audio.duration
      this.currentTime = this.$refs.audio.currentTime
      this.percent = (100 * this.currentTime) / this.totalTime
      if (this.percent >= 100) this.percent = 0
      this.$store.commit("song/setSongCurrentTime", this.currentTime)
      this.$store.commit("song/setSongCurrentPercent", this.percent)
    },
    onAudioEnded() {
      this.switchSong(1, true)
    },
    toggleSongMode() {
      const mode = this.songMode
      const length = this.songModeList.length
      const modeNew = (mode + length + 1) % length
      this.$store.commit("song/setSongMode", modeNew)
    },
    prevSong() {
      this.switchSong(-1,false)
    },
    nextSong() {
      this.switchSong(1,false)
    },
    // 区分手动和自动
    switchSong(num,auto) {
      let number = 0
      switch (this.songMode) {
        case 0: // loop
          number = num
          this.setSong(number)
          break
        case 1: // single-loop
          number = 0
          this.setSong(number)
          break
        case 2: // order
          const lastIndex = this.songList.length - 1
          if (this.songIndex == lastIndex && auto) {
            this.$store.commit("song/setSongIndex", -1)
            return
          }
          number = 1
          this.setSong(number)
          break
        case 3: // random
          const length = this.$store.state.songList.length
          // number [0, lenght) == [0, lenght-1]
          number = Math.floor(Math.random() * length)
          this.setSong(number)
          break
        default:
          break
      }
    },
    // -1 0 1
    setSong(number) {
      const songList = this.songList
      const songIndex = this.songIndex
      const length = songList.length
      if (length > 1) {
        const targetIndex = (songIndex + length + number) % length
        this.$store.commit("song/setSongIndex", targetIndex)
      }
    },
    toggleSongPlay() {
      if (this.songIsPlay) {
        this.$store.commit("song/setSongIsPlay", false)
      } else {
        if (this.songCurrent.audioUrl) {
          this.$store.commit("song/setSongIsPlay", true)
        }
      }
    },
    toggleLyricFloat() {
      this.$store.commit("ui/setSongLyricVisible", !this.songLyricVisible)
    },
    onAudioSliderChange(percent) {
      let songTargetTime = (percent * this.totalTime) / 100
      this.$store.commit("song/setSongTargetTime", songTargetTime)
    }
  }
}
</script>

<style></style>
