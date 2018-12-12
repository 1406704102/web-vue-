<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="icon-ali-workbench"></i> 产品基本信息</el-breadcrumb-item>
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

        <el-table :data="product" stripe border style="width: 100%">
          <el-table-column prop="name" label="产品名称"></el-table-column>
         <el-table-column prop="selfCode" label="自编码"></el-table-column>
         <el-table-column prop="price" label="价格"></el-table-column>
         <el-table-column prop="img" label="图片"></el-table-column>
         <el-table-column prop="description" label="描述"></el-table-column>
         </el-table>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: []
    }
  },
  created () {
    this.getProduct()
  },
  methods: {
    getProduct () {
      this.$axios.post('/api/ProductCon/getAll').then((res) => {
        if (res.status === 200) {
          this.product = res.data
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
