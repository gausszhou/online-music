<template>
  <ul class="app-nav">
    <li class="app-nav-item">
      <router-link
        class="app-nav-item-link"
        :to="{ name: 'recommend' }"
        :class="{ active: $route.path.startsWith('/music') }"
        >发现音乐</router-link
      >
    </li>
    <li class="app-nav-item">
      <router-link
        class="app-nav-item-link"
        :to="{ name: 'singer' }"
        :class="{ active: $route.path.startsWith('/singer') }"
        >发现歌手</router-link
      >
    </li>
    <li class="app-nav-item">
      <router-link
        class="app-nav-item-link"
        :to="{ name: 'newMV' }"
        :class="{ active: $route.path.startsWith('/mv') }"
        >发现 MV</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppNav"
};
</script>
