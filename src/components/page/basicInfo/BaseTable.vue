<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 会员基本信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-tooltip class="item" effect="dark" content="添加会员" placement="top">
                <el-button class="el-icon-plus" @click="dialogFormVisible = true"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
                <el-button type="danger" class="el-icon-delete" @click="delAll"></el-button>
              </el-tooltip>
              <el-select v-model="select_cate" placeholder="筛选项" class="handle-select mr10">
                <el-option key="1" label="姓名" value="name"></el-option>
                <el-option key="2" label="电话" value="phone"></el-option>
                <el-option key="3" label="积分" value="integral"></el-option>
              </el-select>
              <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
              <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>

          <!--表格-->
            <el-table :data="tableData" stripe border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="35"></el-table-column>
                <el-table-column prop="name" label="姓名" style="width: 25%">
                </el-table-column>
              <el-table-column prop="integral" label="积分" sortable style="width: 25%">
              </el-table-column>
                <el-table-column prop="phone" label="电话" style="width: 25%">
                </el-table-column>
              <el-table-column prop="createTime" label="创建时间"  sortable style="width: 20%">
              </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" content="修改积分" placement="top-end">
                      <el-button size="small" class="el-icon-d-caret" @click="integralEdit(scope.$index)"></el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="修改会员" placement="top">
                      <el-button size="small" class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="删除会员" placement="top-start">
                      <el-button size="small" class="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)"></el-button>
                      </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                :page-size=page_size
                :pager-count=pager_count
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :total=date_total>
              </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
      <el-dialog title="添加会员" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="member" :rules="rules" label-width="80px"  ref="member">
          <el-form-item label="会员名称" prop="name">
            <el-input v-model="member.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="会员电话" prop="phone">
            <el-input v-model="member.phone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMember('member')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑弹出框 -->
      <el-dialog title="修改会员" :visible.sync="editVisible" width="500px">
        <el-form :model="member2" :rules="rules" label-width="80px"  ref="member">
          <el-form-item label="会员名称" prop="name">
            <el-input v-model="member2.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="会员电话" prop="phone">
            <el-input v-model="member2.phone" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateMember('member')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑弹出框 -->
      <el-dialog title="修改积分" :visible.sync="integralVisible" width="500px">
        <el-form :model="member2" :rules="rules2" label-width="80px"  ref="member">
          <el-form-item label="积分变化" aria-placeholder="积分变化数值" prop="integral">
            <el-input v-model="member2.integral" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="integralVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateMember('member')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
/* eslint-disable camelcase */

export default {
  name: 'basetable',
  data () {
    return {
      // url: './static/vuetable.json',
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      page_size: 9,
      pager_count: 5,
      date_total: 0,
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      integralVisible: false,
      dialogFormVisible: false,
      member: {
        name: '',
        phone: '',
        integral: '0',
        id: '0'
      },
      member2: {
        name: '',
        phone: '',
        integral: '',
        id: '0',
        createTime: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入会员名称', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入会员电话', trigger: 'blur'}
        ]
      },
      rules2: {
        integral: [
          {required: true, message: '请输入变化积分', trigger: 'blur'}
        ]
      },
      idx: -1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 添加会员
    addMember (formName) {
      const v = this
      this.$refs[formName].validate((valid) => {
        const form = this.member
        if (valid) {
          this.$axios.post('/api/MemberCon/add?id=0&integral=0&name=' + form.name + '&phone=' + form.phone).then((res) => {
            if (res.status === 200) v.getData()
          })
          v.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    updateMember (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/MemberCon/updateMember', require('qs').stringify({
            name: this.member2.name,
            phone: this.member2.phone,
            id: this.member2.id,
            integral: this.member2.integral
          })).then((res) => {
            if (res.status === 200) this.search()
          })
          this.editVisible = false
          this.integralVisible = false
        } else {
          return false
        }
      })
    },
    // 分页导航
    handleCurrentChange (val) {
      this.cur_page = val
      this.getData()
    },

    getData () {
      this.url = '/api/MemberCon/findAll0'
      this.$axios.post(this.url, require('qs').stringify({
        page: this.cur_page,
        size: this.page_size
      })).then((res) => {
        if (res.status === 200) {
          this.tableData = res.data
          this.$axios.post('/api/MemberCon/total').then((res) => {
            if (res.status === 200) this.date_total = res.data
          })
        }
      })
    },
    search () {
      if (this.select_cate !== '' && this.select_word !== '') {
        this.$axios.post('/api/MemberCon/memberFind', require('qs').stringify({
          select_cate: this.select_cate,
          select_word: this.select_word
        })).then((res) => {
          if (res.status === 200) this.tableData = res.data
        })
      } else this.getData()
    },
    formatter (row, column) {
      return row.address
    },
    integralEdit (index) {
      this.idx = index
      const item = this.tableData[index]
      this.member2 = {
        name: item.name,
        phone: item.phone,
        integral: '',
        id: item.id,
        createTime: item.createTime
      }
      this.integralVisible = true
    },
    handleEdit (index, row) {
      this.idx = index
      const item = this.tableData[index]
      this.member2 = {
        name: item.name,
        phone: item.phone,
        integral: item.integral,
        id: item.id,
        createTime: item.createTime
      }
      this.editVisible = true
    },

    handleDelete (index, row) {
      const item = this.tableData[index]
      this.$axios.post('/api/MemberCon/deleteMember', require('qs').stringify({
        id: item.id
      })).then((res) => {
        if (res.status === 200) this.getData()
      })
    },
    delAll () {
      const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
      margin-left: 10px;
        width: 80px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
