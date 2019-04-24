<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img src="static/img/img.jpg" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{name}}</div>
                                    <div>{{role}}</div>
                                </div>
                            </div>
                            <div class="user-info-list">上次登录时间：<span>2018-01-01</span></div>
                            <div class="user-info-list">上次登录地点：<span>东莞</span></div>
                        </el-card>
                        <el-card shadow="hover" class="mgb20">
                            <div slot="header" class="clearfix">
                                <span>语言详情</span>
                            </div>
                            Vue
                            <el-progress :percentage="57.2" color="#42b983"></el-progress>
                            JavaScript
                            <el-progress :percentage="29.8" color="#f1e05a"></el-progress>
                            CSS
                            <el-progress :percentage="11.9"></el-progress>
                            HTML
                            <el-progress :percentage="1.1" color="#f56c6c"></el-progress>
                        </el-card>
                      <el-card shadow="hover"  class="mgb20">
                        <div slot="header" class="clearfix">
                          <span>上传插件</span>
                        </div>
                        <a href="javascript:;" class="file" >选择插件父目录
                          <input ref="file"  class="fileUploaderClass" type='file' name="file" webkitdirectory @change.stop="test"/>
                        </a>
                      </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-view grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" :body-style="{ height: '304px'}">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :data="todoList" :show-header="false" height="304" style="width: 100%;font-size:14px;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
      <!--<uploader :options="options" class="uploader-example">-->
        <!--<uploader-unsupport></uploader-unsupport>-->
        <!--<uploader-drop>-->
          <!--<p>Drop files here to upload or</p>-->
          <!--<uploader-btn>select files</uploader-btn>-->
          <!--<uploader-btn :attrs="attrs">select images</uploader-btn>-->
          <!--<uploader-btn :directory="true">select folder</uploader-btn>-->
        <!--</uploader-drop>-->
        <!--<uploader-list></uploader-list>-->
      <!--</uploader>-->

    </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      name: localStorage.getItem('ms_username'),
      todoList: [
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: false
        }, {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: true
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: true
        }
      ]
    }
  },
  computed: {
    role () {
      return this.name === 'admin' ? '超级管理员' : '普通用户'
    }
  },
  methods: {
    changesData () {
      const t = this
      let formdata = new FormData()
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      var v = []
      v = this.$refs.file.files
      for (var a = 0; a < v.length; a++) {
        formdata.append('files', v[a])
      }
      this.$axios.post('/api/interface/fileList', formdata, config).then(function (data) {
        if (data.status === 200) {
          t.$message({
            message: '上传成功!!',
            type: 'success'
          })
        } else {
          t.$message.error('上传错误!!')
        }
      })
    },
    test () {
      var v = []
      v = this.$refs.file.files
      if (v[0].webkitRelativePath.includes('BaiduNetdiskDownload')) {
        for (var a = 0; a < v.length; a++) {
          if (v[a].webkitRelativePath.includes('Google Camera')) {
            console.log(v[a].webkitRelativePath)
          }
        }
        this.$message({
          message: '上传成功!!',
          type: 'success'
        })
      } else {
        this.$message.error('请选择目录!!')
      }
    }
  }
}

</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
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
    .file {
      position: relative;
      display: inline-block;
      background: #D0EEFF;
      border: 1px solid #99D3F5;
      border-radius: 3px;
      padding: 4px 12px;
      overflow: hidden;
      color: #2D8CF0;
      font-size: 15px;
      text-decoration: none;
      text-indent: 0;
      line-height: 20px;
    }
    .file input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
    }
    .file:hover {
      background: #2D8CF0;
      border-color: #2D8CF0;
      color: #004974;
      text-decoration: none;
    }
</style>
