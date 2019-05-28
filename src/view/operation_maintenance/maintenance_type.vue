<template>
  <div>
    <div class="home">
      <div v-for="list in routelink" @click="jump(list)" class="list cursor">
        <p style="height: 67px"><img :src="list.font" /></p>
        <!--<p><i style="font-size: 70px" :class="list.font" class="iconfont iconfont-demions"></i></p>-->
        <p class="entext"><span >{{list.icon}}</span></p>
        <p class="entext1"><span >{{list.title}}<span style="font-size: 16px;">{{list.count > -1 ? '('+list.count+')': ''}}</span></span></p>
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
          title: '我发起的',
          icon: 'I launched',
          font: require('../../assets/tijiao.png'),
          router: 'approve?status=0',
          marginleft: false,
          count: 0
        },
        {
          title: '我审批的',
          icon: 'I approve',
          font: require('../../assets/shenpi3.png'),
          router: 'approve?status=1',
          marginleft: false,
          count: 0
        },
        {
          title: '我分配的',
          icon: 'I allocate',
          font: require('../../assets/ziyuan.png'),
          router: 'approve?status=2',
          marginleft: false,
          count: 0
        },
        {
          title: '我处理的',
          icon: 'I deal with',
          font: require('../../assets/Groupsssvg.png'),
          router: 'approve?status=3',
          marginleft: false,
          count: 0
        },
        {
          title: '抄送给我',
          icon: 'Copy to me',
          font: require('../../assets/chaosongwode.png'),
          router: 'approve?status=4',
          marginleft: false,
          count: 0
        },
        {
          title: '数据中心',
          icon: 'Data center',
          font: require('../../assets/shuju.png'),
          router: '/maintenance/data_center',
          marginleft: false,
          count: -2
        },
        
      ],
    }
  },
  mounted() {
    this.find_demand_count()
  },
  methods: {
    jump(list) {
      if (list.router) {
        this.$router.push(list.router)
      } else {
        this.$message({
            message: '新功能暂未开发，请期待',
            type: 'warning'
          })
      }
      
    },
    find_demand_count() {
      let that = this
       this.$http.get('demand/find_demand_count') 
           .then((data)=>{
              console.info(data)
              if (data.code == '200') {
                  this.routelink[0].count = data.data.submitCount
                  this.routelink[1].count = data.data.approveCount
                  this.routelink[2].count = data.data.shareCount
                  this.routelink[3].count = data.data.processCount
                  this.routelink[4].count = data.data.copyCount
              }

            })
            .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
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
  width: 740px;
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
      width: 70px;
      object-fit: cover;

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
