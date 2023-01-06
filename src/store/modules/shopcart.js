import { reqShopCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
export default {
    namespaced: true,
    state: {
        shopCartList: [],
    },
    getters: {
        shopCartList(state) {
            return state.shopCartList[0] || {}
        }
    },
    mutations: {
        GETSHOPCARTLIST(state, params) {
            state.shopCartList = params;
        },
    },
    actions: {
        async getShopCartList({ commit }) {
            let result = await reqShopCartList();
            if (result.code == 200) {
                commit("GETSHOPCARTLIST", result.data);
                return result
            }

        },
        async deleteShop(store, skuId) {
            let result = await reqDeleteCartById(skuId)
            return result
        },
        async changeChecked(store, { skuId, isChecked }) {
            let result = await reqUpdateCheckedById(skuId, isChecked)
            if (result.code == 200) {
                return result
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
         deleteAllCheckedCart(store) {
            let promiseAll=[]
            for (let i of store.getters.shopCartList.cartInfoList) {
                if (i.isChecked == 1){
                  promiseAll.push(store.dispatch('deleteShop', i.skuId))
                }      
            }
            return Promise.all(promiseAll);
        }
    },
};
