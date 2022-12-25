import { reqCategoryList, reqBannerList, reqFloorList } from '@/api/index'


export default {
    namespaced: true,
    state: {
        categoryList: [],
        bannerList: [],
        floorList: []
    },
    getters: {

    },
    mutations: {
        CATEGORYLIST(state, params) {
            state.categoryList = params
        },
        GETBANNERLIST(state, params) {
            state.bannerList = params
        },
        GETFLOORLIST(state, params) {
            state.floorList = params
        }
    },
    actions: {
        async categoryList(store) {
            let result = await reqCategoryList()
            // console.log(result);
            if (result.code == 200) {
                store.commit("CATEGORYLIST", result.data)
            }
        },
        async getBannerList(store) {
            let result = await reqBannerList()
            // console.log(result);
            if (result.code == 200) {
                store.commit("GETBANNERLIST", result.data)
            }
        },
        async getFloorList(store) {
            let result = await reqFloorList()
            console.log(result);
            if (result.code == 200) {
                store.commit("GETFLOORLIST", result.data)
            }
        }
    }
}