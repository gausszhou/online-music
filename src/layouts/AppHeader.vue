<template>
  <div class="app-header" id="header">
    <div class="left-box">
      <h1 class="app-header-logo app-header-title" @click="goto('recommend')">
        Online Music
      </h1>
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
      <el-button type="default" size="small" class="ml_5" @click="clearCache">
          清空缓存
      </el-button>
    </div>
    <LoginDialog
      v-if="loginDialogVisible"
      @change="loginDialogChange"
    ></LoginDialog>
  </div>
</template>

<script>
import forage from "@/storage/forage"
import LoginDialog from "@/components/LoginDialog.vue";
export default {
  name: "AppHeader",
  components: {
    LoginDialog
  },
  data() {
    return {
      query: "",
      loginDialogVisible: false
    };
  },
  methods: {
    clearCache(){
      forage.clear()
    },
    openLoginDialog() {
      this.loginDialogVisible = true;
    },
    loginDialogChange() {
      this.loginDialogVisible = false;
    },
    search() {
      if (this.query != this.$route.query.keywords) {
        this.$store.commit("setQuery", this.query);
        this.$router.push({
          name: "search",
          query: {
            keywords: this.query
          }
        });
      }
    },
    goto(name) {
      this.$router.replace({ name });
    },
    go(num) {
      this.$router.go(num);
    }
  }
};
</script>
