<template>
  <div class="cir-wrap">
    <div class="home">
      <!--<div v-for="(list,index) in routelink" @click="jump(list,index)" class="list cursor">
        <p><img src="../../assets/report.png" /></p>
        <p class="entext"><span >{{list.icon}}</span></p>
        <p class="entext1"><span >{{list.title}}</span></p>
      </div>-->

      <div class="top-detail">
        <div class="list-wrap">
          <p v-for="list in loglist">
            <span >{{list.reportName}}</span>
            <span style="width: 80px;">{{list.submitStaff}}</span>
            <span style="width: 160px;">{{list.submitTime}}</span>
            <span style="width: 80px;color: red;">已更新</span>
          </p>
        </div>
        
      </div>

      <div class="top-circle">
        <img src="../../assets/report1.png" />
        <p>更新日志</p>
      </div>



      <div @click="datareportshow=true" class="top-circle left">
        <img style="width: 70px;height: 70px;margin-top: 30px;" src="../../assets/report3.png" />
        <p style="line-height: 30px;">数据报表</p>
      </div>

      <div @click="picreportshow=true" class="top-circle right">
        <img style="width: 70px;height: 70px;margin-top: 30px;" src="../../assets/report2.png" />
        <p style="line-height: 30px;">图形报表</p>
      </div>

      <div :class='{opacitydata: datareportshow}' class="left-detail">
        <div v-for="(list,index) in routelink" @click="jump(list,index)" style="margin-right: 6px;margin-top: 16px;" class="kuang">
          <div class="bg">
            <img style="" src="../../assets/report3.png" />
          </div>
          <p>{{list.title}}</p>
        </div>
        
      </div>


      <div :class='{opacitydata: picreportshow}' style="text-align: left" class="left-detail right-detail">
        <div style="margin-right: 6px;margin-top: 16px;" class="kuang">
          <div class="bg">
            <img style="" src="../../assets/report3.png" />
          </div>
          <p>货源数据报表</p>
        </div>
        
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      datareportshow: false,
      picreportshow: false,
      routelink: [
        {
          title: '三方报表',
          icon: 'Three party statements',
          router: '/reportthree/threecheck',
          routerarray: [
            {
              router: '/reportthree/threecheck',
              power: 22
            }
          ],
          marginleft: false,
        },
        {
          title: '企划仓储出库报表',
          icon: 'Warehouse report',
          router: '/reportcangchu/cangchu',
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
          title: '后道品控确认报表',
          icon: 'Quality control report',
          router: '/reportpinkong/pinkong',
          routerarray: [
            {
              router: '/reportpinkong/pinkong',
              power: 25
            }
          ],
        },
        {
          title: '货源报表',
          icon: 'Source report',
          router: '',
          routerarray: [
            
          ],
        },
        
        
      ],
      loglist: []
    }
  },
  mounted() {
    this.getlog()
  },
  methods: {
    jump(list,index) {
      if (list.routerarray.length) {
        let listindex = -1
        for (let i=0; i<list.routerarray.length; i++) {
          if (this.$isInArray(list.routerarray[i].power)) {
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
          this.$router.push(list.routerarray[listindex].router)
        }

      } else {
        this.$message({
            message: '新功能暂未开发，请期待',
            type: 'warning'
          })
      }
      
    },
    getlog () {
      this.$http.get('reports/get_log')
        .then((data)=>{
          this.loglist = data.data
        })
    },
    loginPage () {
      this.$router.push('/login')
    },
    financePage () {
      this.$router.push('/finance')
    }
  }
}
</script>

<style scoped lang="less">
.cir-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.iconfont1 {
  color: rgb(0, 87, 255);
  font-size: 44px;
}
.home{
  width: 360px;
  height: 360px;
  margin:0 auto 0;
  position: relative;
  //vertical-align: middle;
  font-size: 14px;
  
  left: 10px;
  border: 1px solid #d4cad3;
  border-radius: 50%;
  position: relative;
  top: 80px;


@keyframes myfirst
    {
      from {opacity: 0;}
      to {opacity: 1;}
    }

  .top-detail {
    position: absolute;
    width: 500px;
    height: 120px;
    top: -230px;
    left: -80px;
    border: 1px solid #9ec739;
    padding: 10px 0 10px;
    opacity: 1;
    animation: myfirst 5s;
    -webkit-animation: myfirst 5s;

    overflow: hidden;

    @-webkit-keyframes mymove {
      from {
        top:0px;
      }
      to {
        top:-30px;
      }
    }

    .list-wrap {
      animation:mymove 5s infinite linear;
      position:absolute;
      top: 0px;
      left: 12px;
      padding: 10px 0 10px;

      
    }

    

    

     p {
        line-height: 30px;
        text-align: center;

        span {
          display: inline-block;
          width: 110px;
          overflow: hidden;
        }
      }
  }

  



  .left-detail {
    position: absolute;
    width: 300px;
    height: 320px;
    left: -420px;
    top: -20px;
    border: 1px solid #9ec739;
    padding: 16px;
    opacity: 0;
    text-align: center;
    



    .kuang {
      width: 120px;
      height: 120px;
      display: inline-block;
      text-align: center;

      p {
        line-height: 40px;
        font-size: 14px;
      }

      .bg {
        width: 80px;
        height: 80px;
        background: #9cca39;
        border-radius: 10px;
        display: inline-block;

        img {
          width: 62px;
          height: 62px;
          margin-top: 8px;
        }


      }
    }

  }

  
  .right-detail {
    left: 460px;
  }
  
  .top-circle {
    width: 160px;
    height: 160px;
    position: absolute;
    background: #f39965;
    border-radius: 50%;
    top: -80px;
    left: 90px;
    text-align: center;
    &:hover {
      box-shadow: 10px 10px 16px -5px rgba(131,185,221,1);
    }


    img {
      width: 80px;
      height: 80px;
      margin-top: 20px;


    }

    p {
      color: white;


    }

    &.left {
      top: 174px;
      left: -60px;
      background: #68cc9a;
    }

    &.right {
      top: 174px;
      left: 270px;
      background: #ca9acc;

    }
  }

  .opacitydata {
    opacity: 1;
  }

  .list {
    display: inline-block;
    width: 210px;
    height: 210px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #ffffff;
    box-shadow: 4px 4px 16px -5px rgba(131,185,221,1);
    text-align: center;
    padding-top: 35px;
    margin-top: 50px;
    margin-right: 34px;

    &:hover {
      box-shadow: 10px 10px 16px -5px rgba(131,185,221,1);
    }

    img {
      width: 62px;

    }

    .entext {
      margin-top: 10px;
      height: 30px;
      line-height: 30px;
      color: #c9cacb;
      font-size: 16px;
    }

    .entext1 {
      color: #b1b1b1;
      font-size: 24px;
    }
  }
  
}
</style>
