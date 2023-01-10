import Vue from 'vue'
import VueRouter from "vue-router";
import store from '@/store'
//使用vuerouter
Vue.use(VueRouter)
//重写push方法
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call||apply区别
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call传递函数用逗号隔开，apply传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
//引入路由
import routes from './routes'

const router = new VueRouter({
    routes,
    base: process.env.BASE_URL,
    mode: "hash",
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})


router.beforeEach(async (to, from, next) => {
    let token = store.state.User.token;
    let userInfo = store.state.User.userInfo
    if (token) {
        if (to.name == 'login' || to.name == 'register') {
            //登录之后不能进入登录页面
            next('/')
        } else {
            //如果有用户信息
            if (userInfo) {
                next()
            } else {
                let result = await store.dispatch('User/getUserInfo')
                if (!result) {
                    // token过期了
                    store.dispatch('User/logout')
                } else {
                    next()
                }
            }
        }
    } else {
        next()
    }


})
export default router