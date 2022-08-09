<template>
    <ul class="app-nav">
      <li class="app-nav-item">
        <router-link class="app-nav-item-link" :to="{name:'recommend'}" :class="{'active':$route.path.includes('music')}">发现音乐</router-link>
      </li>
      <li class="app-nav-item">
        <router-link class="app-nav-item-link" :to="{name:'allMV'}" :class="{'active':$route.path.includes('video')}">视频</router-link>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'AppNav'
}
</script>

