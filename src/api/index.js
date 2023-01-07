//所有api统一管理
import requests from "./request";
import mockReauests from './mock';
//三级联动接口
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
})

//获取banner接口
export const reqBannerList = () => mockReauests.get('/banner')

//获取floor数据
export const reqFloorList = () => mockReauests.get('/floor')

//获取搜索模块数据
export const reqSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params
})

//获取产品信息
export const reqGoodsInfo = (id) => requests({
    url: `/item/${id}`,
    method: 'get',
})

//添加商品到购物车或修改数量
export const reqAddOrUpdateShopCar = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})

//获取购物车数据
export const reqShopCartList = () => requests('/cart/cartList')

//删除商品
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

//修改商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

//获取注册验证码
export const reqRegisterCode = (phone) => requests({
    url: '/user/passport/sendCode/' + phone,
    method: 'get'
})

//注册
export const reqUserRegister = (data) => requests({
    url:'/user/passport/register',
    data,
    method:'post'
})

//登录
export const reqUserLogin = (data) => requests({
    url:'/user/passport/login',
    data,
    method:'post'
})

//获取用户信息
export const reqUserInfo = ()=>requests ({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
})

//退出登录
export const reqLogout=()=> requests.get('/user/passport/logout')