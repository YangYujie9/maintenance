<template>
  <div>
  <vHeader :headListx='headListx' :index="0"  ></vHeader>
    <div ref="cangchu" class="cangchu">
    	<div ref="cangchu_top" class="cangchu-top">
        	<p class="search-p">
                <span >下单时间：</span>
                <el-date-picker

                size="mini"
                v-model="search.start"
                type="date"
                style="margin-right: 0px;"
                class="input-class"
                placeholder="起始日期">
              </el-date-picker>-<el-date-picker
                size="mini"
                v-model="search.end"
                type="date"
                class="input-class"
                placeholder="终止日期">
            </el-date-picker>
              
            </p>

            <p class="search-p">
                
                <el-input size="mini" class="input-class" style="width: 200px;" v-model="search.memo" placeholder="请输入供应链、服装类型、货号"></el-input>
            </p>
            

            <p style="position: relative;">
                <el-button @click="select_reports" size="mini" style="margin-bottom: 20px" type="primary">搜索</el-button>

              <el-button @click="clearsearch" size="mini" style="margin-left: 20px;margin-bottom: 20px" type="primary">重置</el-button>

              
              <el-button  :disabled="uploadflag" size="mini" style="margin-left: 20px;margin-bottom: 20px" type="primary">{{uploadflag?'上传数据中': '上传数据'}}</el-button>
              <input  type="file" class="inpucus cursor" @change="tirggerFile($event)" />


              <el-button size="mini" style="margin-left: 20px;margin-bottom: 20px" @click="picuploadshow" type="primary">上传图片</el-button>
              
            </p>


    	</div>
    	<div :style="{height: table_height+'px'}" class="table-wrap">
    		<el-table
                :data="tableData"
                :height="table_height - 40"
                style="width: 100%">
                	<el-table-column
                      prop="id"
                      label="编号"
                      width="50"
                      >
                      
                    </el-table-column>
                	
                    <el-table-column
                      prop="supplyName"
                      label="供应链"
                      >
                     
                      
                    </el-table-column>
                    <el-table-column
                      prop="factory"
                      label="厂家"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="clothTypeName"
                      label="服装类型"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="detailType"
                      label="明细类型"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="wareId"
                      label="货号"
                      >
                      
                    </el-table-column>
                    
                    <el-table-column
                      prop="date"
                      label="订单图片"
                      width="100"
                      >
                       <template slot-scope="scope">
                          
                          <span v-if="scope.row.path">


                            <img @dblclick="openBigImg(`http://hzyymy.cn/${scope.row.path}`)" style="width: 120px;" :src="`http://hzyymy.cn/${scope.row.path}`"/>



                            
                          </span>
                          
                          
                      </template>
                      
                    </el-table-column>
                    <el-table-column
                      prop="orderType"
                      label="订单类型"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="orderNum"
                      label="下单量"
                      width="100"
                      >
                      
                    </el-table-column>
	                <el-table-column
                      prop="level"
                      label="首单量级划分"
                      >
                     
                    </el-table-column>
                    <el-table-column
                      prop="memo"
                      label="为满足首单的到货情况"
                      >
                     
                    </el-table-column>
                    <el-table-column
                      prop="arriveNum"
                      label="首单到货量"
                      >
                     
                    </el-table-column>
                    <el-table-column
                      prop="orderDate"
                      label="下单时间"
                      >
                      <template slot-scope="scope">
                        {{scope.row.orderTime ? fmtDate(scope.row.orderTime) : ''}}
                      </template>
                     
                    </el-table-column>
                    <el-table-column
                      prop="arriveDate"
                      label="到货时间"
                      >

                      <template slot-scope="scope">
                        {{scope.row.arriveTime ? fmtDate(scope.row.arriveTime) : ''}}
                      </template>
                     
                    </el-table-column>
                    <el-table-column
                      prop="deliveryTime"
                      label="总货期"
                      >
                     
                    </el-table-column>
                    <el-table-column
                      prop="cost"
                      label="成本"
                      >
                     
                    </el-table-column>
                    <el-table-column
                      prop="price"
                      label="售价"
                      >
                     
                    </el-table-column>
                    <el-table-column
                      prop="returnRate"
                      label="累计退款率"
                      >
                     
                    </el-table-column>
                    <el-table-column
                      prop="returnRateNet"
                      label="累计退款率（动态）"
                      >
                     
                    </el-table-column>
                    <el-table-column
                      prop="remark"
                      label="备注"
                      >
                     
                    </el-table-column>
                    <el-table-column
                      prop="orderDel"
                      label="订单取消"
                      >
                     <template slot-scope="scope">
                        {{scope.row.orderDel? '已取消': '' }}
                      </template>
                    </el-table-column>

                    <el-table-column
                      prop="confirmer"
                      label="操作"
                      >
                      <template slot-scope="scope">
                          <el-button
                          size="mini"
                          type="primary"
                          
                          @click="editsecondsteprow(scope.row)"
                         >编辑</el-button>
                          
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

    <el-dialog
          title="修改"
          :visible.sync="editsecondstep.dialogVisible"
          width="640px"
          :close-on-click-modal="false"

          >
          	<div class="firststopwrap">
          		<p style="margin-top: 20px;">
                  <span >供应链：</span>
                  <el-select style="margin-right: 20px;" clearable v-model="editsecondstep.supply" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in visual_supply"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                    </el-option>
                  </el-select>

                  <span style="padding-left: 20px;">工厂：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入工厂" v-model="editsecondstep.factory" ></el-input>
                </p>

                <p style="margin-top: 20px;">
                  <span >服装类型：</span>
                  <el-select style="margin-right: 20px;" clearable v-model="editsecondstep.clothType" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in cloth_type"
                      :key="item.dicCode"
                      :label="item.dicName"
                      :value="item.dicCode">
                    </el-option>
                  </el-select>

                  <span style="padding-left: 20px;">明细类型：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入明细类型" v-model="editsecondstep.detailType" ></el-input>
                </p>

                <p style="margin-top: 20px;">
                  <span >后道确认类型：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入后道确认类型" v-model="editsecondstep.hdClothType" ></el-input>

                  <span style="padding-left: 20px;">后道确认明细：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入后道确认明细" v-model="editsecondstep.hdDetailType" ></el-input>
                </p>

               
                <p style="margin-top: 20px;">
                  <span >下单量：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入下单量" v-model="editsecondstep.orderNum" ></el-input>

                  <span style="padding-left: 20px;">订单类型：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入订单类型" v-model="editsecondstep.orderType" ></el-input>
                </p>
                <p style="margin-top: 20px;">
                  <span >下单时间：</span>
                  <el-date-picker

	                size="mini"
	                v-model="editsecondstep.orderTime"
	                type="date"
	                style="display: inline-block;width: 170px;font-size: 12px;" 
	                class="input-class"
	                placeholder="起始日期">
	              </el-date-picker>

                  <span style="padding-left: 20px;">到货时间：</span>
                  <el-date-picker

	                size="mini"
	                v-model="editsecondstep.arriveTime"
	                type="date"
	                style="display: inline-block;width: 170px;font-size: 12px;" 
	                class="input-class"
	                placeholder="到货时间">
	              </el-date-picker>
                </p>

                <p style="margin-top: 20px;">
                  <span >总货期：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入总货期" v-model="editsecondstep.deliveryTime" ></el-input>

                  <span style="padding-left: 20px;">成本：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入成本" v-model="editsecondstep.cost" ></el-input>
                </p>
                <p style="margin-top: 20px;">
                  <span >售价：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入售价" v-model="editsecondstep.price" ></el-input>

                  <span style="padding-left: 20px;">累计退款率：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入成本" v-model="editsecondstep.returnRate" ></el-input>
                </p>
                <p style="margin-top: 20px;">
                  <span >累计退款率（动态）：</span>
                  <el-input size="mini"
                  style="display: inline-block;width: 170px;font-size: 12px;" placeholder="请输入总货期" v-model="editsecondstep.returnRateNet" ></el-input>

                  <span style="padding-left: 20px;">订单取消：</span>
                  <el-select style="margin-right: 20px;" clearable v-model="editsecondstep.orderDel" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in orderdellist"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </p>
                <p style="margin-top: 20px;">
                  <span style="position: relative;top: -20px;">备注：</span>
                  <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入问题说明" style="display: inline-block;width: 260px;font-size: 12px;" v-model="editsecondstep.remark" ></el-input>
          
                </p>
                <p style="margin-top: 20px;">
                  <span style="position: relative;top: -20px;">为满足首单的到货情况: </span>
                  <el-input type="textarea"
                  :rows="2"
                  placeholder="为满足首单的到货情况" style="display: inline-block;width: 260px;font-size: 12px;" v-model="editsecondstep.memo" ></el-input>
          
                </p>

                
   			</div>
	 	<span slot="footer" class="dialog-footer">
	    <el-button size="mini" @click="editsecondstep.dialogVisible = false">取 消</el-button>
	    <el-button size="mini" @click="editsecondsteprow_ok" type="primary" >确 定</el-button>
	  </span>
	</el-dialog>

	<el-dialog
          title="任务"
          :visible.sync="picupload.dialogVisible"
          width="700px"

          :close-on-click-modal="false"
          >
          <div  style="position: relative;" slot="title">
            任务
            
            <el-upload
              style="display: inline-block;position: absolute;right: 40px;top: -6px;"
              class="upload-demo"
              :http-request="uploadpicture"
              multiple
              :limit="5"
              action="http://upload-z2.qiniup.com/"
              >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>



          </div>
          <div class="filethird_body">
            <p  v-for="(list,index) in picupload.filelist">
              

              <img  @dblclick="openBigImg(`http://hzyymy.cn/${list.filePath}`)" style="width: 50px;" :src="`http://hzyymy.cn/${list.filePath}`"/>

              <br/>
              

              <a :download="`${list.fileName}`" target="_blank" :href="`http://hzyymy.cn/${list.filePath}`" >{{list.fileName}}</a>
              
            </p>
            
            
          </div>
          
        </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vHeader from './head'
const uuidv1 = require('uuid/v1')
import {
  isImageFile,
  isVideoFile,
  matchType
} from '../../util'


export default {
    name: "index",
    components: {
        vHeader
    },
    data(){
        return{
          headListx: [
            {
                name: '数据报表',
                choose: true,
                link:'/reportdataview/dataview',
            },
            
        ],
        orderdellist: [
          {
            label: '取消订单',
            value: true,
          },
          {
            label: '不取消订单',
            value: false,
          },
        ],
        picupload: {
        	dialogVisible: false,
        	filelist: []
        },
        uploadflag: false,
        table_height: 300,
        search: {
            //start: new Date([new Date().getFullYear(),new Date().getMonth()+1,1].join('-')),
            //end: new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),
        	start: '',
          end: '',
      		memo: '',
      		pageNum: 1,
      		pageSize: 250,
      		total: 0,
        },
        editsecondstep: {
        	dialogVisible: false,
        	supply: '',
        	factory: '',
        	clothType: '',
        	detailType: '',
        	id: '',
        	hdClothType: '',
        	hdDetailType: '',
        	orderType: '',
        	orderNum: '',
        	level: '',
        	memo: '',
        	arriveNum: '',
        	orderDate: '',
        	arriveDate: '',
        	deliveryTime: '',
        	cost: '',
        	price: '',
        	returnRate: '',
        	returnRateNet: '',
        	remark: '',
        	orderDel: '',
        	
        },
        imgloading: false,
        tableData: [],
         
        }
    },
    computed: {
        ...mapGetters([
            'getpageDict',
            'getpowers'
        ]),
        
        cloth_type() {
            let demand_type = this.getpageDict.filter((list) => {
                return list.dicType == "cloth_type"
            })

            //console.info(demand_type[0])


            return demand_type[0].dicList
        },
        visual_supply() {
            let demand_type = this.getpageDict.filter((list) => {
                return list.dicType == "visual_supply"
            })

            //console.info(demand_type[0])


            return demand_type[0].dicList
        },
        
        
        
    },
    created() {
       
    },
    mounted(){
      	this.$nextTick(()=>{
            this.table_height = this.$refs.cangchu.offsetHeight - this.$refs.cangchu_top.offsetHeight -30
        })

        this.select_reports()
    },
    methods:{
      fmtDate(obj){
            var date =  new Date(obj*1000);

            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
      },
    	openBigImg(imgPath) {
          window.open(imgPath)
        },
    	picuploadshow() {
        this.picupload.dialogVisible = true
    		this.picupload.filelist = []

    	},
    	async uploadpicture(filestatus,type) {

    		

    		let wareId = filestatus.file.name.split('.')[0]



          
          let token = await this.gettoken()

          var fileExtension = filestatus.file.name.substring(filestatus.file.name.lastIndexOf('.') + 1);




          var newfile = new File([filestatus.file], uuidv1()+"."+fileExtension, {type:filestatus.file.type})

          filestatus.newfile = newfile

          filestatus.progressa = 0

          filestatus.status = false

          const formData = new FormData()
          formData.append('token', token)
          formData.append('file', newfile)
          formData.append('key', `${newfile.name}`)

          


          


          this.imgloading = true
        

          let that = this
            this.$http({
              url:  filestatus.action,
              method: 'POST',
              data: formData,
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress (a){
                /*let dlItem = that.uploadlist.find((item) => {
                  return item.newfile.name === filestatus.newfile.name
                })
                let precent = (a.loaded / a.total).toFixed(2)
                filestatus.progressa = precent
                dlItem.progressa = precent * 100*/
              },
            }).then((res) => {
              //保存图片到数据库
              
              this.imgloading = false

              this.upload_project_file(res.key, wareId)


              
              
              
            })
        },
        gettoken() {
          return new Promise((resolve, reject) => {
            this.$http.get(`qiniuyun/get_token`)
                .then((data)=>{
                  if (data.code == '200') {
                    resolve(data.data)
                  }
                })
            })
        },
        upload_project_file(path,wareId) {

          
          let that = this
          this.$http.get(`file/submit_ware_pic?path=${path}&wareId=${wareId}`)
          .then(function (data) {
                //that.find_project_file()
                that.picupload.filelist.push({
	        		 filePath: path,
	        		 fileName: wareId,
	        	})


              
              
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
        },
    	editsecondsteprow(scope) {
    		this.editsecondstep = {...this.editsecondstep ,...scope}
        this.editsecondstep.arriveTime = new Date(this.editsecondstep.arriveTime*1000)
        this.editsecondstep.orderTime = new Date(this.editsecondstep.orderTime*1000)
    		this.editsecondstep.dialogVisible = true
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
                url:  'visual_report/import_visual_report',
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
      	editsecondsteprow_ok() {
          this.editsecondstep.arriveTime = this.editsecondstep.arriveTime ? this.editsecondstep.arriveTime.getTime().toString().substr(0, 10):''

          this.editsecondstep.orderTime = this.editsecondstep.orderTime ? this.editsecondstep.orderTime.getTime().toString().substr(0, 10):''

          
      		this.$http.post(`visual_report/edit_visual_report`,{
                    ...this.editsecondstep,
                    orderDate: this.editsecondstep.orderTime,
                    arriveDate: this.editsecondstep.arriveTime,
                })
                .then((data)=>{
                    if (data.code == 200) {
                        this.$message({
                            message: data.msg,
                            type: 'success'
                          })

                        this.editsecondstep.dialogVisible = false

                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'error'
                          });
                    }

                    this.select_reports()


                    

                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      })
                })
            
    	
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
    	clearsearch() {
    		
    		
    		this.search.memo = ''
    		this.search.pageNum = 1
    		this.select_reports()
    	},
      	select_reports() {
            let that = this
            this.$http.post(`visual_report/get_visual_report`,{ 
                pageNum: this.search.pageNum,
                pageSize: this.search.pageSize,
                memo: this.search.memo,
                start: this.search.start ? this.search.start.getTime().toString().substr(0, 10): '',
                end: this.search.end ? (new Date(new Date(this.search.end).getFullYear(),new Date(this.search.end).getMonth(),new Date(this.search.end).getDate(),'23','59','59')).getTime().toString().substr(0, 10):'',

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
        
    },
}
</script>

<style>

  .el-upload-list{
      display: none;
    }
    .table-wrap .el-table td, .el-table th {
      padding: 8px 0px;
        text-align: center;
        font-size: 12px;

    } 
    .table-wrap .el-table .cell, .el-table th div {
        

    }
    .table-wrap .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    }
</style>
<style spoced lang="less">
.filethird_body {
  font-size: 12px;
  min-height: 400px;

  p {
    float: left;
    width: 70px;
    text-align: center;

    position: relative;

    &:hover {
      .iconerror {
        display: block;
      }
    }

    .doc {
      color: #f7d673; 
      font-size: 50px;
      
    }

    .iconerror {
      display: none;
    }
  }
}
.inpucus {
    opacity: 0;
    background: red;
    width: 80px;
    height: 26px;
    z-index: 10;
    position: absolute;
    left: 160px;
    top: 0px;

    &.iupzinde {
        z-index: 1;
    }
}

.inpucusa {
    opacity: 0;
    background: red;
    width: 80px;
    height: 26px;
    z-index: 10;
    position: absolute;
    left: 268px;
    top: 0px;

    &.iupzinde {
        z-index: 1;
    }
}
.firststopwrap {
    span {
        font-size: 12px;
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