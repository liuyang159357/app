<template>
    <div class="header">
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>京东欢迎您！</p>
                        <p v-if="!userName">
                            <span>请</span>
                            <router-link to="/login">登录</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                        <p v-else>
                            <a> {{ userName }}</a>
                            <a @click="logout" class="register">退出登录</a>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">我的京东</a>
                        <a href="###">京东会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注公众号</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link class="logo" to="/home">
                        <img src="./images/logo.jpg" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input @keydown.enter="goSearch" type="text" id="autocomplete" class="input-error input-xxlarge"
                            v-model="keyword" />
                        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                    </form>
                </div>
            </div>
        </header>

    </div>
</template>

<script>

export default {
    name: 'HeadeR',
    data() {
        return {
            keyword: ''
        }
    },
    computed: {
        userName() {
            return this.$store.state.User.userInfo.name
        }
    },
    methods: {
        goSearch() {
            if (this.keyword.trim()) {
                this.$router.push(
                    {
                        name: "search",
                        params: {
                            keyword: this.keyword || undefined
                        },
                        query: this.$route.query ? this.$route.query : undefined
                    })
            }
        },
       async logout(){
           let result=await this.$store.dispatch('User/logout')
           if(result.code==200){
            this.$router.push({name:'home'})
           }
           
        }
    },
    mounted() {
    // this.$store.dispatch('User/getUserInfo')
      
    }
}
</script>

<style lang="less" scoped>
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            max-width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    a {
                        cursor: pointer;

                        &:hover {
                            color: red;
                        }
                    }

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        max-width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>