<template>
  <div class="three">
  <vHeader :headListx='headListx' :index="0"  ></vHeader>
    <div ref="cangchu" class="cangchu">
    	<div ref="cangchu_top" class="cangchu-top">
    		<p class="search-p">
                <span >日期：</span>
                <el-date-picker
		            size="mini"
		            v-model="search.timestart"
		            type="date"
                class="input-class"
		            placeholder="起始日期">
		          </el-date-picker>-
		          <el-date-picker
		            size="mini"
		            v-model="search.timeend"
		            type="date"
                class="input-class"
		            placeholder="终止日期">
		        </el-date-picker>
            </p>

            <p class="search-p">
                <span >款号：</span>
                <el-input size="mini" class="input-class" v-model="search.kuanhao" placeholder="请输入款号"></el-input>
            </p>
            <p class="search-p">
                <span >编号：</span>
                <el-input size="mini" class="input-class" v-model="search.id" placeholder="请输入编号"></el-input>
            </p>
            <p class="search-p">
                <span >颜色：</span>
                <el-input size="mini" class="input-class" v-model="search.color" placeholder="请输入颜色"></el-input>
            </p>
            <p class="search-p">
                <span >供应商负责人：</span>
                <el-input size="mini" class="input-class" v-model="search.principal" placeholder="请输入供应商负责人"></el-input>
            </p>
            <p class="search-p">
                <span >数据类型：</span>
                <el-select
	              size="mini"
	              v-model="search.type"
	              class="input-class"
	              multiple
	              collapse-tags
	              placeholder="请选择数据类型">
	              <el-option
	                v-for="item in datatype"
	                :key="item.value"
	                :label="item.label"
	                :value="item.value">
	              </el-option>
	            </el-select>
            </p>
            <p class="search-p">
                <span >是否结款：</span>
	              <el-select clearable v-model="search.clearing" class="input-class"  placeholder="请选择结款类型" size="mini">
	              <el-option
	                v-for="item in debtoptions"
	                :key="item.value"
	                :label="item.label"
	                :value="item.value">
	              </el-option>
            </el-select>
            </p>
            <p class="search-p">
                <span >结款备注：</span>
                <el-input size="mini" class="input-class" v-model="search.clearingRemark" placeholder="请输入结款备注"></el-input>
            </p>
            <p class="search-p">
                <span >是否报废：</span>
                <el-select clearable v-model="search.checkNow" class="input-class" placeholder="请选择是否报废" size="mini">
              <el-option
                v-for="item in debtoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </p>
            <p class="search-p">
                <span >报废备注：</span>
                <el-input size="mini" class="input-class" v-model="search.checkNowRemark" placeholder="请输入报废备注"></el-input>
            </p>
            <p class="search-p">
                <span >付款时间：</span>
                <el-date-picker
	              size="mini"
	              v-model="search.paymentTime"
	              class="input-class" 
	              type="date"
	              placeholder="付款时间日期">
	            </el-date-picker>
            </p>
            <p class="search-p">
                <span >导入时间：</span>
                <el-date-picker
	              size="mini"
	              v-model="search.uploadTime"
	              class="input-class" 
	              type="date"
	              placeholder="导入时间">
	            </el-date-picker>
            </p>
            

            <p style="position: relative;">
                <el-button @click="select_reports" size="mini" style="margin-bottom: 20px" type="primary">搜索</el-button>

              <el-button @click="clearsearch" size="mini" style="margin-left: 20px;margin-bottom: 20px" type="primary">重置</el-button>

              <el-button size="mini" @click="exportcus" style="margin-left: 20px;margin-bottom: 20px" type="primary">导出</el-button>

              <!--<el-button @click="updateFile" size="mini" style="margin-left: 20px;margin-bottom: 20px" type="primary">上传表单</el-button>-->

              <el-button v-if="isInArray(17)" :disabled="uploadflag" size="mini" style="margin-left: 20px;margin-bottom: 20px;position: relative;" type="primary">{{uploadflag?'上传中': '上传'}}

                <input v-if="isInArray(17)" style="left:0px" type="file" class="inpucus cursor" @change="tirggerFile($event)" />

              </el-button>
              


              <a target="_blank" style="text-decoration: none; position: absolute;right: 40px;" href="http://10.88.125.115/" class="el-button el-button--primary el-button--mini">货源知识库</a>
            </p>


    	</div>
    	<div :style="{height: table_height+'px'}" class="table-wrap">
    		<el-table
                :data="tableData"
                :height="table_height - 40"
                v-loading="loading"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column label="三方确认后的准确出入库量">
                	<el-table-column
    				      type="selection"
    				      width="55">

				          </el-table-column>
                	<el-table-column
                      prop="id"
                      label="编号"
                      width="60"
                      >
                      
                    </el-table-column>
                	<el-table-column
                      prop="type"
                      label="数据类型"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="type"
                      label="日期"
                      >
                      <template slot-scope="scope">
                           {{scope.row.date ? fmtDate(scope.row.date) : ''}}
                      </template>
                      
                      
                    </el-table-column>
                    <el-table-column
                      prop="wareId"
                      label="款号"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="orderId"
                      label="订单号"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="color"
                      label="颜色"
                      >
                      
                    </el-table-column>
                    <el-table-column
                      prop="principal"
                      label="供应商负责人"
                      >
                      
                    </el-table-column>
                    <el-table-column label="尺码">
                    	<el-table-column
	                      prop="sizeXs"
	                      label="xs"
	                      width="55"
	                      >
	                      
	                    </el-table-column>
	                    <el-table-column
	                      prop="sizeS"
	                      label="s"
	                      width="55"
	                      >
	                      
	                    </el-table-column>
	                    <el-table-column
	                      prop="sizeM"
	                      label="m"
	                      width="55"
	                      >
	                      
	                    </el-table-column>
	                    <el-table-column
	                      prop="sizeL"
	                      label="l"
	                      width="55"
	                      >
	                      
	                    </el-table-column>
	                    <el-table-column
	                      prop="sizeXl"
	                      label="xl"
	                      width="55"
	                      >
	                      
	                    </el-table-column>
	                    <el-table-column
	                      prop="sizeXxl"
	                      label="xxl"
	                      width="55"
	                      >
	                      
	                    </el-table-column>
	                    <el-table-column
	                      prop="sizeJ"
	                      label="j"
	                      width="55"
	                      >
	                      
	                    </el-table-column>
                    </el-table-column>
                    <el-table-column
	                      prop="supply"
	                      label="合计"
	                      >
	                      <template slot-scope="scope">
                           {{scope.row.total}}
                      		</template>
	                </el-table-column>
	                <el-table-column
	                      prop="supply"
	                      label="备注"
	                      >
	                      <template slot-scope="scope">
                           {{scope.row.remark != "null" ? scope.row.remark : ''}}
                      	</template>
	                </el-table-column>
	                <el-table-column
	                      prop="uploadTime"
	                      label="导入日期"
	                      >
	                      
	                </el-table-column>

                </el-table-column>
                <el-table-column label="品控部">
                    <el-table-column
	                      prop="checkNow"
	                      label="是否报废"
	                      >
	                      
	                </el-table-column>
	                <el-table-column
	                      prop="checkNowRemark"
	                      label="报废备注"
	                      >
	                      
	                </el-table-column>
                  <el-table-column
                        prop="withHoldRemark"
                        label="扣款备注"
                        >
                        
                  </el-table-column>
                </el-table-column>
                <el-table-column label="财务部">
                    <el-table-column
	                      prop="clearing"
	                      label="是否结款"
	                      >
	                      
	                </el-table-column>
	                <el-table-column
	                      prop="paymentTime"
	                      label="付款时间"
	                      >
	                      
	                </el-table-column>
	                <el-table-column
	                      prop="clearingRemark"
	                      label="结款备注"
	                      >
	                      
	                </el-table-column>
                </el-table-column>
                <el-table-column label="确认">
                    <el-table-column
	                      prop="supply"
	                      label="修改"
	                      width="125"
	                      >
	                    <template slot-scope="scope">
                            <el-button v-if="scope.row.id && isInArray(14)" style="margin-bottom: 10px;" @click="editdata(scope.row)" size="mini" plain  type="primary">
				                财务修改
				              </el-button>
				              <el-button v-if="scope.row.id && isInArray(17)" style="margin-bottom: 10px;"  @click="editdatayeuw(scope.row)" size="mini" plain  type="primary">
				                业务修改
				              </el-button>
				              <el-button v-if="scope.row.id && isInArray(19)" style="margin-bottom: 10px;" @click="editdatapinji(scope.row)" size="mini" plain  type="primary">
				                品控修改
				              </el-button>

				              <el-button v-if="scope.row.id && isInArray(17)" style="margin-bottom: 10px;" @click="deletedata(scope.row)" size="mini" plain  type="danger">
				                删除
				              </el-button>
                      <!--<el-button v-if="group(scope.row)" style="margin-bottom: 10px;" @click="deletedata(scope.row)" size="mini" plain  type="danger">
                        订单号修改
                      </el-button>-->
                      <el-button v-if="group(scope.row)"  style="margin-bottom: 10px;" @click="changeorder(scope.row)" size="mini" plain  type="danger">
                        订单号修改
                      </el-button>
                    </template>
                      
	                </el-table-column>
	                
                </el-table-column>
            </el-table>
            <div class="pagination">
                  <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[250, 300, 350, 400, 450]"
                    :page-size="search.size"
                    :current-page="search.currentPage"
                    :total="search.total"
                    layout="total,sizes, prev, pager, next"
                    >
                  </el-pagination>
            </div>

            <div v-if="isInArray(14)" class="pilaing">
		      <el-button  size="mini" @click="piliangchange"  type="primary">财务批量修改</el-button>
		    </div>
    	</div>
    	
        
    </div>
    <el-dialog
      title="财务修改"
      :visible.sync="dialog.dialogVisible"
      width="500px"
      >
      <div class="wrap">
        <p>
          <span >是否结款：</span>
          <el-select clearable v-model="dialog.clearing" placeholder="请选择" size="mini">
            <el-option
              v-for="item in debtoptionsdia"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          
        </p>
        <p style="margin-top: 20px;">
          <span >结款时间：</span>
          <el-date-picker
              size="mini"
              v-model="dialog.paymentTime"
              type="date"
              placeholder="付款时间日期">
            </el-date-picker>
          
        </p>
        <p style="margin-top: 20px;">
          <span style="position: relative;top: -20px;">结款备注：</span>
          <el-input type="textarea"
  :rows="2"
  placeholder="请输入内容" style="display: inline-block;width: 260px;font-size: 12px;" v-model="dialog.clearingRemark" ></el-input>
          
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialog.dialogVisible = false">取 消</el-button>
        <el-button size="mini"  type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="品控部修改"
      :visible.sync="dialog.pinjidialogVisible"
      width="500px"
      >
      <div class="wrap">
        
        <p style="margin-top: 20px;">
          <span >是否报废：</span>
          <el-select clearable v-model="dialog.checkNow" placeholder="请选择" size="mini">
            <el-option
              v-for="item in debtoptionsdia"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          
        </p>

        
        <p style="margin-top: 20px;">
          <span style="position: relative;top: -20px;">报废备注：</span>
          <el-input type="textarea"
  :rows="2"
  placeholder="请输入内容" style="display: inline-block;width: 260px;font-size: 12px;" v-model="dialog.checkNowRemark" ></el-input>
          
        </p>

        <p style="margin-top: 20px;">
          <span style="position: relative;top: -20px;">扣款备注：</span>
          <el-input type="textarea"
  :rows="2"
  placeholder="请输入内容" style="display: inline-block;width: 260px;font-size: 12px;" v-model="dialog.withHoldRemark" ></el-input>
          
        </p>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialog.pinjidialogVisible = false">取 消</el-button>
        <el-button size="mini"  type="primary" @click="okpinji">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="业务修改"
      :visible.sync="dialog.yewudialogVisible"
      width="630px"
      >
      <div class="wrap">
        <p style="margin-top: 0px;">
          <span >数&nbsp;&nbsp;据&nbsp;&nbsp;类&nbsp;&nbsp;型：</span>
          <el-select clearable v-model="dialog.type" placeholder="请选择" size="mini">
            <el-option
              v-for="item in datatype"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          
        </p>
        <p style="margin-top: 20px;">
          <span >日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：</span>
          <el-date-picker
            size="mini"
            v-model="dialog.date"
            style="width: 170px;"
            type="date"
            placeholder="付款时间日期">
          </el-date-picker>
          
        </p>

        <p style="margin-top: 20px;">
          <span >款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
          <el-input size="mini"
          style="display: inline-block;width: 170px;font-size: 12px;" v-model="dialog.wareId" ></el-input>
        </p>


        <p style="margin-top: 20px;">
          <span >颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色：</span>
          <el-input size="mini"
          style="display: inline-block;width: 170px;font-size: 12px;" v-model="dialog.color" ></el-input>
        </p>
        

        <p style="margin-top: 20px;">
          <span >供应商负责人：</span>
          <el-input size="mini"
          style="display: inline-block;width: 170px;font-size: 12px;" v-model="dialog.principal" ></el-input>
        </p>

        <!--<p style="margin-top: 20px;">
          <span >是&nbsp;&nbsp;否&nbsp;&nbsp;报&nbsp;&nbsp;废：</span>
          <el-select v-model="dialog.checkNow" clearable placeholder="请选择" size="mini">
            <el-option
              v-for="item in debtoptionsdia"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          
        </p>-->

        <!--<p style="margin-top: 20px;">
          <span >合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;计：</span>
          <el-input size="mini"
          style="display: inline-block;width: 170px;font-size: 12px;" v-model="dialog.total" ></el-input>
        </p>-->
        

        <p style="margin-top: 20px;">
          <span style="padding-right: 0px;">尺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
          <label><span>xs：</span>
          <el-input size="mini" type="number"
          style="display: inline-block;width: 80px;font-size: 12px;margin-right: 26px;margin-bottom: 20px;" v-model="dialog.sizeXs" ></el-input></label>

          <label><span>s：</span>
          <el-input size="mini" type="number"
          style="display: inline-block;width: 80px;font-size: 12px;margin-right: 26px;margin-bottom: 20px;" v-model="dialog.sizeS" ></el-input></label>

          <label><span>m：</span>
          <el-input size="mini" type="number"
          style="display: inline-block;width: 80px;font-size: 12px;margin-right: 86px;margin-bottom: 20px;" v-model="dialog.sizeM" ></el-input></label>

          <label><span  style="padding-left: 100px;">l：</span>
          <el-input size="mini" type="number"
          style="display: inline-block;width: 80px;font-size: 12px;margin-right: 26px;margin-bottom: 20px;" v-model="dialog.sizeL" ></el-input></label>

          <label><span>xl：</span>
          <el-input size="mini" type="number"
          style="display: inline-block;width: 80px;font-size: 12px;margin-right: 26px;margin-bottom: 20px;" v-model="dialog.sizeXl" ></el-input></label>

          <label><span>xxl：</span>
          <el-input size="mini" type="number"
          style="display: inline-block;width: 80px;font-size: 12px;margin-right: 26px;margin-bottom: 20px;" v-model="dialog.sizeXxl" ></el-input></label>


          <br/><label><span style="padding-left: 100px">j：</span>
          <el-input size="mini" type="number"
          style="display: inline-block;width: 80px;font-size: 12px;margin-right: 26px;margin-bottom: 20px;" v-model="dialog.sizeJ" ></el-input></label>

        </p>
        
        <p style="margin-top: 20px;">
          <span style="position: relative;top: -20px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
          <el-input type="textarea"
  :rows="2"
  placeholder="请输入内容" style="display: inline-block;width: 260px;font-size: 12px;" v-model="dialog.remark" ></el-input>
          
        </p>
        
        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialog.yewudialogVisible = false">取 消</el-button>
        <el-button size="mini"  type="primary" @click="okyewu">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="订单号修改"
      :visible.sync="orderdialog.dialogVisible"
      width="430px"
      >
      <div class="wrap">
        <p>
          <span >订单号：</span>
          <el-input size="mini" v-model="orderdialog.orderId"
          style="display: inline-block;width: 160px;"></el-input>


          
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="orderdialog.dialogVisible = false">取 消</el-button>
        <el-button size="mini"  type="primary" @click="orderdialogok">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import vHeader from '../head'

export default {
    name: "index",
    components: {
        vHeader
    },
    data(){
        return{
        	headListx: [
          	{
              name: '三方报表',
              choose: true,
              link:'/reportthree/threecheck',
          	},
          
        	],
          loading: false,
        	table_height: 300,
          uploadflag: false,
        	search: {
        		//timestart: new Date(new Date(new Date().toLocaleDateString()).getTime()),
	          timestart: new Date([new Date().getFullYear(),new Date().getMonth()+1,1].join('-')),
	          timeend: new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),
	          kuanhao: '',
	          //timestart: "",
	          //timeend: "",
	          size: 250,
	          total: 10,
	          currentPage: 1,
	          type: '',
	          clearing: '',
	          checkNow: '',
	          principal: '',
	          color: '',
	          paymentTime: '',
	          uploadTime: '',
	          clearingRemark: '',
	          checkNowRemark: '',
	          id: ''
        	},
        	datatype: [
	          {
	            value: '售后出库',
	            label: '售后出库'
	          },
	          {
	            value: '批量出库',
	            label: '批量出库'
	          },
	          {
	            value: '大货样出库（仓库）',
	            label: '大货样出库（仓库）'
	          },
	          {
	            value: '大货样出库（企划）',
	            label: '大货样出库（企划）'
	          },
	          {
	            value: '采购入库',
	            label: '采购入库'
	          },
	          {
	            value: '大货样入库（结算）',
	            label: '大货样入库（结算）'
	          },
	          {
	            value: '原样入库（不结算）',
	            label: '原样入库（不结算）'
	          },
	        ],
	        debtoptions: [{
	          value: '是',
	          label: '是'
	        },{
	          value: '否',
	          label: '空'
	        }],
	        searchdata: [
        	],
          orderdialog: {
            dialogVisible:false,
            orderId: '',
            id: '',
          },
        	dialog: {
	          dialogVisible:false,
	          yewudialogVisible:false,
	          pinjidialogVisible:false,
	          clearing: '',
	          clearingRemark: '',
	          id:'',
	          checkNow: '',
	          checkNowRemark: '',
	          paymentTime: '',
	          type: '',
	          date: '',
	          wareId: '',
	          color: '',
	          principal: '',
	          sizeJ: '',
	          sizeL: '',
	          sizeM: '',
	          sizeS: '',
	          sizeXl: '',
	          sizeXs: '',
	          sizeXxl: '',
	          remark: '',
            withHoldRemark: '',
	          total: ''
	        },
	        debtoptionsdia: [{
	          value: '是',
	          label: '是'
	        },{
	          value: '',
	          label: ''
	        }],
        	isresult: [ 
                {
                    label: '是',
                    value: true, 
                },
                {
                    label: '否',
                    value: false, 
                },
            ],
        	secondstep: {
        		dialogVisible: false,
        		id: '',
        		isResults: '',
        		importWare: '',
        		returnFactory: '',
        		memo: '',
        		confirmer: '',
        	},
        	tableData: [],
        	ids: [],
        	uploadloading: false
        }
    },
    computed: {
        ...mapGetters([
            'getpageDict',
            'userInfo',
            'getpowers'
        ]),
        getout_coming_report() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "quality_report"
            })

            console.info(demand_status[0])

            if (demand_status[0]) {
                return demand_status[0].dicList
            } else {
                return []
            }

            
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
      orderdialogok() {

        let that = this
        this.$http.post(`reports/incoming_report_edit_order_id`, {
            id: this.orderdialog.id,
            orderId: this.orderdialog.orderId,
          })
          .then(function (data) {
              if (data.code = '100000'){
                that.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }

              that.orderdialog.dialogVisible = false

              that.select_reports()



              
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
      },
      changeorder(list) {
        
        this.orderdialog.orderId = list.orderId
        this.orderdialog.id = list.id
        this.orderdialog.dialogVisible = true
      },
      group(list) {
        let flag = false
        if (list.groupId) {
          if (this.userInfo.groupId.length>list.groupId.length || this.userInfo.groupId.length==list.groupId.length) {
            let str = this.userInfo.groupId.slice(0,list.groupId.length) 
              if (str == list.groupId) {
                flag = true
              }
            
          }
          
        }


        return flag
      },
    	isInArray(value){
            for(var i = 0; i < this.getpowers.length; i++){
                if(value == this.getpowers[i]){

                    return true;
                }
            }
            return false;
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
                url:  'reports/import_incoming_report',
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
    	piliangchange () {
          

          if (this.ids.length == 0) {
              return this.$message({
                message: '请选择你要修改的数据',
                type: 'error'
              });
          }

          this.dialog.clearing = ""
          this.dialog.clearingRemark = ""
          this.dialog.checkNow = ""
          this.dialog.paymentTime = ''


          this.dialog.id = this.ids.join(',')


          this.dialog.dialogVisible = true


        },
        handleSelectionChange(val) {

          this.ids = []


          for (let i=0; i<val.length; i++) {
            this.ids.push(val[i].id)
            
          }
    	},
    	editdata(list) {
          this.dialog.clearing = list.clearing
          this.dialog.clearingRemark = list.clearingRemark
          this.dialog.checkNow = list.checkNow
          this.dialog.paymentTime = list.paymentTime ? new Date(list.paymentTime) : ''
          this.dialog.id = list.id
          this.dialog.dialogVisible = true
        },
    	
    	editdatapinji(list) {
          
          this.dialog.checkNow = list.checkNow
          this.dialog.checkNowRemark = list.checkNowRemark
          this.dialog.withHoldRemark = list.withHoldRemark
          this.dialog.id = list.id
          this.dialog.pinjidialogVisible = true
        },
        editdatayeuw(list) {
          this.dialog.clearing = list.clearing
          this.dialog.clearingRemark = list.clearingRemark
          this.dialog.checkNow = list.checkNow
          this.dialog.paymentTime = list.paymentTime ? new Date(list.paymentTime) : ''
          this.dialog.id = list.id
          this.dialog.yewudialogVisible = true
          this.dialog.color = list.color
          this.dialog.date = list.date ? new Date(list.date*1000) : ''
          this.dialog.principal = list.principal
          this.dialog.remark = list.remark
          this.dialog.sizeJ = list.sizeJ
          this.dialog.sizeL = list.sizeL
          this.dialog.sizeM = list.sizeM
          this.dialog.sizeS = list.sizeS
          this.dialog.sizeXl = list.sizeXl
          this.dialog.sizeXxl = list.sizeXxl
          this.dialog.sizeXs = list.sizeXs
          this.dialog.type = list.type
          this.dialog.wareId = list.wareId
        },
        ok() {
          let that = this

          if (this.dialog.clearing && !this.dialog.paymentTime) {
            return that.$message({
                  message: '结款时间需填',
                  type: 'error'
                });
          }

          if (!this.dialog.clearing && this.dialog.paymentTime) {
            return that.$message({
                  message: '选择是否结款',
                  type: 'error'
                });
          }


          if (this.dialog.clearingRemark.length>250) {
            return this.$message({
              message: '备注不能超过250个字哦',
              type: 'warning'
            });
          }

          this.$http.get(`reports/update_incoming?ids=${this.dialog.id}&clearing=${this.dialog.clearing ? this.dialog.clearing: ''}&clearingRemark=${this.dialog.clearingRemark ? this.dialog.clearingRemark: ''}&paymentTime=${this.dialog.paymentTime ? this.dialog.paymentTime.getTime().toString().substr(0, 10): ''}`)
            .then(function (data) {
              if (data.code = '100000'){
                that.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }


              that.dialog.dialogVisible = false
              that.dialog.yewudialogVisible = false

              that.select_reports()



              
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
        },
        okpinji() {
          let that = this

          if (this.dialog.checkNowRemark.length>250) {
            return this.$message({
              message: '备注不能超过250个字哦',
              type: 'warning'
            });
          }

          
          this.$http.post(`reports/update_incoming_check`, {
            id: this.dialog.id,
            checkNow: this.dialog.checkNow ? this.dialog.checkNow: '',
            checkNowRemark: this.dialog.checkNowRemark,
            withHoldRemark: this.dialog.withHoldRemark,
          })
          .then(function (data) {
              if (data.code = '100000'){
                that.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }

              that.dialog.pinjidialogVisible = false

              that.select_reports()



              
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
        },
        deletedata(list) {
          let that = this

          this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            /*this.$message({
              type: 'success',
              message: '删除成功!'
            });*/


            this.$http.post(`reports/delete_incoming_by_id`,{
              id: list.id
            })
              .then(function (data) {
                if (data.code = '100000'){
                  that.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                }


                that.select_reports()



                
              })
              .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });


          
        },
        okyewu() {
          let that = this

          this.$http.post(`reports/update_incoming_by_yw`, {
            id: this.dialog.id,
            checkNow: this.dialog.checkNow ? this.dialog.checkNow: '',
            color: this.dialog.color,
            date: this.dialog.date.getTime().toString().substr(0, 10),
            principal: this.dialog.principal,
            remark: this.dialog.remark,
            sizeJ: this.dialog.sizeJ,
            sizeL: this.dialog.sizeL,
            sizeM: this.dialog.sizeM,
            sizeS: this.dialog.sizeS,
            sizeXl: this.dialog.sizeXl,
            sizeXs: this.dialog.sizeXs,
            sizeXxl: this.dialog.sizeXxl,
            type: this.dialog.type,
            wareId: this.dialog.wareId,
            total: this.dialog.total,
          })
            .then(function (data) {
              if (data.code = '100000'){
                that.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }

              that.dialog.yewudialogVisible = false

              that.select_reports()



              
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });

          
        },
    	update_report_by_pk() {
    		let that = this
    		this.$http.post(`reports/update_report_by_pk`,{
                    id: this.secondstep.id,
                    isResults: this.secondstep.isResults,
                    importWare: this.secondstep.importWare,
                    returnFactory: this.secondstep.returnFactory,
                    factory: this.secondstep.factory,
                    confirmer: this.secondstep.confirmer,
                    memo: this.secondstep.memo,
                })
                .then((data)=>{
                    if (data.code == 200) {
                        this.$message({
                            message: data.msg,
                            type: 'success'
                          })

                        this.secondstep.dialogVisible = false

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
    	handleSizeChange(val) {
          this.search.pageSize = val
          this.search.currentPage = 1
          this.select_reports()
        },
        handleCurrentChange(val) {
          this.search.currentPage = val
          this.select_reports()
        },
        fmtDate(obj){
            var date =  new Date(obj*1000);

            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
        },
    	clearsearch() {
    		this.search.kuanhao = ''
          this.search.currentPage = 1
          this.search.clearing = ''
          this.search.checkNow = ''
          this.search.checkNowRemark = ''
          this.search.clearingRemark = ''
          this.search.principal = ''
          this.search.color = ''
          this.search.paymentTime = ''
          this.search.type = []
          this.search.uploadTime = ''
          this.search.id = ''
          this.select_reports()
    	},
      	select_reports() {


            let that = this
            this.loading = true
            this.$http.post(`reports/get_incoming`,{ 
                pageNum: this.search.currentPage,
	            pageSize: this.search.size,
	            wareId: this.search.kuanhao,
	            start: this.search.timestart ? this.search.timestart.getTime().toString().substr(0, 10): '',
	            end: this.search.timeend ? (new Date(new Date(this.search.timeend).getFullYear(),new Date(this.search.timeend).getMonth(),new Date(this.search.timeend).getDate(),'23','59','59')).getTime().toString().substr(0, 10):'',
	            types: this.search.type.length>0 ? this.search.type.join(','): '',
	            clearing: this.search.clearing,
	            principal: this.search.principal,
	            color: this.search.color,
	            checkNow: this.search.checkNow,
	            checkNowRemark: this.search.checkNowRemark,
	            clearingRemark: this.search.clearingRemark,
	            paymentTime: this.search.paymentTime ? this.search.paymentTime.getTime().toString().substr(0, 10): '',
	            uploadTime: this.search.uploadTime ? this.search.uploadTime.getTime().toString().substr(0, 10): '',
	            id: this.search.id

            })
               .then((data)=>{
                   this.tableData = data.data.list
                   this.search.total = data.data.total
                   this.loading = false
                

                })
                .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      });
                }) 
        },
        updateFile(){
          let that = this
          this.uploadloading = true


          this.$http.post(`reports/import_incoming_report`).then((data)=>{
              
              if (data.code != '100000') {
                that.$message({
                    message: data.msg,
                    type: 'error'
                  });
              } else {
                that.$message({
                    message: data.msg,
                    type: 'success'
                  });
              }
              that.uploadloading = false
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
        },
        exportcus() {



            let that = this
          this.$exporthttp.post(`reports/export_find_incoming`,{
	            wareId: this.search.kuanhao,
	            start: this.search.timestart ? this.search.timestart.getTime().toString().substr(0, 10): '',
	            end: this.search.timeend ? (new Date(new Date(this.search.timeend).getFullYear(),new Date(this.search.timeend).getMonth(),new Date(this.search.timeend).getDate(),'23','59','59')).getTime().toString().substr(0, 10):'',
	            types: this.search.type.length>0 ? this.search.type.join(','): '',
	            clearing: this.search.clearing,
	            principal: this.search.principal,
	            color: this.search.color,
	            checkNow: this.search.checkNow,
	            checkNowRemark: this.search.checkNowRemark,
	            clearingRemark: this.search.clearingRemark,
	            paymentTime: this.search.paymentTime ? this.search.paymentTime.getTime().toString().substr(0, 10): '',
	            uploadTime: this.search.uploadTime ? this.search.uploadTime.getTime().toString().substr(0, 10): '',

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
    .three .table-wrap .el-table th {
      user-select: all !important;
    }

    

    .three .table-wrap .el-table td, .el-table th {
      padding: 0px 0px;
        text-align: center;
        font-size: 12px;

    } 
    .three .table-wrap .el-table .cell, .el-table th div {
    	padding: 0px;
        

    }
    .table-wrap .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
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

        .pilaing {
		    position: absolute;
		    bottom: 0px;
		    left: 20px;
		  }

    }
}
  
</style>