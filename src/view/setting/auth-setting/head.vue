<template>
    <div class="top-head-setting">
        <div class="el-tabs__active-bar" style="background: #0057ff"  :style="{width: tabwidth+'px', transform: 'translateX('+translateX + 'px)'}"></div>
        <div ref="tabs" @click="change(index)" :class="{active: item.choose}" v-for="(item, index) in headList" class="list cursor">
            {{item.name}}
        </div>
    </div>
</template>

<script>

export default {
    name: "top-head-setting",
    props: ['headList'],
    data() {
      return {
        tabwidth: 56,
        translateX: 30
      }
    },
    mounted(){
      this.tabwidth = this.$refs.tabs[0].offsetWidth

    },
    methods:{
        change(index) {
            this.tabwidth = this.$refs.tabs[index].offsetWidth


            this.translateX = this.$refs.tabs[index].offsetLeft


            for (var i = this.headList.length - 1; i >= 0; i--) {
               this.headList[i].choose = false
            }
            this.headList[index].choose = true
            this.$emit('changeComponent', index)

        }
    },
}
</script>

<style scoped lang="less">
.top-head-setting {
    height: 40px;
    margin-top: 20px;
    border-bottom: 1px solid #e2e2e2;
    padding-left: 30px;
    position: relative;

    .list {
        display: inline-block;
        min-width: 60px;
        line-height: 34px;
        height: 100%;
        text-align: center;
        margin-right: 50px;
        padding-left: 6px;
        padding-right: 6px;

        &.active {
            color: #0057ff;
        }
        
    }
}
</style>
