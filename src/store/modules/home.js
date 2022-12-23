import { reqCategoryList } from '@/api/index'


export default {
    namespaced: true,
    state: {
        categoryList:[]
    },
    getters: {

    },
    mutations: {
        CATEGORYLIST(state, params) {
            state.categoryList = params
        }
    },
    actions: {
        async categoryList(store) {
            let result = await reqCategoryList()
            console.log(result);
            if (result.status == 200) {
                store.commit("CATEGORYLIST", result.data.data)
            }
        }
    }
}