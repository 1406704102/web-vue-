<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"  background-color="#324157"
             text-color="#fff" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
          <template v-if="item.hasSub === '1' ">
            <el-submenu :index="item.identification" :key="item.identification">
              <template slot="title">
                <i :class="item.icon"></i><span slot="title">{{ item.label }}</span>
              </template>
              <!--<el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.identification">-->
                <!--&nbsp;&nbsp;&nbsp;&nbsp;{{ subItem.label }}-->
              <!--</el-menu-item>-->
              <template v-for="subItem in item.subs" >
                <template v-if="subItem.hasSub === '1'">
                  <el-submenu :index="subItem.identification" :key="subItem.identification">
                    <template slot="title">
                      <span slot="title">&nbsp;&nbsp;&nbsp;&nbsp;{{ subItem.label }}</span>
                    </template>
                    <template v-for="(sub2Item,i) in subItem.subs">
                      <el-menu-item  :key="i" :index="sub2Item.identification">
                        &nbsp;&nbsp;&nbsp;&nbsp;{{ sub2Item.label }}
                      </el-menu-item>
                    </template>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :index="subItem.identification" :key="subItem.identification">
                    <span slot="title">&nbsp;&nbsp;&nbsp;&nbsp;{{ subItem.label }}</span>
                  </el-menu-item>
                </template>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.identification" :key="item.identification">
              <i :class="item.icon"></i><span slot="title">{{ item.label }}</span>
            </el-menu-item>
          </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus'

export default {
  data () {
    return {
      collapse: false,
      items: [
        // {
        //   icon: 'el-icon-setting',
        //   index: 'dashboard',
        //   title: '系统首页'
        // },
        // {
        //   icon: 'el-icon-tickets',
        //   index: 'table',
        //   title: '基础表格'
        // },
        // {
        //   icon: 'el-icon-message',
        //   index: 'tabs',
        //   title: 'tab选项卡'
        // },
        // {
        //   icon: 'el-icon-date',
        //   index: '3',
        //   title: '表单相关',
        //   subs: [
        //     {
        //       index: 'form',
        //       title: '基本表单'
        //     }
        //   ]
        // },
        // {
        //   icon: 'el-icon-warning',
        //   index: 'permission',
        //   title: '权限测试'
        // },
        // {
        //   icon: 'el-icon-error',
        //   index: '404',
        //   title: '404页面'
        // }
      ],
      item2: []
    }
  },
  methods: {
    getMenu () {
      this.$axios.get('/api/menu/findMenu?level=0&userId=' + localStorage.getItem('ms_id')).then((res0) => {
        if (res0.status === 200) {
          res0.data.forEach(f => {
            if (f.hasSub === '1') {
              this.$axios.get('/api/menu/findMenu?level=1&userId=' + localStorage.getItem('ms_id')).then((res1) => {
                if (res1.status === 200) {
                  f.subs = res1.data
                  res1.data.forEach(o => {
                    if (o.hasSub === '1') {
                      this.$axios.get('/api/menu/findMenu?level=2&userId=' + localStorage.getItem('ms_id')).then((res2) => {
                        if (res2.status === 200) {
                          o.subs = res2.data
                          res2.data.forEach(r => {
                            if (r.hasSub === '1') {
                              this.$axios.get('/api/menu/findMenu?level=3&userId=' + localStorage.getItem('ms_id')).then((res3) => {
                                if (res3.status === 200) {
                                  r.subs = res3.data
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
          this.items = res0.data
        }
      })
    }
    // ,
    // test () {
    //   this.$axios.get('/api/menu/findAll').then((res) => {
    //     if (res.status === 200) {
    //       // console.log(res.data);
    //       let data = res.data
    //       for (let l = 0; l < data.length; l++) {
    //         if (data[l].hasSub !== null) {
    //           this.$axios.get('/api/menu/findBySubs?sub=' + data[l].id).then((res2) => {
    //             if (res2.status === 200) {
    //               if (res2.data.length !== 0) {
    //                 data[l].subs = res2.data
    //                 // for (let e = 0; e < res2.data.length; e++) {
    //                 //   for (let t = 0; t < data.length; t++) {
    //                 //     if (data[t].id === res2.data[e].id) {
    //                 //       data.splice(t,1)
    //                 //     }
    //                 //   }
    //                 // }
    //               }
    //             }
    //           })
    //         }
    //       }
    //       console.log(res.data)
    //     }
    //   })
    // }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    // this.test()
    this.getMenu()
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
