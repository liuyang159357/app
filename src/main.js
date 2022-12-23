import Vue from 'vue'
import App from './App.vue'

//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)

//引入路由
import router from '@/router'

//关闭Vue生产提示
Vue.config.productionTip = false;

//引入仓库
import store from '@/store'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
