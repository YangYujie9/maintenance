<style scoped>

  .main {
    flex-direction: column;
    height: 100%;
    min-width: 1200px;
    overflow: hidden;
    font-size: 12px;
  }

  .inner {
    /*position: relative;*/
    /*width: 1400px;*/
    /*height: 600px;*/
    /*margin: 0 auto;*/
  }
  .iner_text{
    font-size:16px;
    color:#000;
  }

  .header {
    font-size:16px;
    flex: 0 0 auto;
    height: 6.875em;
  }

  .header img {
    font-size:16px;
    width:100%;
    height:100%;
    float: left;
    margin-top:1.562em;
  }

  .header span {
    float: left;
    margin-left:2.5em;
    font-size: 16px;
    line-height: 6.875em;
    color: #000;
  }

  .content {
    font-size:16px;
    height:40.125em;
    width:100%;
    background: url("https://static.z.qiein.com/img/login/bg.jpg") no-repeat center;
    background-size: cover;
  }

  .content_background {
    /*position: absolute;*/
    /*width:1920px;*/
    /*z-index: -1;*/
    /*height: 600px;*/
    /*top: 0;*/
    /*left: 50%;*/
    /*transform: translateX(-50%);*/
  }

  .main_text {
    position: absolute;
    top: 130px;
    left: 50%;
    color: #fff;
    font-size: 30px;
    font-weight:700;
    margin-left: -684px;
    line-height: 58px;
    font-weight: 500;
  }

  .main_text_data {
    font-size: 24px;
  }

  .footer {
    position: absolute;
    bottom: 30px;
    width:100%;
    height: 30px;
    color: #888888;
    text-align: center;
    line-height: 30px;
    font-family: '微软雅黑';
    font-size: 12px;
  }

  .login_box {
    float: right;
    margin-top: 14%;
    margin-right: 12.44%;
    padding: 28px;
    width: 348px;
    background: #fff;
    border-radius: 2px;
    position: relative;
  }

  .select_company_title {
    text-align: center;
    color: #43484c;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .select_company_main {
    position: relative;
    margin: 30px 0;
  }

  .last_company {
    position: absolute;
    top: 20px;
    left: 0;
    cursor: pointer;
  }

  .next_company {
    position: absolute;
    top: 20px;
    right: 0;
    cursor: pointer;
  }

  .select_company_show {
    overflow: hidden;
    width: 292px;
    height: 68px;
  }

  .select_company_all {
    position: relative;
    transition: all 0.5s;
    width: 460px;
    top: 0;
    left: 8px;
  }

  .select_company_all li {
    float: left;
    width: 60px;
    height: 46px;
    margin: 10px 16px;
    text-align: center;
    opacity: 0.8;
    cursor: pointer;
    transition: all 0.5s;
    border-radius: 2px;
  }

  .select_company_all li img {
    width: 46px;
  }

  .select_company_all .company_selected {
    transform: scale(1.4);
    opacity: 1;
  }

  .select_company_name {
    text-align: center;
    color: #73787c;
    font-size: 14px;
    margin-top: 10px;
  }

  .company_img {
    background: #5b95f9;
  }

  .main_bottom {
    margin-top: 20px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .forger_password {
    float: right;
    font-size: 12px;
    color: #2d78f4;
    cursor: pointer;
  }

  .go-to-wx {
    font-size: 12px;
    color: #2d78f4;
    cursor: pointer;
  }

  .go-to-ding {
    font-size: 12px;
    color: #2d78f4;
    cursor: pointer;
    margin-left: 8px;
  }

  .forger_password:hover {
    text-decoration: underline;
  }

  .connect_us {
    font-size: 12px;
    float: right;
    color: #ccc;
    cursor: pointer;
  }

  .connect_us:hover {
    text-decoration: underline;
  }

  .warning_message {
    margin-top: 12px;
    color: red;
    height: 24px;
    font-size: 12px;
  }

  .repeat_inner_head_left{
    float:left;
    margin-left:19%;
    width:31%;
    margin-top: 1.6em;
  }

  .repeat_inner_head_logo{
    font-size:16px;
    width:8.56em;
  }

  .repeat_inner_head_right a{
    display: block;
    float:right;
    margin-right:26%;
    font-size:12px;
    margin-top:3.833em;
    color:#000;
  }

  .forget_wrap,
  .forget_img_wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
    display: flex;
  }

  .forget_warn {
    width: 450px;
    height: 250px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -225px;
    margin-top: -270px;
    background: #fff;
    z-index: 201;
  }

  .forget_title {
    height: 50px;
    line-height: 50px;
    width: 100%;
    background: rgb(239, 239, 239);
    font-size: 14px;
    padding: 0 10px;
  }

  .forget_main .forget_warn_title {
    font-size: 16px;
    color: orange;
    text-align: center;
    margin-bottom: 20px;
  }

  .forget_main p {
    line-height: 28px;
    font-size: 14px;
  }

  .forget_img {
    display: inline-block;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .wx_login_container {
    width: 100%;
    height: 300px;
    text-align: center;
  }

  .wx_login_icon{
    width:18px;
    height:18px;
    border-radius: 10px;
  }

  .login-switch{
    position: absolute;
    right:5px;
    top:8px;
    cursor: pointer;
  }
  .login-switch img{
    display: block;
    width:52px;
    height:52px;
  }
  .company_list_null{
    height:300px;
    line-height: 300px;
    text-align: center;
    font-size:14px;
    color:#ff9900;
  }

  .iner_text_p {
  	font-size: 24px;
  	font-weight: 500;
  }
  .iner_text_p2 {
  	font-size: 16px;
  	color: #949494;
  }

</style>
<template>
  <div ref="adapatin_main" class="adapatin_main main">
    <!-- 导航 -->
    <div class="adapation_header header">

      <div class="repeat_inner_head_left">
        
        <p class="iner_text adapation_iner_text iner_text_p">运维管理系统</p>
        <p class="iner_text_p2"> Operation and Maintenance Management System</p>
      </div>
      
    </div>

    <!-- 登录 -->
    <div :style="{height: bgheight + 'px'}" class="content adapation_content">
      <div class="repeat_inner">

        <div class="login_box">

          <!-- 登录切换 -->
          <!--<div class="login-switch" @click="loginSwitch" v-if="!bShowChoseCompany">
            <img :src="loginSwitchIcon" alt="切换微信登录" />
          </div>-->

          <!-- 手机号码登录 -->
          <template v-if="loginMethod=='phone'">
            <p style="color: #666;font-weight: 700;font-size: 16px">账户登录</p>
            <p class="warning_message" v-text="warningMessage"></p>
            <div v-if="!bShowChoseCompany">
              <el-input type="text" size="large"  v-model="userInfo.user"
                style="margin-top: 10px;">
                <template slot="prepend"><i class="iconfont icon-unie603"></i></template>
              </el-input>
              <el-input type="password" size="large" v-model="userInfo.password" style="margin-top: 20px;">
                <template slot="prepend"><i class="iconfont icon-mima"></i></template>
              </el-input>
              <div v-if="bShowCode" style="position: relative;margin-top: 20px;">
                <el-input type="text" v-model="userInfo.code" @focus="fDoLogin" size="large" style="width: 200px;">
                  <span slot="prepend">验证码</span>
                </el-input>
                <img @click="fChangeCodeImg" :src="codeImg" style="vertical-align: bottom;height: 36px;position: absolute;right: 0;top: 1px;border: 1px solid;"
                  alt="">
              </div>
            </div>
          </template>

          <!-- wx登录 -->
          <!--<template v-else-if="loginMethod=='wx'">
            <template v-if="!bShowChoseCompany">
              <p style="color: #666;font-weight: 700;font-size: 16px">
                <img src="https://oss.aliyuncs.com/hmcrm/beidou/source/src_weichat.png" alt="" style="width:20px;border-radius: 10px;vertical-align: text-bottom">
                微信登录
              </p>
              <wx-auth v-if="companyListState" @on-success="handleCompanyListByWx" class="wx_login_container"></wx-auth>
              <div v-if="!companyListState" class="company_list_null">请先绑定公司</div>
            </template>
          </template>-->

          <!-- <template v-else-if="loginMethod=='ding'">
            <template v-if="!bShowChoseCompany">
              <p style="color: #666;font-weight: 700;font-size: 16px">钉钉登录</p>
              <ding-auth @get-code="getCompanyListByDing" class="wx_login_container"></ding-auth>
            </template>
          </template> -->

          <!-- 选择公司 -->
          <div v-if="bShowChoseCompany" class="select_company">
            <p class="select_company_title">请确认登录的公司</p>
            <div class="select_company_main">
              <span @click="fChooseLastCompany" class="last_company">
                <!--<Icon type="chevron-left"></Icon>-->
              </span>
              <span @click="fChooseNextCompany" class="next_company">
                <!--<Icon type="chevron-right"></Icon>-->
              </span>
              <div class="select_company_show">
                <ul class="select_company_all" :style="{left: companyBoxLeft+'px',width: 92*companyList.length + 'px'}">
                  <li v-for="(item,index) in companyList" @click="fChooseCompany(index)" :class="(-index*92+100)===companyBoxLeft?'company_img company_selected': 'company_img'">
                    <img v-if="item.img" :src="item.img" style="width:100%;margin-top: 10px;" alt="">
                    <img v-else="!item.img" src="https://hmcrm.oss-cn-hangzhou.aliyuncs.com/beidou/icon_flag/companyIcon.png"
                      alt="">
                  </li>
                </ul>
              </div>
              <p class="select_company_name" v-text="selectedCompany.name"></p>
            </div>
          </div>
          <!-- 控制显示登录按钮 -->
          <template v-if="showLoginBtn">
            <el-button type="primary" size="large" @click="fDoLogin" long style="margin-top: 30px;margin-bottom: 10px;width: 290px;">
              立即登录
            </el-button>
          </template>
          <!--<p class="main_bottom" v-if="loginMethod=='phone'">
            <img class="wx_login_icon" src="https://oss.aliyuncs.com/hmcrm/beidou/source/src_weichat.png" alt="草莓卷微信登录">
            <span class="go-to-wx" @click="goToWxLogin" style="margin-left:2px;flex:2;">微信登录</span>
             <span class="go-to-ding" @click="goToDingLogin">钉钉登录</span> 
            <span class="forger_password" @click="bForgetIsShow = true">忘记密码？</span>
            <span class="connect_us">联系我们</span>
          </p>-->
        </div>
      </div>
    </div>

    <!-- 底部文案 -->
   <!-- 底部文案 -->
    <div class="adapation_footer footer">建议使用谷歌浏览器使用</div>


    
  </div>
</template>

<script>
  import Cookies from "js-cookie";
  
  /*import {
    HOST
  } from "../../common/userHtppt";*/

  import axios from "axios";
  import { mapGetters } from 'vuex'
  const HOST = 'http://dev.qiein.com/'
  console.info(HOST)

  
  export default {
    name: "",
    data() {
      return {
        loginSwitchIcon: 'https://oss.aliyuncs.com/hmcrm/beidou/source/login-switch-wechat.png',
        bForgetIsShow: false,
        bImgShow: false,
        warningMessage: "",
        bShowCode: false,
        bShowChoseCompany: false,
        codeImg: "",
        companyBoxLeft: 0,
        companyList: [],
        selectedCompany: {
          
        },
        companyListState:true,
        userInfo: {
          user: "",
          password: "",
          code: ""
        },
        loginMethod: 'phone',
        passwordLimit: {
          open: false
        },
        //wx
        wxToken: null,
        //钉钉
        dingCode: null,
        bgheight: 0
      };
    },
    components: {
      //dingAuth,
      //wxAuth
    },

    computed: {
      //登录按钮显示
      showLoginBtn() {
        return (this.loginMethod == 'phone') || (this.loginMethod == 'wx' && this.companyList.length)
      }
    },
    mounted() {
      let that = this


      this.userInfo.password = ''
      this.userInfo.user = ''


      this.$nextTick(()=>{
            this.bgheight = document.body.offsetHeight * 0.75


      })


      document.addEventListener("keyup", function(event){
        //that.searchresult = false
        if (event.keyCode == 13 && this.$route.name == "login") {
          that.fDoLogin()
        }


      }, false);
    },
    methods: {
      //切换登录
      loginSwitch() {
        this.companyListState = true
        if (this.loginMethod == 'phone') {
          this.loginMethod = 'wx';
          this.loginSwitchIcon = 'http://oss.aliyuncs.com/hmcrm/beidou/source/login-switch-comuter.png'
        } else if (this.loginMethod == 'wx') {
          this.loginMethod = 'phone';
          this.loginSwitchIcon = 'http://oss.aliyuncs.com/hmcrm/beidou/source/login-switch-wechat.png'
        }
      },

      //登录验证
      fDoLogin() {
        let phoneReg = /^(13|14|15|16|17|18|19)\d{9}$/;
        this.userInfo.user = this.userInfo.user.trim();
        this.userInfo.password = this.userInfo.password.trim();
        this.warningMessage = "";

        if (!this.userInfo.user) {
          this.warningMessage = "";
          return
        }
        if (!this.userInfo.password) {
          this.warningMessage = "";
          return
        }
        /*if (!phoneReg.test(this.userInfo.user)) {
          this.warningMessage = "请输入正确的手机号码";
          return false;
        }*/
        if (!this.userInfo.password) {
          this.warningMessage = "请输入密码";
          return false;
        }
        if (!this.userInfo.code && this.bShowCode) {
          this.userInfo.code = this.userInfo.code.trim();
          this.warningMessage = "请输入验证码";
          return false;
        }
        this.warningMessage = "";


        if (this.selectedCompany.id) {
          //根据登录方式

          this.fLogin();
          
        } else {
          this.fGetCompanyList();
        }
      },
      //获取公司列表
      fGetCompanyList() {
        this.$httpBasis.get(`login/?userName=${this.userInfo.user}&password=${this.userInfo.password}`).then((data) => {
          if (data.code === 200) {
            this.handleGetCompanyList(data, this.fLogin)
          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            });
          }
        })
      },
      //处理公司登录的
      handleGetCompanyList(data, login) {
        if (data.data.length === 1) {
          this.selectedCompany.companyId = data.data[0].companyId
          this.selectedCompany.id = data.data[0].id
          login();
        } else {
          this.companyList = data.data.map(item => {
            return {
              name: item.companyName,
              id: item.id,
              companyId: item.companyId,
              img: item.logo
            };
          });
          this.companyBoxLeft = 100;
          this.bShowChoseCompany = true;

          
        }
      },
      //手机号登录
      fLogin() {
        this.$httpBasis.get(`login/get_token?cid=${this.selectedCompany.companyId}&uid=${this.selectedCompany.id}`).then((data) => {
          this.bShowCode = false;

          if (data.code == '200') {
            console.info(data.data)
            Cookies.set("token", data.data.token);
            Cookies.set("cid", data.data.cid);
            Cookies.set("uid", data.data.uid);

            this.$store.dispatch('getUserBaseInfo', this.$router)

            this.$router.push("/demonsion");
          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            });
          }
          
          
          //console.info(data)
        })
      },
      fChooseLastCompany() {
        if (this.companyBoxLeft < 100) {
          this.companyBoxLeft = this.companyBoxLeft + 92;
        }
      },
      fChooseNextCompany() {
        if (this.companyBoxLeft > 192 - 92 * this.companyList.length) {
          this.companyBoxLeft = this.companyBoxLeft - 92;
        }
      },
      fChooseCompany(index) {
        this.companyBoxLeft = 100 - index * 92;
        
      },
      //验证码
      fChangeCodeImg() {
        this.userInfo.code = "";
        let timestamp = new Date().valueOf();
        this.codeImg =
        HOST+ '/basis-service'+ 
          "/login/verify_code?phone=" +
          this.userInfo.user +
          "&timestamp=" +
          timestamp;

      },
      //验证手机号码
      fUserBlur() {
        this.userInfo.user = this.userInfo.user.trim();
        let phoneReg = /^(13|14|15|16|17|18|19)\d{9}$/;
        let value = this.userInfo.user;

        if (phoneReg.test(value)) {
          this.$httpBasis.get('login/need_verity_code', {
            params: {
              phone: value
            }
          }).then((data) => {

            if (data) {
              this.bShowCode = true;
              this.fChangeCodeImg();
            } else {
              this.bShowCode = false;
            }
          })
        } else {
          this.warningMessage = "请输入正确的手机号码";
        }
      },
      //忘记密码
      fShowForgetImg() {
        this.bImgShow = true;
        this.bForgetIsShow = false;
      },
      //WX 登录
      
    },
    watch: {
      companyBoxLeft() {
        let index = (100 - this.companyBoxLeft) / 92;


        console.info(999)
        this.selectedCompany = JSON.parse(
          JSON.stringify(this.companyList[index])
        );
      }
    }
  };

</script>
