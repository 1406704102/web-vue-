<template>
  <div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <!--<el-table-column type="selection" width="35"></el-table-column>-->
      <el-table-column prop="userName" label="登录名"></el-table-column>
      <el-table-column prop="passWord" label="登录密码"></el-table-column>
      <!--<el-table-column prop="role" label="用户权限"></el-table-column>-->
      <el-table-column label="操作" width="200">
        <template slot-scope="user">
          <el-tooltip class="item" effect="dark" content="修改权限" placement="top-end">
            <el-button size="mini" class="icon-ali-browse_fill" @click="updateRole(user.$index,user.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="修改用户" placement="top">
            <el-button size="mini " class="icon-ali-brush_fill" @click="updatePage(user.$index, user.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除用户" placement="top-start">
            <el-button size="mini" class="icon-ali-trash" type="danger"
                       @click="deletePage(user.$index, user.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹出框 -->
    <el-dialog title="修改用户" :visible.sync="userVisible" width="500px">
      <el-form :model="user" :rules="rules" label-width="80px" ref="member">
        <el-form-item label="会员名称" prop="userName">
          <el-input v-model="user.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员电话" prop="passWord">
          <el-input v-model="user.passWord" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser('user')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改权限" :visible.sync="userRoleVisible" width="500px">
      {{user.role}}

      <div slot="footer" class="dialog-footer">
        <el-button @click="userRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="userRoleVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'userTable',
  data () {
    return {
      tableData: [],
      user: {
        id: '',
        userName: '',
        passWord: '',
        role: ''
      },
      userVisible: false,
      userRoleVisible: false,
      rules: {
        userName: [
          {required: true, message: '请输入登录名', trigger: 'blur'}
        ],
        passWord: [
          {required: true, message: '请输入登陆密码', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$axios.post('/api/UserCon/findAll').then((res) => {
        if (res.status === 200) this.tableData = res.data
      })
    },
    updateRole(index,row){
      const item = this.tableData[index]
      this.user = {
        id: item.id,
        userName: item.userName,
        passWord: item.passWord,
        role: item.role
      }
      this.userRoleVisible = true
    },
    updatePage (index, row) {
      const item = this.tableData[index]
      this.user = {
        id: item.id,
        userName: item.userName,
        passWord: item.passWord,
        role: item.role
      }
      this.userVisible = true
    },
    updateUser (formName) {
      this.$axios.post('/api/UserCon/updateUser', require('qs').stringify({
        id: this.user.id,
        userName: this.user.userName,
        passWord: this.user.passWord,
        role: this.user.role
      })).then((res) => {
        if (res.status === 200) this.getUsers()
      })
      this.userVisible = false
    },
    deleteUser (index, row) {
      const qs = require('qs')
      const item = this.tableData[index]
      this.$axios.post('/api/UserCon/deleteUser', qs.stringify({
        id: item.id
      }))
    },
    deletePage (index, row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(index, row)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      this.getUsers()
    }
  }
}
</script>
