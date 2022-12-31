import { reqGoodsInfo } from '@/api'
export default {
    namespaced: true,
    state: {
        goodsInfo: {}
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
        }
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

        }
    }
}