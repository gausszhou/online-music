<template>
  <div class="song-drawer">
    <!-- 歌曲信息容器 -->
    <div class="song-disc">
      <SongDisc></SongDisc>
    </div>
        <!-- 歌词容器 -->
    <div class="song-lyric">
      <SongLyricScroll  />
    </div>
  </div>
</template>

<script>

import SongDisc from "./SongDrawerDisc.vue";
import SongLyricScroll from "./SongDrawerLyric.vue";
export default {
  name: "songDrawer",
  components: {
    SongDisc,
    SongLyricScroll
  },


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
  background-color: #fff;
}

.song-disc{
    margin-top: 5rem;
  width: 450px;
  height: 500px;
  display: flex;
  align-items: center;
  position: relative;
}
.song-lyric {
  margin-top: 5rem;
  width: 450px;
}

</style>
