<template>      
    <div class="top-head-setting">
        <div class="el-tabs__active-bar" style="background: #409eff;"  :style="{width: tabwidthx+'px', transform: 'translateX('+translateXx + 'px)'}"></div>
        <div ref="tabsx" @click="changex(index)" :class="{activex: item.choose}" v-for="(item, index) in headListx" class="list cursor">
            {{item.name}}
        </div>
    </div>   
</template>

<script>


export default {
    name: "report",
    components: {
        
    },
    props: {
      headListx: Array,
      index: Number,
    },
    data(){
        return{
        	tabwidthx: 56,
          translateXx: 30,
          routerpower: {
            '/reportthree/threecheck': 22,
            '/reportcangchu/cangchu': 23,
            '/reportcangchu/importsearch': 24,
            '/reportpinkong/pinkong': 25
          },
            
        }
    },
    created() {
       
    },
    mounted(){
        

        this.tabwidthx = this.$refs.tabsx[this.index].offsetWidth


        this.translateXx = this.$refs.tabsx[this.index].offsetLeft
    },
    methods:{
      
        changex(index) {
            if (this.routerpower[this.headListx[index].link]) {
              if (!this.$isInArray(this.routerpower[this.headListx[index].link])) {
                this.$message({
                  message: '您没有查看此报表的权限',
                  type: 'warning'
                })

                
              } else {
                this.$router.push(this.headListx[index].link)
              }
            }


            
        }
    },
}
</script>

<style spoced lang="less">

 .top-head-setting {
      height: 36px;
      border-bottom: 1px solid #e2e2e2;
      padding-left: 30px;
      position: relative;
      font-size: 14px;
      .list {
          display: inline-block;
          min-width: 60px;
          line-height: 36px;
          height: 100%;
          text-align: center;
          margin-right: 34px;
          padding-left: 6px;
          padding-right: 6px;


          &.activex {
              color: #409eff;
          }
          
      }
  }

</style>
