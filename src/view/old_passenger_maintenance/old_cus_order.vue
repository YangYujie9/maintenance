<template>
    <div v-loading="loading" class="old_cus_order">
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
          
                    <el-button @click.stop="search" type="primary" style="padding: 6px 18px;margin-left: 10px;" size="small" icon="el-icon-search">搜索</el-button>
                     <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :key="index" :command="list.value" v-for="(list,index) in searchTime">{{list.label}}</el-dropdown-item>
                        
                      </el-dropdown-menu>
                </el-dropdown>

                <div class="order-select">
                    <!--摄影师-->
                    <el-dropdown  class="custom-width" trigger="click" size="mini" placement="bottom">
                      <el-button class="colorgrey-icon" :class="{colorgrey: stafflistvalue.length==0}" size="mini" style="width: 120px;">
                        {{stafflistvaluedeal}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-tree  node-key="nodekey" :data="dept_and_stafflist" :props="defaultmakeup" ref="stafflist" @check="stafflistsave" show-checkbox class="custom-width-order">
                        </el-tree>
                        <div class="allorfalse">
                          <div @click="stafflistcheckall(true)" class="cursor">
                            全选
                          </div>
                          <div @click="stafflistcheckall(false)" class="allorfalse-two cursor">
                            清空
                          </div>
                        </div>
                      </el-dropdown-menu>
                    </el-dropdown>

                    <!--摄影师-->
                    <el-select clearable  class="custom-width select-hover"  size="mini" v-model="searchItem.giveType" placeholder="送礼模式">
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
              <!--<el-button type="primary" plain @click.native="editdialog_edit" class="btninput cursor" size="small">导入</el-button>-->
              <!--<el-button type="primary" plain class="btninput cursor" @click="exportcus" size="small">导出</el-button>-->
            </div>

            <el-table
                :data="searchdata"
                :header-cell-class-name="tableheaderClassName"
                class="border-q"
                :height="table_height"
                border
                @row-dblclick="dblclickdetail"
                style="width: 100%;font-size: 12px;"> 

                <el-table-column
                  type="index"
                  label="编号"
                  width="50">
                    <template slot-scope="scope"> 
                      {{scope.row.indexi}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="140"
                    label="订单时间"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.successTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="140"
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
                        <div class="cursor" @click="copytext(scope.row.oldKzPhone)">{{scope.row.oldKzPhone}}</div>
                        <div @click="copytext(scope.row.oldKzPhone)" class="cursor">{{scope.row.oldMatePhone}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="类目"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.typeName}}
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
                      {{scope.row.zxName}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="120"
                    label="渠道"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.srcName}}
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
                      {{scope.row.givename}}
                    </template>
                </el-table-column>
                <el-table-column
                    width="140"
                    label="礼物"
                    >
                    <template slot-scope="scope"> 
                      <div>{{scope.row.giftoldName ? `(老)${scope.row.giftoldName}`:''}}</div>
                      <div>{{scope.row.giftnewName ? `(新)${scope.row.giftnewName}`:''}}</div>
                    </template>
                </el-table-column>
                
                <el-table-column
                    width="160"
                    label="物流单号"
                    >
                    <template slot-scope="scope"> 
                      <div>{{scope.row.expressNumOld ? `（老）${scope.row.expressNumOld}`: ''}}</div>
                      <div>{{scope.row.expressNumNew ? `（新）${scope.row.expressNumNew}`: ''}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    width="280"
                    label="地址"
                    >
                    <template slot-scope="scope"> 
                      <div>{{scope.row.addressOld ? '（老）'+ dealaddress(scope.row.addressOld+scope.row.address2Old): ''}}</div>
                      <div>{{scope.row.addressNew ? '（新）'+ dealaddress(scope.row.addressNew+scope.row.address2New): ''}}</div>
                    </template>
                </el-table-column>
                
                <el-table-column
                    width="120"
                    label="状态"
                    >
                    <template slot-scope="scope"> 
                      <div>{{scope.row.statusOldName ? `（老）${scope.row.statusOldName}`: ''}}</div>
                      <div>{{scope.row.statusNewName ? `（新）${scope.row.statusNewName}`: ''}}</div>
                      
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
                  :page-sizes="[10,20, 30, 40, 50]"
                  :page-size="searchItem.size"
                  :current-page="searchItem.currentPage"
                  :total="searchItem.total">
                </el-pagination>
              </div>
            </div>

        </div>

        <orderDetailModel :searchDatatoatl="searchItem" @acumulate="acumulate" @research="search" v-if="editdialog.dialogVisible" :dialogVisible="editdialog.dialogVisible" :kzId="editdialog.kzId" @close="editdialog.dialogVisible = false"/>
        <!--增加表格lei数-->


        <!-- 导出 -->
        <el-dialog title="导出" :visible.sync="exportModal" width="580px">
          <div>
            <div v-for="(item,index) in exportMaxPage" :key="index" class="progre-con">
              <el-progress class="progres" :text-inside="true" :stroke-width="18" :percentage="item.status"></el-progress>
              <span class="progress-span">{{item.start}} - {{item.end}} 条</span>
              <el-button @click="uploadStart(index)" class="btn" :disabled="item.disabled" type="primary">下载</el-button>
            </div>
            
          </div>
          
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="exportModal = false" class="btnstyle btnblue">关闭</el-button>
          </span>
        </el-dialog>
        
    </div>
</template>

<script>
import timeUtil from '../../../static/js/timeUtil.js'
import orderDetailModel from '../../components/order_detail_model'
import { mapGetters } from 'vuex'
import clipboard from 'clipboard-polyfill'
let sizeexportcvs = 10000


export default {
    name: "old_cus_order",
    components: {
        orderDetailModel
    },
    data(){
        return{
            exportModal: false,
            exportMaxPage: [],
            table_height: 300,
            tableData: [],
            searchdata: [],
            loading: true,
            editdialog: {
                dialogVisible: false,
                kzId: ''
            },
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
            list: [{
              name: '确定地址',
              id: '1',
            },{
              name: '下单',
              id: '2',
            },{
              name: '送达',
              id: '3',
            },{
              name: '保留',
              id: '4',
            }],
              
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
               size: 10,
               total: 0,
               statusId: '',
               currentPage: 1,
            },
            dept_and_stafflist: [],
            defaultmakeup: {
              children: 'staffList',
              label: 'nickName'
            },
            stafflistvalue: '',
            gift_lists: [],
            stafflistcheckdata: []
        }
    },
    computed: {
        stafflistvaluedeal() {
            if (this.stafflistvalue.length > 0) {
              if (this.stafflistvalue.length > 6) {
                return this.stafflistvalue.slice(0,6) + '...'
              } else {
                return this.stafflistvalue
              }

            } else {
              return `渠道员工`
            }

        },
        ...mapGetters([
          'getpageDict',
        ]), 
    },
    mounted(){
        this.getdata()
        this.get_all_dept_and_staff()
        //console.info(this.$store.state)
        this.get_gift()

        setTimeout(()=>{
            this.table_height = this.$refs.middle.offsetHeight - 102
            
        },10)
    },
    methods:{
        //开始下载
        uploadStart(index){
          this.exportMaxPage[index].disabled = true
          /*let content = {
            page:parseInt(index + 1),
            size:10000,
            timetype: this.receiveType,
            start: timeUtil.getTimeStamp(this.timeNode.startTime),
            end: timeUtil.getTimeStampPlus59s(this.timeNode.endTime),
            // channelid: this.conditionIds.channelSelect,
            sourceid: this.conditionIds.sourcelSelect,
            shopid: this.conditionIds.shopSelect,
            staffid: this.conditionIds.staffSelect,
            typeid: '',
            pmslimit: this.pmsIds,
            linklimit: this.selectKzType,
            action: this.oSearchConfig.selectState,
            filtersql: this.filterString,
            sparesql: this.sparesql
          }*/



          let content = {
            ...this.search,
            pageNum:index + 1,
            pageSize:sizeexportcvs,
          }

          this.$exportAxios.post('excel/export_send_order', {
              ...content       
          },{
            onDownloadProgress: pro => {
              let totalSize = this.totalcount * 159
              let size = pro.loaded
              let uploadTime = parseInt((size/totalSize)*100)
              if(uploadTime >= 100){
                this.exportMaxPage[index].status = 100
              }
            },
            responseType: 'arraybuffer'
          }).then((data) => {
            
            if(data.status === 200){
              this.exportExcel(data,index)
            }else{
              this.$Message.error('网络不稳定'+data.status)
            }
          }, true)

        },
        //下载
        exportExcel(res,index) {
          let data = res.data;


          console.info(data)


          
          let fileName = `${this.getYMDTime(this.search.start)}--${this.getYMDTime(this.search.end)}${index}订单.xlsx`

          
          if (data && !data.byteLength) {
            alert('表格数据为空，无法导出！');
            return;
          }
          try {
            let linkElement = document.createElement('a');
            let blob = new Blob([data], {
              type: 'application/octet-stream'
            });
            let url = window.URL.createObjectURL(blob);
            linkElement.setAttribute('href', url);
            linkElement.setAttribute("download", fileName);
            let clickEvent = new MouseEvent("click", {
              "view": window,
              "bubbles": true,
              "cancelable": false
            });
            linkElement.dispatchEvent(clickEvent);
          } catch (ex) {
            console.log(ex);
          }
        },
        exportcus() {

            let total = this.searchItem.total
            let maxPage = Math.ceil(total / sizeexportcvs)
            let totalNumber = 0
            if (total % sizeexportcvs !== 0) {
              totalNumber = (total / sizeexportcvs).toString().split('.')[1]
            }
            let obj = []
            let pageNumber = 0
            if (maxPage !== 1) {
              for (let i = 1; i <= maxPage; i++) {
                if (i == maxPage && total % sizeexportcvs !== 0) {
                  obj.push({
                    start: pageNumber,
                    end: pageNumber + parseInt(totalNumber),
                    status:0,
                    disabled:false,
                  })
                } else {
                  obj.push({
                    start: pageNumber,
                    end: pageNumber += sizeexportcvs,
                    status:0,
                    disabled:false,
                  })
                }
              }
            } else {
              obj.push({
                start: 0,
                end: total,
                status:0,
                disabled:false,
              })
            }
          this.exportMaxPage = obj

          this.exportModal = true



        },
        get_gift() {
          this.$http.get(`gift/gift_combobox`)
            .then((data)=>{
              //console.info(data)
              this.gift_lists = data.data
            })
        },
        copytext(text) {
          clipboard.writeText(text)

          this.$message({
            message: "复制成功",
            type: 'success'
          })
        },
        dealaddress(value) {
          if (value.length > 18) {
            return value.slice(0,18) + '...'
          } else {
            return value
          }

        },
        handleSizeChange(val) {
          this.searchItem.size = val
          this.searchItem.currentPage = 1
          this.getdata()
        },
        tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
        },
        handleCurrentChange(val) {
          this.searchItem.currentPage = val
          this.getdata()
        },
        dblclickdetail(index,row) {
          this.editdialog.dialogVisible = true
          this.editdialog.kzId = index.kzId
        },
        acumulate(kzId) {
          this.editdialog.dialogVisible = false
          this.$nextTick(()=>{
            this.editdialog.dialogVisible = true
            this.editdialog.kzId = kzId
          })
          
        },
        //人员下拉列表
        get_all_dept_and_staff() {
            this.$http.get('staff/get_all_dept_and_staff')
                .then((data)=>{

                    
                    if (data.code == '100000') {

                        for (let i=0; i<data.data.length; i++) {
                          data.data[i].nickName = data.data[i].groupName
                          data.data[i].nodekey = i
                          if (data.data[i].staffList && data.data[i].staffList.length && data.data[i].staffList.length>0) {
                            for (let j=0; j<data.data[i].staffList.length; j++) {
                              data.data[i].staffList[j].nodekey = `${i}${j}`
                            }
                          }
                          
                        }


                       this.dept_and_stafflist = data.data

                       //console.info(this.dept_and_stafflist)
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }
                })
        },
        search() {
            this.getdata()
        },
        //搜素列表
        getdata() {
            let collectorId = ''
            for (let i=0;i<this.stafflistcheckdata.length;i++) {
                if (this.stafflistcheckdata[i].staffId) {
                  collectorId += this.stafflistcheckdata[i].staffId+','
                }
            }
            this.loading = true

            this.searchItem.collectorId = collectorId.slice(0,collectorId.length-1)
            this.get_cal_data()
            this.$http.post('info/get_info_list',{
                timeType: this.searchItem.timeType,
                start: this.searchItem.start/1000,
                end: this.searchItem.end/1000,
                collectorIds: this.searchItem.collectorId,
                giveType: this.searchItem.giveType,
                pageNum: this.searchItem.currentPage,
                statusId: this.searchItem.statusId,
                pageSize: this.searchItem.size,
            })
                .then((data)=>{
                    
                    if (data.code == '100000') {
                      for (let i=0; i<data.data.list.length; i++) {

                        data.data.list[i].srcName = this.getpageDict.sourceMap[data.data.list[i].sourceId].srcName

                          let arr = this.getpageDict.commonMap.commonType.filter((list) => {
                              return list.dicCode == data.data.list[i].typeId
                          })
                          data.data.list[i].typeName = arr[0].dicName


                          let arr1 = this.getpageDict.commonMap.zxStyle.filter((list) => {
                              return list.dicCode == data.data.list[i].zxStyle
                          })

                          if (arr1[0]) {
                            data.data.list[i].zxName = arr1[0].dicName
                          } else {
                            data.data.list[i].zxName = '没有咨询方式'
                          }
                          data.data.list[i].givename = ''
                          if (data.data.list[i].giveType==2) {
                            data.data.list[i].givename = '新老双送'
                          } 

                          if (data.data.list[i].giveType==1) {
                            data.data.list[i].givename = '只送老客'
                          } 

                          let arrnew = this.gift_lists.filter((list) => {
                              return list.id == data.data.list[i].giftIdNew
                          })

                          if (arrnew[0]) {
                            data.data.list[i].giftnewName = arrnew[0].giftName
                          } else {
                            data.data.list[i].giftnewName = ''
                          }


                          let arrold = this.gift_lists.filter((list) => {
                              return list.id == data.data.list[i].giftIdOld
                          })

                          if (arrold[0]) {
                            data.data.list[i].giftoldName = arrold[0].giftName
                          } else {
                            data.data.list[i].giftoldName = ''
                          }

                          let arrstatusold = this.list.filter((list) => {
                              return list.id == data.data.list[i].statusOld
                          })

                          if (arrstatusold[0]) {
                            data.data.list[i].statusOldName = arrstatusold[0].name
                          } else {
                            data.data.list[i].statusOldName = ''
                          }


                          let arrstatusnew = this.list.filter((list) => {
                              return list.id == data.data.list[i].statusNew
                          })

                          if (arrstatusnew[0]) {
                            data.data.list[i].statusNewName = arrstatusnew[0].name
                          } else {
                            data.data.list[i].statusNewName = ''
                          }


                          
                      }

                      for (let i=0; i<data.data.list.length; i++) {
                          //console.info(999)
                          data.data.list[i].indexi=(this.searchItem.currentPage-1)*this.searchItem.size+i+1
                      }
                      this.loading = false
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
        //状态总数统计
        get_cal_data() {
            this.$http.post('info/get_info_num',{
                timeType: this.searchItem.timeType,
                start: this.searchItem.start/1000,
                end: this.searchItem.end/1000,
                collectorIds: this.searchItem.collectorId,
                giveType: this.searchItem.giveType,
                pageNum: this.searchItem.currentPage,
                statusId: this.searchItem.statusId,
                pageSize: this.searchItem.size,
            })
            .then((data)=>{
                
                if (data.code == '100000') {
                   //console.info(data.data)
                   this.selectTab[0].name=`全部(${data.data.all})`
                   this.selectTab[1].name=`未送礼(${data.data.notGive})`
                   this.selectTab[2].name=`确定地址(${data.data.knownAddress})`
                   this.selectTab[3].name=`已下单(${data.data.alreadyOrder})`
                   this.selectTab[4].name=`已送达(${data.data.alreadyGive})`
                   this.selectTab[5].name=`保留(${data.data.hold})`
                } else {
                    this.$message({
                      message: data.msg,
                      type: 'error'
                    })
                }
            })
        },
        stafflistsave() {
            let checkData = this.$refs.stafflist.getCheckedNodes()

            
            this.stafflistvalue = ''
            for (let i=0;i<checkData.length;i++) {
                if (checkData[i].staffList) {

                } else {
                  this.stafflistvalue += checkData[i].nickName+','
                }


            }



            this.stafflistcheckdata = checkData

            //console.info(this.stafflistcheckdata)
        },
        stafflistcheckall(flag) {

            if (flag) {
                let stafflistchecked = []
                for (let i=0; i<this.dept_and_stafflist.length; i++) {
                  stafflistchecked.push(this.dept_and_stafflist[i].nodekey)
                  for (let j=0;j<this.dept_and_stafflist[i].staffList.length;j++) {
                    //console.info(this.dept_and_stafflist[i].staffList)
                    stafflistchecked.push(this.dept_and_stafflist[i].staffList[j].nodekey)
                  }
                  
                }

                //console.info(stafflistchecked)


                this.$refs.stafflist.setCheckedKeys(stafflistchecked)
                this.stafflistsave()
              } else {
                let stafflistchecked = []
                this.$refs.stafflist.setCheckedKeys([])

                this.stafflistvalue = ''
                this.stafflistcheckdata = []

                
              }
              
              //
        },
        handleEdit(index, row) {
          this.editdialog.dialogVisible = true
          this.editdialog.kzId = row.kzId
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

          start = new Date(timeUtil.getStartDateByDateStr(start)).getTime()
          end = new Date(timeUtil.getEndDateByDateStr(end)).getTime()

         

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


.progre-con {
  margin-bottom: 16px;

  .progress-span {
    position: relative;
    top: 3px;
    display: inline-block;
    font-size: 12px;
    max-width: 130px;
    text-align: center;
  }
  .progres {
    width: 60%;
    display: inline-block;
    margin-right: 10px;
  }
  .btn {
    padding: 4px 14px;
    margin-left: 10px;
    position: relative;
    top: 2px;
    font-size: 12px;
  }
}

.el-dropdown-menu {
  max-height: 400px;
  overflow-y: scroll;
}

.allorfalse {
 
  width: 162px;
  height: 30px;
  border-top: 1px solid #e4e7ed;


  div {
    width: 80px;
    display: inline-block;
    height: 100%;
    float: left;
    font-size: 12px;
    text-align: center;
    padding-top: 6px;

  }

  

}

.select-hover:hover .el-input__inner {
    color: #409EFF !important;
    background: #ecf5ff !important;
    border-color: #b3d8ff !important;
}

.colorgrey {
  color: #c0c4cc !important;
  
  

  

}
.colorgrey-icon {
  text-align: left !important;
  position: relative;
  .el-icon--right {
      position: absolute;
      right: 12px;
  }
}

.custom-width-order .el-tree-node__label {
  font-size: 12px;
 }


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
                width: 110px;
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
        bottom: 0px;
        right: 0px;
        left: 0px;
        height: 48px;
        background: #f4f4f4;;
        line-height: 48px;
        padding-left: 30px;
        font-size: 12px;


        .block-a {
          position: absolute;
          right: 16px;
          bottom: -10px;
          top: 8px;
          

        }

        

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
