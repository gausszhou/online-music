<template>
  <div class="playlist">
    <div class="playlist-mask" @click="close"></div>
    <div class="playlist-content">
    <h2 class="playlist-title">当前播放</h2>
    <div class="playlist-control">
      <div class="total">总{{ $store.state.playList.length }}首</div>
      <div class="clear">
        <i></i>
        清空全部
      </div>
    </div>
    <ul class="playlist-box">
      <li
        class="song-item text-over-elli"
        v-for="(item, index) in $store.state.playList"
        :key="item.id"
      >
        <span class="name text-over-elli">{{ item.name }}</span>
        <span class="mv-tag" v-if="item.mvid">MV</span>
        <span class="author" v-for="(author, index) in item.author" :key="index"
          >{{ author.name }}.</span
        >
        <span class="album text-over-elli">{{ item.albumname }}</span>
        <a
          href="javascript:;"
          class="iconfont play-button"
          :class="
            index == $store.state.activeIndex
              ? 'icon-pause-mobile'
              : 'icon-play-mobile'
          "
          @click="playMusic(item, index)"
        ></a>
      </li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playList',
  methods: {
    playMusic(item, index) {
      this.$store.dispatch('playMusic', item)
      this.$store.commit('setIndex', index)
    },
    close(){
      this.$emit("close")
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist-mask{
  position: fixed;
  z-index: 9998;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.playlist-content {
  position: fixed;
  z-index: 9999;
  right: 0;
  top: var(--app-header-height);
  bottom: var(--app-footer-height);
  width: 440px;
  padding: 0 10px;
  background-color: #fff;
  box-sizing: border-box;
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  .playlist-title {
    height: 32px;
    line-height: 32px;
    width: 210px;
    font-size: 18px;
  }
  .playlist-control {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    .total {
      width: 180px;
    }
    .clear {
      color: #517eaf;
      cursor: pointer;
    }
  }
}

.song-item {
  width: 100%;
  height: 30px;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;

  .name {
    font-size: 16px;
    width: 180px;
  }
  .author {
    font-size: 14px;
  }
  .album {
    font-size: 12px;
    color: #666;
    flex: 1;
    text-align: center;
  }
  .mv-tag {
    position: relative;
    top: -5px;
    right: -5px;
    font-size: 12px;
    color: red;
  }
  .play-button {
    width: 40px;
    font-size: 28px;
    color: #999;
    line-height: 30px;
  }
  &:hover {
    .play-button {
      color: #333;
      text-decoration: none;
    }
  }
}
.playlist-box {
  overflow-y: auto;
  height: calc(100vh - 230px);
}
</style>
