<template>
  <div id="app">
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="$route.meta.footerShow? false:true"></Footer>
  </div>
</template>

<script>

import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
 export default {
  name: 'App',
  components: {
  Header,
  Footer
  },
  mounted() {
    this.$store.dispatch('Home/categoryList')
  },
}
</script>

<style lang="less" >
#nprogress .bar{
  background-color: red !important;
}
/*添加css样式*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
