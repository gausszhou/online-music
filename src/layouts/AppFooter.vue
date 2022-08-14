<template>
  <div
    class="app-footer audio-box audio-bar"
    :class="{ nosongs: this.playList.length == 0 }"
  >
    <!-- 左边的歌曲信息 -->
    <div class="song-info">
      <div
        class="img-box"
        @click="toggleSongDrawer()"
        :class="{ show: song.picUrl, open: songDrawerVisible }"
      >
        <i class="arrow iconfont icon-arrow-right-top"></i>
        <img
          class="img"
          :class="{ running: isPlay && !songDrawerVisible }"
          :src="song.picUrl"
        />
      </div>
      <div class="name-box">
        <div class="text-over-elli song-name">{{ song.name }}</div>
        <div>
          <span
            class="text-over-elli song-author"
            v-for="(item, index) in song.author"
            :key="index"
            >{{ item.name }}&nbsp;&nbsp;</span
          >
        </div>
      </div>
    </div>
    <!-- 播放控制 -->
    <div class="song-control">
      <div class="switch-control">
        <span class="button-text">
          {{ modeList[mode].label }}
        </span>
        <i
          class="button-control iconfont"
          @click="swtichMode"
          :class="modeList[mode].class"
        ></i>
        <i class="button-control iconfont icon-pre" @click="switchSong(-1)"></i>
        <i
          class="button-control iconfont button-toggle"
          :class="isPlay ? 'icon-pause' : 'icon-play'"
          @click="toggleSong()"
        ></i>
        <i class="button-control iconfont icon-next" @click="switchSong(1)"></i>
        <i class="button-control button-text" @click="toggleLyric">浮动歌词</i>
      </div>
      <div class="progress">
        <span class="time">{{ currentTime | stotime }}</span>
        <el-slider
          class="control-progress"
          v-model="amount"
          :show-tooltip="false"
          @change="changeProgressPercent"
        ></el-slider>
        <span class="time">{{ totalTime | stotime }}</span>
      </div>
    </div>
    <!-- 音量控制和播放列表 -->
    <div class="list-control display-flex">
      <div class="flex_1"></div>
      <i class="button-volume iconfont icon-volume"></i>
      <el-slider
        class="control-volume"
        v-model="volume"
        :show-tooltip="false"
        @change="changevolume(volume)"
      ></el-slider>
      <i
        class="button-menu iconfont icon-menu"
        :class="{ active: $store.state.menuVisible }"
        @click="openPlayList()"
      ></i>
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

    <transition name="drawer-left">
      <SongDrawer
        key="drawer"
        v-if="songDrawerVisible"
        :time="currentTime"
        @progress="changeProgressTime"
      />
    </transition>

    <transition name="fade">
      <SongLyricFloat key="lyric" v-if="songLyricVisible" :time="currentTime" />
    </transition>
    <transition name="drawer-right">
      <SongPlayList
        class="play-list"
        key="playList"
        v-if="$store.state.menuVisible"
        @close="closeSongPlayList"
      />
    </transition>
  </div>
</template>

<script>
import SongPlayList from '@/components/SongPlayList.vue'
import SongLyricFloat from '@/components/SongLyricFloat.vue'
import SongDrawer from '@/components/SongDrawer.vue'

export default {
  name: 'AppFooter',
  components: {
    SongPlayList,
    SongLyricFloat,
    SongDrawer
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
          mode: 2, // 顺序播放，最后一首播放完毕，暂停
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
      songLyricVisible: false,
      isSlider: false,
      songDrawerVisible: false
    }
  },
  computed: {
    isPlay() {
      return this.$store.state.isPlay
    },
    song() {
      return this.$store.state.song
    },
    playList() {
      return this.$store.state.playList
    }
  },
  watch: {
    song: {
      handler() {
        this.loaded = false
      },
      deep: true
    },
    isPlay(newV) {
      if (!this.$refs.audio) return false
      if (newV) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    }
  },
  mounted() {
    // 设置初始音量
    this.$refs.audio.volume = this.volume / 100
  },
  methods: {
    loadeddata() {
      this.loaded = true
    },
    swtichMode() {
      this.mode = (this.mode + this.modeList.length + 1) % this.modeList.length
    },
    switchSong(num) {
      let number = 0
      switch (this.mode) {
        case 0: // loop
          number = num
          this.setSong(number)
          break
        case 1: // single-loop
          number = 0
          this.setSong(number)
          break
        case 2: // order
          if (
            this.$store.state.activeIndex ==
            this.$store.state.playList.length - 1
          ) {
            this.toggleSong()
            return
          }
          number = 1
          this.setSong(number)
          break
        case 3: // random
          number = Math.floor(Math.random() * this.$store.state.playList.length)
          // prev
          if (num == -1) {
            this.current == this.current - 1
            number = this.orderList[this.current] || -1
            this.setSong(number)
          } else {
            // next
            this.orderList.push(number)
            this.current++
            this.setSong(number)
          }
          break
        default:
          break
      }
    },
    // -1 0 1
    setSong(number) {
      let list = this.$store.state.playList
      let index = this.$store.state.activeIndex
      if (list.length > 1) {
        this.$refs.audio.pause()
        this.$store.commit('setIsPlay', false)
        index = (index + list.length + number) % list.length
        let next = list[index]
        this.$store.dispatch('getMusic', next).then(res=>{
          this.$store.commit('setIndex', index)
        })
      }
    },
    toggleSong() {
      if (this.isPlay) {
        this.$store.commit('setIsPlay', false)
        // this.$refs.audio.pause()
      } else {
        if (this.song.audioUrl) {
          this.$store.commit('setIsPlay', true)
          // this.$refs.audio.play()
        }
      }
    },
    toggleLyric() {
      if (this.song.audioUrl && this.$store.state.lyric.length) {
        this.songLyricVisible = !this.songLyricVisible
      }
    },
    changeProgressPercent(e) {
      this.isSlider = true
      this.$refs.audio.currentTime = (e * this.totalTime) / 100
      this.amount = e
      this.$store.commit('setProgress', e)
    },
    changeProgressTime(time) {
      this.$refs.audio.currentTime = time
    },
    changevolume(e) {
      this.$refs.audio.volume = e / 100
    },
    onAudioTimeUpdate() {
      // 防止NaN
      if (this.loaded) {
        this.totalTime = this.$refs.audio.duration
        this.currentTime = this.$refs.audio.currentTime

        this.amount = (100 * this.currentTime) / this.totalTime
        if (this.amount >= 100) {
          this.$store.commit('setProgress', 0)
          this.switchSong(1)
        }
        this.$store.commit('setProgress', this.amount)
      }
    },
    // 打开播放列表
    openPlayList() {
      this.$store.commit('setMenuVisible', !this.$store.state.menuVisible)
    },
    closeSongPlayList() {
      this.$store.commit('setMenuVisible', !this.$store.state.menuVisible)
    },
    // 打开歌曲详情
    toggleSongDrawer() {
      this.songDrawerVisible = !this.songDrawerVisible
    },
    closeSongDrawer() {
      this.songDrawerVisible = false
    },
    audioEffects() {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const audioContext = new AudioContext()
      const audioElement = this.$refs.audio
      const audioSourceNode = audioCtx.createMediaElementSource(audioElement)
      const destinationNode = audioContext.destination
      audioSourceNode.connect(destinationNode)
      console.log(audioContext, audioElement)
    }
  }
}
</script>

<style lang="scss" scoped>
// 过渡
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, 
.fade-leave-to {
  opacity: 0;
}

.drawer-left-enter-active,
.drawer-left-leave-active {
  transition: transform 0.5s ease-out;
  transform-origin: left bottom;
  transform: scaleX(1) scaleY(1);
}
.drawer-left-enter, 
.drawer-left-leave-to {
  transition: transform 0.5s ease-in;
  transform-origin: left bottom;
  transform: scaleX(0) scaleY(0);
}
.drawer-right-enter-active,
.drawer-right-leave-active {
  transition: transform 0.5s ease-in;
  transform-origin: right bottom;
  transform: scaleX(1) scaleY(1);
}

.drawer-right-enter, 
.drawer-right-leave-to {
  transition: transform 0.5s ease-out;
  transform-origin: right bottom;
  transform: scaleX(0) scaleY(0);
}
</style>
