<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor :item="item" v-for="item in floorList" :key="item.id"></Floor>
    <Brand></Brand>

  </div>
</template>

<script>
import ListContainer from '@/view/Home/ListContainer';
import Recommend from '@/view/Home/Recommend';
import Rank from '@/view/Home/Rank';
import Floor from '@/view/Home/Floor';
import Like from '@/view/Home/Like';
import Brand from '@/view/Home/Brand';
import {mapState} from 'vuex'
export default {
  name: "HomE",
  components: {
    ListContainer,
    Recommend,
    Like,
    Rank,
    Floor,
    Brand
  },
  computed: {
    ...mapState('Home',['floorList'])
  },
  methods: {

  },
  mounted(){
    this.$store.dispatch('Home/getFloorList')
  }
}
</script>

<style>

</style>