<template>
  <div class="app-main-view video-container">
    <el-tabs v-model="tab" @tab-click="switchTab" class="app-main-nav">
      <el-tab-pane name="newMV">
        <span slot="label">最新MV</span>
      </el-tab-pane>
      <el-tab-pane name="allMV">
        <span slot="label">所有MV</span>
      </el-tab-pane>
    </el-tabs>
    <div class="app-main-page">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoVue",
  components: {},
  data() {
    return {
      tab: "newMV"
    };
  },
  watch: {
    "$route.name": {
      handler(newV) {
        this.tab = newV;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.tab = to.name;
    });
  },
  methods: {
    switchTab() {
      this.goto(this.tab);
    },
    goto(name) {
      if (this.$route.name == name) return;
      this.$router.replace({ name });
    }
  }
};
</script>

<style scoped>
.iconfont {
  font-size: 20px;
  line-height: 40px;
}
</style>
