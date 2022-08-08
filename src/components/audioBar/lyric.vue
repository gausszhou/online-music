<template>
  <vdrr class="lyric" :draggable="true" :resizable="false" :h="80">
    <div>{{$store.state.lyric[index].word||''}}</div>
  </vdrr>
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
    };
  },
  computed: {
    lyric() {
      return this.$store.state.lyric;
    }
  },
  watch: {
    time(newV) {
      for (let i = 0; i < this.lyric.length; i++) {
        if (newV > this.lyric[i].time) {
          this.index = i;
        }
      }
    }
  }
}
</script>

<style scoped>
.lyric {
  z-index: 99998;
  position: fixed;
  overflow: hidden;
  bottom: 90px;
  height: 80px;
  left: 50%;
  padding: 0 50px;
  min-width: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.62);
  color: #f7362c;
  text-shadow: 1px 1px 1px rgba(128, 0, 0, 0.38);
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>