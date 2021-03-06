import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },
        {
          path: '/table',
          component: resolve => require(['../components/page/basicInfo/BaseTable.vue'], resolve),
          meta: { title: '会员基本信息' }
        },
        {
          path: '/tabs',
          component: resolve => require(['../components/page/Tabs.vue'], resolve),
          meta: { title: 'tab选项卡' }
        },
        {
          path: '/form',
          component: resolve => require(['../components/page/basicInfo/BaseForm.vue'], resolve),
          meta: { title: '基本表单' }
        },
        {
          path: '/product',
          component: resolve => require(['../components/page/basicInfo/Product.vue'], resolve),
          meta: {title: '产品基本信息'}
        },
        {
          // 权限页面
          path: '/permission',
          component: resolve => require(['../components/page/basicInfo/Permission.vue'], resolve),
          meta: { title: '权限测试', permission: true }
        },
        {
          path: '/users',
          component: resolve => require(['../components/page/basicInfo/UserTable.vue'], resolve),
          meta: { title: '用户' }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/404',
      component: resolve => require(['../components/page/basicInfo/404.vue'], resolve)
    },
    {
      path: '/403',
      component: resolve => require(['../components/page/basicInfo/403.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
