<template>
  <aside class="sideBar side-container">
    <ul class="nav">
      <li>
        <router-link :to="{name:'recommend'}" :class="{'router-link-active':$route.path.includes('music')}">发现音乐</router-link>
      </li>

      <li>
        <router-link :to="{name:'allMV'}" :class="{'router-link-active':$route.path.includes('video')}">视频</router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'sidebarVue'
}
</script>

