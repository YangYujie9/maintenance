<template>
    <div class="order_detail_model">
    	<!--编辑文件部分-->
        <el-dialog
            :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          :show-close="false"
          width="680px"
          >
          <span slot="title">
             编辑
          </span>
          <div class="edit-content">
            <div>
               <div class="ul">
                   <span>订单点</span>
                   <el-input size="mini" v-model="detail.shopName" :readonly="true" class="input-new" placeholder="请输入内容"></el-input>
               </div> 
               <div class="ul">
                   <span>渠道员工</span>
                   <el-input size="mini" v-model="detail.collectorName" :readonly="true" class="input-new" placeholder="请输入内容"></el-input>
               </div> 
               <div class="ul">
                   <span>套餐价格</span>
                   <el-input size="mini" v-model="detail.amount" :readonly="true" class="input-new" placeholder="请输入内容"></el-input>
               </div> 
            </div>
            <div>
                <div class="ul">
                   <span>送礼方式</span>
                   <!--摄影师-->
                    <el-select clearable  class="input-new"  size="mini" v-model="detail.giveType" placeholder="送礼模式">
                      <el-option 
                        v-for="item in giveType_list" 
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select> 
               	</div> 

            </div>
            <div>
                <div class="ul1">
                    <span class="lable">老客状态</span>
                    <span @click="changestatus('old',list)" v-for="list in oldstatus.list" :class="{blue: oldstatus.oldchecked ==list.statusOld}"  class="el-tag cursor">{{list.name}}</span><!--
                    -->
                </div>
                <div class="ul">
                   <span>礼品</span>
                   
                   <el-select clearable  class="input-new"  size="mini" v-model="detail.giftIdOld" placeholder="礼品">
                      <el-option 
                        v-for="item in gift_lists" 
                        :key="item.id"
                        :label="item.giftName"
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
                   <span>礼品</span>
                   <el-select clearable  class="input-new"  size="mini" v-model="detail.giftIdNew" placeholder="送礼模式">
                      <el-option 
                        v-for="item in gift_lists" 
                        :key="item.id"
                        :label="item.giftName"
                        :value="item.id">
                      </el-option>
                    </el-select> 
               </div> 
            </div>
            <div>
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
                <div v-show="choosetab == 'old'" class="old">
                	<div v-if="!detail.oldKzId" class="match_old">当前老客信息没有和现有老客户匹配<span @click="matchdata">查询匹配</span></div>

                	<div class="ullist">
	                    
	                    <el-checkbox v-model="detail.oldkzchoose"></el-checkbox>
	                    <span class="input-span">老客户</span>
	                    <el-input v-model="detail.oldKzName" size="mini" style="margin-right: 40px" class="input-new" placeholder="请输入内容"></el-input>

	                    <span class="input-span">电话</span>
	                    <el-input size="mini" v-model="detail.oldKzPhone"  class="input-new" placeholder="请输入内容"></el-input>
	                </div>
	                <div class="ullist">
	                    <el-checkbox v-model="detail.oldkzmatechoose"></el-checkbox>
	                    <span class="input-span">老客户配偶</span>
	                    <el-input  size="mini" v-model="detail.oldMateName" style="margin-right: 40px" class="input-new" placeholder="请输入内容"></el-input>

	                    <span class="input-span">配偶电话</span>
	                    <el-input size="mini" v-model="detail.oldMatePhone" class="input-new" placeholder="请输入内容"></el-input>
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
	                    

	                    <el-select clearable  class="input-new" style="margin-right: 14px;" size="mini" v-model="detail.expressIdOld" placeholder="快递时间">
	                      	<el-option 
	                        v-for="item in getpageDict.commonMap.expressType" 
	                        :key="item.id"
	                        :label="item.dicName"
	                        :value="item.id">
	                      	</el-option>
	                    </el-select> 

	                    <span class="input-span">单号</span>
	                    <el-input size="mini" v-model="detail.expressNumOld" class="input-new" placeholder="请输入内容"></el-input>
	                </div>
                </div>
                

                <div v-show="choosetab == 'new'" class="old">
                  <!--<div v-if="!detail.KzId" class="match_old">当前老客信息没有和现有老客户匹配<span @click="matchdata">查询匹配</span></div>-->

                  <div class="ullist">
                      
                      <el-checkbox v-model="detail.newkzchoose"></el-checkbox>
                      <span class="input-span">新客户</span>
                      <el-input v-model="detail.newKzName" size="mini" style="margin-right: 40px" class="input-new" placeholder="请输入内容"></el-input>

                      <span class="input-span">电话</span>
                      <el-input size="mini" v-model="detail.newKzPhone"  class="input-new" placeholder="请输入内容"></el-input>
                  </div>
                  <div class="ullist">
                      <el-checkbox v-model="detail.newkzmatechoose"></el-checkbox>
                      <span class="input-span">新客户配偶</span>
                      <el-input  size="mini" v-model="detail.newMateName" style="margin-right: 40px" class="input-new" placeholder="请输入内容"></el-input>

                      <span class="input-span">配偶电话</span>
                      <el-input size="mini" v-model="detail.newMatePhone" class="input-new" placeholder="请输入内容"></el-input>
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
                      

                      <el-select clearable  class="input-new" style="margin-right: 14px;" size="mini" v-model="detail.expressIdNew" placeholder="快递时间">
                          <el-option 
                          v-for="item in getpageDict.commonMap.expressType" 
                          :key="item.id"
                          :label="item.dicName"
                          :value="item.id">
                          </el-option>
                      </el-select> 

                      <span class="input-span">单号</span>
                      <el-input size="mini" v-model="detail.expressNumNew" class="input-new" placeholder="请输入内容"></el-input>
                  </div>
                </div>
                
            </div>
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
                   <span>查询</span>
                   <el-input size="mini" v-model="searchData.searchkey" style="width:auto; font-size: 12px;" placeholder="请输入搜索内容" class="input-with-select">
                   	
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
                </el-table>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="matchdialog.dialogVisible= false">取 消</el-button>
                <el-button size="small" type="primary" @click="oldmsgok">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
import cityMap from '../../static/cityMap.json'
//console.info(cityMap)
import { mapGetters } from 'vuex'



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
        	matchdialog: {
                dialogVisible: false
            },
            searchData: {
            	searchkey: '',
            	data: [],
            	chooselist: []
            },
        	giveType_list: [{
              value: '1',
              label: '只送老客',
            },{
              value: '2',
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
                    name: '累计介绍(4/6)',
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
        		oldkzchoose: false,
        		oldkzmatechoose: false,
            newkzmatechoose: false,
            newkzchoose: false,
        		address2New: "",
    				address2Old: "",
    				addressNew: "",
    				addressOld: "",
    				addressOldarray: [],
    				amount: 3,
    				collectorName: "小利",
    				createTime: "2018/06/22",
    				expressNameNew: "",
    				expressNameOld: "",
    				expressNumNew: "",
    				expressNumOld: "",
    				giftIdNew: "",
    				giftIdOld: "",
    				giveType: "",
    				kzName: "",
    				kzPhone: "",
    				letterId: "",
    				mateName: "",
    				matePhone: "",
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
      edit_kz_detail() {
        alert(99)
        console.info(this.detail)
      },
    	matchdata() {
    		this.matchdialog.dialogVisible = true
    		
    	},
      get_gift() {
        this.$http.get(`gift/giftComboBox`)
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
    			
    			this.matchdialog.dialogVisible = false
    			this.detail.oldKzId=this.searchData.chooselist[0].oldKzId
    			this.searchData.searchkey = ''
    			this.searchData.data = []
    			this.searchData.chooselist = []
    			this.$message({
	              message: '匹配成功',
	              type: 'success'
	            })
    		} else {
    			this.$message({
	              message: '选择您要匹配的信息',
	              type: 'error'
	            })
    		}
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
          //this.searchItem.statusId = this.selectTab[tab.index].id

          //console.info(tab)
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
      	get_detail_data() {
	      	this.$http.get(`info/get_info_detail_by_kzid?kzId=${this.kzId}`)
	      		.then((data)=>{
	            
		            if (data.code == '100000') {
		            	
			        this.detail.letterId = data.data.letterId
			        this.detail.createTime = data.data.createTime
			        this.detail.shopName = data.data.shopName
			        this.detail.collectorName = data.data.collectorName
			        this.detail.amount = data.data.amount
			        this.detail.giveType = data.data.giveType
			        this.detail.statusNew = data.data.statusNew
			        this.detail.statusOld = data.data.statusOld
					this.detail.giftIdOld = data.data.giftIdOld
					this.detail.oldKzName = data.data.oldKzName
					this.detail.oldKzPhone = data.data.oldKzPhone
					this.detail.oldMateName = data.data.oldMateName
					this.detail.oldMatePhone = data.data.oldMatePhone
					this.detail.kzName = data.data.kzName
					this.detail.mateName = data.data.mateName
					this.detail.matePhone = data.data.matePhone
					this.detail.expressNameNew = data.data.expressNameNew
					this.detail.expressNumNew = data.data.expressNumNew
					this.detail.addressNew = data.data.addressNew
					this.detail.address2New = data.data.address2New
					this.detail.expressNameOld = data.data.expressNameOld
					this.detail.expressNumOld = data.data.expressNumOld

					this.detail.addressOldarray = data.data.addressOld.split(",")
					this.detail.addressOld = data.data.addressOld
					this.detail.address2Old = data.data.address2Old
					this.detail.oldKzId = data.data.oldKzId


		            	
		            
		            	
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

            &.blue {
            	background: blue;
            	color: white;
            }
        }
    }
}

}
  
</style>
