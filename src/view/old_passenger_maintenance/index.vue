<template>
  <!-- 安全账户 -->
  <div class="setting-1">
    <div class="wrap">

      <div class="left boxshadow">
        <div class="btndislplay"><i class="iconfont icon-setting"></i>老客维护</div>
        <div class="list cursor" v-for="menu in menuList" :key="menu.index" @click="goPage(menu.index)" :class="{active: nowActiveMenu.index==menu.index}">
          <div class="line" v-if="nowActiveMenu.index==menu.index"></div>
          {{menu.name}}
        </div>
      </div>

      <div class="right boxshadow">

          <router-view></router-view>
      </div>
      <!--设置路由-->

    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        menuList: [{
          name: '老客转介绍订单',
          index: 1,
          path: '/old_cus_order'
        }, {
          name: '礼品管理',
          index: 2,
          path: '/gift_manage'
        }, {
          name: '活动管理',
          index: 3,
          path: '/active_manage'
        }],
        //当前活跃菜单
        nowActiveMenu: {
          name: '安全账号',
          index: 1,
        }

      }
    },
    mounted() {
      this.$router.push({
        path: this.nowActiveMenu.path
      })
    },
    methods: {
      goPage(index) {
        this.nowActiveMenu = this.menuList[index - 1]
        this.$router.push({
            path:this.nowActiveMenu.path
        })

      }
    },
  }
</script>

<style spoced lang="less" scoped>
  .setting-1 {
    width: 100%;
    height: 60px;
    background: #f3faff;
    font-size: 14px;




    .iconfont-absolute {
      position: absolute;
      right: 50px;
    }

    .el-menu {
      border-right: 0px;
    }

    .el-menu-item,
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }



    .wrap {
      display: flex;
      flex: auto;
      height: calc(100vh - 60px);
      background: #ffffff;
      padding-top: 10px;
      padding-left: 8px;
      padding-right: 8px;
      padding-bottom: 8px;

      .left {
        width: 200px;
        height: 100%;
        border-radius: 3px;
        margin-right: 0px;

        &.boxshadowleft {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
          border: 1px solid #ebeef5;
          border-radius: 3px;
        }

        &.left1 {
          margin-right: 10px;
          width: 240px;

          .search {
            margin: 10px 10px 20px 10px;
          }
        }

        .btndislplay {
          height: 50px;
          line-height: 50px;
          padding-left: 20px;
          margin-bottom: 4px;

          i {
            margin-right: 6px;
            font-size: 16px;
          }
        }

        .list {
          width: 100%;
          height: 50px;
          line-height: 40px;
          padding-top: 6px;
          padding-left: 46px;
          position: relative;

          .line {
            position: absolute;
            background: #0057ff;
            height: 100%;
            width: 3px;
            left: 0px;
            top: 0px;
          }

          &:hover {
            color: #0057ff;
          }


          &.active {
            background-color: rgb(218, 239, 255);
          }
        }
      }

      .right {
        width: calc(100vw - 240px);
        margin-left: 16px;
        position: relative;
        
    
      }
    }

  }
</style>