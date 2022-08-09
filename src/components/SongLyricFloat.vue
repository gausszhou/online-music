<template>
  <div class="lyric-warpper">
    <VueDragResize
      :parent="false"
      :draggable="true"
      :resizable="true"
      :handles="[]"
      :x="0"
      :y="0"
      :z="999"
      :w="400"
      :h="80"
      :min-width="400"
      :min-height="80"
    >
      <div class="lyric">{{ $store.state.lyric[index].word || '' }}</div>
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
    lyric() {
      return this.$store.state.lyric
    }
  },
  watch: {
    time(newV) {
      console.log(newV, this.lyric)
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
  /* z-index: 99; */
  /* overflow: hidden; */
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.62);
  color: #409eff;
  text-shadow: 1px 1px 1px rgba(128, 0, 0, 0.38);
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
