<template>
  <div class="app-header">
    <div class="left-box">
      <div class="app-header-logo">
        <img :src="logoUrl" @click="goto('recommend')" alt />
      </div>

      <div class="app-header-history">
        <span
          class="app-header-history-icon iconfont icon-arrow-left"
          @click="go(-1)"
        ></span>
        <span
          class="app-header-history-icon iconfont icon-arrow-right"
          @click="go(1)"
        ></span>
      </div>
    </div>
    <div class="right-box">
      <div class="app-header-search el-input el-input--small el-input--prefix">
        <input
          v-model.trim="query"
          @keyup.enter="search"
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
    <LoginDialog
      v-if="loginDialogVisible"
      @change="loginDialogChange"
    ></LoginDialog>
  </div>
</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue'
export default {
  name: 'AppHeader',
  components: {
    LoginDialog
  },
  data() {
    return {
      query: '',
      loginDialogVisible: false,
      logoUrl: require('@/assets/images/logo.png')
    }
  },
  methods: {
    openLoginDialog() {
      this.loginDialogVisible = true
    },
    loginDialogChange() {
      this.loginDialogVisible = false
    },
    search() {
      if (this.query) {
        this.$store.commit('setQuery', this.query)
        this.$router.replace({
          name: 'search',
          query: {
            keywords: this.query
          }
        })
      } else {
        this.$message({
          message: '请输入有效内容',
          type: 'warning'
        })
      }
    },
    goto(name) {
      console.log(name)
      this.$router.replace({ name })
    },
    go(num) {
      this.$router.go(num)
    }
  }
}
</script>
