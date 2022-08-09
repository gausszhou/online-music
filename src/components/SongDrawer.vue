<template>
  <div class="song-drawer">
    <!-- 歌曲信息容器 -->
    <div class="player_con" :class="{'playing':$store.state.isPlay}">
      <img :src="bar" class="play_bar" />
      <!-- 黑胶碟片 -->
      <img :src="disc" class="disc autoRotate" />
      <img :src="$store.state.song.picUrl" class="cover autoRotate" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'songDrawer',
  data() {
    return {
      bar: require('@/assets/images/player_bar.png'),
      disc: require('@/assets/images/player_disc.png'),
    };
  }

}
</script>

<style lang="scss" scoped>
.song-drawer {
  position: fixed;
  z-index: 12;
  left:0;
  bottom: 50px;
  width: 100vw;
  height: calc(100vh - 50px);
  background-color: #f7f7f7;
}

// 唱片机
.player_con {
  width: 400px;
  height: 435px;
  position: absolute;
  left: 100px;
  top: 100px;
}

.player_con2 {
  width: 400px;
  height: 435px;
  position: absolute;
  left: 200px;
  top: 0px;
}

.player_con2 video {
  position: absolute;
  left: 20px;
  top: 30px;
  width: 355px;
  height: 265px;
}

.disc {
  position: absolute;
  left: 73px;
  top: 60px;
  z-index: 19;
}
.cover {
  position: absolute;
  left: 125px;
  top: 112px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  z-index: 18;
}

.audio_con {
  height: 50px;
  background-color: #f1f3f4;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.myaudio {
  width: 800px;
  height: 40px;
  margin-top: 5px;
  outline: none;
  background-color: #f1f3f4;
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
.autoRotate {
  animation-name: Rotate;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  animation-timing-function: linear;
  animation-duration: 10s;
}
/* 是否正在播放 */
.player_con.playing .disc,
.player_con.playing .cover {
  animation-play-state: running;
}

.play_bar {
  position: absolute;
  left: 200px;
  top: -10px;
  z-index: 22;
  transform: rotate(-25deg);
  transform-origin: 12px 12px;
  transition: 1s;
}

/* 播放杆 转回去 */
.player_con.playing .play_bar {
  transform: rotate(0);
}

</style>