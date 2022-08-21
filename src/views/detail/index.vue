<template>
  <div class="app-main-view">
    <div class="app-main-detail">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "detail"
};
</script>
