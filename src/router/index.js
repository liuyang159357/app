import Vue from 'vue'
import VueRouter from "vue-router";
//使用vuerouter
Vue.use(VueRouter)
//重写push方法
let originPush = VueRouter.prototype.push
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve && reject){
        //call||apply区别
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call传递函数用逗号隔开，apply传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
//引入路由
import Home from '@/view/Home'
import Login from '@/view/Login'
import Register from '@/view/Register'
import Search from '@/view/Search'


const routes=[
    {
    path:'*',
    redirect:'/home',
    meta:{}
    },
   {
    path:'/home',
    component:Home,
    name:'home',
    
   },
   {
    path:'/login',
    component:Login,
    name:'login',
    meta:{footerShow:false}
   },
   {
    path:'/register',
    component:Register,
    name:'register',
    meta:{footerShow:false}
   },
   {
    path:'/search/:keyword?',
    component:Search,
    name:'search',
   }

]
const router=new VueRouter({
    routes,
    base:process.env.BASE_URL,
    mode:"hash"
})

export default router