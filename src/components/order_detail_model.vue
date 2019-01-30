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
                    <span class="lable" style="position: relative;top: 3px;">老客状态</span>
                    <div style="display: inline-block;" class="el-checkbox-group">

                      <label @click="changestatus('old',list)" v-for="list in oldstatus.list" :class="{'is-checkeda': oldstatus.oldchecked ==list.statusOld,'is-disabled':list.oldstatusdisable}" class="el-checkbox-button el-checkbox-button--small">
                        <input type="radio" :disabled="list.oldstatusdisable" tabindex="-1" class="el-radio-button__orig-radio" :value="list.name">

                        <span class="el-checkbox-button__inner">{{list.name}}</span>
                      </label>

                    </div>

                    
                    <!--<span @click="changestatus('old',list)" v-for="list in oldstatus.list" :class="{blue: oldstatus.oldchecked ==list.statusOld}"  class="el-tag cursor">{{list.name}}</span>
                    -->
                </div>
                <div class="ul">
                   <span class="span">礼品</span>
                   
                   <!--<el-select clearable  class="input-new" :disabled="detail.statusOld==3" size="mini" v-model="detail.giftIdOld" placeholder="礼品">
                      <el-option 
                        v-for="item in gift_lists" 
                        :key="item.id"
                        :label="item.giftName"
                        :disabled="item.statusId==1?false:true"
                        :value="item.id">
                      </el-option>
                    </el-select>-->
                    <el-cascader
                      :clearable="true"
                      size="mini"
                      :disabled="detail.statusOld==3 || detail.statusOld==2"
                      :options="giftarray"
                      v-model="giftOptionsold"
                    ></el-cascader> 
               </div> 
            </div>
            <div v-show="!detail.giveType || detail.giveType==2">
                <div class="ul1">
                    <span class="lable" style="position: relative;top: 3px;">新客状态</span>


                    <div style="display: inline-block;" class="el-checkbox-group">

                      <label @click="changestatus('new',list)" v-for="list in oldstatus.list" :class="{'is-checkeda': oldstatus.newchecked ==list.statusOld,'is-disabled':list.newstatusdisable}" class="el-checkbox-button el-checkbox-button--small">

                        <input type="radio" :disabled="list.newstatusdisable" tabindex="-1" class="el-radio-button__orig-radio" :value="list.name">
                        <span class="el-checkbox-button__inner">{{list.name}}</span>
                      </label>

                    </div>

                    <!--<span @click="changestatus('new',list)" v-for="list in oldstatus.list" :class="{blue: oldstatus.newchecked ==list.statusOld}"  class="el-tag cursor">{{list.name}}</span>
                    -->
                </div>
                <div class="ul">
                   <span class="span">礼品</span>
                    <!--<el-select clearable :disabled="detail.statusNew==3"  class="input-new"  size="mini" v-model="detail.giftIdNew" placeholder="礼品">
                      <el-option 
                        v-for="(item,index) in gift_lists" 
                        :key="item.index"
                        :disabled="item.statusId==1?false:true"
                        :label="item.giftName"
                        :value="item.id">
                      </el-option>
                    </el-select> -->
                    <el-cascader
                      size="mini"
                      :clearable="true"
                      :disabled="detail.statusNew==3 || detail.statusNew==2"
                      :options="giftarray"
                      v-model="giftOptionsnew"
                    ></el-cascader>
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
                  <div v-if="detail.oldKzId" class="match_old">匹配错误？<span @click="matchclear">清空匹配</span></div>


                	<div  class="ullist">
	                    
	                    
	                    <span  class="input-span">老客户</span>
	                    <el-input @click.native="copytext(detail.oldKzName)" :disabled="true" :readonly="true" v-model="detail.oldKzName" size="mini" style="margin-right: 40px" class="input-new" placeholder=""></el-input>

	                    <span class="input-span">电话</span>
	                    <el-input @click.native="copytext(detail.oldKzPhone)" :disabled="true" size="mini" :readonly="true" v-model="detail.oldKzPhone"  class="input-new" placeholder=""></el-input>
	                </div>
	                <div class="ullist">
	                    
	                    <span class="input-span">老客户配偶</span>
	                    <el-input :disabled="true" :readonly="true" @click.native="copytext(detail.oldMateName)"  size="mini" v-model="detail.oldMateName" style="margin-right: 40px" class="input-new" placeholder=""></el-input>

	                    <span class="input-span">配偶电话</span>
	                    <el-input :disabled="true" @click.native="copytext(detail.oldMatePhone)" size="mini" :readonly="true" v-model="detail.oldMatePhone" class="input-new" placeholder=""></el-input>
	                </div>
                  <div class="ullist">
                      
                      <span class="input-span">收货人姓名</span>
                      <el-input  size="mini" v-model="detail.receiveNameOld" style="margin-right: 40px" class="input-new" placeholder=""></el-input>

                      <span class="input-span">收货人电话</span>
                      <el-input size="mini" v-model="detail.receivePhoneOld" class="input-new" placeholder=""></el-input>
                  </div>
	                <div class="ullist">
	                    <span class="input-span">邮寄地址</span>
	                    
	                    <el-cascader
	                    	size="mini"
	                    	style="width: 300px" 
        						    :options="cityMap"
        						    v-model="detail.addressOldarray"
        						    @change="handleChange"
        						    >
        						  </el-cascader>
						      
	                </div>
                  <div class="ullist">
                      <span class="input-span" style="position: relative;top: -20px">详细地址</span>
                      
                      
                      <el-input size="mini" type="textarea"  style="width: 300px" class="input-new" v-model="detail.address2Old" placeholder="请输入详细地址"></el-input>

                      
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
                      
                      <!--<el-checkbox @click.native="detail.newkzmatechoose=false"  v-model="detail.newkzchoose"></el-checkbox>-->
                      <span class="input-span">新客户</span>
                      <el-input @click.native="copytext(detail.kzName)" :disabled="true" :readonly="true" v-model="detail.kzName" size="mini" style="margin-right: 40px" class="input-new" placeholder=""></el-input>

                      <span class="input-span">电话</span>
                      <el-input @click.native="copytext(detail.kzPhone)" :disabled="true" :readonly="true" size="mini" v-model="detail.kzPhone"  class="input-new" placeholder=""></el-input>
                  </div>
                  <div class="ullist">
                      <!--<el-checkbox @click.native="detail.newkzchoose=false" v-model="detail.newkzmatechoose"></el-checkbox>-->
                      <span class="input-span">新客户配偶</span>
                      <el-input @click.native="copytext(detail.mateName)" :disabled="true" :readonly="true" size="mini" v-model="detail.mateName" style="margin-right: 40px" class="input-new" placeholder=""></el-input>

                      <span class="input-span">配偶电话</span>
                      <el-input @click.native="copytext(detail.matePhone)" :disabled="true" :readonly="true" size="mini" v-model="detail.matePhone" class="input-new" placeholder=""></el-input>
                  </div>
                  <div class="ullist">
                      
                      <span class="input-span">收货人姓名</span>
                      <el-input  :disabled="detail.giveType==1" size="mini" v-model="detail.receiveNameNew" style="margin-right: 40px" class="input-new" placeholder=""></el-input>

                      <span class="input-span">收货人电话</span>
                      <el-input :disabled="detail.giveType==1" size="mini" v-model="detail.receivePhoneNew" class="input-new" placeholder=""></el-input>
                  </div>
                  <div class="ullist">
                      <span class="input-span">邮寄地址</span>
                      
                      <el-cascader
                        :disabled="detail.giveType==1"
                        size="mini"
                        style="width: 300px" 
                        :options="cityMap"
                        v-model="detail.addressNewarray"
                        @change="handleChange"
                        >
                      </el-cascader>
                        
                  </div>
                  <div class="ullist">
                      <span style="position: relative;top: -20px" class="input-span">详细地址</span>
                      
                      
                      <el-input type="textarea" style="width: 300px;"  size="mini" :disabled="detail.giveType==1" class="input-new" v-model="detail.address2New" placeholder="请输入详细地址"></el-input>  
                  </div>
                  <div class="ullist">
                      <span class="input-span">邮寄</span>
                      

                      <el-select :disabled="detail.giveType==1" clearable  class="input-new" style="margin-right: 14px;" size="mini" v-model="detail.expressIdNew" placeholder="快递">
                          <el-option 
                          v-for="item in getpageDict.commonMap.expressType" 
                          :key="item.dicCode"
                          :label="item.dicName"
                          :value="item.dicCode">
                          </el-option>
                      </el-select> 

                      <span class="input-span">单号</span>
                      <el-input :disabled="detail.giveType==1" size="mini" v-model="detail.expressNumNew" class="input-new" placeholder="请输入内容"></el-input>
                  </div>
                </div>
                <div v-show="choosetab == 'introduce'"  class="old">
                  <el-table
                    :data="detail.infolist"
                    :header-cell-class-name="tableheaderClassName"
                    @row-dblclick="acumulate"
                    :row-class-name="tableRowClassName"
                    class="border-q"
                    :height="340"
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
import * as clipboard from "clipboard-polyfill"


export default {
    name: "order_detail_model",
    components: {
        
    },
    props: {
	    dialogVisible: Boolean,
	    kzId: String,
      searchDatatoatl: Object
	  },
	  computed: {
        ...mapGetters([
        	'getpageDict',
        ]),
    },
    data(){
        return{
            giftarray: [],
            giftOptionsnew: [],
            giftOptionsold: [],
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
                name: '保留',
                statusOld: 4,
                checked: 'false',
                oldstatusdisable: false,
                newstatusdisable: false,
                index: 0
              },{
            		name: '确定地址',
            		statusOld: 1,
            		checked: 'false',
                oldstatusdisable: false,
                newstatusdisable: false,
                index: 1
            	},{
            		name: '下单',
            		statusOld: 2,
            		checked: 'false',
                oldstatusdisable: false,
                newstatusdisable: false,
                index: 2
            	},{
            		name: '送达',
            		statusOld: 3,
            		checked: 'false',
                oldstatusdisable: false,
                newstatusdisable: false,
                index: 3
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
            receiveNameOld: "",
            receivePhoneOld: "",
            receiveNameNew: "",
            receivePhoneNew: "",
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
      
      this.get_gifts()
    },
    methods:{
      acumulate(row) {
        this.$emit('acumulate',row.kzId)
      },
      tableRowClassName({row, rowIndex}) {
        if (row.flag === 1) {
          return 'success-row-a';
        }
        return '';
      },
      matchclear() {
        this.$http.get(`info/clear_old_kzid?kzId=${this.kzId}`)
          .then((data)=>{
              
              if (data.code == '100000') {
                  
                  this.detail.oldKzId=""


                  this.get_detail_data()
                  this.get_gift()
                   
                  this.$message({
                        message: data.msg,
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
      copytext(text) {
        if (text) {
          clipboard.writeText(text)

          this.$message({
            message: "复制成功",
            type: 'success'
          })
        } else {
          this.$message({
            message: "没有消息需要复制",
            type: 'warning'
          })
        }
        
      },
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
        /*let expressFlagNew = ''
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
        }*/ 
        



        this.$http.post(`info/edit_kz_detail`, {
            companyId: Cookies.get('cid'),
            giveType: this.detail.giveType,
            statusNew: this.oldstatus.newchecked,
            statusOld: this.oldstatus.oldchecked,
            giftIdOld: this.giftOptionsold.length== 2 ? this.giftOptionsold[1]:'',
            giftIdNew: this.giftOptionsnew.length== 2 ? this.giftOptionsnew[1]:'',
            //expressFlagNew: expressFlagNew,
            //expressFlagOld: expressFlagOld,
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
            receivePhoneNew: this.detail.receivePhoneNew,
            receiveNameOld: this.detail.receiveNameOld,
            receiveNameNew: this.detail.receiveNameNew,
            receivePhoneOld: this.detail.receivePhoneOld,
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
      get_gifts() {
        this.$http.get(`gift/gift_comboboxs`)
          .then((data)=>{

           // let datalist = data.data

            

            for (let i=0; i<data.data.length; i++) {
              data.data[i].value = data.data[i].dicCode
              data.data[i].label = data.data[i].dicName
              data.data[i].children = []


              if (data.data[i].giftVOS && data.data[i].giftVOS.length) {
                for (let j=0; j<data.data[i].giftVOS.length; j++) {

                  data.data[i].children.push({
                    value: data.data[i].giftVOS[j].id,
                    label: data.data[i].giftVOS[j].giftName,
                    disabled: data.data[i].giftVOS[j].statusId==1 ? false: true
                  })
                }
              }
            }

            this.giftarray = data.data
            

            this.get_detail_data()

            //console.info(data.data)
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

          let dlItem = this.oldstatus.list.find((item) => {
              return item.statusOld == this.detail.statusOld
          })


          

          if (dlItem) {
            if (list.index > dlItem.index || list.index == dlItem.index) {
              this.oldstatus.oldchecked = list.statusOld
            } else {
              /*this.$message({
                message: '请输入清晰的条件',
                type: 'error'
              })*/
            }
          } else {
            this.oldstatus.oldchecked = list.statusOld
          }
    		} else {
          let dlItem = this.oldstatus.list.find((item) => {
              return item.statusOld == this.detail.statusNew
          })

          if (dlItem) {
            if (list.index > dlItem.index || list.index == dlItem.index) {
              this.oldstatus.newchecked = list.statusOld
            }
          } else {
            this.oldstatus.newchecked = list.statusOld
          }
    		}
    	},
      getarraygift(id) {
        let array = []
        if (id) {
          for (let i=0; i<this.giftarray.length; i++) {
            for (let j=0; j<this.giftarray[i].children.length;j++) {
              if (this.giftarray[i].children[j].value==id) {
                array.push(this.giftarray[i].value)
                array.push(id)
                break
              }
            }
          }
        }
        //console.info(array)
        return array
       
      },
      /*详情填充*/
      get_detail_data() {
          this.loading = true
	      	this.$http.get(`info/get_info_detail_by_kzid?kzId=${this.kzId}`)
	      		.then((data)=>{
	            
		            if (data.code == '100000') {
                  let infodata = 0

                  //flag == 1 新客id相同
                  //flag == 2 下单时间在搜索范围
                  


                  if (data.data.infoList.length > 0) {
                    for (let i=0; i<data.data.infoList.length; i++) {
                      data.data.infoList[i].statusName = this.getpageDict.statusMap[data.data.infoList[i].statusId].statusName

                      if (this.kzId==data.data.infoList[i].kzId) {
                        data.data.infoList[i].flag = 1
                      } else {
                        data.data.infoList[i].flag = 0
                      }



                      if (data.data.infoList[i].statusId == 30 || data.data.infoList[i].statusId == 40 || data.data.infoList[i].statusId == 9) {

                        if ((data.data.infoList[i].successTime-(new Date(this.searchDatatoatl.start).getTime()/1000) > 0  || data.data.infoList[i].successTime-(new Date(this.searchDatatoatl.start).getTime()/1000) == 0) && (new Date(this.searchDatatoatl.end).getTime()/1000-data.data.infoList[i].successTime>0 || new Date(this.searchDatatoatl.end).getTime()/1000-data.data.infoList[i].successTime==0)) {
                          infodata++
                        }
                        
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
                this.giftOptionsnew = []
                this.giftOptionsold = []

                //console.info(this.detail.giftIdNew)
                this.giftOptionsnew = this.getarraygift(this.detail.giftIdNew)
                this.giftOptionsold = this.getarraygift(this.detail.giftIdOld)

                //console.info(this.giftOptionsnew)


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

                
                /*if (this.detail.expressFlagOld === true) {
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
                }*/

                this.detail.receiveNameOld = data.data.receiveNameOld
                this.detail.receivePhoneOld = data.data.receivePhoneOld
                this.detail.receiveNameNew = data.data.receiveNameNew
                this.detail.receivePhoneNew = data.data.receivePhoneNew



      					this.detail.addressOldarray = data.data.addressOld.split(",")

                
      					this.detail.addressOld = data.data.addressOld
      					this.detail.address2Old = data.data.address2Old
      					this.detail.oldKzId = data.data.oldKzId
                this.detail.kzId = this.kzId

                this.oldstatus.newchecked = this.detail.statusNew



                this.oldstatus.oldchecked = this.detail.statusOld

                




                let dlItem = this.oldstatus.list.find((item) => {
                    return item.statusOld == this.detail.statusOld
                })


                let dlItem2 = this.oldstatus.list.find((item) => {
                    return item.statusOld == this.detail.statusNew
                })

                if (dlItem2) {
                  for (let i=0; i<dlItem2.index; i++) {
                    this.oldstatus.list[i].newstatusdisable = true
                  }
                  
                }


                

                if (dlItem) {
                  for (let i=0; i<dlItem.index; i++) {
                    this.oldstatus.list[i].oldstatusdisable = true
                  }
                  
                }

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


.el-table .success-row-a {
  background: pink;
}
.el-checkbox-button.is-checkeda .el-checkbox-button__inner {
  background-color: #0057ff;
  color: #ffffff;
}
.el-checkbox-button.is-checkeda .el-checkbox-button__inner {
      border-color: #0057ff;
      box-shadow: -1px 0 0 0 #0057ff;

}

.el-table .table-head-th{
    background-color:#f4f4f4;
    color: #000;
    padding: 6px 0;
}

.content_height {
  height: 350px;
  &.introduce {
    height: 398px;
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
