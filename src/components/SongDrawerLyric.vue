<template>
  <div class="lyric-container">
    <ul class="lyric-scroll"  ref="lyricList" @scroll="onLyricScroll">
      <li
        ref="lyric"
        class="lyric-scroll-item text-over-elli"
        v-for="(item, index) in songLyricList"
        :key="index"
        :class="{ active: index == songLyricIndex }"
      >
        {{ item.word }}
      </li>
    </ul>

    <div class="lyric-pointer" ref="pointer" v-if="songLyricList.length > 2">
      <div class="pointer-time">{{ scrollTime | stotime }}</div>
      <div class="pointer-bar"></div>
      <div class="pointer-arrow" @click="changeProgress"></div>
    </div>
    <div class="lyric-mask mask-header"></div>
    <div class="lyric-mask mask-footer"></div>
  </div>
</template>

<script>
import animation from "@gausszhou/animation";
import { mapState } from "vuex";
export default {
  name: "lyric",
  data() {
    return {
      songLyricIndex: 0,
      scrollTime: 0
    };
  },
  computed: {
    ...mapState("song", {
      songList: (state) => state.songList,
      song: (state) => state.song,
      songIsPlay: (state) => state.songIsPlay,
      songMode: (state) => state.songMode,
      songVolume: (state) => state.songVolume,
      songCurrentTime: (state) => state.songCurrentTime,
      songLyricList: (state) => state.songLyricList
    })
  },
  watch: {
    songCurrentTime(newV) {
      for (let i = 0; i < this.songLyricList.length; i++) {
        if (newV > this.songLyricList[i].time) {
          this.songLyricIndex = i;
        }
      }
    },
    songLyricIndex(newV) {
      this.scroll(newV);
    }
  },
  methods: {
    scroll(index) {
      if (!this.$refs.lyric || !this.$refs.lyric[0]) return;
      const lyricListEl = this.$refs.lyricList;
      const HEIGHT = this.$refs.lyric[0].offsetHeight;
      const targetScrollTop = HEIGHT * (index + 0.5);
      animation(
        lyricListEl.scrollTop,
        targetScrollTop,
        (value) => {
          lyricListEl.scrollTop = value;
        },
        "Quad.ease-in-out"
      );
    },
    onLyricScroll() {
      if (!this.$refs.lyric || !this.$refs.lyric[0]) return;
      const lyricListEl = this.$refs.lyricList;
      const currentScrollTop = lyricListEl.scrollTop;
      const HEIGHT = this.$refs.lyric[0].offsetHeight;
      let index = Math.round(currentScrollTop / HEIGHT);
      if (index > 0) index -= 1;
      if (this.songLyricList) this.scrollTime = this.songLyricList[index].time;
    },
    changeProgress() {
      this.$store.commit("song/setSongTargetTime", this.scrollTime);
    }
  }
};
</script>

<style lang="scss" scoped>
.lyric-container {
  position: relative;
  height: 100%;
  &:hover {
    .lyric-pointer {
      opacity: 1;
    }
  }
}
.lyric-pointer {
  opacity: 0;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 50%;
  transform: translateY(-10px);
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 0.5rem;
}

.pointer-time {
  font-size: 12px;
}

.pointer-bar {
  flex: 1;
  height: 1px;
  margin: 0 0.5em;
  background: linear-gradient(
    to right,
    #000 0%,
    #0000 30%,
    #0000 70%,
    #000 100%
  );
}

.pointer-arrow {
  width: 0;
  border-top: 5px solid transparent;
  border-left: 10px solid #000;
  border-bottom: 5px solid transparent;
  cursor: pointer;
}

.lyric-scroll {
  min-width: 300px;
  max-width: 500px;
  height: 500px;
  overflow: hidden;
  overflow-y: scroll;
}

.lyric-scroll-item {
  margin: 0 1rem;
  text-align: center;
  line-height: 2;
  color: #666;
  font-size: 16px;
}
.lyric-scroll-item {
  &:first-child {
    margin-top: 255px;
  }
  &:last-child {
    margin-bottom: 225px;
  }
  &.active {
    color: #409eff;
    font-weight: 700;
    font-size: 20px;
  }
}
.lyric-mask {
  position: absolute;
  left: 0;
  height: 4rem;
  width: 100%;

  &.mask-header {
    top: 0;
    background: linear-gradient(to bottom, #ffffff, #ffffff11);
  }

  &.mask-footer {
    background: linear-gradient(to top, #ffffff, #ffffff11);
    bottom: 0;
  }
}
</style>
