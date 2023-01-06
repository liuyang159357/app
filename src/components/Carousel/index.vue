<template>
    <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>

        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name: 'CarouseL',
    props:['list'],
    watch:{
        list:{
            handler(newV){
                // console.log(newV);
                this.$nextTick(()=>{
                    this.Swiper()
                })
            },
            immediate:true,
            deep:true

        }
    },
     methods: {
        Swiper() {
            new Swiper(this.$refs.mySwiper, {
                autoplay: {
                    delay: 3000,
                 
                    disableOnInteraction: false,
                },//可选选项，自动滑动
                loop: true, // 循环模式选项
                 
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        }
    },
}
</script>

<style>

</style>