<template>
  <div class="lyric-container">
    <ul ref="lyricList" class="lyric-scroll" @scroll="onLyricScroll">
      <li
        ref="lyric"
        class="lyric-scroll-item text-over-elli"
        v-for="(item, index) in lyric"
        :key="index"
        :class="{ active: index == activeIndex }"
      >
        {{ item.word }}
      </li>
    </ul>
    <div ref="pointer" class="lyric-pointer">
      <div class="pointer-time">{{ scrollTime | stotime }}</div>
      <div class="pointer-bar"></div>
      <div class="pointer-arrow" @click="changeProgress"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lyric',
  props: {
    time: {
      type: [Number, String],
      default: () => 0
    }
  },
  data() {
    return {
      activeIndex: 0,
      scrollTime: 0
    }
  },
  computed: {
    lyric() {
      return this.$store.state.lyric
    }
  },
  watch: {
    time(newV) {
      for (let i = 0; i < this.lyric.length; i++) {
        if (newV > this.lyric[i].time) {
          this.activeIndex = i
        }
      }
    },
    activeIndex(newV) {
      this.scroll(newV)
    }
  },
  methods: {
    scroll(index) {
      if (this.$refs.lyric) {
        const lyricListEl = this.$refs.lyricList
        const lyricEL = this.$refs.lyric[index]
        const HEIGHT = lyricEL.offsetHeight
        const top = HEIGHT * (index + 0.5)
        lyricListEl.scrollTop = top
      }
    },
    onLyricScroll(e) {
      const lyricListEl = this.$refs.lyricList
      const target = lyricListEl.scrollTop
      const lyricEL = this.$refs.lyric[0]
      const HEIGHT = lyricEL.offsetHeight
      let index = Math.round(target / HEIGHT)
      if (index > 0) index -= 1
      if (this.lyric) this.scrollTime = this.lyric[index].time
    },
    changeProgress() {
      this.$emit('progress', this.scrollTime)
    }
  }
}
</script>

<style lang="scss" scoped>
.lyric-container {
  position: relative;
}

.lyric-container:hover {
  .lyric-pointer {
    opacity: 1;
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
  min-width: 400px;
  max-width: 500px;
  min-height: 300px;
  max-height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}

.lyric-scroll-item {
  margin: 0 1rem;
  text-align: center;
  line-height: 2;
  color: #666;
}
.lyric-scroll-item:first-child {
  margin-top: 200px;
}
.lyric-scroll-item:last-child {
  margin-bottom: 200px;
}
.lyric-scroll-item.active {
  color: #409eff;
  font-weight: 700;
  font-size: 18px;
}
</style>
