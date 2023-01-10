import Vue from 'vue'
import App from './App.vue'

//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name,TypeNav)
//轮播图组件
import CarouseL from '@/components/Carousel'
Vue.component(CarouseL.name,CarouseL)
//分页器组件
import PaginatioN from '@/components/Pagination'
Vue.component(PaginatioN.name,PaginatioN)
//引入elemrent
import { Button,MessageBox } from 'element-ui';
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from '@/router'

//关闭Vue生产提示
Vue.config.productionTip = false;

//引入仓库
import store from '@/store'

//引入mockServe.js
import '@/mock/mockServe'

//引入swiper样式
import 'swiper/css/swiper.css'

//统一接受api文件夹里面全部的请求
import *as API from '@/api'

new Vue({
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  router,
  store,
  render: h => h(App),
}).$mount('#app')
