<template>
    <div class="old_cus_order">
    	<div class="top">
            <div class="top-order">
                <el-select size="mini" class="widthone" v-model="searchItem.timeType" placeholder="请选择">
                    <el-option
                      v-for="item in timeChoose"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
                <!--连级时间-->
                <el-date-picker
                    v-model="searchItem.start"
                    class="widthtwo"
                    size="mini"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                  -
                <el-date-picker
                    v-model="searchItem.end"
                    class="widthtwo"
                    size="mini"
                    type="datetime"
                    placeholder="选择日期时间">
                </el-date-picker>
                <el-dropdown @command="handleCommand">
          
                    <el-button @click="search" type="primary" style="padding: 6px 18px;margin-left: 10px;" size="small" icon="el-icon-search">搜索</el-button>
                     <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :key="index" :command="list.value" v-for="(list,index) in searchTime">{{list.label}}</el-dropdown-item>
                        
                      </el-dropdown-menu>
                </el-dropdown>

                <div class="order-select">
                    <el-select clearable  class="custom-width"  size="mini" v-model="phototype" placeholder="正常/补拍/重拍/暂定">
                      <el-option 
                        v-for="item in giveType_list" 
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
                    <el-select clearable  class="custom-width"  size="mini" v-model="searchItem.giveType" placeholder="送礼模式">
                      <el-option 
                        v-for="item in giveType_list" 
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
                </div>
                
            </div> 
            
        </div>
        <div ref="middle" class="middle">
            

            <div class="table_change" >
                <el-tabs type="card" @tab-click="handleClick">
                    <el-tab-pane  class="item" :key="index" v-for="(list,index) in selectTab" :label="list.name" >
                        <span slot="label">{{list.name}}</span>
                    </el-tab-pane>

                </el-tabs>
            </div>

            <div class="input-cus">
              <el-button type="primary" plain @click.native="editdialog_edit" class="btninput cursor" size="small">导入</el-button>
              <el-button type="primary" plain class="btninput cursor" @click="matchdialog.dialogVisible = true" size="small">导出</el-button>
            </div>

            <el-table
                :data="searchdata"
                :header-cell-class-name="tableheaderClassName"
                class="border-q"
                :height="table_height"
                border
                style="width: 100%;font-size: 12px;"> 

                
                <el-table-column
                    prop="name"
                    width="120"
                    label="订单时间"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.successTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="提报时间"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.createTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="老客户"
                    >
                    <template slot-scope="scope"> 
                      <div>{{scope.row.oldKzName}}</div>
                      <div>{{scope.row.oldMateName}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="老客电话"
                    >
                    <template slot-scope="scope"> 
                      <div>{{scope.row.oldKzPhone}}</div>
                      <div>{{scope.row.oldMatePhone}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="类目"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.typeId}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="新客户"
                    >
                    <template slot-scope="scope"> 
                      <div>{{scope.row.kzName}}</div>
                      <div>{{scope.row.mateName}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="新客电话"
                    >
                    <template slot-scope="scope"> 
                      <div>{{scope.row.kzPhone}}</div>
                      <div>{{scope.row.matePhone}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="方式"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.zxStyle}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="渠道"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.sourceId}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="提报者"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.collectorName}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="送礼模式"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.giveType}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="礼物"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.giftIdNew}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="物流单号"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.expressNumNew}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="地址"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.addressNew}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="状态"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.collectorName}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="备注"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.memo}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="操作"
                    >
                    <template slot-scope="scope"> 
                      <el-button
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>


            <div class="lan">
              

              <div class="block-a">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  layout="total,sizes, prev, pager, next"
                  :page-sizes="[20, 30, 40, 50]"
                  :page-size="searchItem.size"
                  :current-page="searchItem.currentPage"
                  :total="searchItem.total">
                </el-pagination>
            </div>
        </div>

        </div>
        <!--编辑文件部分-->
        <el-dialog
            :close-on-click-modal="false"
          :visible.sync="editdialog.dialogVisible"
          width="680px"
          >
          <span slot="title">
             编辑
          </span>
          <div class="edit-content">
            <div>
               <div class="ul">
                   <span>订单点</span>
                   <el-input size="mini" class="input-new" placeholder="请输入内容"></el-input>
               </div> 
               <div class="ul">
                   <span>订单点</span>
                   <el-input size="mini" class="input-new" placeholder="请输入内容"></el-input>
               </div> 
               <div class="ul">
                   <span>订单点</span>
                   <el-input size="mini" class="input-new" placeholder="请输入内容"></el-input>
               </div> 
            </div>
            <div>
                <div class="ul">
                   <span>订单点</span>
                   <el-input size="mini" class="input-new" placeholder="请输入内容"></el-input>
               </div> 

            </div>
            <div>
                <div class="ul1">
                    <span class="lable">订单点</span>
                    <span class="el-tag">确定地址</span><!--
                    --><span class="el-tag">下单</span><!--
                    --><span class="el-tag">送达</span><!--
                    --><span class="el-tag">保留</span>
                </div>
                <div class="ul">
                   <span>订单点</span>
                   <el-input size="mini" class="input-new" placeholder="请输入内容"></el-input>
               </div> 
            </div>
            <div>
                <div class="ul1">
                    <span class="lable">订单点</span>
                    <span class="el-tag">确定地址</span><!--
                    --><span class="el-tag">下单</span><!--
                    --><span class="el-tag">送达</span><!--
                    --><span class="el-tag">保留</span>
                </div>
                <div class="ul">
                   <span>订单点</span>
                   <el-input size="mini" class="input-new" placeholder="请输入内容"></el-input>
               </div> 
            </div>
            <div>
                <div class="table_change table_positive" >
                    <el-tabs type="card" @tab-click="handleClick">
                        <el-tab-pane  class="item" :key="index" v-for="(list,index) in select_cus_msg" :label="list.name" >
                            <span slot="label">{{list.name}}</span>
                        </el-tab-pane>

                    </el-tabs>

                    <div class="acumulate">
                        累计介绍（4/6）
                    </div>
                </div>

                <div class="ullist">
                    <el-radio label=""></el-radio>
                    <span class="input-span">老客户</span>
                    <el-input size="mini" style="margin-right: 40px" class="input-new" placeholder="请输入内容"></el-input>

                    <span class="input-span">老客户</span>
                    <el-input size="mini" class="input-new" placeholder="请输入内容"></el-input>
                    <el-button size="mini" class="btn_circle" icon="el-icon-plus" circle></el-button>
                </div>
                
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="editdialog.dialogVisible = false">取 消</el-button>
            <el-button size="small" type="primary" >确 定</el-button>
          </span>
        </el-dialog>
        <!--编辑文件部分-->
        <!--增加表格lei数-->
        <el-dialog
            :close-on-click-modal="false"
            :visible.sync="matchdialog.dialogVisible"
            width="500px"
          >
              <span slot="title">
                 匹配
              </span>
              <div class="match_content">
                <div class="ul">
                   <span>订单点</span>
                   <el-input size="mini" class="input-new" placeholder="请输入内容"></el-input>
                </div>

                <el-table
                    :data="tableData"
                    :header-cell-class-name="tableheaderClassName"
                    class="border-q"
                    border
                    style="width: 100%;font-size: 12px"> 
                </el-table>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="matchdialog.dialogVisible= false">取 消</el-button>
                <el-button size="small" type="primary" >确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import timeUtil from '../../../static/js/timeUtil.js'

export default {
    name: "old_cus_order",
    components: {
        
    },
    data(){
        return{
            matchdialog: {
                dialogVisible: false
            },
            table_height: 300,
            tableData: [],
            searchdata: [],
            editdialog: {
                dialogVisible: false
            },
            select_cus_msg: [
                {
                    name: '全部(0)',
                    id: '',
                    choose: true
                },
                {
                    name: '一次拍摄(0)',
                    id: '0',
                    choose: false
                },
            ],
            phototype: '',
            selectTab: [
              {
                  name: '全部(0)',
                  id: '',
                  choose: true
              },
              {
                  name: '未送礼(0)',
                  id: '0',
                  choose: false
              },
              {
                  name: '确定地址(0)',
                  id: '1',
                  choose: false
              },
              {
                  name: '已下单(0)',
                  id: '2',
                  choose: false
              },
              {
                  name: '已送达(0)',
                  id: '3',
                  choose: false
              },
              {
                  name: '保留(0)',
                  id: '4',
                  choose: false
              },
            ],
            timeChoose: [{
              value: 'successtime',
              label: '订单时间',
            },{
              value: 'createtime',
              label: '提报时间',
            }],
            giveType_list: [{
              value: '1',
              label: '只送老客',
            },{
              value: '2',
              label: '新老双送',
            }],
            searchTime: [
              {label: "今天",value: "today"},
              {label: "昨天",value: "yesterday"},
              {label: "本周",value: "thisWeek"},
              {label: "上周",value: "lastWeek"},
              {label: "本月",value: "thisMonth"},
              {label: "上月",value: "lastMonth"},
              {label: "本季度",value: "thisQuarter"},
              {label: "上季度",value: "lastQuarter"},

            ],
            searchItem: {
               timeType: 'successtime',
               end: new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),
               start: new Date(new Date(new Date().toLocaleDateString()).getTime()),
               collectorId: '',
               giveType: '',
               size: 20,
               total: 0,
               statusId: '',
               currentPage: 1,
            }
        }
    },
    mounted(){
        this.getdata()

        setTimeout(()=>{
            this.table_height = this.$refs.middle.offsetHeight - 92
        },0)
    },
    methods:{
        handleSizeChange(val) {
          this.searchItem.size = val
          this.getdata()
        },
        handleCurrentChange(val) {
          this.searchItem.currentPage = val
          this.getdata()
        },
        editdialog_edit() {
            this.editdialog.dialogVisible = true
            
        },
        search() {
            this.getdata()
        },
        getdata() {
            this.$http.post('info/get_info_list',{
                timeType: 'successtime',
                start: 1515340800,
                end: this.searchItem.end/1000,
                collectorId: this.searchItem.collectorId,
                giveType: this.searchItem.giveType,
                pageNum: this.searchItem.currentPage,
                statusId: this.searchItem.statusId,
                pageSize: this.searchItem.size,
            })
                .then((data)=>{
                    
                    if (data.code == '100000') {
                       this.searchdata=data.data.list
                       this.searchItem.total=data.data.total
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }
                })
        },
        handleEdit(index, row) {

        },
        tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
        },
        handleCommand(type) {

          let start = ''
          let end = ''
          switch (type) {
            case'today':
              start = timeUtil.getYmdToday()
              end = timeUtil.getYmdToday()
              break
            case'yesterday':
              start = timeUtil.getYesterDay()
              end = timeUtil.getYesterDay()
              break
            case'thisWeek':
              start = timeUtil.getFirstYmdThisWeek()
              end = timeUtil.getLastYmdThisWeek()
              break
            case'lastWeek':
              start = timeUtil.getLastWeekFistDay()
              end = timeUtil.getLastWeekLastDay()
              break
            case'thisMonth':
              start = timeUtil.getYmdMonthFirst()
              end = timeUtil.getYmdMonthLast()
              break
            case'lastMonth':
              start = timeUtil.getLastYmdMonthFirst()
              end = timeUtil.getLastYmdMonthEnd()
              break
            case'thisQuarter':
              start = timeUtil.getFirstDayOfThisQuarter()
              end = timeUtil.getEndDayOfThisQuarter()
              break
            case'lastQuarter':
              start = timeUtil.getFirstDayOfLastQuarter()
              end = timeUtil.getEndDayOfLastQuarter()
              break
          }

          start = timeUtil.getStartDateByDateStr(start);
          end = timeUtil.getEndDateByDateStr(end);


          this.searchItem.start = start
          this.searchItem.end = end
          this.getdata()
        },
        handleClick(tab) {
          this.searchItem.statusId = this.selectTab[tab.index].id
          this.getdata()
          
        },
    },
}
</script>

<style lang="less">

.btninput {
    padding: 7px 24px !important;

    .el-button:hover {
      background: #0057ff;
      color: #ffffff;
    }
    
}

.match_content {
    .ul {
        display: inline-block;
        margin-right: 16px;
        margin-bottom: 10px;
        padding-left: 40px;

        span {
            padding-right: 10px;
        }

        .input-new {
            display: inline-block;
            width: 160px;
        }

        
    }
}

.input-cus {
    .el-button:hover {
    background: #0057ff !important;
    color: white !important;

    }
}

.el-table .table-head-th{
    background-color:#f4f4f4;
    color: #000;
    padding: 6px 0;
}

.border-q {
    position: relative;
    top: -15px;
}

.edit-content {
    font-size: 12px;
    .input-new {
        display: inline-block;
        width: 130px;
    }



    .input-span {
        padding-right: 10px;
    }
    .ullist {
        position: relative;
        padding-left: 10px;
        margin-bottom: 10px;

        .btn_circle {
            position: absolute;
            right: 10px;

        }
    }
    .table_positive {
        position: relative;
        margin-top: 6px;


        .acumulate {
            position: absolute;
            border: 1px solid #e4e7ed;
            left: 300px;
            top: 1px;
            height: 33px;
            padding: 0 12px;
            line-height: 33px;
            border-radius: 4px;
            border-bottom: 0px;
        }
    }
    .ul {
        display: inline-block;
        margin-right: 16px;
        margin-bottom: 10px;

        span {
            padding-right: 10px;
        }

        
    }

    .ul1 {
        display: inline-block;
        margin-right: 36px;
        margin-bottom: 10px;

        .lable {
            padding-right: 10px;
        }

        .el-tag {
            padding: 0 16px;
            min-width: 80px;
            text-align: center;
            background: white;
            color: #606266;
            border-color: #e4e7ed;
            height: 28px;
            line-height: 28px;
        }
    }
}

.el-select-dropdown__item {
    font-size: 12px;
}

.btnbluet {
    background: #409EFF !important;
    color: white;


    
  }

  .btnbluet:focus, .el-button:hover {
      color: #409EFF !important;
      background: #ecf5ff !important;
      border-color: #b3d8ff !important;
  }
.old_cus_order {
    font-size: 12px;
    

    

   .top {
        background:rgb(250, 250, 250);
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #e4e7ed;
        padding: 20px 20px 10px;
        margin-bottom: 20px;


        .top-order {
            display: flex;

            .widthtwo {
                width: 140px !important;
                margin-bottom: 10px;


                 .el-input__prefix {
                  display: none
                 }

                 .el-input__suffix {
                  display: none
                 }


                 .el-input--prefix .el-input__inner {
                    padding-right: 6px !important;
                 }
            }

            .el-input--prefix .el-input__inner {
                padding-left: 8px !important;
                padding-right: 6px !important;
            }

            .widthone {
                width: 100px;
                margin-bottom: 10px;
                margin-right: 10px;
            }

            .order-select {
                display: inline-block;
                margin-left: 10px;
            }

            .custom-width {
                width: 120px;
                margin-right: 10px;
                margin-bottom: 10px;
            }
            

            .top-order-left {
                width: 500px;
                border-radius: 3px;
                margin-right: 10px;
            }

            .top-order-right {
                flex: 1 1 auto;
            }


        }

   }


   .middle {
      margin-top: 0px;
      position: relative;
      padding-left:16px;
      padding-right: 16px;
      height: calc(100vh - 200px);

      .lan {
        position: absolute;

        bottom: 10px;
        right: 20px;
      }

      

      
      .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
        border-bottom-color: #e4e7ed;
        background: #0057ff;
        color: white;
      }

      .input-cus {
        position: absolute;
        right: 16px;
        top: -2px;


        .btninput {
            padding: 7px 24px !important;

            .el-button:hover {
              background: #0057ff;
              color: #ffffff;
            }
            
        }
      }
        .yeang-menu {
            padding: 20px 20px 0 20px;



            span {
                display: inline-block;
                padding: 5px 20px 6px 20px;
                border-bottom: 1px solid #e2e2e2;

                margin-right: -1px;


                &.ge {
                    padding-right: 100px;
                    position: relative;
                    left: -5px;
                }

                &.active {
                    border: 1px solid #e2e2e2;
                    border-bottom: 0px;
                    color: #0057ff;
                }
            }
        }

        .table-wrap {
            padding: 10px 0px 0 20px;
            padding-top: 0px 0px 0 20px;
            position: relative;
            top: -25px;
        }
    }

}
  
</style>
