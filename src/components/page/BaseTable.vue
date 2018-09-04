<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-button type="primary" icon="add" class="handle-del mr10" @click="dialogFormVisible = true">添加会员</el-button>
              <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
              <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                <el-option key="1" label="广东省" value="广东省"></el-option>
                <el-option key="2" label="湖南省" value="湖南省"></el-option>
              </el-select>
              <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
              <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>

          <!--表格-->
            <el-table :data="tableData" stripe border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" style="width: 25%">
                </el-table-column>
              <el-table-column prop="integral" label="积分" sortable style="width: 25%">
              </el-table-column>
                <el-table-column prop="phone" label="电话" style="width: 25%">
                </el-table-column>
              <el-table-column prop="createTime" label="创建时间" sortable style="width: 20%">
              </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
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
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      dialogFormVisible: false,
      member: {
        name: '',
        phone: '',
        integral: '0',
        id: '0'
      },
      rules: {
        name: [
          {required: true, message: '请输入会员名称', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入会员电话', trigger: 'blur'}
        ]
      },
      idx: -1
    }
  },
  created () {
    this.getData()
  },
  computed: {
    data () {
      return this.tableData.filter((d) => {
        let is_del = false
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true
            break
          }
        }
        if (!is_del) {
          if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
          ) {
            return d
          }
        }
      })
    }
  },
  methods: {
    // 添加会员
    addMember (formName) {
      const v = this
      this.$refs[formName].validate((valid) => {
        const form = this.member
        if (valid) {
          this.$axios.post('/api/MemberCon/add?id=0&integral=0&name=' + form.name + '&phone=' + form.phone)
          console.log(form)
          v.dialogFormVisible = false
          this.getData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 分页导航
    handleCurrentChange (val) {
      this.cur_page = val
      this.getData()
    },
    // 获取 easy-mock 的模拟数据
    getData () {
      this.url = '/api/MemberCon/findAll'
      this.$axios.post(this.url, {
        page: this.cur_page
      }).then((res) => {
        console.log(res)
        this.tableData = res.data
        console.log(this.tableData)
      })
    },
    search () {
      this.is_search = true
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    handleEdit (index, row) {
      this.idx = index
      const item = this.tableData[index]
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      }
      this.editVisible = true
    },
    handleDelete (index, row) {
      this.idx = index
      this.delVisible = true
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
    },
    // 保存编辑
    saveEdit () {
      this.$set(this.tableData, this.idx, this.form)
      this.editVisible = false
      this.$message.success(`修改第 ${this.idx + 1} 行成功`)
    },
    // 确定删除
    deleteRow () {
      this.tableData.splice(this.idx, 1)
      this.$message.success('删除成功')
      this.delVisible = false
    }
  }
}

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
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
