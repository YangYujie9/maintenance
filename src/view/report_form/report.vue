<template>
  <div>
    <div class="home">
      <div v-for="(list,index) in routelink" @click="jump(list,index)" class="list cursor">
        <p><img src="../../assets/report.png" /></p>
        <p class="entext"><span >{{list.icon}}</span></p>
        <p class="entext1"><span >{{list.title}}</span></p>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
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
        
        
      ]
    }
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


.iconfont1 {
  color: rgb(0, 87, 255);
  font-size: 44px;
}
.home{
  width: 500px;
  height: 610px;
  margin:0 auto 0;
  position: relative;
  //vertical-align: middle;
  font-size: 14px;
  padding-top: 8%;
  left: 10px;
  

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
