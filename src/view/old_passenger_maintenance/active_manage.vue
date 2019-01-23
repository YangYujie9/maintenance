<template>
    <div class="active_manage">
        <div ref="middle" class="middle">
            <div class="table_change" >
                <el-tabs type="card" @tab-click="handleClick">
                    <el-tab-pane  class="item" :key="index" v-for="(list,index) in selectTab" :label="list.name" >
                        <span slot="label">{{list.name}}</span>
                    </el-tab-pane>

                </el-tabs>
            </div>
            <div class="input-cus">
                <el-button type="primary" plain class="btninput cursor" size="small">分类</el-button>
                <el-button type="primary" plain  class="btninput cursor" size="small">新增</el-button>
            </div>
            <el-table
                :data="giftdata"
                :header-cell-class-name="tableheaderClassName"
                class="border-q"
                :height="table_height"
                border
                style="width: 100%;font-size: 12px;"> 
                <el-table-column
                  type="index"
                  label="编号"
                  width="50">
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="活动分类"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.typeName}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="活动名字"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.giftName}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="建立时间"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.createTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="下架时间"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.soldOutTime}}
                    </template>
                </el-table-column>
                
                <el-table-column
                    prop="name"
                    width="120"
                    label="图片"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.typeName}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="状态"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.statusId == 1? '上架': '下架'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="备注"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.remark}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="操作"
                    >
                    <template slot-scope="scope"> 
                        <el-button
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>


        </div>
    </div>
</template>

<script>

export default {
    name: "active_manage",
    components: {
        
    },
    data(){
        return{
            statusId: '1',
            giftdata: [],
            table_height: '300',
            selectTab: [
              {
                  name: '在线活动(0)',
                  id: 1,
                  choose: true
              },
              {
                  name: '下架活动(0)',
                  id: 0,
                  choose: false
              },
              
            ],
        }
    },
    mounted(){
        setTimeout(()=>{
            this.table_height = this.$refs.middle.offsetHeight - 82
        },0)
    },
    methods:{
        handleClick(tab) {
          this.statusId = this.selectTab[tab.index].id
        },
        tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
        },
    },
}
</script>

<style lang="less">


.el-table .table-head-th{
    background-color:#f4f4f4;
    color: #000;
    padding: 6px 0;
}
.active_manage {
    .ul {
        margin-bottom: 22px;
        span {
            padding-right: 16px;
        }

        .input-new {
            display: inline-block;
            width: 160px;
        }
    }
    .edit_content {
        font-size: 12px;
        
    }
    .middle {
     padding: 20px 16px 10px 16px;
     height: calc(100vh - 100px);
     position: relative;

     .input-cus {
        position: absolute;
        right: 20px;
        top: 16px;


        .btninput {
            padding: 7px 24px !important;

            .el-button:hover {
              background: #0057ff;
              color: #ffffff;
            }
            
        }
      }

   }
}
  
</style>
