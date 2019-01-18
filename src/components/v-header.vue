<template>
  <div class="head-1">
    <div class="qiein-head">
      <div class="head-logo">
        <img src="https://oss.aliyuncs.com/hmcrm/beidou/home_img/beidou_logo.png" alt="">
      </div>
      <div class="head-menu">
        <div @click="jump(index)" v-for="(list, index) in category" class="head-menu-list" :key="index">
          <span :class="{active: list.choose}" class="head-menu-drag">{{list.name}}</span>
        </div>
      </div>

     
      <!--个人信息-->
      <div class="person">
        <el-popover width="200" trigger="hover">
          <div style="text-align: center;">
            <p style="margin-bottom: 12px;font-size: 12px;" class="person-p">当前帐号:{{loginUserInfo.nickName}}</p>
            <el-button size="mini" @click="exit()" style="">
              退出登录
            </el-button>
          </div>
          <el-button style="padding: 3px 10px;" slot="reference">
            <img class="head" :src="loginUserInfo.headImg" />
            {{loginUserInfo.nickName}}
          </el-button>
        </el-popover>
      </div>
      <!--个人信息-->
    </div>


  </div>
</template>

<script>
  import Cookies from "js-cookie"

  export default {
    components: {

    },
    data() {
      return {
        category: [{
            name: '老客维护',
            link: '/online_sales',
            choose: true
          }
        ],
        //当前登录人
        loginUserInfo: {
          companyName: '',
          nickName: '888',
          headImg: 'https://oss.aliyuncs.com/hmcrm/beidou/home_img/beidou_logo.png'
        },
        //公司信息
        companyInfo: {

        }
      }
    },
    mounted() {
      //获取登录信息
      //this.getCurrentLoginUserInfo()
    },
    methods: {
      //顶部跳转
      jump(index) {
        for (let i = 0; i < this.category.length; i++) {
          this.category[i].choose = false
        }
        this.category[index].choose = true
        this.$router.push(this.category[index].link)
      },
      //退出登录
      exit() {
        Cookies.remove('cid')
        Cookies.remove('uid')
        Cookies.remove('token')


        this.$router.push('/login')
      },
      //获取当前登录人信息
      getCurrentLoginUserInfo() {
        this.$http.get('user/get_current_user_info')
          .then((res) => {
            this.loginUserInfo = res.data
          })
      },
      //获取公司新消息
      getCompanyInfo() {
        this.$http.get('company/get_company_info_by_id')
          .then((res) => {
            this.companyInfo = res.data
          })
      }
    },
  }
</script>

<style spoced lang="less">
  .head-1 {


    .qiein-head {
      height: 60px;
      background: #fff;
      display: flex;
      align-items: center;
      box-shadow: 0px 4px 30px -4px rgba(0, 51, 90, 0.1);
      position: relative;
      z-index: 940;

      

      .person {
        position: absolute;
        text-align: left;
        right: 20px;
        top: 15px;
        font-size: 12px;

        .person-p {
          margin-bottom: 12px;
        }


        .head {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          vertical-align: middle;
          background: #e2e2e2;
          padding: 4px;
        }

        span {
          padding-left: 2px;

        }

      }



      .head-logo {
        width: 137px;
        margin-left: 30px;
        padding-right: 30px;
        position: relative;

        img {
          width: 107px;
        }

        &:after {
          content: '';
          width: 1px;
          height: 38px;
          background-color: #e2e2e2;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }

      .head-menu {
        font-size: 14px;
        color: #48494A;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 20%;
        min-width: 220px;
        max-width: 220px;
        margin-left: 26px;
      }

      .update-wrap {
        font-size: 13px;
        margin-left: 32px;

        .update-text-wrap {
          display: inline-block;
          margin: 0 8px;
          color: red;
        }

      }

      .head-menu-list {
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        margin-right: 16px;
      }

      .head-menu-drag {


        border-radius: 20px;
        padding: 5px 20px;

        &:hover {
          color: #0057ff;

        }

        &.active {
          background: #0057ff;
          color: #fff;

          &:hover {
            background: #003ecb;
          }
        }
      }
    }
  }
</style>