<template>
  <div class="lyric-warpper">
    <VueDragResize
      :parent="false"
      :draggable="true"
      :resizable="true"
      :x="0"
      :y="0"
      :z="999"
      :w="800"
      :h="100"
      :min-width="400"
      :min-height="80"
    >
      <div class="lyric">{{ songLyricList[index].word || '......' }}</div>
    </VueDragResize>
  </div>
</template>

<script>
import VueDragResize from '@gausszhou/vue-drag-resize'
export default {
  name: 'lyric',
  components: {
    VueDragResize
  },
  props: {
    time: {
      type: [Number, String],
      default: () => 0
    }
  },
  data() {
    return {
      index: 0
    }
  },
  computed: {
    songLyricList() {
      return this.$store.state.song.songLyricList
    }
  },
  watch: {
    time(newV) {
      for (let i = 0; i < this.songLyricList.length; i++) {
        if (newV > this.songLyricList[i].time) {
          this.songLyricList = i
        }
      }
    }
  }
}
</script>

<style scoped>
.lyric-warpper {
  position: fixed;
  z-index: 99;
  bottom: 90px;
  height: 80px;
  left: 50%;
  padding: 0 50px;
  transform: translateX(-50%);
  min-width: 50%;
}
.lyric {
  width: 100%;
  height: 100%;
  color: #409eff;
  text-shadow: 1px 1px 1px rgba(128, 0, 0, 0.62);
  background-color: rgba(128, 128, 128, 0.62);
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
