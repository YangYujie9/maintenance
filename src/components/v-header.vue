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



      <!--搜索-->

      <div @click.stop=""  class="search-detail">

        <el-input size="medium" v-model="searchKey" @keyup.native="keyupsearch" style="width:100%; font-size: 12px;" placeholder="请输入搜索内容" class="input-with-select">

          <el-button slot="append" @click.stop.prevent="searchok" icon="el-icon-search"></el-button>
        </el-input>
        <div v-if="searchresult" class="list-rt boxshadow cursor">
          <div @click="detailkz(list)" v-for="list in searchlist" :class="{red: (list.kzPhone== searchKey || list.kzPhone== searchKey) }" class="order-detail">
              <!--<div class="order-detail-left">
                <span">
                  
                </span>
                
              </div>-->
              <div class="order-detail-right">
                <div>
                  <p>新客<span>{{list.kzName}}  </span>
                    <span> {{list.kzPhone}}</span>  
                    <span> {{list.mateName}}</span> 
                    <span> {{list.matePhone}}</span></p>

                  <p>老客<span>{{list.oldKzName}}  </span><span> {{list.oldKzPhone}}</span>  <span> {{list.oldMateName}}</span><span> {{list.oldMatePhone}}</span> </p>
                  
                </div>
              </div>
          </div>

          <div v-if="searchlist.length == 0" class="noresult">
            没有搜索结果
          </div>
        </div>
      </div>
      <!--搜索-->

     
      <!--个人信息-->
      <div class="person">
        <!--<el-popover width="200" trigger="hover">
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
        </el-popover>-->

        <el-button style="padding: 3px 10px;" slot="reference">
            <img class="head" v-if="getstaffVO.headImg" :src="getstaffVO.headImg" />
            <img class="head" v-else src="../assets/head-o.png" />
            {{getstaffVO.nickName}}
          </el-button>
      </div>
      <!--个人信息-->




    </div>

    <orderDetailModel v-if="editdialog.dialogVisible" :dialogVisible="editdialog.dialogVisible" :kzId="editdialog.kzId" @close="editdialog.dialogVisible = false"/>
  </div>
</template>

<script>
  import Cookies from "js-cookie"
  import orderDetailModel from './order_detail_model' 
  import { mapGetters } from 'vuex'

  export default {
    components: {
      orderDetailModel
    },
    data() {
      return {
        category: [{
            name: '客户维护',
            link: '/online_sales',
            choose: true
          }
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
        ]),
    },
    mounted() {
      //获取登录信息
      //this.getCurrentLoginUserInfo()
      let that = this

      document.addEventListener("click", function(){
        that.searchresult = false
        that.searchKey = ''
      }, false);
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
      detailkz(list) {
        this.editdialog.kzId = list.kzId
        this.editdialog.dialogVisible = true
      },
      //搜索
      searchok() {
        if (!this.searchKey) {
          return
        }

        if (this.searchKey.length<3) {
          if (/[^\u4E00-\u9FA5]/g.test(this.searchKey)) {
            return this.$message({
              message: '请输入清晰的条件',
              type: 'error'
            })
          }
        }

        



        
        this.searchresult = true
        this.$http.get(`info/get_info_list_by_key?searchKey=${this.searchKey}`)
        .then((data)=>{
            
            if (data.code == '100000') {
                this.searchlist = []

                this.searchlist = data.data
            } else {
                this.$message({
                  message: data.msg,
                  type: 'error'
                })
            }
        })
      },
      keyupsearch(event) {
        if (event.keyCode == 13 && this.searchKey) {
          this.searchok()
        }
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
      
    },
  }
</script>

<style spoced lang="less">
  .head-1 {
    position: relative;

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

          .red {
            background: pink;
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