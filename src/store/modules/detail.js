import { reqAddOrUpdateShopCar, reqGoodsInfo } from '@/api';
import {getUUID} from '@/utils/uuid_token';
export default {
    namespaced: true,
    state: {
        goodsInfo: {},
        uuid_token:getUUID()
    },
    getters: {
        categoryView(state) {
            return state.goodsInfo.categoryView || {}
        },
        skuInfo(state) {
            return state.goodsInfo.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.goodsInfo.spuSaleAttrList || []
        },
    },
    mutations: {
        GETDOODSINFO(state, params) {
            state.goodsInfo = params
        }
    },
    actions: {
        async getGoodsInfo(store, params = {}) {
            let result = await reqGoodsInfo(params)
            if (result.code == 200) {
                store.commit('GETDOODSINFO', result.data)
            }
        },
        async addOrUpdateShopCar(store, { skuId, skuNum }) {
            console.log(skuId, skuNum);
            let result = await reqAddOrUpdateShopCar(skuId, skuNum)
            return result
        }
    }
}