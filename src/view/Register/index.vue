<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="tel" placeholder="请输入你的手机号" v-model="phone" name="phone"
          v-validate="{ required: true, regex: /^(?:(?:\+|00)86)?1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }" />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="number" placeholder="请输入验证码" v-model="code" name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }" :class="{ invalid: errors.has('code') }" />
        <span class="error-msg">{{ errors.first("code") }}</span>
        <button style="width:100px;height: 38px;margin-left: 20px;" @click="getCode">获取验证码</button>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password"  placeholder="请输入你的密码" v-model="password" name="password"
          v-validate="{ required: true, regex: /(?=.*[a-z_])(?=.*\d)[\S]{8,}/i }"
          :class="{ invalid: errors.has('phone') ,password }" @input="changeValue"/>
          <span v-show="password"  style="color:greenyellow;padding-left: 20px;">"8位以上包含字母数字"</span>
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入你的密码" v-model="password1" name="password1"
          v-validate="{ required: true, is: password }" :class="{ invalid: errors.has('password1') }" />
        <span class="error-msg">{{ errors.first("password1") }}</span>
      </div>
      <div class="controls">
        <input :class="{ invalid: errors.has('agree') }" name="agree" type="checkbox"
          v-validate="{ required: true, tongyi: true }" :checked="agree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="register">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机京东</li>
        <li>销售联盟</li>
        <li>京东社区</li>
      </ul>
      <div class="address">地址：山东菏泽曹县</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisteR',
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      password1: '',
      agree: true
    }
  },
  methods: {
    //获取验证码
    async getCode() {
      let reg = /^(?:(?:\+|00)86)?1\d{10}$/
      if (reg.test(this.phone)) {
        let result = await this.$store.dispatch('User/getCode', this.phone)
        this.code = result
      } else {
        alert('请输入正确手机号')
      }

    },
    //判断输入是否正确
    changeValue(e) {
      let reg = {
        tel: /^(?:(?:\+|00)86)?1\d{10}$/,
        password: /(?=.*[a-z_])(?=.*\d)[\S]{8,}/i,
        code: /^\d{6}$/
      }
      let cla = e.target.getAttribute('class')
      console.log(cla);
      switch (cla) {
        case 'tel':
          if (reg.tel.test(e.target.value)) {
            e.target.nextSibling.style.display = 'none'
          } else {
            e.target.nextSibling.style.display = 'block'
          }
          break;
        case 'code':
          if (reg.code.test(e.target.value)) {
            e.target.nextSibling.style.display = 'none'
          } else {
            e.target.nextSibling.style.display = 'block'
          }
          break;
        case 'password':
          if (reg.password.test(e.target.value)) {
            console.log(e.target.value);
            e.target.nextSibling.style.display = 'none'
          } else {
            e.target.nextSibling.style.display = 'inlineblock'
          }
          break;
        case 'password1':
          if (this.password == this.password1) {
            e.target.nextSibling.style.display = 'none'
          } else {
            e.target.nextSibling.style.display = 'block'
          }
          break;
      }
    },
    //注册
    async register() {
      const success = await this.$validator.validateAll()
      const { phone, code, password } = this
      let result = success && await this.$store.dispatch('User/userRegister', { phone, code, password })
      if (result.code == 200) {
        alert('注册成功')
        this.$router.push({
          name: 'login'
        })
      }else{
        alert(result.message)
      }
    }
  }

}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>