<template>
  <div class="song-drawer">
    <!-- 歌曲信息容器 -->
    <div class="song-player" :class="{ playing: $store.state.isPlay }">
      <img :src="bar" class="player-bar" />
      <img :src="disc" class="player-disc rotate" />
      <img :src="$store.state.song.picUrl" class="player-cover rotate" />
    </div>
    <!-- 歌词容器 -->
    <div class="song-lyric">
      <SongLyricScroll :time="time" @progress="changeProgress" />
    </div>
  </div>
</template>

<script>
import SongLyricScroll from './SongLyricScroll.vue'
export default {
  name: 'songDrawer',
  props: {
    time: {
      type: [Number, String],
      default: () => 0
    }
  },
  components: {
    SongLyricScroll
  },
  data() {
    return {
      bar: require('@/assets/images/player_bar.png'),
      disc: require('@/assets/images/player_disc.png')
    }
  },
  methods: {
    changeProgress(e) {
      this.$emit('progress', e)
    }
  }
}
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
  padding-top: 5rem;
  justify-content: center;
  background-color: #fff;
}

// 唱片机
.song-player {
  width: 400px;
  height: 435px;
  position: relative;
  margin-top: 5rem;
}

.song-lyric {
  margin-top: 5rem;
  width: 450px;
}

.player-disc {
  position: absolute;
  left: 73px;
  top: 60px;
  z-index: 19;
}

.player-cover {
  position: absolute;
  left: 125px;
  top: 112px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  z-index: 18;
}

/* 是否正在播放 */
.song-player.playing .player-disc,
.song-player.playing .player-cover {
  animation-play-state: running;
}

.player-bar {
  position: absolute;
  left: 200px;
  top: -10px;
  z-index: 22;
  transform: rotate(-25deg);
  transform-origin: 12px 12px;
  transition: 0.5s ease-in-out;
}

/* 播放杆 转回去 */
.song-player.playing .player-bar {
  transform: rotate(0);
}
/* 旋转的动画 */
@keyframes Rotate {
  from {
    transform: rotateZ(0);
  }
  to {
    transform: rotateZ(360deg);
  }
}
/* 旋转的类名 */
.rotate {
  animation-name: Rotate;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  animation-timing-function: linear;
  animation-duration: 10s;
}
</style>
