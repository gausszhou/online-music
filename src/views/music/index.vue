<template>
  <div class="app-main-view music-container">
    <el-tabs v-model="tab" @tab-click="switchTab" class="app-main-nav">
      <el-tab-pane name="recommend">
        <span slot="label">个性推荐</span>
      </el-tab-pane>
      <el-tab-pane name="songlists">
        <span slot="label">歌单</span>
      </el-tab-pane>
      <el-tab-pane name="ranklists">
        <span slot="label">排行榜</span>
      </el-tab-pane>
      <el-tab-pane name="singer">
        <span slot="label">歌手</span>
      </el-tab-pane>
      <el-tab-pane name="newsongs">
        <span slot="label">最新音乐</span>
      </el-tab-pane>
    </el-tabs>
    <div class="app-main-page">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'music',
  components: {},
  data() {
    return {
      tab: 'recommend'
    }
  },
  watch: {
    '$route.name': {
      handler(newV) {
        this.tab = newV
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.tab = to.name
    })
  },
  methods: {
    switchTab() {
      this.goto(this.tab)
    },
    goto(name) {
      if (this.$route.name == name) return
      this.$router.replace({ name })
    }
  }
}
</script>

<style scoped></style>
