<template>
  <el-dialog title="登录网易云" :visible.sync="visible" width="450px" @close="handleClose" append-to-body>
    <el-form :model="form" ref="form" label-width="80px" :inline="false" size="normal">
      <el-form-item label="手机号">
        <el-input type="text" v-model="form.phone" autocomplete></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" autocomplete v-model="form.password" @keyup.native.enter="submitOK"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" size="small" @click="submitOK">登录</el-button>
      <el-button size="small" @click="handleClose">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'loginDialog',
  data() {
    return {
      visible: true,
      form: {
        phone: '',
        password: '',
      }
    };
  },
  methods: {
    submitOK() {
      let params = this.form;
      this.$http.login(params).then((res) => {
        console.log(res);
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        this.handleClose();
        this.$router.go(0);
      }).catch((e) => {
        console.log(e);
        this.$message({
          message: '登录失败',
          type: 'error'
        });
      });
    },
    handleClose() {
      this.visible = false;
      this.$emit('change');
    }
  }
}
</script>

<style>
</style>