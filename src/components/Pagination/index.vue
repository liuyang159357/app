<template>
    <div class="pagination">

        <button @click="$emit('getPageNo', pageNo - 1)" :disabled="pageNo==1">上一页</button>
        <button @click="$emit('getPageNo', 1)" v-if="startNumAndEndNum.start > 1"
            :class="{ 'currentIndex': pageNo == 1 ? true : false }">1</button>
        <button :disabled="true" v-if="startNumAndEndNum.start > 2">···</button>

        <button v-for="item, index in startNumAndEndNum.end" :key="index" v-show="item >= startNumAndEndNum.start"
            :class="{ currentIndex: pageNo == item ? true : false }" @click="$emit('getPageNo', item)">{{ item }}</button>

        <button :disabled="true" v-if="startNumAndEndNum.end < this.totalPage - 1">···</button>
        <button @click="$emit('getPageNo', totalPage)" v-if="startNumAndEndNum.end < this.totalPage"
            :class="{ currentIndex: pageNo == totalPage ? true : false }">{{ totalPage }}</button>
        <button @click="$emit('getPageNo', pageNo + 1)" :disabled="pageNo == totalPage">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: 'PaginatioN',
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        //计算总页数
        totalPage() {
            return Math.ceil(this.total / this.pageSize)
        },
        startNumAndEndNum() {
            let start = 0, end = 0, num = 0
            if (this.totalPage <= this.continues) {
                start = 1
                end = this.totalPage
            } else {
                num = parseInt(this.continues / 2)
                start = this.pageNo - num < 1 ? 1 : this.pageNo - num
                end = this.pageNo + num < this.continues ? this.continues : this.pageNo + num
                if (end > this.totalPage) {
                    start = this.totalPage - this.continues + 1
                    end = this.totalPage
                }
            }
            return { start, end }
        },
    },
    mounted() {
        console.log(123);
    }
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &.currentIndex {
            background-color: skyblue;
        }

        &:hover {
            opacity: 0.5;
        }

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>