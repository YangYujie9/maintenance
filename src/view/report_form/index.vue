<template>
    <div class="report-form">
       <div ref="el_tabs_wrap" class="el-tabs el-tabs--left report-form-left" style="height: 90%">
        <div class="el-tabs__header is-left">
          <div class="el-tabs__nav-wrap is-scrollable is-left">
              <span @click="topscroll" v-if ="(scrolltranslateY<0 && el_tabs__nav_scrollsetHeight < el_tabs__navsetHeight)" class="el-tabs__nav-prev is-disabled">
                <i class="el-icon-arrow-left"></i>
              </span>
              <span v-if="((0-scrolltranslateY < el_tabs__navoffsetHeight) && el_tabs__nav_scrollsetHeight < el_tabs__navsetHeight)" @click="bottomscroll" class="el-tabs__nav-next">
                <i class="el-icon-arrow-right"></i>
              </span>
            <div ref="el_tabs__nav_scroll" class="el-tabs__nav-scroll">
              <div role="tablist" ref="el_tabs__nav" class="el-tabs__nav is-left" :style="{transform: 'translateY('+scrolltranslateY + 'px)'}">

                <div class="el-tabs__active-bar is-left" :style="{height: tabwidth+'px', transform: 'translateY('+translateY + 'px)'}" ></div>

                
                <div v-for="(item, index) in headList" @click="change(index)"  ref="tabs" class="el-tabs__item is-left" :class="{active: item.choose}" >{{item.name}}</div>
                
              </div>
            </div>
          </div>
          </div>
        </div>

        <div class="report-form-right">

            
            <router-view/>
        </div>

        
    </div>
</template>

<script>


export default {
    name: "report",
    components: {
        
    },
    data(){
        return{
            translateY: 0,
            scrolltranslateY: 0,
            tabwidth: 56,
            routerpower: {
              '/reportthree/threecheck': 22,
              '/reportcangchu/cangchu': 23,
              '/reportcangchu/importsearch': 24,
              '/reportpinkong/pinkong': 25
            },
            headList: [
              {
                  name: '三方报表',
                  choose: false,
                  link:'/reportthree/threecheck',
                  routerarray: [
                    {
                      router: '/reportthree/threecheck',
                      power: 22
                    }
                  ],
              },
              {
                  name: '企划仓储出库报表',
                  choose: true,
                  link:'/reportcangchu/cangchu',
                  routerarray: [
                    {
                      router: '/reportcangchu/cangchu',
                      power: 23
                    },
                    {
                      router: '/reportcangchu/importsearch',
                      power: 24
                    },

                  ],
              },
              {
                  name: '后道品控确认报表',
                  choose: false,
                  link:'/reportpinkong/pinkong',
                  routerarray: [
                    {
                      router: '/reportpinkong/pinkong',
                      power: 25
                    }
                  ],
              },
              
            ],
            chooseindex: 0,
            el_tabs__navoffsetHeight: 300,
            el_tabs__nav_scrollsetHeight: 0,
            el_tabs__navsetHeight: 0,
        }
    },
    created() {
       
    },
    watch: {
    },
    mounted(){





        this.el_tabs__navoffsetHeight = this.$refs.el_tabs_wrap.offsetHeight
        this.el_tabs__navsetHeight = this.$refs.el_tabs__nav.offsetHeight
        this.el_tabs__nav_scrollsetHeight = this.$refs.el_tabs__nav_scroll.offsetHeight


      
      this.$nextTick(()=>{


        if (this.$route.fullPath.indexOf('reportcangchu')>0) {
          this.change(1)
        } else if (this.$route.fullPath.indexOf('reportpinkong')>0) {
          this.change(2)
        } else if (this.$route.fullPath.indexOf('reportthree')>0) {
          this.change(0)
        }
        
          //

      })



     

       
    },
    methods:{
      topscroll() {
        
          this.scrolltranslateY += 100
        
        
      },
      bottomscroll() {
        this.scrolltranslateY-=100
      },
      change(index) {

        //console.info(999)

            let listindex = -1
            for (let i=0; i<this.headList[index].routerarray.length; i++) {
              if (this.$isInArray(this.headList[index].routerarray[i].power)) {
                listindex = i

                break
              }
            } 


            if (listindex === -1) {
              this.$message({
                message: '您没有查看此报表的权限',
                type: 'warning'
              })
            } else {

              this.tabwidth = this.$refs.tabs[index].offsetHeight-10


              this.translateY = this.$refs.tabs[index].offsetTop


              for (var i = this.headList.length - 1; i >= 0; i--) {
                 this.headList[i].choose = false
              }
              this.headList[index].choose = true

              this.chooseindex = index

              //this.$router.push(this.headList[index].link)



              this.$router.push(this.headList[index].routerarray[listindex].router)
            }

      
          

            


            

        },
        
    },
}
</script>
<style>
  .report-form .el-tabs--left .el-tabs__active-bar.is-left, .el-tabs--left .el-tabs__nav-wrap.is-left::after {
    right: 2px;
  }


  .report-form .el-tabs--left .el-tabs__nav-wrap.is-left::after, .el-tabs--left .el-tabs__nav-wrap.is-right::after, .el-tabs--right .el-tabs__nav-wrap.is-left::after, .el-tabs--right .el-tabs__nav-wrap.is-right::after {
    width: 0px;
  }
  .report-form .el-tabs__item {
    padding: 0 10px;
    /* height: 40px; */
    height: auto;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    position: relative;
    writing-mode: vertical-lr;
    font-size: 14px;
    word-wrap: break-word;
    letter-spacing: 10px;
    padding-top: 4px;
    padding-bottom: 4px;
    margin-bottom: 14px;
    line-height: 19px;
  }
</style>
<style spoced lang="less">
.report-form {
    width: 100%;
    height: calc(100vh - 10px); 
    position: relative;
    padding-top: 20px;
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    background: rgba(255, 255, 255, 0.8);

    

   &-left {
    height: 90%;
    width: 40px;
    position: relative;
    border: 1px solid #eeeeee;


        p { 
            font-size: 14px; 
            word-wrap: break-word; 
            letter-spacing: 10px; 
            padding-top: 4px;
            padding-bottom:4px;
            margin-bottom: 14px;
            line-height: 19px;
            &.active {
                color: #409eff;
            }
        } 
   }

   &-right {
     width: calc(100vw - 40px);
     height: 90%;
     border: 1px solid #eeeeee;
     border-left: 0px;
     padding: 10px;
     padding-top: 0px;

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

   }
}
  
</style>
