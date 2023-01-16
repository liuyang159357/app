<template>
    <div>
        <h3>Daughter有{{ money}}</h3>
        <button @click="giveMoney(150)">借Daughter150</button>
    </div>
</template>

<script>
import myMIxiin from '../myMixin'
export default {
    name: 'MyDaughter',
    mixins:[myMIxiin],
    data() {
        return {
        money:10000
        }
    }, 
    mounted(){
      
    }
}
</script>

<style>

</style>