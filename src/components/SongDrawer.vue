<template>
  <div class="song-drawer">
    <!-- 歌曲信息容器 -->
    <div class="song-disc">
      <SongDisc></SongDisc>
    </div>
    <!-- 歌词容器 -->
    <div class="song-lyric">
      <SongLyricScroll />
    </div>
    <div class="song-list">
      <SongList />
    </div>
  </div>
</template>

<script>
import SongDisc from "./SongDrawerDisc.vue";
import SongLyricScroll from "./SongDrawerLyric.vue";
import SongList from "./SongDrawerList.vue";

export default {
  name: "songDrawer",
  components: {
    SongDisc,
    SongLyricScroll,
    SongList
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
  width: 450px;
  display: flex;
  align-items: center;
  position: relative;
}

.song-lyric {
  width: 450px;
  height: 520px;
}
.song-list {
  width: 400px;
}
</style>
