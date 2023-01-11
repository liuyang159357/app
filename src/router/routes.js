import Home from '@/view/Home'

const routes = [
   {
      path: '*',
      redirect: '/home',
      meta: {}
   },
   {
      path: '/home',
      component: Home,
      name: 'home',

   },
   {
      path: '/login',
      component: () => import('@/view/Login'),
      name: 'login',
      meta: { footerNoShow: true }
   },
   {
      path: '/register',
      component: () => import('@/view/Register'),
      name: 'register',
      meta: { footerNoShow: true }
   },
   {
      path: '/search/:keyword?',
      component: () => import('@/view/Search'),
      name: 'search',
   },
   {
      path: '/detail/:id',
      component: () => import('@/view/Detail'),
      name: 'detail'
   },
   {
      path: '/addcartsuccess',
      component: () => import('@/view/AddCartSuccess'),
      name: 'addcartsuccess'
   },
   {
      path: '/shopcart',
      component: () => import('@/view/ShopCart'),
      name: 'shopcart'
   },
   {
      path: '/trade',
      component: () => import('@/view/Trade'),
      name: 'trade',
      beforeEnter: (to, from, next) => {
         if(from.path=='/shopcart'){
            next()
         }else{
            next(false)
         }
      }
   },
   {
      path: '/pay',
      component: () => import('@/view/Pay'),
      name: 'pay',
      beforeEnter: (to, from, next) => {
         if(from.name=='trade'){
            next()
         }else{
            next(false)
         }
      }
   },
   {
      path: '/paysuccess',
      component: () => import('@/view/PaySuccess'),
      name: 'paysuccess',
     
   },
   {
      path: '/center',    
      component: () => import('@/view/Center'),
      name: 'center',
      children: [     
         {
            path:'/center',
            redirect: '/center/myorder',
         } ,
         {
            path: 'myorder',
            component:()=>import('@/view/Center/myOrder'),
            name:'myorder'
         },
         {
            path: 'grouporder',
            component:()=>import('@/view/Center/groupOrder'),
            name:'grouporder'
         }
      ]
   }

]
export default routes