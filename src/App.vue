<template>
  <div id="app" class="fake-desktop-background">
    <VueDragResize
      v-show="neteaseShow"
      id="music-box"
      :active="true"
      :prevent-deactivation="true"
      :draggable="true"
      :drag-handle="'.drag-handle'"
      :resizable="true"
      :x="100"
      :y="50"
      :z="2"
      :w="1020"
      :h="576"
      :min-width="1024"
      :min-height="576"
    >
      <div class="box-container" >
        <topBar />
          <homeVue />
          <bottomBar />
        <!-- <iframe src="//gausszhou.top"  width="100%" height="100%"></iframe> -->
      </div>
    </VueDragResize>
    <div class="fake-desktop-icon">
      <div id="recovery" @dblclick="trick"></div>
      <div id="netease" @dblclick="toggleNeteaseShow"></div>
    </div>
    <div class="fake-desktop-bottom"></div>
    <div id="mask" v-if="!isAgree">
      <div class="mask-content">
        <div class="mask-title">Link Start</div>
        <span class="agree-button-group" @click="agree()">
          <button>是</button>
          <button>同意</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
window.oncontextmenu = (e) => {
  e.preventDefault()
}

import topBar from './common/topBar'
import homeVue from './common/home'
import bottomBar from './common/bottomBar'

export default {
  name: 'App',
  components: {
    topBar,
    homeVue,
    bottomBar
  },
  data() {
    return {
      neteaseShow: false,
      isAgree: false
    }
  },
  watch: {
    // 报错消息
    '$store.state.message': {
      handler(newV) {
        this.$message({
          message: newV,
          type: 'error'
        })
      }
    }
  },
  methods: {
    toggleNeteaseShow() {
      this.neteaseShow = true
    },
    trick() {
      document.exitFullscreen()
      this.$message.warning('哈哈，你被骗了')
    },
    agree() {
      this.$el
        .requestFullscreen()
        .then(() => {
          this.isAgree = true
        })
        .catch(() => {
          window.alert('您没有内测资格')
        })
    }
  }
}
</script>

