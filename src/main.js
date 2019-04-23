// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/iconfont.css'
import uploader from 'vue-simple-uploader'

Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(uploader)
Vue.config.productionTip = false
/* eslint-disable no-new */
// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_username')
  if (!role && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})
new Vue({
  render (createElement) {
    return createElement(App)
  },
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
