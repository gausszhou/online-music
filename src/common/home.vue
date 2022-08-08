<template>
  <div>
    <!-- 左侧导航区域 -->
    <sideBar class="side-container"></sideBar>
    <!-- 主体区域 -->
    <main class="main-container">
      <!-- 一级路由入口 -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>

import sideBar from "@/common/sideBar";
export default {
  name: 'index',
  components: {
    sideBar
  }
};
</script>
