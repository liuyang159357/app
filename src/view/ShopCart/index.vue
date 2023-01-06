<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.skuId">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked"
              @change="changeChecked(item.skuId, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con3">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con4">
            <button :disabled="item.skuNum <= 1" class="mins" @click="handler(item, 'minus', -1)">-</button>
            <input @blur="handler(item, 'change', $event.target.value)" autocomplete="off" ref="sum" type="number"
              :value="item.skuNum" minnum="1" class="itxt">
            <button class="plus" @click="handler(item, 'add', 1)">+</button>
          </li>
          <li class="cart-list-con5">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="remove(item.skuId)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck && cartInfoList.length != 0" @change="allChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  data() {
    return {
      isRequest: true
    }
  },
  computed: {

    ...mapGetters('ShopCart', ['shopCartList']),
    cartInfoList() {
      return this.shopCartList.cartInfoList || []
    },
    //总价
    totalPrice() {
      let sum = 0;
      for (let i of this.cartInfoList) {
        if (i.isChecked) {
          sum += i.skuNum * i.skuPrice
        }

      }
      return sum
    },
    //是否全选
    isAllCheck() {
      return this.cartInfoList.every(item => item.isChecked == 1)
    }
  },
  methods: {
    getDate() {
      let result = this.$store.dispatch('ShopCart/getShopCartList')
      return result
    },
    //修改单个商品选中状态
    async changeChecked(id, e) {
      let result = await this.$store.dispatch('ShopCart/changeChecked', { skuId: id, isChecked: e.target.checked ? 1 : 0 })
      if (result.code == 200) {
        console.log(result);
        this.getDate()
      }
    },
    //是否全选
    allChecked(e) {
      if (e.target.checked) {
        for (let i of this.cartInfoList) {
          if (!i.isChecked) {
            i.isChecked = 1
            this.$store.dispatch('ShopCart/changeChecked', { skuId: i.skuId, isChecked: 1 })
          }
        }

      } else {
        for (let i of this.cartInfoList) {
          if (i.isChecked) {
            i.isChecked = 0
            this.$store.dispatch('ShopCart/changeChecked', { skuId: i.skuId, isChecked: 0 })
          }
        }

      }
    },
    //修改商品数量
    async handler(shop, type, sum) {
      if (this.isRequest) {
        this.isRequest = false
        console.log(sum);
        switch (type) {
          case 'add':
            sum = 1
            break;
          case 'minus':
            sum = -1
            break;
          case "change":
            sum = parseInt(sum) - shop.skuNum
            break;
        }
        let result = await this.$store.dispatch('Detail/addOrUpdateShopCar', { skuId: shop.skuId, skuNum: sum })
        if (result.code == 200) {
          let n = await this.getDate()
          if (n.code == 200) {
            this.isRequest = true
          }

        }
      }

    },
    //删除商品
    async remove(id) {
      let result = await this.$store.dispatch('ShopCart/deleteShop', id)
      if (result.ok) {
        this.getDate()
      }
    },
    //删除选中的所有商品
    async deleteAllCheckedCart() {
      //派发有个action
      await this.$store.dispatch('ShopCart/deleteAllCheckedCart')
      this.getDate()
    }
  },
  created() {
    this.getDate()
    console.log(this.shopCartList);
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 10%;

        }

        .cart-list-con4 {
          width: 15%;



          input {
            border: 1px solid #ddd;
            border-left: 0;
            border-right: 0;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          button {
            float: left;

            height: 35px;
            border: 1px solid #ddd;
            background-color: #f4f4f5;
            color: #000;
            text-align: center;
            padding: 8px;
            cursor: pointer;

            &[disabled] {
              opacity: 0.5;
              cursor: not-allowed;
            }
          }
        }

        .cart-list-con5 {
          width: 12%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            cursor: pointer;
            color: #666;

            &:hover {
              color: red;
              text-decoration: none;
            }
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;

        &:hover {
          color: red;
          text-decoration: none;
        }
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>