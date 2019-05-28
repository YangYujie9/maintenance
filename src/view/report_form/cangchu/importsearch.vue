<template>
  <div>
  <vHeader :headListx='headListx' :index="1"  ></vHeader>
  <div ref="cangchu" class="cangchu">
  	<div ref="cangchu_top" class="cangchu-top">
  		<p class="search-p">
            <span >数据类型：</span>
            
            <el-select clearable v-model="search.type" size="mini" class="input-class" placeholder="请选择数据类型">
                <el-option
                  v-for="item in getout_coming_report"
                  :key="item.dicCode"
                  :label="item.dicName"
                  :value="item.dicCode">
                </el-option>
            </el-select>
        </p>
        <p class="search-p">
            <span >借出时间：</span>
            <el-date-picker
              v-model="search.loanTime"
              size="mini" class="input-class" 
              type="date"
              placeholder="借出时间">
            </el-date-picker>
        </p>
        <p class="search-p">
            <span >上传时间：</span>
            <el-date-picker
              v-model="search.uploadTime"
              size="mini" class="input-class" 
              type="date"
              placeholder="上传时间">
            </el-date-picker>
        </p>
        <p class="search-p">
            <span >归还时间：</span>
            <el-date-picker
              v-model="search.backTime"
              size="mini" class="input-class" 
              type="date"
              placeholder="归还时间">
            </el-date-picker>
        </p>
        <p class="search-p">
            <span >货号：</span>
            <el-input size="mini" class="input-class" v-model="search.wareId" placeholder="请输入货号"></el-input>
        </p>
        <p class="search-p">
            <span >编号：</span>
            <el-input size="mini" class="input-class" v-model="search.id" placeholder="请输入编号"></el-input>
        </p>
        <p class="search-p">
            <span >备注：</span>
            <el-input size="mini" class="input-class" v-model="search.remark" placeholder="请输入备注"></el-input>
        </p>
        <p class="search-p">
            <span >颜色：</span>
            <el-input size="mini" class="input-class" v-model="search.color" placeholder="请输入颜色"></el-input>
        </p>
        <p class="search-p">
            <span >钉钉编号：</span>
            <el-input size="mini" class="input-class" v-model="search.dingNum" placeholder="请输入钉钉编号"></el-input>
        </p>
        <p class="search-p">
            <span >是否归还：</span>

            <el-select clearable v-model="search.isBack" size="mini" class="input-class" placeholder="请选择是否归还">
                <el-option
                  v-for="item in isMoneyselect"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </p>
        <p class="search-p">
            <span >员工：</span>

            <el-input size="mini" class="input-class" v-model="search.staffName" placeholder="请输入员工"></el-input>
        </p>
        <p class="search-p">
            <span >部门：</span>

            <el-input size="mini" class="input-class" v-model="search.groupName" placeholder="请输入部门"></el-input>
        </p>
        <p style="position: relative;">
            <el-button @click="select_reports" size="mini" style="margin-bottom: 20px" type="primary">搜索</el-button>

          <el-button @click="clearsearch" size="mini" style="margin-left: 20px;margin-bottom: 20px" type="primary">重置</el-button>

          <el-button size="mini" @click="exportcus" style="margin-left: 20px;margin-bottom: 20px" type="primary">导出</el-button>

          <el-button :disabled="uploadflag" size="mini" style="margin-left: 20px;margin-bottom: 20px" type="primary">{{uploadflag?'上传中': '上传'}}</el-button>
          <input type="file" class="inpucus cursor" @change="tirggerFile($event)" />

             
              
        </p>

  	</div>
  	<div :style="{height: table_height+'px'}" class="table-wrap">

  		<el-table
                :data="tableData"
                border
                class="import-cus-table"
                :height="table_height - 40"
                style="width: 100%;font-size: 12px;">
                
                <el-table-column
                    width="50"
                    label="编号"
                    >
                    <template slot-scope="scope">
                      {{scope.row.id}}
                    </template>
                </el-table-column>
                
                <el-table-column
                    label="数据类型"
                    >
                    <template slot-scope="scope">
                      <span>{{filterstatus(scope.row.type)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="款号"
                    >
                    <template slot-scope="scope">
                      {{scope.row.wareId}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="部门"
                    >
                    <template slot-scope="scope">
                      	<span>{{scope.row.groupName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="姓名"
                    >
                    <template slot-scope="scope">
                      	<span>{{scope.row.staffName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="钉钉编号"
                    >
                    <template slot-scope="scope">
                      {{scope.row.dingNum}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="颜色"
                    >
                    <template slot-scope="scope">
                      {{scope.row.color}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="尺码"
                    >
                    <template slot-scope="scope">
                      {{scope.row.size}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="数量"
                    >
                    <template slot-scope="scope">
                      {{scope.row.num}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="借出时间"
                    >
                    <template slot-scope="scope">
                      {{scope.row.loanTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否归还"
                    >
                    <template slot-scope="scope">
                      {{scope.row.isBack}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="归还时间"
                    >
                    <template slot-scope="scope">
                      {{scope.row.backTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="上传时间"
                    >
                    <template slot-scope="scope">
                      {{scope.row.uploadTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="内购价格"
                    >
                    <template slot-scope="scope">
                      {{scope.row.freeDomPrice}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="出库备注"
                    >
                    <template slot-scope="scope">
                      {{scope.row.outRemark}}
                    </template>
                </el-table-column>
                
            </el-table>
            <div class="pagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[250, 300, 350, 400, 450]"
                :page-size="search.pageSize"
                :current-page="search.pageNum"
                :total="search.total"
                layout="total,sizes, prev, pager, next"
                >
              </el-pagination>
            </div>
    </div>
    

    
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import vHeader from '../head'
  export default {
    name: "system-setting",
    components: {
        vHeader
    },
    data(){
      return{
        headListx: [
            {
                name: '仓储出库报表',
                choose: false,
                link:'/reportcangchu/cangchu',
            },
            {
                name: '借样出库报表',
                choose: true,
                link:'/reportcangchu/importsearch',
            },
            /*{
                name: '品控报表',
                choose: false,
                link:'/report/pinkong',
            },*/
            
        ],
      	table_height: '300',
      	isMoneyselect: [ 
            {
                label: '是',
                value: '是', 
            },
            {
                label: '否',
                value: '否', 
            },
        ],
        tableData: [],
        stafflist: [],
        uploadflag: false,
        search: {
        	id: '',
        	type: '',
        	groupId: '',
        	loanTime: '',
        	isBack: '',
        	wareId: '',
        	uploadTime: '',
        	staffId: '',
          staff: '',
          staffvalue: '',
        	backTime: '',
        	dingNum: '',
        	color: '',
        	remark: '',
        	pageNum: 1,
        	pageSize: 250,
          staffName: '',
          groupName: '',
        	total: 0,

        }
      }
    },
    computed: {
        ...mapGetters([
            'getpageDict',
        ]),
        getout_coming_report() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "export_report"
            })


            if (demand_status[0]) {
                return demand_status[0].dicList
            } else {
                return []
            }

            
        },
        staffvalueshow() {
            let string = '请选择员工'

            if (this.search.staffvalue.length > 14 || this.search.staffvalue.length == 14) {
                string = this.search.staffvalue.substr(0, 14) + '...'
            } else if (this.search.staffvalue.length>0 && this.search.staffvalue.length<14) {
                string = this.search.staffvalue
            }

            return string
        }
    },
    created() {
        
    },
    mounted(){ 
      this.select_reports()

      this.$nextTick(()=>{
        this.table_height = this.$refs.cangchu.offsetHeight - this.$refs.cangchu_top.offsetHeight -30
      })
      this.get_group_staff_list()
    },
    methods:{
      importcus() {
          let routerEditor = this.$router.resolve({
            name: "importcangchu",
          })
          window.open(routerEditor.href, '_blank') 
      },
      staffsave() {
          let checkData = this.$refs.staff.getCheckedNodes()

          this.search.staffIds = []
          this.search.staffvalue = ''
          

          for (let i=0;i<checkData.length;i++) {
            if (!checkData[i].group) {
                this.search.staffIds.push(checkData[i].id)
              
                this.search.staffvalue += checkData[i].label+','
            }


          }
          

        },
        get_group_staff_list() {
            this.$http.get(`staff/get_group_staff_list?groupId=`)
                .then((data)=>{


                        let array = []





                        for (let i=0; i<data.data.length; i++) {
                            array.push({group: true,label: data.data[i].groupName, id: data.data[i].groupId})
                            
                            if ((data.data[i].list && data.data[i].list.length>0) || (data.data[i].groupStaffVOS && data.data[i].groupStaffVOS.length>0)) {
                                array[array.length-1]['children']=[]

                                for(let j=0; j<data.data[i].list.length; j++) {
                                    array[array.length-1]['children'].push({id: data.data[i].list[j].id, label: data.data[i].list[j].staffName,group: false})
                                }

                                for(let j=0; j<data.data[i].groupStaffVOS.length; j++) {
                                    this.diguidata(data.data[i].groupStaffVOS[j],array[array.length-1]['children'])
                                }


                            }

                        }

                        this.stafflist = array

                    })
                    .catch(()=>{
                        this.$message({
                          message: '接口报错',
                          type: 'error'
                        })
                    })
        },

        diguidata(groupStaffVOS,array) {

                
               array.push({group: true,label: groupStaffVOS.groupName,id: groupStaffVOS.groupId})



               if ((groupStaffVOS.list && groupStaffVOS.list.length>0) || (groupStaffVOS.groupStaffVOS && groupStaffVOS.groupStaffVOS.length>0)) {

                    array[array.length-1]['children'] = []

                   

                                

                    for(let j=0; j<groupStaffVOS.list.length; j++) {
                        array[array.length-1]['children'].push({id: groupStaffVOS.list[j].id, label: groupStaffVOS.list[j].staffName, group: false})
                    }



                    for(let j=0; j<groupStaffVOS.groupStaffVOS.length; j++) {



                        this.diguidata(groupStaffVOS.groupStaffVOS[j],array[array.length-1]['children'])
                    }


                }

                
                
            
            
      },
    	filterstatus(id) {
            let demand_status = this.getout_coming_report.filter((list) => {
                return list.dicCode == id
            })


            if (demand_status[0]) {
                return demand_status[0].dicName
            } else {
                return id
            }
        },
    	clearsearch() {
            this.search.id = ''
            this.search.wareId = ''
            this.search.color = ''
            this.search.groupId = ''
            this.search.loanTime = ''
            this.search.isBack = ''
            this.search.staffName = ''
            this.search.groupName = ''
            this.search.incomingReason = ''
            this.search.type = ''
            this.search.uploadTime = ''
            this.search.staffId = ''
            this.search.staffIds = []
            this.search.staffvalue = ''
            this.search.backTime = ''
            this.search.dingNum = ''
            this.search.remark = ''
            this.search.pageNum = 1
            this.select_reports()
        },
    	handleSizeChange(val) {
          this.search.pageSize = val
          this.search.pageNum = 1
          this.select_reports()
        },
        handleCurrentChange(val) {
          this.search.pageNum = val
          this.select_reports()
        },
      	select_reports() {
	      	let that = this
	        this.$http.post(`reports/get_export_report_list`,{
	            id: this.search.id,
	            wareId: this.search.wareId,
	            pageNum: this.search.pageNum,
	            pageSize: this.search.pageSize,
	            type: this.search.type,
	            isBack: this.search.isBack,
	            remark: this.search.remark,
	            loanTime: this.search.loanTime ? this.search.loanTime.getTime().toString().substr(0, 10): '',
	            dingNum: this.search.dingNum,
	            backTime: this.search.backTime ? this.search.backTime.getTime().toString().substr(0, 10): '',
	            uploadTime: this.search.uploadTime ? this.search.uploadTime.getTime().toString().substr(0, 10): '',
	            color: this.search.color,
	            staffName: this.search.staffName,
	            groupName: this.search.groupName,
	        })
	       .then((data)=>{
	           this.tableData = data.data.list
	           this.search.total = data.data.total


	        })
	        .catch(function (error) {
	            console.log(error);
	            that.$message({
	                message: '接口报错',
	                type: 'error'
	              });
	        }) 
      },
      //文件上传
        tirggerFile : function (event) {
          let that = this


            if (this.uploadflag) {
                return this.$message({
                  message: "正在上传中",
                  type: 'error'
                })
            }
            this.uploadflag = true
            var file = event.target.files[0]

            let formData = new FormData();
            formData.append('file', file);

            this.$http({
                url:  'reports/upload_out_coming_report',
                method: 'POST',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((res) => {
                that.uploadflag = false
                event.target.value=""
                if (res.code == '200') {


                    that.$message({
                      message: res.msg,
                      type: 'success'
                    })
                } else {
                    that.$message({
                      message: res.msg,
                      type: 'error'
                    })
                }

                that.select_reports()

            })

      },
      exportcus() {
            let that = this
          this.$exporthttp.post(`reports/export_put_list`,{
                id: this.search.id,
	            wareId: this.search.wareId,
	            type: this.search.type,
	            isBack: this.search.isBack,
	            remark: this.search.remark,
	            loanTime: this.search.loanTime ? this.search.loanTime.getTime().toString().substr(0, 10): '',
	            dingNum: this.search.dingNum,
	            backTime: this.search.backTime ? this.search.backTime.getTime().toString().substr(0, 10): '',
	            uploadTime: this.search.uploadTime ? this.search.uploadTime.getTime().toString().substr(0, 10): '',
	            color: this.search.color,
	            staffName: this.search.staffName,
              groupName: this.search.groupName,

          },{
            
            responseType: 'arraybuffer'
          })
            .then(function (res) {
              console.info(res)              

              let fileName = decodeURI(res.headers['file-name'])
              let data = res.data

              


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
            })
            .catch(function (error) {
              console.log(error);
              that.loading2 = false
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
        },
      
    },
  }
</script>

<style>
    .table-wrap .el-table td, .el-table th {
        padding: 4px 0px;
        text-align: center;

    } 
    .table-wrap .el-table .cell, .el-table th div {
        padding-right: 0px;
        

    }
    .table-wrap .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
        padding-left: 0px;
    }
</style>
<style spoced lang="less">
.firststopwrap {
    span {
        font-size: 12px;
    }
}


.inpucus {
    opacity: 0;
    background: red;
    width: 60px;
    height: 26px;
    z-index: 10;
    position: absolute;
    left: 240px;
    top: 0px;

    &.iupzinde {
        z-index: 1;
    }
}

    
.cangchu {
    height: calc(100vh - 160px); 

    &-top {
        border-bottom: 1px solid #e2e2e2;
        margin-top: 20px;
        padding-left: 10px;


        .search-p {
            display: inline-block;
            margin-bottom: 20px;
            margin-right: 20px;
            font-size: 13px;

            .input-class {
                display: inline-block;
                width: 180px;
                margin-right: 20px
            }
        }
    }

    .table-wrap {
        margin-top: 10px;
        width: calc(100vw - 90px); 
        position: relative;

        .pagination {
            position: absolute;
            bottom: 0px;
            right: 20px;
          }

    }
}
  
</style>
