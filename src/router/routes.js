import Home from '@/view/Home'

 const routes=[
    {
    path:'*',
    redirect:'/home',
    meta:{}
    },
   {
    path:'/home',
    component:Home,
    name:'home',
    
   },
   {
    path:'/login',
    component:()=>import('@/view/Login'),
    name:'login',
    meta:{footerShow:false}
   },
   {
    path:'/register',
    component:()=>import('@/view/Register'),
    name:'register',
    meta:{footerShow:false}
   },
   {
    path:'/search/:keyword?',
    component:()=>import('@/view/Search'),
    name:'search',
   },
   {
    path:'/detail/:id',
    component:()=>import('@/view/Detail'),
    name:'detail'
   },
   {
      path:'/addcartsuccess',
      component:()=>import('@/view/AddCartSuccess'),
      name:'addcartsuccess'
   },
   {
      path:'/shopcart',
      component:()=>import('@/view/ShopCart'),
      name:'shopcart'
   }

]
export default routes