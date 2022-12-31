//所有api统一管理
import requests from "./request";
import mockReauests from './mock';
//三级联动接口
export const reqCategoryList=()=>requests({
    url:'/product/getBaseCategoryList',
    method:'get'
})

//获取banner接口
export const reqBannerList = ()=>mockReauests.get('/banner')

//获取floor数据
export const reqFloorList=()=>mockReauests.get('/floor')

//获取搜索模块数据
export const reqSearchInfo=(params)=>requests({
    url:'/list',
    method:'post',
    data:params
})

//获取产品信息
export const reqGoodsInfo=(id)=>requests({
    url:`/item/${id}`,
    method:'get',
})