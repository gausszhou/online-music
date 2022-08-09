<template>
  <div id="app">
    <AppHeader />
    <AppBody />
    <AppFooter/>
  </div>
</template>

<script>

import AppHeader from '@/layouts/AppHeader'
import AppBody from '@/layouts/AppBody'
import AppFooter from '@/layouts/AppFooter'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppBody,
    AppFooter
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
  }
}
</script>
