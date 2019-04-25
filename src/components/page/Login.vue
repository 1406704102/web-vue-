<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">SpringBoot + Kotlin</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password"
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>

        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      },
      options: {
        // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
        target: '/api/interface/files',
        testChunks: false
      },
      attrs: {
        accept: 'image/*'
      }
    }
  },
  methods: {
    submitForm (formName) {
      const v = this
      this.$refs[formName].validate((valid) => {
        const from = this.ruleForm
        if (valid) {
          this.$axios.post('/api/UserCon/findByName?userName=' + from.username).then(function (data) {
            if (data.status === 200) {
              if (data.data) {
                localStorage.setItem('ms_username', from.username)
                localStorage.setItem('ms_userId', from.username)
                v.$router.push('/dashboard')
              } else {
                v.failLogin()
                return false
              }
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    failLogin () {
      this.$message.error('用户名或密码错误!')
      this.ruleForm.username = ''
      this.ruleForm.password = ''
    }
  }
}
</script>
<style scoped>
  .login-wrap{
    background-image: url(../../assets/sign_bg.png);
    background-repeat: no-repeat;
    background-color: #b8e5f8;
    background-size: cover;
    width: 100%;
    height: 100vh;
    overflow: auto;
    padding-right: 15px;
  }
  .ms-title {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    margin: -120px 0 0 -150px;
    text-align: center;
    font-size: 30px;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 120px 40px 40px;
    background-color:#ffffff ;
  }
  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }
</style>
