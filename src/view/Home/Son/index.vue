<template>
  <div class="son">
    <h3>Son有{{money}}</h3>
    <slot name="header"></slot>
    <button @click="giveMoney(100)">借Son100</button>
    <slot name="footer" :data="{money,data}"></slot>
  </div>
</template>

<script>
import myMixin from '../myMixin'
export default {
name:'MySon',
mixins:[myMixin],
data() {
    return {
        money:10000
    }
},
props:['data'],
mounted(){
  console.log(this);
}
}
</script>

<style lang="less" scoped>
.son{
  background-color: skyblue;
}
</style>