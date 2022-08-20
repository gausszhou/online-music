<template>
  <div class="song-player" :class="{ playing: songIsPlay }">
    <img :src="bar" class="player-bar" />
    <img :src="disc" class="player-disc rotate" />
    <img :src="song.picUrl" class="player-cover rotate" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      bar: require("@/assets/images/player_bar.png"),
      disc: require("@/assets/images/player_disc.png")
    };
  },
  computed: {
    ...mapState("song", {
      song: (state) => state.song,
      songIsPlay: (state) => state.songIsPlay
    })
  }
};
</script>

<style lang="scss" scoped>
// 唱片机
.song-player {
  width: 400px;
  height: 400px;
}

.player-disc {
  position: absolute;
  left: 73px;
  top: 120px;
  z-index: 19;
}

.player-cover {
  position: absolute;
  left: 125px;
  top: 172px;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  z-index: 18;
}

.player-bar {
  position: absolute;
  left: 200px;
  top: 40px;
  z-index: 22;
  transform: rotate(-25deg);
  transform-origin: 12px 12px;
  transition: 0.5s ease-in-out;
}

/* 是否正在播放 */
.song-player.playing .player-disc,
.song-player.playing .player-cover {
  animation-play-state: running;
}

/* 播放杆 转回去 */
.song-player.playing .player-bar {
  transform: rotate(12deg);
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
