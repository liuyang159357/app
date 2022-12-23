<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(item, index) in categoryList" :key="item.categoryId">
                                <h3 @mouseenter="changeIndex(index)" :class="currentIndex == index ? 'index' : ''">
                                    <a :data-categoryName="item.categoryName" :data-categoryId1="item.categoryId">{{
                                            item.categoryName
                                    }}</a>
                                </h3>
                                <div class="item-list clearfix"
                                    :style="{ display: index == currentIndex ? 'block' : 'none' }">
                                    <div class="subitem" v-for="item2 in item.categoryChild" :key="item2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="item2.categoryName"
                                                    :data-categoryId2="item2.categoryId">{{ item2.categoryName
                                                    }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="item3 in item2.categoryChild" :key="item3.categoryChild">
                                                    <a :data-categoryName="item3.categoryName"
                                                        :data-categoryId3="item3.categoryId">{{ item3.categoryName
                                                        }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>

<script>
import { mapState} from 'vuex';
import throttle from 'lodash/throttle';
export default {
    name: 'TypeNav',
    data() {
        return {
            currentIndex: -1,
            show: true
        }
    },
    computed: {
        ...mapState("Home", ['categoryList'])
    },
    created() {
        if (this.$route.name != 'home') {
            this.show = false
        }
    },
    methods: {
        //修改currentIndex
        changeIndex: throttle(function (index) {
            this.currentIndex = index
        }, 100),
        leaveShow() {
            this.currentIndex = -1;
            if (this.$route.name != 'home') {
                this.show = false
            }

        },
        enterShow() {
            this.show = true
        },
        goSearch(e) {
            //确定参数
            let node = e.target;
            let { categoryname, categoryid1, categoryid2, categoryid3 } = node.dataset;
            if (categoryname) {
                let location = { name: 'search' };
                let query = { categoryName: categoryname }
                if (categoryid1) {
                    query.category1Id = categoryid1
                } else if (categoryid2) {
                    query.category2Id = categoryid2
                } else if (categoryid3) {
                    query.category3Id = categoryid3
                }
                location.params=this.$route.params||undefined
                location.query = query;
                console.log(location);
                //跳转search页面
                this.$router.push(location)
             
            }
        }
    }
}
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                a {
                    cursor: pointer;
                }

                .item {
                    h3 {
                        cursor: pointer;
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            text-decoration: none;
                            color: #333;
                        }

                        &.index {
                            background-color: #e1251b;

                            a {
                                color: #fff;
                            }
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
            }
        }

        .sort-leave-to,
        .sort-enter {
            height: 0px;
        }

        .sort-leave,
        .sort-enter-to {
            height: 461px;
        }
        .sort-leave-active,
        .sort-enter-active {
            transition: all 0.3s ease-in-out;
        }
    }
}
</style>