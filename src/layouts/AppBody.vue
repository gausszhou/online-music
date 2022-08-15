<template>
  <div class="app-body">
    <AppNav class="app-nav"></AppNav>
    <div class="app-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppNav from "@/layouts/AppSideNav";

export default {
  name: "AppBody",
  components: {
    AppNav
  }
};
</script>
