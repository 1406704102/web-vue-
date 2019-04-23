<template>
  <div class="login-wrap">
    <uploader :options="options" class="uploader-example">
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <p>Drop files here to upload or</p>
        <uploader-btn>select files</uploader-btn>
        <uploader-btn :attrs="attrs">select images</uploader-btn>
        <uploader-btn :directory="true">select folder</uploader-btn>
      </uploader-drop>
      <uploader-list></uploader-list>
    </uploader>
    <a href="javascript:;" class="input-file input-fileup" >
      <i class="iconfont icon-beike"></i>&nbsp;选择文件夹<input ref="file"  class="fileUploaderClass" type='file' name="file" webkitdirectory style="position: absolute;left: 50%;top: 20px;" @change.stop="changesData"/>
    </a>
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
    },
    changesData () {
      let formdata = new FormData()
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      var v = []
      var v2 = []
      v = this.$refs.file.files
      for (var a = 0; a < v.length; a++) {
        v2[a] = v[a]
      }
      console.log(v2)
      formdata.append('file', v2)
      this.$axios.post('/api/interface/fileList', formdata, config)
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

  .input-v{
  border-color: #878787;
    border-style: solid;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-left-width: 0px;
    width: 100%;
    height: 20px;
  }
  .uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
