import { reqSearchInfo } from '@/api'
export default {
    namespaced: true,
    state: {
        searchInfo: {}
    },
    getters: {
        //简化仓库中的数据
        goodsList(state) {
            return state.searchInfo.goodsList || []
        },
        trademarkList(state) {
            return state.searchInfo.trademarkList || []
        },
        attrsList(state) {
            return state.searchInfo.attrsList || []
        }

    },
    mutations: {
        GETSEARCHINFO(state, params) {
            state.searchInfo = params
        }
    },
    actions: {
        async getSearchInfo(store, params = {}) {
            let result = await reqSearchInfo(params);
            console.log(result);
            if (result.code == 200) {
                store.commit('GETSEARCHINFO', result.data)
            }
        }
    }
}