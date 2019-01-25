<template>
    <div class="order_detail_model">
    	<!--编辑文件部分-->
        <el-dialog
            :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          :show-close="false"
          width="680px"
          
          >
          <div style="font-size: 14px;position: relative;" slot="title">
            {{detail.letterId ? detail.letterId:detail.id}}&nbsp;
            <span style="position: absolute;right: 40px;font-size: 12px;color: rgb(158, 158, 158)">录入时间：{{detail.createTime}}</span>

            <button @click="$emit('close')" style="position: absolute;right: 8px;top: -2px" type="button" aria-label="Close" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
          </div>
          <div v-loading="loading" class="edit-content">
            <div>
               <div class="ul">
                   <span class="span">订单店</span>
                   <el-input :disabled="true" size="mini" v-model="detail.shopName" :readonly="true" class="input-new" placeholder=""></el-input>
               </div> 
               <div class="ul">
                   <span class="span">渠道员工</span>
                   <el-input size="mini" :disabled="true" v-model="detail.collectorName" :readonly="true" class="input-new" placeholder=""></el-input>
               </div> 
               <div class="ul">
                   <span class="span">套餐价格</span>
                   <el-input size="mini" :disabled="true" v-model="detail.amount" :readonly="true" class="input-new" placeholder=""></el-input>
               </div> 
            </div>
            <div>
                <div class="ul">
                   <span class="span">送礼方式</span>
                   <!--摄影师-->
                    <el-select clearable  :disabled="!detail.giveTypeChoose" class="input-new"  size="mini" v-model="detail.giveType" placeholder="送礼方式">
                      <el-option 
                        v-for="(item,index) in giveType_list" 
                        :key="item.index"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
               	</div> 

            </div>
            <div>
                <div class="ul1">
                    <span class="lable">老客状态</span>

                    <!--<div role="group" aria-label="checkbox-group" class="el-checkbox-group">
                      <label role="checkbox" aria-checked="true" class="el-checkbox-button el-checkbox-button--small is-checked">
                        <input type="checkbox" class="el-checkbox-button__original" value="上海"><span class="el-checkbox-button__inner">上海</span>
                      </label>
                      <label role="checkbox" aria-disabled="true" class="el-checkbox-button el-checkbox-button--small is-disabled"><input type="checkbox" disabled="disabled" class="el-checkbox-button__original" value="北京"><span class="el-checkbox-button__inner">北京</span>
                      </label>
                      <label role="checkbox" class="el-checkbox-button el-checkbox-button--small is-checked" aria-checked="true"><input type="checkbox" class="el-checkbox-button__original" value="广州"><span class="el-checkbox-button__inner">广州</span>
                      </label>
                      <label role="checkbox" class="el-checkbox-button el-checkbox-button--small is-checked" aria-checked="true"><input type="checkbox" class="el-checkbox-button__original" value="深圳"><span class="el-checkbox-button__inner">深圳</span>
                      </label>
                    </div>-->

                    
                    <span @click="changestatus('old',list)" v-for="list in oldstatus.list" :class="{blue: oldstatus.oldchecked ==list.statusOld}"  class="el-tag cursor">{{list.name}}</span><!--
                    -->
                </div>
                <div class="ul">
                   <span class="span">礼品</span>
                   
                   <el-select clearable  class="input-new" :disabled="oldstatus.oldchecked==3" size="mini" v-model="detail.giftIdOld" placeholder="礼品">
                      <el-option 
                        v-for="item in gift_lists" 
                        :key="item.id"
                        :label="item.giftName"
                        :disabled="item.statusId==1?false:true"
                        :value="item.id">
                      </el-option>
                    </el-select> 
               </div> 
            </div>
            <div v-show="!detail.giveType || detail.giveType==2">
                <div class="ul1">
                    <span class="lable">新客状态</span>
                    <span @click="changestatus('new',list)" v-for="list in oldstatus.list" :class="{blue: oldstatus.newchecked ==list.statusOld}"  class="el-tag cursor">{{list.name}}</span><!--
                    -->
                </div>
                <div class="ul">
                   <span class="span">礼品</span>
                    <el-select clearable :disabled="oldstatus.newchecked==3"  class="input-new"  size="mini" v-model="detail.giftIdNew" placeholder="礼品">
                      <el-option 
                        v-for="(item,index) in gift_lists" 
                        :key="item.index"
                        :disabled="item.statusId==1?false:true"
                        :label="item.giftName"
                        :value="item.id">
                      </el-option>
                    </el-select> 
               </div> 
            </div>
            <div class="content_height" :class="{introduce: choosetab == 'introduce'}" >
                <div class="table_change table_positive" >
                    <el-tabs type="card" @tab-click="handleClick">
                        <el-tab-pane  class="item" :key="index" v-for="(list,index) in select_cus_msg" :label="list.name" >
                            <span slot="label">{{list.name}}</span>
                        </el-tab-pane>

                    </el-tabs>

                    <!--<div class="acumulate">
                        累计介绍（4/6）
                    </div>-->
                </div>
                <div v-show="choosetab == 'old'"   class="old">
                	<div v-if="!detail.oldKzId" class="match_old">当前老客信息没有和现有老客户匹配<span @click="matchdata">查询匹配</span></div>

                  <div v-if="detail.oldKzId" style="height: 20px"></div>

                	<div  class="ullist">
	                    
	                    <el-checkbox @click.native="detail.oldkzmatechoose=false" v-model="detail.oldkzchoose"></el-checkbox>
	                    <span class="input-span">老客户</span>
	                    <el-input :disabled="true" :readonly="true" v-model="detail.oldKzName" size="mini" style="margin-right: 40px" class="input-new" placeholder=""></el-input>

	                    <span class="input-span">电话</span>
	                    <el-input :disabled="true" size="mini" :readonly="true" v-model="detail.oldKzPhone"  class="input-new" placeholder=""></el-input>
	                </div>
	                <div class="ullist">
	                    <el-checkbox @click.native="detail.oldkzchoose=false" v-model="detail.oldkzmatechoose"></el-checkbox>
	                    <span class="input-span">老客户配偶</span>
	                    <el-input :disabled="true" :readonly="true"  size="mini" v-model="detail.oldMateName" style="margin-right: 40px" class="input-new" placeholder=""></el-input>

	                    <span class="input-span">配偶电话</span>
	                    <el-input :disabled="true" size="mini" :readonly="true" v-model="detail.oldMatePhone" class="input-new" placeholder=""></el-input>
	                </div>
	                <div class="ullist">
	                    <span class="input-span">邮寄地址</span>
	                    
	                    <el-cascader
	                    	size="mini"
	                    	style="margin-right: 20px" 
        						    :options="cityMap"
        						    v-model="detail.addressOldarray"
        						    @change="handleChange"
        						    >
        						  </el-cascader>
						      <el-input size="mini" class="input-new" v-model="detail.address2Old" placeholder="请输入详细地址"></el-input>

	                    
	                </div>
	                <div class="ullist">
	                    <span class="input-span">邮寄</span>
	                    
                      
	                    <el-select clearable   class="input-new" style="margin-right: 14px;" size="mini" v-model="detail.expressIdOld" placeholder="快递">
	                      	<el-option 
	                        v-for="item in getpageDict.commonMap.expressType" 
	                        :key="item.dicCode"
	                        :label="item.dicName"
	                        :value="item.dicCode">
	                      	</el-option>
	                    </el-select>

	                    <span class="input-span">单号</span>
	                    <el-input  size="mini" v-model="detail.expressNumOld" class="input-new" placeholder="请输入内容"></el-input>
	                </div>
                </div>
                

                <div v-show="choosetab == 'new'" style="position: relative;top: 20px;" class="old">
                  <!--<div v-if="!detail.KzId" class="match_old">当前老客信息没有和现有老客户匹配<span @click="matchdata">查询匹配</span></div>-->

                  <div class="ullist">
                      
                      <el-checkbox @click.native="detail.newkzmatechoose=false"  v-model="detail.newkzchoose"></el-checkbox>
                      <span class="input-span">新客户</span>
                      <el-input :disabled="true" :readonly="true" v-model="detail.kzName" size="mini" style="margin-right: 40px" class="input-new" placeholder=""></el-input>

                      <span class="input-span">电话</span>
                      <el-input :disabled="true" :readonly="true" size="mini" v-model="detail.kzPhone"  class="input-new" placeholder=""></el-input>
                  </div>
                  <div class="ullist">
                      <el-checkbox @click.native="detail.newkzchoose=false" v-model="detail.newkzmatechoose"></el-checkbox>
                      <span class="input-span">新客户配偶</span>
                      <el-input :disabled="true" :readonly="true" size="mini" v-model="detail.mateName" style="margin-right: 40px" class="input-new" placeholder=""></el-input>

                      <span class="input-span">配偶电话</span>
                      <el-input :disabled="true" :readonly="true" size="mini" v-model="detail.matePhone" class="input-new" placeholder=""></el-input>
                  </div>
                  <div class="ullist">
                      <span class="input-span">邮寄地址</span>
                      
                      <el-cascader
                        size="mini"
                        style="margin-right: 20px" 
                        :options="cityMap"
                        v-model="detail.addressNewarray"
                        @change="handleChange"
                        >
                      </el-cascader>
                      <el-input size="mini" class="input-new" v-model="detail.address2New" placeholder="请输入详细地址"></el-input>  
                  </div>
                  <div class="ullist">
                      <span class="input-span">邮寄</span>
                      

                      <el-select clearable  class="input-new" style="margin-right: 14px;" size="mini" v-model="detail.expressIdNew" placeholder="快递">
                          <el-option 
                          v-for="item in getpageDict.commonMap.expressType" 
                          :key="item.dicCode"
                          :label="item.dicName"
                          :value="item.dicCode">
                          </el-option>
                      </el-select> 

                      <span class="input-span">单号</span>
                      <el-input size="mini" v-model="detail.expressNumNew" class="input-new" placeholder="请输入内容"></el-input>
                  </div>
                </div>
                <div v-show="choosetab == 'introduce'"  class="old">
                  <el-table
                    :data="detail.infolist"
                    :header-cell-class-name="tableheaderClassName"
                    class="border-q"
                    :height="260"
                    border
                    style="width: 100%;font-size: 12px;margin-top: 20px;"> 
                    <el-table-column
                      type="index"
                      label="编号"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      width="190"
                      label="姓名"
                      >
                    <template slot-scope="scope"> 
                      {{scope.row.kzName}}
                    </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      width="220"
                      label="联系方式"
                      >
                    <template slot-scope="scope"> 
                      {{scope.row.kzPhone ? scope.row.kzPhone:scope.row.kzWechat}}
                    </template>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      width="180"
                      label="状态"
                      >
                    <template slot-scope="scope"> 
                      {{scope.row.statusName}}
                    </template>
                    </el-table-column>
                  </el-table>
                </div>
            </div>
            <el-input v-show="choosetab != 'introduce'" v-model="detail.memo" size="mini" style="width: 100%;" type="textarea" class="input-new" placeholder="请输入备注"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="$emit('close')">取 消</el-button>
            <el-button size="small" @click="edit_kz_detail" type="primary" >确 定</el-button>
          </span>
        </el-dialog>
        <!--编辑文件部分-->
    	<el-dialog
            :close-on-click-modal="false"
            :visible.sync="matchdialog.dialogVisible"
            width="600px"
          >
              <span slot="title">
                 匹配
              </span>
              <div class="match_content">
                <div class="ul" style="margin-bottom: 26px;">
                   <span class="span">查询</span>
                   <el-input size="mini" v-model="searchData.searchkey" style="width:auto; font-size: 12px;" placeholder="姓名/电话" class="input-with-select">
                   	
                   	  <el-button size="mini" slot="append" @click.stop.prevent="searchok" icon="el-icon-search"></el-button>
                   </el-input>
                   
                </div>

                <el-table
                    :data="searchData.data"
                    :header-cell-class-name="tableheaderClassName"
                    class="border-q"
                    :height="200"
                    @selection-change="handleSelectionChange"
                    border
                    style="width: 100%;font-size: 12px"> 
                    <el-table-column
      				      type="selection"
      				      width="55">
      				    </el-table-column>
                  
	                
	                <el-table-column
	                    width="120"
	                    label="名字"
	                    >
	                    <template slot-scope="scope"> 
	                      <div>{{scope.row.kzName}}</div>
	                      <div>{{scope.row.mateName}}</div>
	                    </template>
	                </el-table-column>
                  <el-table-column
                      width="120"
                      label="联系方式"
                      >
                      <template slot-scope="scope"> 
                        <div>{{scope.row.kzPhone}}</div>
                        <div>{{scope.row.matePhone}}</div>
                      </template>
                  </el-table-column>
	                <el-table-column
	                    width="120"
	                    label="门店"
	                    >
	                    <template slot-scope="scope"> 
	                      <div>{{scope.row.shopName}}</div>
	                    </template>
	                </el-table-column>
                  <el-table-column
                      width="120"
                      label="门市"
                      >
                      <template slot-scope="scope"> 
                        <div>{{scope.row.receptorName}}</div>
                      </template>
                  </el-table-column>
                  <el-table-column
                      width="120"
                      label="套系金额"
                      >
                      <template slot-scope="scope"> 
                        <div>{{scope.row.amount}}</div>
                      </template>
                  </el-table-column>
	                
                </el-table>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="matchdialog.dialogVisible= false">取 消</el-button>
                <el-button size="small" type="primary" @click="oldmsgok">确定绑定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import cityMap from '../../static/cityMap.json'
//console.info(cityMap)
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'


export default {
    name: "order_detail_model",
    components: {
        
    },
    props: {
	    dialogVisible: Boolean,
	    kzId: String
	  },
	  computed: {
        ...mapGetters([
        	'getpageDict',
        ]),
    },
    data(){
        return{
          	cityOptions: [],
          	cityMap: cityMap,
            loading: true,
          	matchdialog: {
                dialogVisible: false
            },
            searchData: {
            	searchkey: '',
            	data: [],
            	chooselist: []
            },
        	  giveType_list: [{
              value: 1,
              label: '只送老客',
            },{
              value: 2,
              label: '新老双送',
            }],
            select_cus_msg: [
                {
                    name: '老客信息',
                    id: 'old',
                    choose: true
                },
                {
                    name: '新客信息',
                    id: 'new',
                    choose: false
                },
                {
                    name: '累计介绍',
                    id: 'introduce',
                    choose: false
                },
            ],
            choosetab: 'old',
            oldstatus: {
            	list: [{
            		name: '确定地址',
            		statusOld: '1',
            		checked: 'false'
            	},{
            		name: '下单',
            		statusOld: '2',
            		checked: 'false'
            	},{
            		name: '送达',
            		statusOld: '3',
            		checked: 'false'
            	},{
            		name: '保留',
            		statusOld: '4',
            		checked: 'false'
            	}],
            	oldchecked: '',
            	newchecked: ''
            },
        	detail: {
            id: '',
        		oldkzchoose: false,
        		oldkzmatechoose: false,
            newkzmatechoose: false,
            newkzchoose: false,
        		address2New: "",
    				address2Old: "",
    				addressNew: "",
    				addressOld: "",
    				addressOldarray: [],
    				amount: 0,
            infolist: [],
            expressFlagNew: "",
            expressFlagOld: "",
    				collectorName: "",
    				createTime: "",
    				expressNameNew: "",
    				expressNameOld: "",
    				expressNumNew: "",
    				expressNumOld: "",
    				giftIdNew: "",
    				giftIdOld: "",
            expressIdOld: "",
            expressIdNew: "",
    				giveType: "",
            giveTypeChoose: true,
    				kzName: "",
    				kzPhone: "",
    				letterId: "",
    				mateName: "",
    				matePhone: "",
            memo: '',
    				oldKzId: "",
    				oldKzName: "",
    				oldKzPhone: "",
    				oldMateName: "",
    				oldMatePhone: "",
    				shopName: "",
    				statusNew: null,
    				statusOld: null
        	},
          gift_lists: []
        }
    },
    mounted(){
      this.get_detail_data()
      this.get_gift()
    },
    methods:{
    	handleChange(value) {
	        console.log(value);
	    },
      //获取快递名字
      getexpressname(id) {
        let arr = this.getpageDict.commonMap.expressType.filter((list) => {
            return list.dicCode == id
        })

        if (arr[0]) {
          return arr[0].dicName
        } else {
          ''
        }

        

      },
      //编辑客资
      edit_kz_detail() {
        let expressFlagNew = ''
        if (this.detail.newkzchoose) {
          expressFlagNew = true
        } 

        if (this.detail.newkzmatechoose) {
          expressFlagNew = false
        } 

        let expressFlagOld = ''
        if (this.detail.oldkzchoose) {
          expressFlagOld = true
        } 

        if (this.detail.oldkzmatechoose) {
          expressFlagOld = false
        } 



        this.$http.post(`info/edit_kz_detail`, {
            companyId: Cookies.get('cid'),
            giveType: this.detail.giveType,
            statusNew: this.oldstatus.newchecked,
            statusOld: this.oldstatus.oldchecked,
            giftIdOld: this.detail.giftIdOld,
            giftIdNew: this.detail.giftIdNew,
            expressFlagNew: expressFlagNew,
            expressFlagOld: expressFlagOld,
            expressIdOld: this.detail.expressIdOld,
            expressNameOld: this.getexpressname(this.detail.expressIdOld),
            expressNumOld: this.detail.expressNumOld,
            addressOld: this.detail.addressOldarray.join(','),
            address2Old: this.detail.address2Old,
            expressIdNew: this.detail.expressIdNew,
            expressNameNew: this.getexpressname(this.detail.expressIdNew),
            expressNumNew: this.detail.expressNumNew,
            addressNew: this.detail.addressNewarray.join(','),
            address2New: this.detail.address2New,
            //oldKzId: this.detail.oldKzId,
            memo: this.detail.memo,
            kzId: this.kzId,
        })
        .then((data)=>{
              
              if (data.code == '100000') {
                
                this.$message({
                  message: data.msg,
                  type: 'success'
                })
                this.$emit('close')

                this.$emit('research')
                  //this.searchData.data = data.data
              } else {
                  this.$message({
                    message: data.msg,
                    type: 'error'
                  })
              }
          })



      },
    	matchdata() {
    		this.matchdialog.dialogVisible = true
    		
    	},
      //礼物下拉列表
      get_gift() {
        this.$http.get(`gift/gift_combobox`)
          .then((data)=>{
            this.gift_lists = data.data
          })

      },
    	oldmsgok() {
    		//console.info(this.searchData.chooselist)
    		if (this.searchData.chooselist.length>1) {
    			

    			this.$message({
	              message: '选择1条您要匹配的信息',
	              type: 'error'
	            })
    		} else if (this.searchData.chooselist.length==1) {

    			this.match_old_kzid(this.searchData.chooselist[0].kzId)
    			
    		} else {
    			this.$message({
	              message: '选择您要匹配的信息',
	              type: 'error'
	            })
    		}
    	},
      //老客匹配
      match_old_kzid(oldKzId) {
        this.$http.post(`info/match_old_kzid`,{
          kzId: this.kzId,
          oldKzId: oldKzId,
        })
        .then((data)=>{
              
              if (data.code == '100000') {
                  this.matchdialog.dialogVisible = false
                  this.detail.oldKzId=this.searchData.chooselist[0].kzId


                  this.detail.oldKzName = this.searchData.chooselist[0].kzName
                  this.detail.oldKzPhone = this.searchData.chooselist[0].kzPhone
                  this.detail.oldMateName = this.searchData.chooselist[0].mateName
                  this.detail.oldMatePhone = this.searchData.chooselist[0].matePhone
                   

                  this.searchData.searchkey = ''
                  this.searchData.data = []
                  this.searchData.chooselist = []
                  this.$message({
                        message: '匹配成功',
                        type: 'success'
                  })

                  
              } else {
                  this.$message({
                    message: data.msg,
                    type: 'error'
                  })
              }
          })
      },
    	handleSelectionChange(val) {

    		this.searchData.chooselist = val
    		
	        
	    },
    	//搜索
	    searchok() {
	        if (!this.searchData.searchkey) {
	          return
	        }

	        if (this.searchData.searchkey.length<3) {
	          if (/[^\u4E00-\u9FA5]/g.test(this.searchData.searchkey)) {
	            return this.$message({
	              message: '请输入清晰的条件',
	              type: 'error'
	            })
	          }
	        }
	        
	        this.$http.get(`info/get_info_list_by_key?searchKey=${this.searchData.searchkey}`)
	        .then((data)=>{
	            
	            if (data.code == '100000') {
	                

	                this.searchData.data = data.data
	            } else {
	                this.$message({
	                  message: data.msg,
	                  type: 'error'
	                })
	            }
	        })
	    },
    	tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
      },
    	handleClick(tab) {
          
          this.choosetab = this.select_cus_msg[tab.index].id
          
      }, 
    	changestatus(flag,list) {
    		if (flag=='old') {
    			if (this.detail.statusOld !=3) {
    				this.oldstatus.oldchecked = list.statusOld
    			} else {
    				return 
    			}
    		} else {
    			if (this.detail.statusNew !=3) {
    				this.oldstatus.newchecked = list.statusOld
    			} else {
    				return 
    			}
    		}
    	},
      /*详情填充*/
      get_detail_data() {
          this.loading = true
	      	this.$http.get(`info/get_info_detail_by_kzid?kzId=${this.kzId}`)
	      		.then((data)=>{
	            
		            if (data.code == '100000') {
                  let infodata = 0
                  if (data.data.infoList.length > 0) {
                    for (let i=0; i<data.data.infoList.length; i++) {
                      data.data.infoList[i].statusName = this.getpageDict.statusMap[data.data.infoList[i].statusId].statusName
                      if (data.data.infoList[i].statusId == 30 || data.data.infoList[i].statusId == 40 || data.data.infoList[i].statusId == 9) {
                        infodata++
                      }
                    }
                  }

                this.detail.infolist = data.data.infoList


                this.select_cus_msg[2].name = `累计介绍(${infodata}/${data.data.infoList.length})`
  			        this.detail.letterId = data.data.letterId
  			        this.detail.createTime = data.data.createTime
  			        this.detail.shopName = data.data.shopName
  			        this.detail.collectorName = data.data.collectorName
  			        this.detail.amount = data.data.amount
  			        this.detail.giveType = data.data.giveType



  			        this.detail.statusNew = data.data.statusNew
  			        this.detail.statusOld = data.data.statusOld


                //新老双送。新客送达
                if (data.data.giveType==2 && data.data.statusNew==3) {
                  this.detail.giveTypeChoose=false
                } else {
                  this.detail.giveTypeChoose=true
                }
      					this.detail.giftIdOld = data.data.giftIdOld
                this.detail.giftIdNew = data.data.giftIdNew
      					this.detail.oldKzName = data.data.oldKzName
      					this.detail.oldKzPhone = data.data.oldKzPhone
      					this.detail.oldMateName = data.data.oldMateName
      					this.detail.oldMatePhone = data.data.oldMatePhone
      					this.detail.kzName = data.data.kzName
                this.detail.kzPhone = data.data.kzPhone
      					this.detail.mateName = data.data.mateName
      					this.detail.matePhone = data.data.matePhone
      					this.detail.expressNameNew = data.data.expressNameNew
      					this.detail.expressNumNew = data.data.expressNumNew
      					this.detail.addressNew = data.data.addressNew
                this.detail.addressNewarray = data.data.addressNew.split(",")

      					this.detail.address2New = data.data.address2New
                this.detail.id = data.data.id
                this.detail.memo = data.data.memo
      					this.detail.expressNameOld = data.data.expressNameOld
      					this.detail.expressNumOld = data.data.expressNumOld

                this.detail.expressIdNew = data.data.expressIdNew
                this.detail.expressIdOld = data.data.expressIdOld

                this.detail.expressFlagOld = data.data.expressFlagOld
                this.detail.expressFlagNew = data.data.expressFlagNew

                
                if (this.detail.expressFlagOld === true) {
                  this.detail.oldkzchoose = true
                  this.detail.oldkzmatechoose = false
                } else if (this.detail.expressFlagOld === false) {
                  this.detail.oldkzmatechoose = true
                  this.detail.oldkzchoose = false
                } else {
                  this.detail.oldkzmatechoose = false
                  this.detail.oldkzchoose = false
                }

                if (this.detail.expressFlagNew === true) {
                  this.detail.newkzchoose = true
                  this.detail.newkzmatechoose = false
                } else if (this.detail.expressFlagNew === false) {
                  this.detail.newkzmatechoose = true
                  this.detail.newkzchoose = false
                } else {
                  this.detail.newkzmatechoose = false
                  this.detail.newkzchoose = false
                }

      					this.detail.addressOldarray = data.data.addressOld.split(",")

                
      					this.detail.addressOld = data.data.addressOld
      					this.detail.address2Old = data.data.address2Old
      					this.detail.oldKzId = data.data.oldKzId
                this.detail.kzId = this.kzId

                this.oldstatus.newchecked = this.detail.statusNew
                this.oldstatus.oldchecked = this.detail.statusOld

                this.loading = false
		            } else {
		                this.$message({
		                  message: data.msg,
		                  type: 'error'
		                })
		            }
		        })
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

.content_height {
  height: 260px;
  &.introduce {
    height: 308px;
  }
}

.order_detail_model {

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
  .edit-content {
    font-size: 12px;
    .input-new {
        display: inline-block;
        width: 130px;
    }



    .input-span {
        padding-right: 10px;
    }
    .old {
    	.match_old {
    		width: 100%;
    		background: rgb(252, 246, 237);
    		color: orange;
    		padding-left: 16px;
    		height: 34px;
    		line-height: 34px;
    		margin-bottom: 10px;
    		position: relative;

    		span {
    			position: absolute;
    			right: 10px;
    			color: #53a2f0;
    			cursor: pointer;
    		}


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

            &.baacumulate {
            	background: blue;
            	color: white;
            }
        }
    }
    .ul {
        display: inline-block;
        margin-right: 16px;
        margin-bottom: 10px;

        .span {
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

            &.blue {
            	background: blue;
            	color: white;
            }
        }
    }
}

}
  
</style>
