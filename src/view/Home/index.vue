<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor :item="item" v-for="item in floorList" :key="item.id"></Floor>
    <Brand></Brand>
    <h2>爸爸有{{ money }}</h2>
    <button @click="borrowAll(200)">全借200</button>

    <Son :data="money">
      <template slot="header" >
        <h2>header</h2>
      </template>
      <template slot="footer" slot-scope="{data}">
        <h2 :style="{color:'red'}">{{data}}</h2>
      </template>
    </Son>
    <Daughter></Daughter>
  </div>
</template>

<script>
import Son from '@/view/Home/Son'
import Daughter from '@/view/Home/Daughter'

import ListContainer from '@/view/Home/ListContainer';
import Recommend from '@/view/Home/Recommend';
import Rank from '@/view/Home/Rank';
import Floor from '@/view/Home/Floor';
import Like from '@/view/Home/Like';
import Brand from '@/view/Home/Brand';
import { mapState } from 'vuex'
export default {
  name: "HomE",
  data() {
    return {
      money: 1500
    }
  },
  components: {
    ListContainer,
    Recommend,
    Like,
    Rank,
    Floor,
    Brand,
    Son,
    Daughter
  },
  computed: {
    ...mapState('Home', ['floorList'])
  },
  methods: {
    borrowAll(money) {
      this.money += money * 2;
      this.$children.map((i) => {
        i.money -= 200
      })
    },

  },
  mounted() {
    this.$store.dispatch('Home/getFloorList')
  }
}
</script>

<style>

</style>