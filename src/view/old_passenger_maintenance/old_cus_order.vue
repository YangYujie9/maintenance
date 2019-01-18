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
          
                    <el-button type="primary" style="padding: 6px 18px;margin-left: 10px;" size="small" icon="el-icon-search">搜索</el-button>
                     <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :key="index" :command="list.value" v-for="(list,index) in searchTime">{{list.label}}</el-dropdown-item>
                        
                      </el-dropdown-menu>
                </el-dropdown>

                <div class="order-select">
                    <el-select clearable  class="custom-width"  size="mini" v-model="phototype" placeholder="正常/补拍/重拍/暂定">
                      <el-option 
                        v-for="item in photolisttype" 
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
                    <el-select clearable  class="custom-width"  size="mini" v-model="phototype" placeholder="正常/补拍/重拍/暂定">
                      <el-option 
                        v-for="item in photolisttype" 
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
                </div>
                
            </div> 
            
        </div>
        <div  class="middle">
            
        </div>
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
            timeChoose: [{
              value: 'ps',
              label: '拍摄时间',
            },{
              value: 'dd',
              label: '订单时间',
            },{
              value: 'qh',
              label: '策划时间',
            }],
            photolisttype: [{
              value: '1',
              label: '正常',
            },{
              value: '2',
              label: '重拍',
            },{
              value: '3',
              label: '补拍',
            },{
              value: '4',
              label: '暂定',
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
               timeType: 'ps',
               start: '',
               end: ''
            }
        }
    },
    mounted(){
      
    },
    methods:{
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

        },
    },
}
</script>

<style lang="less">
.old_cus_order {
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
      .input-cus {
        position: absolute;
        right: 0px;
        top: -2px;
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
