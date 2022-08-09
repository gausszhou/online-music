<template>
  <VueDragResize class="lyric" :draggable="true" :resizable="false" :h="80">
    <div>{{ $store.state.lyric[index].word || '' }}</div>
  </VueDragResize>
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
      index: 0
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
          this.index = i
        }
      }
    }
  }
}
</script>

<style scoped>
.lyric {
  z-index: 99998;
  position: absolute;
  overflow: hidden;
  bottom: 90px;
  height: 80px;
  left: 50%;
  padding: 0 50px;
  min-width: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  background-color: rgba(128, 128, 128, 0.62);
  color: #409eff;
  text-shadow: 1px 1px 1px rgba(128, 0, 0, 0.38);
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
