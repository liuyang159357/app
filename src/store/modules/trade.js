import { reqAddress, reqOrderInfo } from '@/api'
export default {
    namespaced: true,
    state: {
        userAddress: [],
        orderInfo:{}
    },
    getters: {

    },
    mutations: {
        GETUSERADDRESS(state, params) {
            state.userAddress = params
        },
        GETORDERINFO(state, params) {
            state.orderInfo = params
        },
    },
    actions: {
        async getUserAddress(store) {
            let result = await reqAddress()
            console.log(result);
            if (result.code == 200) {
                store.commit('GETUSERADDRESS', result.data)
            }
        },
        async getOrderInfo(store) {
            let result = await reqOrderInfo()
            if (result.code == 200) {
                console.log(result);
                store.commit('GETORDERINFO', result.data)
            }

        }
    }
}