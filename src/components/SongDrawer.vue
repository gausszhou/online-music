<template>
  <div class="song-drawer">
    <!-- 歌曲信息容器 -->
    <div class="song-disc">
      <SongDisc />
    </div>
    <!-- 歌词容器 -->
    <div class="song-lyric" :class="{'has-menu': songListVisible }">
      <SongLyricScroll />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SongDisc from "./SongDrawerDisc.vue";
import SongLyricScroll from "./SongDrawerLyric.vue";

export default {
  name: "songDrawer",
  components: {
    SongDisc,
    SongLyricScroll
  },
    computed: {
    ...mapState("ui", {
      songListVisible: (state) => state.songListVisible
    })
  }
};
</script>
<style lang="scss" scoped>
.song-drawer {
  position: fixed;
  z-index: 9;
  left: 0;
  bottom: calc(var(--app-footer-height) + 1px);
  width: 100vw;
  height: calc(100vh - var(--app-footer-height) - 1px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
}

.song-disc {
  width: 400px;
  height: 520px;
  display: flex;
  align-items: center;
  position: relative;
}

.song-lyric {
  width: 400px;
  height: 520px;
  transition: all .3s;
  &.has-menu{
    margin-right: 400px;
    
  }
}
</style>
