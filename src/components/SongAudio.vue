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
import player from "@/lib/player";
export default {
  data() {
    return {
      songModeList: songModeList,
      percent: 0
    };
  },
  computed: {
    ...mapState("song", {
      songList: (state) => state.songList,
      song: (state) => state.song,
      songIsPlay: (state) => state.songIsPlay,
      songMode: (state) => state.songMode,
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
    toggleSongMode() {
      const mode = this.songMode + 1;
      const length = this.songModeList.length;
      const modeNew = mode % length;
      player.setMode(modeNew);
    },
    prevSong() {
      player.switchSong(-1, false);
    },
    toggleSongPlay() {
      if (!this.song.audioUrl) return;
      this.$store.commit("song/setSongIsPlay", !this.songIsPlay);
    },
    nextSong() {
      player.switchSong(1, false);
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
