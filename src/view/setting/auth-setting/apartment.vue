<template>
    <div @click.stop="filerdata()" class="apartment">
    	<div class="apartment-left">
    		<div class="apartment-left-top">
    			<el-button size="small" @click="addapartment" style="width: 200px;" type="primary">新增部门</el-button>
    		</div>
    		<div class="apartment-left-bottom">
    			<el-menu
			      default-active="2"
			      class="el-menu-vertical-demo"
			      @open="handleOpen"
			      @close="handleClose"> 
			      <div @click.stop="filerdata()" v-for="list in leftdata">
				      <el-submenu  v-if="list.groupVOList.length>0"   @click.native.stop="show_detail(list.groupId, list.groupName,list)" :index="list.groupId" :key="list.groupId">
				        <template slot="title">
				          	<span :class="{bluecolor: list.color}">{{list.groupName}}</span>

				          	<!--<i v-show="list.setting" @click.stop="filerdata(list)" style="position: absolute;right: 40px;top: 16px;" class="iconfont el-icon-setting iconfont-absolute"></i>-->

				          	

				          	<el-popover placement="right" v-model="list.setting" class="setting-1-el-popover" trigger="manual">
			                    <div class="el-popover-content el-popover-content-first">
			                      <el-button type="text" @click.stop="editapart(list)" size="mini">编辑</el-button>

			                    </div>
			                    <div class="el-popover-content">
			                      <el-button type="text" @click.stop="deleteapart(list)" size="mini">删除</el-button>

			                    </div>
			                    <div class="el-popover-content">
			                      <el-button type="text" @click="addapartmenttwo(list)" size="mini">新增下一级</el-button>

			                    </div>
			                    <i slot="reference" @click.stop="filerdata(list)" class="iconfont el-icon-setting iconfont-absolute"></i>
			                 </el-popover>



					        
				        </template>
				        <div v-if="list.groupVOList.length>0" v-for="listtow in list.groupVOList">
				        
					        <el-submenu @click.native.stop="show_detail(listtow.groupId, list.groupName+'/' +listtow.groupName, listtow)" :key="listtow.groupId" :index="listtow.groupId"  v-if="listtow.groupVOList.length>0">
					          <template slot="title">
						          <span :class="{bluecolor: listtow.color}">{{listtow.groupName}}</span>
						          <el-popover placement="right" v-model="listtow.setting" class="setting-1-el-popover" trigger="manual">
				                    <div class="el-popover-content el-popover-content-first">
				                      <el-button type="text" @click.stop="editapart(listtow)" size="mini">编辑</el-button>

				                    </div>
				                    <div class="el-popover-content">
				                      <el-button type="text" @click.stop="deleteapart(listtow)" size="mini">删除</el-button>

				                    </div>
				                    <div class="el-popover-content">
				                      <el-button type="text" @click="addapartmenttwo(listtow)" size="mini">新增下一级</el-button>

				                    </div>
				                    <i slot="reference" @click.stop="filerdata(listtow)" class="iconfont el-icon-setting iconfont-absolute"></i>
				                 </el-popover>

							    

						      </template>

						      <div v-if="listtow.groupVOList.length>0" :key="listthree.groupId" v-for="listthree in listtow.groupVOList">

						      	<el-submenu @click.native.stop="show_detail(listthree.groupId, list.groupName+'/' +listtow.groupName+'/' +listthree.groupName, listthree)" :index="listthree.groupId"  v-if="listthree.groupVOList.length>0">
						          <template slot="title">
							          <span :class="{bluecolor: listthree.color}">{{listthree.groupName}}</span>


								        <el-popover placement="right" v-model="listthree.setting" class="setting-1-el-popover" trigger="manual">
					                    <div class="el-popover-content el-popover-content-first">
					                      <el-button type="text" @click.stop="editapart(listthree)" size="mini">编辑</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click.stop="deleteapart(listthree)" size="mini">删除</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click="addapartmenttwo(listthree)" size="mini">新增下一级</el-button>

					                    </div>
					                    <i slot="reference" @click.stop="filerdata(listthree)" class="iconfont el-icon-setting iconfont-absolute"></i>
					                 </el-popover>

								    
					            	</template>


					            	<div v-if="listthree.groupVOList.length>0" :key="listfour.groupId" v-for="listfour in listthree.groupVOList">

					            		<el-submenu @click.native.stop="show_detail(listfour.groupId, list.groupName+'/' +listtow.groupName+'/' +listthree.groupName+'/' +listfour.groupName, listfour)" :index="listfour.groupId"  v-if="listfour.groupVOList.length>0">
					            			<template slot="title">
									          <span :class="{bluecolor: listfour.color}">{{listfour.groupName}}</span>


										        <el-popover placement="right" v-model="listfour.setting" class="setting-1-el-popover" trigger="manual">
							                    <div class="el-popover-content el-popover-content-first">
							                      <el-button type="text" @click.stop="editapart(listfour)" size="mini">编辑</el-button>

							                    </div>
							                    <div class="el-popover-content">
							                      <el-button type="text" @click.stop="deleteapart(listfour)" size="mini">删除</el-button>

							                    </div>
							                    <div class="el-popover-content">
							                      <el-button type="text" @click="addapartmenttwo(listfour)" size="mini">新增下一级</el-button>

							                    </div>
							                    <i slot="reference" @click.stop="filerdata(listfour)" class="iconfont el-icon-setting iconfont-absolute"></i>
							                 </el-popover>

										    
							            	</template>




							            	<el-menu-item :key="listfive.groupId"  @click.native.stop="show_detail(listfive.groupId, list.groupName+'/' +listtow.groupName+'/' +listthree.groupName+'/' +listfour.groupName + '/'+listfive.groupName,listfive)" v-if="listfour.groupVOList.length>0" v-for="listfive in listfour.groupVOList" :index="listfive.groupId" >

										        <span :class="{bluecolor: listfive.color}">{{listfive.groupName}}</span>


										        <el-popover placement="right" v-model="listfive.listfive" class="setting-1-el-popover" trigger="manual">
							                    <div class="el-popover-content el-popover-content-first">
							                      <el-button type="text" @click.stop="editapart(listfive)" size="mini">编辑</el-button>

							                    </div>
							                    <div class="el-popover-content">
							                      <el-button type="text" @click.stop="deleteapart(listfive)" size="mini">删除</el-button>

							                    </div>
							                    
							                    <i slot="reference" @click.stop="filerdata(listfive)" class="iconfont el-icon-setting iconfont-absolute"></i>
							                 </el-popover>
										        
										    </el-menu-item>

					            		</el-submenu>



					            		<el-menu-item :key="listfour.groupId" @click.native.stop="show_detail(listfour.groupId, list.groupName+'/' +listtow.groupName+'/' +listthree.groupName+'/' +listfour.groupName, listfour)" v-if="listfour.groupVOList.length==0" :index="listfour.groupId" >

								        <span :class="{bluecolor: listfour.color}">{{listfour.groupName}}</span>


								        <el-popover placement="right" v-model="listfour.setting" class="setting-1-el-popover" trigger="manual">
					                    <div class="el-popover-content el-popover-content-first">
					                      <el-button type="text" @click.stop="editapart(listfour)" size="mini">编辑</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click.stop="deleteapart(listfour)" size="mini">删除</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click="addapartmenttwo(listfour)" size="mini">新增下一级</el-button>

					                    </div>
					                    <i slot="reference" @click.stop="filerdata(listfour)" class="iconfont el-icon-setting iconfont-absolute"></i>
					                 </el-popover>
								        
								    </el-menu-item>



					            	</div>



					            	<!--<el-menu-item :key="listfour.groupId"  @click.native.stop="show_detail(listfour.groupId, list.groupName+'/' +listtow.groupName+'/' +listthree.groupName+'/' +listfour.groupName,listfour)" v-if="listthree.groupVOList.length>0" v-for="listfour in listthree.groupVOList" :index="listfour.groupId" >

								        <span :class="{bluecolor: listfour.color}">{{listfour.groupName}}</span>


								        <el-popover placement="right" v-model="listfour.setting" class="setting-1-el-popover" trigger="manual">
					                    <div class="el-popover-content el-popover-content-first">
					                      <el-button type="text" @click.stop="editapart(listfour)" size="mini">编辑</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click.stop="deleteapart(listfour)" size="mini">删除</el-button>

					                    </div>
					                    
					                    <i slot="reference" @click.stop="filerdata(listfour)" class="iconfont el-icon-setting iconfont-absolute"></i>
					                 </el-popover>
								        
								    </el-menu-item>-->


					            </el-submenu>



							      	<el-menu-item :key="listthree.groupId" @click.native.stop="show_detail(listthree.groupId, list.groupName+'/' +listtow.groupName+'/' +listthree.groupName, listthree)" v-if="listthree.groupVOList.length==0" :index="listthree.groupId" >

								        <span :class="{bluecolor: listthree.color}">{{listthree.groupName}}</span>


								        <el-popover placement="right" v-model="listthree.setting" class="setting-1-el-popover" trigger="manual">
					                    <div class="el-popover-content el-popover-content-first">
					                      <el-button type="text" @click.stop="editapart(listthree)" size="mini">编辑</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click.stop="deleteapart(listthree)" size="mini">删除</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click="addapartmenttwo(listthree)" size="mini">新增下一级</el-button>

					                    </div>
					                    <i slot="reference" @click.stop="filerdata(listthree)" class="iconfont el-icon-setting iconfont-absolute"></i>
					                 </el-popover>
								        
								    </el-menu-item>
							    </div>

					        </el-submenu>



					        <el-menu-item :key="listtow.groupId" @click.native.stop="show_detail(listtow.groupId, list.groupName+'/' +listtow.groupName,listtow)" v-if="listtow.groupVOList.length==0" :index="listtow.groupId" >

						        <span :class="{bluecolor: listtow.color}">{{listtow.groupName}}</span>

						        <el-popover placement="right" v-model="listtow.setting" class="setting-1-el-popover" trigger="manual">
					                    <div class="el-popover-content el-popover-content-first">
					                      <el-button type="text" @click.stop="editapart(listtow)" size="mini">编辑</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click.stop="deleteapart(listtow)" size="mini">删除</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click="addapartmenttwo(listtow)" size="mini">新增下一级</el-button>

					                    </div>
					                    <i slot="reference" @click.stop="filerdata(listtow)" class="iconfont el-icon-setting iconfont-absolute"></i>
					                 </el-popover>
								        
								        
						        
						    </el-menu-item>

					    </div>
				      </el-submenu> 

				      <el-menu-item :key="list.groupId" @click.native.stop="show_detail(list.groupId, list.groupName, list)" v-if="list.groupVOList.length==0" :index="list.groupId">
				      	<span :class="{bluecolor: list.color}">{{list.groupName}}</span>
				      	<el-popover placement="right" v-model="list.setting" class="setting-1-el-popover" trigger="manual">
					                    <div class="el-popover-content el-popover-content-first">
					                      <el-button type="text" @click.stop="editapart(list)" size="mini">编辑</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click.stop="deleteapart(list)" size="mini">删除</el-button>

					                    </div>
					                    <div class="el-popover-content">
					                      <el-button type="text" @click="addapartmenttwo(list)" size="mini">新增下一级</el-button>

					                    </div>
					                    <i slot="reference" @click.stop="filerdata(list)" class="iconfont el-icon-setting iconfont-absolute"></i>
					                 </el-popover>
								        
				      	
				      </el-menu-item>
				  </div>
			      
			    </el-menu>
    		</div>
    		
    	</div>
    	<div class="apartment-right">
    		<div class="apartment-right-top">
    			<span class="groupName">{{selectlist.groupName}}</span>
    			主管： {{grouprole.roleName ? grouprole.roleName: '暂无主管'}}
    			<el-button size="mini" @click="editgrouprole" style="margin-left: 16px;" type="primary">编辑主管</el-button>


    			<div class="staffadd">
    				<el-input size="mini" style="display: inline-block;width: 160px;" v-model="memo" placeholder="请输入内容"></el-input>
    				<el-button @click="select_staff" size="mini" type="primary" style="margin-right: 30px;margin-left: 10px;" icon="el-icon-search">搜索</el-button>
    				<el-button size="mini" icon="el-icon-plus" @click="addstaff.dialogVisible = true"  type="success">新增员工</el-button>
    				<!--<el-button size="small" icon="el-icon-edit" @click="editstaff" type="warning">编辑</el-button>-->
    			</div>

    		</div>
    		<div ref="tablewrap" class="apartment-right-bottom">
    			<el-table
    				:header-cell-class-name="tableheaderClassName"
				    :data="tableData"
				    border
				    :height="tableheight"
				    style="width: 100%;height: 100%">
				    
				    <el-table-column
				      prop="id"
				      label="编号"
				      >
				      <template slot-scope="scope">

				      {{scope.row.id ? scope.row.id : scope.row.staffId}}
				  </template>
				    </el-table-column>
				    <el-table-column
				      prop="staffName"
				      label="姓名">
				    </el-table-column>
				    <el-table-column
				      prop="groupName"
				      label="部门">
				    </el-table-column>
				    <el-table-column
				      prop="phone"
				      label="手机">
				    </el-table-column>
				    <el-table-column
				      prop="roleName"
				      label="角色">
				    </el-table-column>
				    <!--<el-table-column
				      prop="sex"
				      label="性别">
				    </el-table-column>-->
				    <el-table-column
				      prop="amount2"
				      width="160"
				      label="操作">

				      	<template slot-scope="scope">
			              <el-button
                          size="mini"
                          @click="staffdelete(scope.row)">删除</el-button>
                          <el-button
                          size="mini"
                          @click="editstaffshow(scope.row)">编辑</el-button>
                          <!--<el-button
                          size="mini"
                          @click="editstaffokpassword(scope.row)">重置密码</el-button>-->
			            </template>
				    </el-table-column>
				    
				  </el-table>
    		</div>
    	</div>
    	<!--新增部门-->

    	<el-dialog
	      title="部门"
	      :visible.sync="addapart.dialogVisible"
	      width="500px"
	      >
	      <div class="wrap">
	        
	        <p class="input-p">
	          <span >部门名字：</span>
	          <el-input placeholder="请输入部门名称"  size="mini" class="input-input"
          		 v-model="addapart.groupName" ></el-input>
	          
	        </p>
	      </div>
	      <span slot="footer" class="dialog-footer">
	        <el-button size="mini" @click="addapart.dialogVisible = false">取 消</el-button>
	        <el-button size="mini" @click="addapartok" type="primary" >确 定</el-button>
	      </span>
	    </el-dialog>

	    <!--新增员工-->
	    <el-dialog
	      title="员工"
	      :visible.sync="addstaff.dialogVisible"
	      width="500px"
	      >
	      <div class="wrap-staff">
	        
	        <p class="input-p">
	          <b >*</b><span >名字：</span>
	          <el-input placeholder="请输入名字"  size="mini" class="input-input"
          		 v-model="addstaff.staffName" ></el-input>
	          
	        </p>
	        <p class="input-p">
	            <b >*</b><span >性别：</span>
	            <el-select
                  size="mini"
                  class="input-input"
                  v-model="addstaff.sex"
                  placeholder="请选择性别">
                  <el-option
                    v-for="item in getstatus.dicList"
                    :key="item.dicCode"
                    :label="item.dicName"
                    :value="item.dicCode">
                  </el-option>
                </el-select>
	          
	        </p>
	        <p class="input-p">
	          <b >*</b><span >手机：</span>
	          <el-input placeholder="请输入手机"  size="mini" class="input-input"
          		 v-model="addstaff.phone" ></el-input>
	          
	        </p>
	        <!--<p class="input-p">
	          <b >*</b><span >密码：</span>
	          <el-input placeholder="请输入密码"  size="mini" class="input-input"
          		 v-model="addstaff.password" ></el-input>
	          
	        </p>-->
	        <p class="input-p">
	          <b >*</b><span >角色：</span>
	          <!--<el-input  size="mini" class="input-input"
          		 v-model="addapart.roleId" ></el-input>-->
          		<el-select v-model="addstaff.roleId" filterable  size="mini" class="input-input" placeholder="请选择">
				    <el-option
				      v-for="item in rolelist"
				      :key="item.id"
				      :label="item.roleName"
				      :value="item.id">
				    </el-option>
				</el-select>
	          
	        </p>
	      </div>
	      <span slot="footer" class="dialog-footer">
	        <el-button size="mini" @click="addstaff.dialogVisible = false">取 消</el-button>
	        <el-button size="mini" @click="addstaffok" type="primary" >确 定</el-button>
	      </span>
	    </el-dialog>

	    <!--新增员工-->
	    <el-dialog
	      title="员工编辑"
	      :visible.sync="editstaff.dialogVisible"
	      width="500px"
	      >
	      <div class="wrap-staff">
	      	<p class="input-p">
	          <b >*</b><span >名字：</span>
	          <el-input placeholder="请输入名字"  size="mini" class="input-input"
          		 v-model="editstaff.staffName" ></el-input>
	          
	        </p>
	        <p class="input-p">
	          <b >*</b><span >手机：</span>
	          <el-input placeholder="请输入手机"  size="mini" class="input-input"
          		 v-model="editstaff.phone" ></el-input>
	          
	        </p>
	      	<p class="input-p">
	          <b >*</b><span >密码：</span>
	          <el-input placeholder="请输入密码"  size="mini" class="input-input"
          		 v-model="editstaff.password" ></el-input>
	          
	        </p>
	        <p class="input-p">
	            <b >*</b><span >性别：</span>
	            <el-select
                  size="mini"
                  class="input-input"
                  v-model="editstaff.sex"
                  placeholder="请选择性别">
                  <el-option
                    v-for="item in getstatus.dicList"
                    :key="item.dicCode"
                    :label="item.dicName"
                    :value="item.dicCode">
                  </el-option>
                </el-select>
	          
	        </p>
	        <p class="input-p">
	            <b >*</b><span >部门：</span>
	            <el-cascader
	            	:props="staffprops"
	            	class="input-input"
				    :options="leftdata"
				     v-model="selectedOptions"
				     change-on-select
				    size="mini"
				    filterable
				 ></el-cascader>
	          
	        </p>
	        <p class="input-p">
	          <b >*</b><span >角色：</span>
	          <!--<el-input  size="mini" class="input-input"
          		 v-model="addapart.roleId" ></el-input>-->
          		<el-select filterable v-model="editstaff.roleId"  size="mini" class="input-input" placeholder="请选择">
				    <el-option
				      v-for="item in rolelist"
				      :key="item.id"
				      :label="item.roleName"
				      :value="item.id">
				    </el-option>
				</el-select>
	          
	        </p>
	      </div>
	      <span slot="footer" class="dialog-footer">
	        <el-button size="mini" @click="editstaff.dialogVisible = false">取 消</el-button>
	        <el-button size="mini" @click="editstaffok" type="primary" >确 定</el-button>
	      </span>
	    </el-dialog>

	    <el-dialog
	      title="主管"
	      :visible.sync="editgrouproledialogVisible.dialogVisible"
	      width="500px"
	      >
	      <div class="wrap-staff">

	      	<p class="input-p">
	          <span >部门：</span>
	          <span>{{selectlist.groupName}}</span>
	        </p>
	      	<p class="input-p">
	          <b >*</b><span >角色：</span>
	          <!--<el-input  size="mini" class="input-input"
          		 v-model="addapart.roleId" ></el-input>-->
          		<el-select v-model="editgrouproledialogVisible.roleId"  size="mini" class="input-input" filterable placeholder="请选择">
				    <el-option
				      v-for="item in rolelist"
				      :key="item.id"
				      :label="item.roleName"
				      :value="item.id">
				    </el-option>
				</el-select>
	          
	        </p>
	      </div>
	      <span slot="footer" class="dialog-footer">
	        <el-button size="mini" @click="editgrouproledialogVisible.dialogVisible = false">取 消</el-button>
	        <el-button size="mini" @click="editrolegroup"  type="primary" >确 定</el-button>
	      </span>
	    </el-dialog>
    
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "apartment",
    components: {
        
    },
    data(){
        return{
        	staffprops: {
        		value: 'groupId',
        		label: 'groupName',
        		children: 'groupVOList',
        	},
        	selectedOptions: [],
        	memo: '',
        	addstaff: {
        		dialogVisible:false,
        		staffName: '',
        		phone: '',
        		roleId: '',
        		password: '',
        		sex: '',
        		image: '',
        		groupId: '',
        	},
        	editstaff: {
        		dialogVisible:false,
        		id: '',
        		phone: '',
        		roleId: '',
        		password: '',
        		sex: '',
        		staffName: '',
        		groupId: ''
        	},
        	selectlist: {
        		groupId: '',
        		groupName: ''
        	},
        	addapart: {
        		dialogVisible:false,
        		groupName: '',
        		parentId: '',
        		groupId: ''
        	},
        	tableData: [],
        	grouprole: {
        		roleId: '',
				roleName: ""
        	},
	        leftdata: [],
	        rolelist: [],
	        editstafflist: [],
	        editgrouproledialogVisible: {
	        	dialogVisible: false,
	        	roleId: '',
	        	groupId: '',
	        },
	        tableheight: 200
        }
    },
    watch: {
    	'addstaff.dialogVisible'(value) {
    		if (value) {
    			this.addstaff.staffName = ''
                this.addstaff.phone = ''
                this.addstaff.roleId = ''
                this.addstaff.password = ''
                this.addstaff.groupId = ''
    		}
    	}
    },
    computed: {
        ...mapGetters([
            'getpageDict',
        ]),
        getstatus() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "sex"
            })

            return demand_status[0]
        },
    },
    mounted(){
      this.get_group_list()
      this.getroles()
      	this.$nextTick(()=>{

            this.tableheight = this.$refs.tablewrap.offsetHeight - 60

            
        })
    },
    methods:{
    	select_staff() {
    		let that = this
    		this.$http.get(`staff/select_staff?memo=${this.memo}`)
    		.then(function (data) {
    			
                
                ///console.info(data)

                that.tableData = data.data

                
              })
              .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
    	},
    	handleSelectionChange(val) {
    		this.editstafflist = val
	    },
    	show_detail(groupId,groupName,list) {
    		this.selectlist.groupId = groupId
    		this.selectlist.groupName = groupName

    		this.filerdata()
    		this.filerdatacolor(list)
    		this.staff_list()
    	},
    	filerdatacolor(list) {
      		for (let i=0; i<this.leftdata.length; i++) {

                this.leftdata[i].color = false


                
                if (this.leftdata[i].groupVOList && this.leftdata[i].groupVOList.length>0) {

                    

                    

                    for(let j=0; j<this.leftdata[i].groupVOList.length; j++) {
                        this.diguidatafiltercolor(this.leftdata[i].groupVOList[j])
                    }


                }

            }



            if (list) {
            	list.color = true
            }



      	},
      	diguidatafiltercolor(groupVOList) {

      		
      		groupVOList.color = false



            for(let j=0; j<groupVOList.groupVOList.length; j++) {




                this.diguidatafiltercolor(groupVOList.groupVOList[j])
            }


        },
    	staffdelete(list) {
    		let that = this
      		this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	        }).then(() => {
	        	this.$http.get(`staff/delete_staff?id=${list.id}`)
	        		.then(function (data) {
	        			
		                
		                if (data.code != '200'){
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

		                that.staff_list()
		                
		              })
		              .catch(function (error) {
		                console.log(error);
		                that.$message({
		                    message: '接口报错',
		                    type: 'error'
		                  });
		              });
	        }).catch(() => {
	            this.$message({
	              type: 'info',
	              message: '已取消删除'
	            });          
          });

    	},
    	editstaffshow(list) {
    		
    		this.editstaff.id = list.id
    		this.editstaff.password = ''
    		this.editstaff.roleId = list.roleId
    		this.editstaff.staffName = list.staffName
    		this.editstaff.sex = list.sex
    		this.editstaff.phone = list.phone
    		this.editstaff.groupId = list.groupId
    		this.editstaff.dialogVisible = true

    	},
    	editstaffokpassword(row) {
    		let that = this
    		
    		this.$http.get(`staff/update_password?id=${row.id}&password=123456`)
	    		.then(function (data) {
	    			console.info(data)

	                
	                	if (data.code != '200'){
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



		                that.staff_list()
	                
	                
	              })
	              .catch(function (error) {
	                console.log(error);
	                that.$message({
	                    message: '接口报错',
	                    type: 'error'
	                  });
	              });
    	},
    	editstaffok() {
    		let that = this


    		
    		let groupId = this.selectedOptions.length>0? this.selectedOptions[this.selectedOptions.length-1]:this.editstaff.groupId

    		

    		this.$http.post('staff/update_staff',{
    			staffName: this.editstaff.staffName,
    			phone: this.editstaff.phone,
    			roleId: this.editstaff.roleId,
    			password: this.editstaff.password,
    			sex: this.editstaff.sex,
    			id: this.editstaff.id,
    			groupId: groupId,

    		})
    		.then(function (data) {
	    			console.info(data)

	                
	                	if (data.code != '200'){
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

		                that.editstaff.dialogVisible = false
		                that.staff_list()
	                
	                
	              })
	              .catch(function (error) {
	                console.log(error);
	                that.$message({
	                    message: '接口报错',
	                    type: 'error'
	                  });
	              });


    		/*this.$http.get(`staff/update_password?id=${this.editstaff.id}&password=${this.editstaff.password}`)
	    		.then(function (data) {
	    			console.info(data)

	                
	                	if (data.code != '200'){
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

		                that.editstaff.dialogVisible = false
		                that.staff_list()
	                
	                
	              })
	              .catch(function (error) {
	                console.log(error);
	                that.$message({
	                    message: '接口报错',
	                    type: 'error'
	                  });
	              });*/
    	},
    	staff_list() {
    		if (!this.selectlist.groupId) {
    			return
    		}
    		this.$http.get(`staff/staff_list?groupId=${this.selectlist.groupId}`)
    			.then((data)=>{
      				if (data.code = '200') {
      					this.tableData = []
      					this.grouprole.roleName = ''
      					this.grouprole.roleId = ''

      					if (data.data) {
      						
      						this.tableData = data.data.list

      						this.grouprole.roleName = data.data.roleName
      						this.grouprole.roleId = data.data.roleId

      					} 
      					

      					
      				}
      			})
      			.catch(()=>{
      				this.$message({
	                  message: '接口报错',
	                  type: 'error'
	                })
      			})
    	},
    	
    	addstaffok() {

    		if (!this.addstaff.staffName) {
    			return this.$message({
                        message: '员工姓名不能为空',
                        type: 'warning'
                      })
    		}
    		if (!this.addstaff.phone) {
    			return this.$message({
                        message: '员工手机不能为空',
                        type: 'warning'
                      })
    		}
    		if (!(/^[1][3456789][0-9]{9}$/.test(this.addstaff.phone))) {
    			return this.$message({
                        message: '填入正确的手机号',
                        type: 'warning'
                      })
    		}
    		

    		if (!this.addstaff.roleId) {
    			return this.$message({
                        message: '为员工选择权限',
                        type: 'warning'
                      })
    		}






    		



    		this.$http.post('staff/add_staff',{
    			staffName: this.addstaff.staffName,
    			phone: this.addstaff.phone,
    			roleId: this.addstaff.roleId,
    			password: '123456',
    			sex: this.addstaff.sex,
    			groupId: this.selectlist.groupId
    		})
    			.then((data)=>{
      				if (data.code == '200') {
	  					this.$message({
		                  message: data.msg,
		                  type: 'success'
		                })

		                

		                
		                this.addstaff.dialogVisible = false
		                this.staff_list()


	  				}else {
	  					this.$message({
		                  message: data.msg,
		                  type: 'error'
		                })
	  				}
      			})
      			.catch(()=>{
      				this.$message({
	                  message: '接口报错',
	                  type: 'error'
	                })
      			})
    	},
    	editgrouprole() {
    		this.editgrouproledialogVisible.dialogVisible = true
    		this.editgrouproledialogVisible.groupId = this.selectlist.groupId
    		this.editgrouproledialogVisible.roleId = this.grouprole.roleId


    	},
    	editrolegroup() {


    		this.$http.get(`group/edit_leader?groupId=${this.selectlist.groupId}&roleId=${this.editgrouproledialogVisible.roleId}`)
      		.then((data)=>{
      			//that.get_group_list()
  				if (data.code == '200') {
  					this.$message({
	                  message: data.msg,
	                  type: 'success'
	                })

	                
	                this.editgrouproledialogVisible.dialogVisible = false
  				}else {
  					this.$message({
	                  message: data.msg,
	                  type: 'error'
	                })
  				}

  				this.staff_list()
  			})
  			.catch(()=>{
  				this.$message({
                  message: '接口报错',
                  type: 'error'
                })
  			})
    	},
    	//获取角色列表
    	getroles() {
    		this.$http.get('role/role_list')
    			.then((data)=>{
      				if (data.code = '200') {

      					//console.info(data)
      					this.rolelist = data.data
      					//this.leftdata = data.data
      				}
      			})
      			.catch(()=>{
      				this.$message({
	                  message: '接口报错',
	                  type: 'error'
	                })
      			})
    	},
      	handleOpen(key, keyPath) {
        console.log(key, keyPath);
      	},
      	tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
       	},
      	handleClose(key, keyPath) {
        console.log(key, keyPath);
      	},
      	get_group_list() {
      		this.$http.get('group/get_group_list')
      			.then((data)=>{
      				if (data.code = '200') {
      					
      					let array = []
      					for (let i=0; i<data.data.length; i++) {

                            array.push({...data.data[i], setting: false, color: false})

                            data.data[i].setting = false
                            data.data[i].color = false
                            
                            if (data.data[i].groupVOList && data.data[i].groupVOList.length>0) {

                                //console.info(data.data)

                                
                                for(let j=0; j<data.data[i].groupVOList.length; j++) {
                                	this.diguidata(data.data[i].groupVOList[j])
                                }


                            }

                        }


                        
                        this.leftdata = data.data

                        console.info(this.leftdata)




      					this.show_detail(this.leftdata[0].groupId,this.leftdata[0].groupName)
      				}
      			})
      			.catch(()=>{
      				this.$message({
	                  message: '接口报错',
	                  type: 'error'
	                })
      			})
      	},
      	diguidata(groupVOList) {
      			//groupVOList.push({...groupVOList, setting: false,color: false})

      			groupVOList.setting = false
      			groupVOList.color = false
                
                
              


                for(let j=0; j<groupVOList.groupVOList.length; j++) {




                    this.diguidata(groupVOList.groupVOList[j])
                }


        },
      	filerdata(list) {
      		for (let i=0; i<this.leftdata.length; i++) {

                this.leftdata[i].setting = false


                
                if (this.leftdata[i].groupVOList && this.leftdata[i].groupVOList.length>0) {

                    

                    

                    for(let j=0; j<this.leftdata[i].groupVOList.length; j++) {
                        this.diguidatafilter(this.leftdata[i].groupVOList[j])
                    }


                }

            }

            if (list) {
            	list.setting = true
            }

      	},

      	diguidatafilter(groupVOList) {

      		
      		groupVOList.setting = false



            for(let j=0; j<groupVOList.groupVOList.length; j++) {




                this.diguidatafilter(groupVOList.groupVOList[j])
            }


        },
      	
      	addapartok() {
      		let that = this
      		if (!this.addapart.groupName) {
      			return this.$message({
	                  message: '名称必填',
	                  type: 'warning'
	                })
      		}
      		let url = 'group/add_group'

      		if (this.addapart.groupId) {
      			url = 'group/update_group'
      		}
      		this.$http.post(url,{
      			groupName: this.addapart.groupName,
      			parentId: this.addapart.parentId,
      			groupId: this.addapart.groupId
      		})
      		.then((data)=>{
      			that.get_group_list()
  				if (data.code == '200') {
  					this.$message({
	                  message: data.msg,
	                  type: 'success'
	                })

	                
	                this.addapart.dialogVisible = false
  				}else {
  					this.$message({
	                  message: data.msg,
	                  type: 'error'
	                })
  				}
  			})
  			.catch(()=>{
  				this.$message({
                  message: '接口报错',
                  type: 'error'
                })
  			})
      	},

      	addapartment() {
      		
      		this.addapart.groupName = ''
      		this.addapart.parentId = ''
      		this.addapart.dialogVisible = true
      		this.addapart.groupId = ''
      	},
      	addapartmenttwo(list) {
      		this.addapart.groupName = ""
      		this.addapart.parentId = list.groupId
      		this.addapart.dialogVisible = true
      		this.addapart.groupId = ''
      	},
      	editapart(list) {
      		
      		this.addapart.groupName = list.groupName
      		this.addapart.groupId = list.groupId
      		this.addapart.dialogVisible = true
      	},
      	deleteapart(list) {
      		let that = this
      		this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
	            confirmButtonText: '确定',
	            cancelButtonText: '取消',
	            type: 'warning'
	        }).then(() => {
	        	this.$http.get(`group/delete_group?groupId=${list.groupId}`)
	        		.then(function (data) {
	        			that.get_group_list()
		                
		                if (data.code != '200'){
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
		                
		              })
		              .catch(function (error) {
		                console.log(error);
		                that.$message({
		                    message: '接口报错',
		                    type: 'error'
		                  });
		              });
	        }).catch(() => {
	            this.$message({
	              type: 'info',
	              message: '已取消删除'
	            });          
          });

      	}
    },
}
</script>


<style lang="less">

.apartment {
	display: flex;
	font-size: 12px;


	.iconfont-absolute {
	  position: absolute;
	  right: 40px;
	  top: 19px;
      font-size: 18px;
	}

	.wrap {
		.input-p {
			padding-left: 20px;
			.input-input {
				display: inline-block;
				width: 270px;
				font-size: 12px;
			}

		}
	}

	.wrap-staff {
		p {
			margin-bottom: 20px;
			padding-left: 20px;
			font-size: 12px;

			.input-input {
				display: inline-block;
				width: 270px;
				font-size: 12px;
			}

			span {
				padding-left: 4px;
			}

			b {
				color: red;
			}
		}
	}

	&-left {
		height: calc(100vh - 180px);
		border: 1px solid #e2e2e2;
		width: 280px;

		&-top {
			padding: 10px;
			border-bottom: 1px solid #e2e2e2;
			padding-left: 36px;
		}

		.apartment-left-bottom {
			height: 100%;
			height: calc(100vh - 240px);
			

			.el-menu-vertical-demo {
				height: calc(100vh - 240px);
				overflow-y: scroll;
				border-right: 0px
			}
		}

	}

	&-right {
		height: calc(100vh - 180px);
		border: 1px solid #e2e2e2;
		width: calc(100vw - 520px);
		border-left: 0px;

		&-top {
			padding-left: 20px;
			height: 53px;
			line-height: 53px;
			border-bottom: 1px solid #e2e2e2;
			position: relative;


			.staffadd {
				position: absolute;
				right: 20px;
				width: 400px;
				top: 0px;
			}

			.groupName {
				padding-right: 20px;
				font-size: 14px;
			}
		}
		&-bottom {
			height: calc(100vh - 236px);
			padding: 20px;
			background: #f7f8f8;
		}
	}

}
  
</style>
<style>
	.apartment .el-menu-item.is-active {
		color: #303133;
	}
	.bluecolor {
		color: #409EFF;
	}
</style>