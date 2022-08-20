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
      <div class="lyric text-over-elli" :class="{ disable: songLyricList.length === 0 }">
        {{ (songLyricList[index] && songLyricList[index].word) || "......" }}
      </div>
    </VueDragResize>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VueDragResize from "@gausszhou/vue-drag-resize";
export default {
  name: "lyric",
  components: {
    VueDragResize
  },
  data() {
    return {
      index: 0
    };
  },
  computed: {
    ...mapState("song", {
      songCurrentTime: (state) => state.songCurrentTime,
      songLyricList: (state) => state.songLyricList
    })
  },
  watch: {
    songCurrentTime(newV) {
      for (let i = 0; i < this.songLyricList.length; i++) {
        if (newV > this.songLyricList[i].time) {
          this.index = i;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
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
  background-color: rgba(0, 0, 0, 0.62);
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &.disable {
    background-color: rgba(0, 0, 0, 0.38);
  }
}
</style>
