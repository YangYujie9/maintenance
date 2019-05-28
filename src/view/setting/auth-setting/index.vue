<template>
  <div class="product-setting">
    <topHeadSetting class="head" :headList="headList" @changeComponent="changeComponent"/>

    <!--服务 套餐-->
    <component class="product-component site-components" :is="routerFlag"></component>
    <!--<div ref="wraps" class="wrap-div">
      <div :style="{width: (soliderWidth * (headList.length))+'px', transform: 'translateX('+solidertranslateX + 'px)'}" class="list-wrap">

        <component class="product-component" :style="{left: soliderWidth*chooseIndex + 'px',width: soliderWidth+'px'}" :is="routerFlag"></component>

      </div>-->
    <!--</div>-->

  </div>
</template>

<script>
  
  import topHeadSetting from './head'
  import master from './master'
  import apartment from './apartment'
  

  export default {
    name: "product-setting",
    components:{
      topHeadSetting,
      master,
      apartment
    },
    computed:{
      routerFlag(){
        let nowComponent = this.showModal
        return nowComponent
      }
    },
    data(){
      return{
        soliderWidth: 0,
        solidertranslateX: 0,
        chooseIndex: 0,
        showModal:'apartment',
        headList: [
          {
            name: '部门管理',
            choose: true,
            link:'apartment',
          },
          {
            name: '角色设置',
            choose: false,
            link:'master',
          }
        ],
      }
    },
    mounted(){
        //this.soliderWidth = this.$refs.wraps.offsetWidth
    },
    methods:{
      //对应组件
      changeComponent (index) {
        this.chooseIndex = index

        this.solidertranslateX = -this.soliderWidth * index
        this.showModal = this.headList[index].link

      },
    }
  }
</script>

<style lang="less">
  .product-setting{
    position: relative;
    .product-component{
      padding: 20px;
    }
  }
</style>
