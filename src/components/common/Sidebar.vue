<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"
             text-color="#bfcbd9" active-text-color="#000" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.identification" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.identification">
              {{ subItem.name }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.identification" :key="item.identification">
            <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
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
      ]
    }
  },
  methods: {
    getMenu () {
      this.$axios.get('/api/menu/findAll').then((res) => {
        if (res.status === 200) {
          for (var d in res.data) {
            if (res.data[d].hasSub === '1') {
              var itemc = []
              for (var d2 in res.data) {
                if (parseInt(res.data[d2].subs) === res.data[d].id) {
                  alert(res.data[d2].subs)
                  var json = {identification: res.data[d2].identification, title: res.data[d2].name}
                  itemc.push(json)
                  res.data.splice(d2, 1)
                }
              }
              res.data[d].subs = itemc
            }
          }
          console.log(res.data)
          this.items = res.data
        }
      })
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
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
