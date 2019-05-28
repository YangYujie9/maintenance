<template>
  <div class="head-1">
    <div class="qiein-head">
      
      <div class="head-menu">
        <div @click="jump(index)" v-for="(list, index) in category" class="head-menu-list" :key="index">
          <span :class="{active: list.choose}" class="head-menu-drag">{{list.name}}</span>
        </div>
      </div>

      <!--<el-dropdown @command="handle_new_add" class="dropdownpositon">
        <span class="el-dropdown-link">
          <i style="font-size: 26px;position: relative;left: -34px;top: 1px;" class="iconfont icon-iconjia cursor"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">新增运维</el-dropdown-item>
          <el-dropdown-item command="b">新增项目</el-dropdown-item>
          <el-dropdown-item command="c">新增任务</el-dropdown-item> 
          
        </el-dropdown-menu>
      </el-dropdown>-->


      <!--个人信息-->
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
      <!--个人信息-->




    </div>

    <el-dialog
        title="员工编辑"
        :visible.sync="editstaff.dialogVisible" 
        width="500px"
        >
        <div class="wrap-staff">
          <p class="input-p">
            <b >*</b><span >密码：</span>
            <el-input type="password" placeholder="请输入密码"  size="mini" class="input-input"
               v-model="editstaff.password" ></el-input>
            
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="editstaff.dialogVisible = false">取 消</el-button>
          <el-button size="mini" @click="editstaffok" type="primary" >确 定</el-button>
        </span>
      </el-dialog>
    <addmaintenance  @close="addmaintenance_dialogVisible = false" :dialogVisible="addmaintenance_dialogVisible"></addmaintenance>

  </div>
</template>

<script>
  import Cookies from "js-cookie"
  import { mapGetters } from 'vuex'
  import addmaintenance from './add_maintenance'

  export default {
    components: {
      addmaintenance
    },
    data() {
      return {
        editstaff: {
          dialogVisible: false,
          password: ''
        },
        addmaintenance_dialogVisible: false, 
        category: [
          {
            name: '首页',
            link: '/demonsion',
            choose: true
          },
          {
            name: '运维',
            link: '/maintenance/demonsion',
            choose: true
          },
          {
            name: '项目',
            link: '/project/project_list',
            choose: false
          },
          {
            name: '报表',
            link: '/report_list',
            choose: false
          },
          {
            name: '设置',
            link: '/setting',
            choose: false
          },
        ],
        editdialog: {
          dialogVisible: false,
          kzId: ''
        },
        searchKey: '',
        
        searchlist: [],
        //公司信息
        companyInfo: {

        },
        searchresult: false
      }
    },
    computed: {
        ...mapGetters([
          'getstaffVO',
          'userInfo',
          'getpowers'
        ]),
    },
    mounted() {
      //获取登录信息
      //this.getCurrentLoginUserInfo()
      let that = this

      if (this.$route.fullPath.indexOf('report')>0) {

        this.jumpa(3)
      }

      if (this.$route.fullPath.indexOf('maintenance')>0) {
        this.jumpa(1)

      }


      if (this.$route.fullPath.indexOf('project')>0) {
        
        this.jumpa(2)
      }

      if (this.$route.fullPath.indexOf('setting')>0) {
        
        this.jumpa(4)
      }


    },
    methods: {
      isInArray(value){
            for(var i = 0; i < this.getpowers.length; i++){
                if(value == this.getpowers[i]){

                    return true;
                }
            }
            return false;
      },
      handle_new_add(command) {
        this.addmaintenance_dialogVisible = true
        console.info(command)
      },
      //顶部跳转
      jump(index) {
        for (let i = 0; i < this.category.length; i++) {
          this.category[i].choose = false
        }
        this.category[index].choose = true

        if (!this.isInArray('20') && this.category[index].name == '设置') {
          return this.$message({
            message: '没有权限查看此页面',
            type: 'warning'
          })
        }

        if (this.category[index].link) {
          this.$router.push(this.category[index].link)
        } else {
          this.$message({
            message: '新功能暂未开发，请期待',
            type: 'warning'
          })
        } 
        
      },
      jumpa(index) {
        for (let i = 0; i < this.category.length; i++) {
          this.category[i].choose = false
        }
        this.category[index].choose = true
        //this.$router.push(this.category[index].link)
      },
      detailkz(list) {
        this.editdialog.kzId = list.kzId
        this.editdialog.dialogVisible = true
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

        console.info(Cookies)
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
      
    },
  }
</script>

<style>
  .el-popper .popper__arrow {
    display: none
  }
  .head-1 .el-popper{
    min-width: 60px;
  }
</style>
<style scope lang="less">
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
  .head-1 {
    position: relative;

    .dropdownpositon {
      position: absolute;
      right: 160px;
    }

    .search-detail {
    position: absolute;
    width: 20%;
    max-width: 360px;
    min-width: 310px;
    height: 30px;
    left: 60%;
    z-index: 99;
    top: 14px;


    .iconsearch {
      width: 2.6em;
      height: 2.6em;
    }

    .list-rt {
      position: absolute;
      left: 0px;
      top: 40px;
      max-height: 310px;
      min-height: 30px;
      overflow-y: scroll;
      width: 100%;
      min-width: 300px;
      z-index: 99;
      background: #ffffff;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: 6px;
      border: 1px solid #e2e2e2;

      .noresult {
        height: 20px;
        text-align: center;
        font-size: 12px;
      }


      .order-detail {
        height: 48px;
        position: relative;
        font-size: 12px;

        &.red {
            background: pink;
          }


        &:hover {
          background: #f8f8f8;
        }


        .order-detail-left {
          position: absolute;
          top: 8px;
          left: 16px;
          height: 32px;
          width: 30px;

          img {
            width: 30px;
            height: 30px;
          }
        }

        .order-detail-right {
          position: absolute;
          top: 8px;
          right: 16px;
          height: 32px;
          left: 52px;

          .span-right {
            padding-right: 5px;
          }


          p {
            position: relative;
            top: -2px;
          }
        }
      }


    }


  }


    .qiein-head {
      height: 60px;
      background: #fff;
      display: flex;
      align-items: center;
      box-shadow: 0px 4px 30px -4px rgba(0, 51, 90, 0.1);
      position: relative;
      z-index: 940;

      background: rgba(255, 255, 255, 0.85);




      

      .person {
        position: absolute;
        text-align: left;
        right: 30px;
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
        min-width: 460px;
        max-width: 460px;
        margin-left: 160px;
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