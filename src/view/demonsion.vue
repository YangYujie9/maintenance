<style scoped>

  .main {
    flex-direction: column;
    height: 100%;
    min-width: 1400px;
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

  
  
  .content {
    font-size:16px;
    height:40.125em;
    width:100%;
    background: url("https://static.z.qiein.com/img/login/bg4.jpg") no-repeat center;
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
    width:100%;
    height: 30px;
    color: #888888;
    text-align: center;
    line-height: 30px;
    font-family: '微软雅黑';
    font-size: 12px;
    margin-top:8.333em;
  }

  .login_box {
    float: right;
    margin-top: 8.125em;
    margin-right: 23.44%;
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
    margin-left:14%;
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
<style lang="less" scoped>
	.demmonsion {
		width: 920px;
		margin: 0 auto;
		padding-top: 8%;
		text-align: center;


		div {
	        float: left;
	        width: 220px;
	        height: 320px;
	        border: 1px solid rgb(236, 236, 236);
	        text-align: center;
	        margin-right: 120px;
	        margin-bottom: 24px;
	        padding-top: 16px;
	        border-radius: 12px;
	        cursor: pointer;
	        background: #ffffff;
	        padding-top: 10px;

	        &.last {
	        	margin-right: 0px;
	        }



	        &:hover {
	          border-color: #0ae;
	          box-shadow: 0 15px 20px rgba(0,0,0,.1);
	          position: relative;
	          z-index: 99;
	          text-decoration: none;
	          -webkit-transform: translate3d(0,-3px,0);
	          transform: translate3d(0,-3px,0);

            .iconfont-demions {
              display: none
            }

            .iconfont-btn {
              display: inline-block;
            }

	          	

	        	.des {
	        		font-size: 27px;
	        	}
	        	.text {
	        		font-size: 16px;
	        	}

	        	
	        }

	        .des {
	          	margin-top: 56px;
	          	font-size: 28px;
    			     font-weight: 500;
	        }

	        .text {
	        	margin-top: 20px;
	        	font-size: 18px;
      			font-weight: 600;
      			color: #949494;
            margin-bottom: 30px;
	        }

	        .iconfont-demions {
	        	font-size: 85px;
	        	color: rgb(64, 158, 255);

	        }

          .iconfont-btn {
            display: none;
            margin-top: 30px;

          }


	      }
	}
  .person {
        position: absolute;
        text-align: left;
        right: 80px;
        top: 30px;
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

      .btndislplaydemonsion {
        position: absolute;
        text-align: left;
        right: 200px;
        top: 36px;
        font-size: 12px;
      }

      .wrap-staff {
    p {
      margin-bottom: 20px;
      padding-left: 20px;
      font-size: 12px;

      .input-input {
        display: inline-block;
        width: 270px;
        font-size: 12px;
      }

      span {
        padding-left: 4px;
      }

      b {
        color: red;
      }
    }
  }


</style>
<template>
  <div class="adapatin_main main">
    <!-- 导航 -->
    <div class="adapation_header header">

      <div class="repeat_inner_head_left">
        
        <p class="iner_text adapation_iner_text iner_text_p">运维管理系统</p>
        <p class="iner_text_p2"> Operation and Maintenance Management System</p>
      </div>

      <div class="btndislplaydemonsion">
        <i @click="$router.push('/setting')" v-if="isInArray('20')" style="font-size: 20px;" class="el-icon-setting"></i>
      </div>

      <div class="person">
        <el-popover width="200" trigger="hover">
          <div style="text-align: center;">
            <p style="margin-bottom: 12px;font-size: 12px;" class="person-p">当前帐号:{{userInfo.staffName}}</p>
            <el-button type="danger" size="mini" @click="editstaff.dialogVisible = true" style="">
              修改密码
            </el-button>


            <p style="margin-top: 16px;">
              <el-button type="warning" size="mini" @click="exit()" style="">
                退出登录
              </el-button>
            </p>


          </div>
          <el-button style="padding: 3px 10px;" slot="reference">
            <img class="head" v-if="getstaffVO.headImg" :src="getstaffVO.headImg" />
            <img class="head" v-else src="../assets/head-o.png" />
            {{userInfo.staffName}}
          </el-button>
        </el-popover>

        <!--<el-button style="padding: 3px 10px;" slot="reference">
          <img class="head" v-if="getstaffVO.headImg" :src="getstaffVO.headImg" />
          <img class="head" v-else src="../assets/head-o.png" />
          {{getstaffVO.nickName}}
        </el-button>-->
      </div>
      
    </div>

    <!-- 登录 -->
    <div :style="{height: bgheight + 'px'}" class="content adapation_content">
      <div class="demmonsion">
      	<div>
      		
            <p class="des">运维管理</p>

            <p class="text">Mocha ITOM</p>
            <i style="color: #f39a3e" class="iconfont icon-wenjian1 iconfont-demions"></i>
            <el-button  @click="$router.push('/maintenance/demonsion')" class="iconfont-btn" style="padding: 11px 42px;background: rgb(250, 205, 145);color: #ffffff;border: 1px solid #f39a3e;" plain>进  入</el-button>
        </div>
        <div >
      		
            <p class="des">项目管理</p>

            <p class="text">Project Management</p>
            <i style="color: #884cf7" class="iconfont icon-wenjian iconfont-demions"></i>
            <el-button @click="$router.push('/project/project_index')" class="iconfont-btn" style="padding: 11px 42px;background: #c27ff9;color: #ffffff;border: 1px solid #884cf7;" plain>进  入</el-button>
        </div>
        <div  class="last">
            <p class="des">报表管理</p>

            <p class="text">Report Form</p>
            <i style="color: #3da8f0" class="iconfont icon-biaoge iconfont-demions"></i>
            <el-button @click="$router.push('/report_list')" class="iconfont-btn" style="padding: 11px 42px;background: #82d3f8;color: #ffffff;border: 1px solid #3da8f0;" plain>进  入</el-button> 
        </div>
      </div>

         
    </div>
    <!-- 底部文案 -->
    <div class="adapation_footer footer">建议使用谷歌浏览器</div>
      <el-dialog
        title="员工编辑"
        :visible.sync="editstaff.dialogVisible" 
        width="500px"
        >
        <div class="wrap-staff">
          <p class="input-p">
            <b >*</b><span >密码：</span>
            <el-input  type="password" placeholder="请输入密码"  size="mini" class="input-input"
               v-model="editstaff.password" ></el-input>
            
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="editstaff.dialogVisible = false">取 消</el-button>
          <el-button size="mini" @click="editstaffok" type="primary" >确 定</el-button>
        </span>
      </el-dialog>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex' 
  import Cookies from "js-cookie"
  export default {
    name: "",
    data() {
      return {
        editstaff: {
          dialogVisible: false,
          password: ''
        },
        bgheight: 200
      };
    },
    computed: {
        ...mapGetters([
          'getstaffVO',
          'userInfo',
          'getpowers'
        ]),
    },
    mounted() {
      this.$nextTick(()=>{
            this.bgheight = document.body.offsetHeight * 0.75


      })
    },
    methods: {
      enter() {
        this.$message({
            message: '新功能暂未开发，请期待',
            type: 'warning'
          })
      },
      isInArray(value){
            for(var i = 0; i < this.getpowers.length; i++){
                if(value == this.getpowers[i]){

                    return true;
                }
            }
            return false;
      },
      editstaffok() {

        let that = this
        this.$http.get(`staff/update_password?id=${this.getstaffVO.uid}&password=${this.editstaff.password}`)
          .then(function (data) {
            console.info(data)

                  
                    if (data.code != '200'){
                      that.$message({
                        message: data.msg,
                        type: 'error'
                      });


                    } else {
                      that.$message({
                          message: data.msg,
                          type: 'success'
                       });

                      that.exit()
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
      //退出登录
      exit() {
        Cookies.remove('cid')
        Cookies.remove('uid')
        Cookies.remove('token')


        this.$router.push('/login')
      },
    },
    watch: {
      
    }
  };

</script>
