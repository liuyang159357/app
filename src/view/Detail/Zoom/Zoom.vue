<template>
  <div class="spec-preview">
    <img :src="imgUrlObj.imgUrl" />
    <div class="event" @mousemove="handler" ref="event"></div>
    <div class="big">
      <img :src="imgUrlObj.imgUrl" ref="bigimg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
export default {
  name: "ZooM",
  props: ['skuImageList'],
  data() {
    return {
      index: 0
    }
  },
  computed: {
    imgUrlObj() {
      return this.skuImageList[this.index] || {}
    }
  },
  methods: {
    handler:throttle(function(e) {
      let mask = this.$refs.mask
      let bigimg = this.$refs.bigimg
      let left = e.offsetX - mask.offsetWidth / 2 < 0 ? 0 : (e.offsetX - mask.offsetWidth / 2 > mask.offsetWidth ? mask.offsetWidth : e.offsetX - mask.offsetWidth / 2)
      let top = e.offsetY - mask.offsetHeight / 2 < 0 ? 0 : (e.offsetY - mask.offsetHeight / 2 > mask.offsetHeight ? mask.offsetHeight : e.offsetY - mask.offsetHeight / 2)
      mask.style.left = left + 'px';
      mask.style.top = top + 'px';
      bigimg.style.left = -2 * left + 'px';
      bigimg.style.top = -2 * top + 'px'
    }, 50)
  },
  mounted() {
    this.$bus.$on('changeIndex', (current) => {
      this.index = current
    })
  }

}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  left: 12px;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover~.mask,
  .event:hover~.big {
    display: block;
  }
}
</style>