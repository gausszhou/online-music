<template>
  <div class="audio-box" :class="{'nosongs':this.playList.length==0}">
    <div class="audio-bar" @mouseup="mouseup">
      <!-- 左边的歌曲信息 -->
      <div class="song-info">
        <div class="img-box" @click="toggleSongDrawer()" :class="{show:song.picUrl,open:songDrawerVisible}">
          <i class="iconfont arrow arrow-left icon-arrow-left-bottom"></i>
          <i class="iconfont arrow arrow-right icon-arrow-right-top"></i>
          <img class="img" :class="{ 'running':isPlay&&(!songDrawerVisible) }" :src="song.picUrl" />
        </div>
        <div class="name-box">
          <div class="overEllipsis song-name ft_16">{{song.name}}</div>
          <div>
            <span
              class="overEllipsis song-author ft_14"
              v-for="(item,index) in song.author"
              :key="index"
            >{{item.name}}&nbsp;&nbsp;</span>
          </div>
        </div>
      </div>
      <!-- 播放控制 -->
      <div class="song-control">
        <div class="switch-control">
          <i class="iconfont ft_28 button-control" @click="swtichMode" :class="modeList[mode].class"></i>
          <i class="iconfont button-control ft_28 icon-pre" @click="switchSong(-1)"></i>
          <i
            class="iconfont button-control button-toggle ft_28"
            :class="isPlay  ? 'icon-pause':'icon-play'"
            @click="toggleSong()"
          ></i>
          <i class="iconfont button-control ft_28 icon-next" @click="switchSong(1)"></i>
          <i class="button-control ft_20 button-lyric" @click="toggleLyric">词</i>
        </div>
        <div class="progress display-flex">
          <span class="tiem">{{currentTime | stotime}}</span>
          <el-slider class="control-progress" v-model="amount" :show-tooltip="false" @change="changeProgress"></el-slider>
          <span class="time">{{totalTime | stotime}}</span>
        </div>
      </div>
      <!-- 音量控制和播放列表 -->
      <div class="list-control display-flex">
        <div class="flex_1"></div>
        <i class="iconfont ft_28 icon-volume"></i>
        <el-slider class="control-volume" v-model="volume" :show-tooltip="false" @change="changevolume(volume)"></el-slider>
        <i class="iconfont ft_28 button-menu icon-menu" @click="openDrawer()"></i>
      </div>
    </div>
    <!-- 真正的audio标签，不显示 -->
    <audio
      id="audioSource"
      v-show="false"
      ref="audio"
      :src="song.audioUrl"
      autoplay
      @timeupdate="onAudioTimeUpdate"
      @loadeddata="loadeddata"
    ></audio>
    <!-- 播放列表组件 -->
    <transition-group name="fade">
      <playList class="play-list" key="playList" v-if="$store.state.menuVisible"></playList>
      <lyric key="lyric" v-if="lyricVisible" :time="currentTime"></lyric>
    </transition-group>
    <transition name="drawer">
      <songDrawer key="songDrawer" v-if="songDrawerVisible" @change="closeSongDrawer()"></songDrawer>
    </transition>
  </div>
</template>

<script>
import playList from "@/components/audioBar/playList.vue";
import lyric from "@/components/audioBar/lyric.vue";
import songDrawer from "@/components/audioBar/songDrawer.vue";

export default {
  name: "audioVue",
  components: {
    playList,
    lyric,
    songDrawer
  },
  props: {},
  data() {
    return {
      mode: 0,
      modeList: [
        {
          mode: 0, // 列表循环
          class: 'icon-mode-loop',
          label: '列表循环'
        },
        {
          mode: 1, // 单曲循环
          class: 'icon-mode-single',
          label: '单曲循环'
        },
        {
          mode: 2,// 顺序播放，最后一首播放完毕，暂停
          class: 'icon-mode-order',
          label: '顺序播放'
        },
        {
          mode: 3, // 数字三意味着混沌，所以用3来代表随机播放
          class: 'icon-mode-random',
          label: '随机播放'
        }
      ],
      currentTime: 0,
      totalTime: 0,
      amount: 0,
      volume: 50,
      playSpeed: 1,
      loaded: false,
      orderList: [],
      current: -1,
      lyricVisible: false,
      isSlider: false,
      songDrawerVisible: false
    };
  },
  computed: {
    isPlay() {
      return this.$store.state.isPlay;
    },
    song() {
      return this.$store.state.song;
    },
    playList() {
      return this.$store.state.playList;
    }
  },
  watch: {
    song: {
      handler() {
        this.loaded = false;

      },
      deep: true
    }
  },
  mounted() {
    // 设置初始音量
    this.$refs.audio.volume = this.volume / 100;
  },
  methods: {
    loadeddata() {
      this.loaded = true;
    },
    swtichMode() {
      this.mode = (this.mode + this.modeList.length + 1) % this.modeList.length;
    },
    switchSong(num) {
      let number = 0;
      switch (this.mode) {
        case 0:
          number = num;
          this.setSong(number);
          break;
        case 1:
          number = 0;
          this.setSong(number);
          break;
        case 2:
          if (this.$store.state.activeIndex < this.$store.state.playList.length - 1) {
            number = 1;
            this.setSong(number);
          }
          break;
        case 3:
          number = Math.floor(Math.random() * this.$store.state.playList.length);
          if (num == -1) {
            this.current == this.current - 1;
            number = this.orderList[this.current] || -1;
            this.setSong(number);
          } else {
            this.orderList.push(number);
            this.current++;
            this.setSong(number);
          }
          break;
        default:
          break;
      }
    },
    setSong(number) {
      let list = this.$store.state.playList;
      let index = this.$store.state.activeIndex;
      if (list.length > 1) {
        this.$refs.audio.pause();
        this.$store.commit('setIsPlay', false);
        index = (index + list.length + number) % list.length;
        let next = list[index];
        this.$store.dispatch('playMusic', next);
        this.$store.commit('setIndex', index);

      }
    },
    toggleSong() {
      if (this.isPlay) {
        this.$store.commit('setIsPlay', false);
        this.$refs.audio.pause();
      } else {
        if (this.song.audioUrl) {
          this.$store.commit('setIsPlay', true);
          this.$refs.audio.play();
          this.audioEffects()
        }
      }
    },
    toggleLyric() {
      if (this.song.audioUrl && this.$store.state.lyric.length) {
        this.lyricVisible = !this.lyricVisible;
      }
    },
    mouseup() {
      setTimeout(() => {
        this.isSlider = false;
      }, 100);
    },
    changeProgress(e) {
      this.isSlider = true;
      this.$refs.audio.currentTime = e * this.totalTime / 100;
      this.amount = e;
    },
    changevolume(e) {
      this.$refs.audio.volume = e / 100;
    },
    onAudioTimeUpdate() {
      // 防止NaN
      if (this.loaded) {
        this.totalTime = this.$refs.audio.duration;
        this.currentTime = this.$refs.audio.currentTime;
        if (!this.isSlider) this.amount = 100 * this.currentTime / this.totalTime;
        if (this.amount >= 100) {
          this.switchSong(1);
        }
      }
    },
    // 打开播放列表
    openDrawer() {
      this.$store.commit('setMenuVisible', !this.$store.state.menuVisible);
    },
    // 打开歌曲详情
    toggleSongDrawer() {
      this.songDrawerVisible = !this.songDrawerVisible;
    },
    closeSongDrawer() {
      this.songDrawerVisible = false;
    },
    audioEffects() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const audioElement = this.$refs.audio;
      console.log(audioContext, audioElement);
    },
  },
};
</script>

<style lang="scss" scoped>
// 过渡
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.5s; // 不能用all
  transform-origin: left bottom;
  transform: scaleX(1) scaleY(1);
}
.drawer-enter, .drawer-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: transform 0.5s;
  transform-origin: left bottom;
  transform: scaleX(0) scaleY(0);
}
</style>
