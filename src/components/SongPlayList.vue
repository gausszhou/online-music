<template>
  <div class="song-playlist">
    <div class="song-playlist-header">
      <div class="total">总{{ songList.length }}首</div>
      <div class="clear" @click="clearPlayList">清空全部</div>
    </div>

    <ul class="song-playlist-body">
      <li
        class="song-item text-over-elli"
        v-for="(item, index) in songList"
        :key="item.id"
        :class="{ active: index == songIndex }"
        @dblclick="getMusic(item, index)"
      >
        <div
          v-if="index == songIndex"
          class="song-item-progress"
          :style="{
            width: songCurrentPercent + '%'
          }"
        ></div>
        <span class="name text-over-elli">{{ item.name }}</span>
        <span class="author" v-for="(author, index) in item.author" :key="index"
          >{{ author.name }}.</span
        >
        <span class="album text-over-elli">{{ item.albumName }}</span>
        <a
          href="javascript:;"
          class="iconfont play-button"
          :class="index == songIndex ? 'icon-pause-mobile' : 'icon-play-mobile'"
          @click="getMusic(item, index)"
        ></a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "playList",
  computed: {
    ...mapState("song", {
      songList: (state) => state.songList,
      songIndex: (state) => state.songIndex,
      songIsPlay: (state) => state.songIsPlay,
      songCurrentPercent: (state) => state.songCurrentPercent
      
    }),
  },
  methods: {
    getMusic(item, index) {
      if (index == this.songIndex && this.songIsPlay) {
        this.$store.commit("song/setSongIsPlay", false);
        return false;
      }
      this.$store.dispatch("song/getMusic", item);
    },
    close() {
      this.$store.commit("ui/setSongListVisible", false);
    },
    clearPlayList() {
      this.$store.commit("song/setSongIndex", -1);
      this.$store.commit("song/setSongCurrentTime", 0);

      this.$store.commit("song/setSongList", []);
      this.$store.commit("song/setSong", {});
      setTimeout(() => {
        this.$store.commit("song/setSongTotalTime", 0);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.song-playlist {
  position: fixed;
  z-index: 999;
  right: 0;
  bottom: calc(var(--app-footer-height) + 2px);
  top: calc(var(--app-header-height) + 4px);
  width: 400px;
  background-color: #fff;
  box-shadow: -1px 0 4px 1px #eee, 0 -1px 4px 1px #eee;
}

.song-playlist-header {
  height: 40px;
  width: 100%;
  box-sizing: border;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.song-playlist-body {
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100% - 40px);
}

.song-playlist-header {
  background-color: #fcfcfc;
  .total {
    width: 180px;
    margin: 0.5rem;
  }
  .clear {
    color: #517eaf;
    cursor: pointer;
    margin: 0.5rem;
  }
}

.song-playlist-body {
  .song-item {
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 2px 0.5rem;
    overflow: hidden;
    cursor: pointer;
  }
}

.song-item {
  .name {
    font-size: 16px;
    width: 180px;
    min-width: 180px;
  }
  .author {
    font-size: 14px;
    overflow: hidden;
  }
  .album {
    font-size: 12px;
    color: #666;
    flex: 1;

    overflow: hidden;
  }
  .play-button {
    margin: 0 8px;
    color: #999;
    font-size: 28px;
    line-height: 30px;
  }
}

.song-item {
  &:nth-child(even) {
    background-color: #fcfcfc;
  }
  &:last-child {
    margin-bottom: 10px;
  }
  &.active,
  &:hover {
    background-color: #ec414111;
    .play-button {
      color: #333;
      text-decoration: none;
    }
  }
}

.song-item {
  .song-item-progress {
    display: none;
  }
  &.active .song-item-progress {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100%;
    box-sizing: border-box;
    background-color: #ec414177;
    border-right: 2px solid #ec4141;
  }
}
</style>
