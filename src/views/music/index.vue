<template>
  <div class="music-container">
    <el-tabs v-model="tab" @tab-click="switchTab" class="app-main-nav tab-nav">
      <el-tab-pane name="recommend">
        <span slot="label">个性推荐</span>
      </el-tab-pane>
      <el-tab-pane name="playlists">
        <span slot="label">歌单</span>
      </el-tab-pane>
      <el-tab-pane name="station">
        <span slot="label">主播电台</span>
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
    <!-- 缓存 -->
    <keep-alive>
      <!-- 路由 -->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'music',
  components: {
  },
  data() {
    return {
      tab: 'recommend'
    };
  },
  watch: {
    '$route.name': {
      handler(newV) {
        console.log(newV)
        this.tab = newV;
      }
    }
  },
  methods: {
    switchTab() {
      this.goto(this.tab);
    },
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    },
  }
}
</script>

<style scoped>
</style>