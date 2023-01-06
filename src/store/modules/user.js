import { reqRegisterCode } from '@/api'
export default {
    namespaced: true,
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        async getCode(store, phone) {
          let result=  await reqRegisterCode(phone)
          if(result.code==200){
            return result.data
          }else{
            return Promise.reject(new Error('fail'))
          }
        }
    }
}