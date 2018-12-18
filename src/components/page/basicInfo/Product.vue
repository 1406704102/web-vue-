<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="icon-ali-workbench"></i> 产品基本信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
        <div class="handle-box">
          <el-tooltip class="item" effect="dark" content="添加产品" placement="top">
            <el-button class="el-icon-plus" @click="addFormVisible = true" size="mini" round></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="批量删除" placement="top">
            <el-button type="danger" class="el-icon-delete" @click="delAll" size="mini" round></el-button>
          </el-tooltip>&nbsp;&nbsp;
          <el-input placeholder="筛选关键词" class="handle-input mr15" size="mini"></el-input>&nbsp;
          <el-button type="primary" icon="el-icon-search" @click="search" size="mini" round>搜索</el-button>
        </div>

        <el-table :data="data" stripe border style="width: 100%">
          <el-table-column type="selection" width="35"></el-table-column><el-table-column prop="name" label="产品名称"></el-table-column>
          <el-table-column prop="selfCode" label="自编码"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="img" label="图片"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
         </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-size=page_size
          :pager-count=pager_count
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total=data_total>
        </el-pagination>
      </div>
    </div>
      <!-- 编辑弹出框 -->
      <el-dialog title="添加产品" :visible.sync="addFormVisible" width="700px">
        <el-form :model="product" :rules="addRules" label-width="80px"  ref="product">
          <el-row>
            <el-col :span="22">
              <el-form-item label="产品名称" prop="name">
               <el-input v-model="product.name" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="自编码" prop="selfCode">
               <el-input v-model="product.selfCode" auto-complete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="价格(元)" prop="price">
               <el-input v-model="product.price" auto-complete="off" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="图片">
              <el-input v-model="product.img" auto-complete="off"></el-input>
             </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22">
              <el-form-item label="描述">
                <el-input v-model="product.description" auto-complete="off"></el-input>
             </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addProduct('product')">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      product: {
        id: 0,
        selfCode: '',
        price: '',
        img: '',
        description: ''
      },
      addRules: {
        name: [
          {required: true, message: '请输入产品名称', trigger: 'blur'}
        ],
        selfCode: [
          {required: true, message: '请输入自编码', trigger: 'blur'}
        ],
        price: [
          {required: true, message: '请输入价格', trigger: 'blur'},
          // {type: 'number', message: '价格必须为数字值'}
        ]
      },
      cur_page: 1,
      page_size: 3,
      pager_count: 5,
      data_total: 0,
      addFormVisible: false
    }
  },
  created () {
    this.getProduct()
  },
  methods: {
    handleCurrentChange (val) {
      this.cur_page = val
      this.getProduct()
    },
    getProduct () {
      this.$axios.post('/api/ProductCon/getAll', require('qs').stringify({
        size: this.page_size,
        page: this.cur_page
      })).then((res) => {
        if (res.status === 200) {
          this.data = res.data.content
          this.data_total = res.data.totalElements
        }
      })
    },
    addProduct (formName) {
      const v = this
      this.$refs[formName].validate((valid) => {
        const form = this.product
        if (valid) {
          this.$axios.post('/api/ProductCon/add', require('qs').stringify({
            id: 0,
            name: form.name,
            img: form.img,
            price: form.price,
            selfCode: form.selfCode,
            description: form.description,
          })).then((res) => {
            if (res.status === 200) v.getData()
          })
          v.dialogFormVisible = false
        } else {
          return false
        }
      })
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
  </style>
