<template>
    <div class="operation">
      <div class="operation-left">
            <div class="operation-left-top">
                统计
            </div>
            <div class="operation-left-bottom">
                <div class="operation-search">
                    <div style="display: inline-block; margin-top: 20px;">
                        <span>日期：</span>
                          <el-date-picker
                            size="mini"
                            v-model="search.timestart"
                            style="width: 120px;"
                            type="date"
                            
                            placeholder="起始日期">
                          </el-date-picker>-
                          <el-date-picker
                            size="mini"
                            style="width: 120px;"
                            v-model="search.timeend"
                            type="date"
                            
                            placeholder="终止日期">
                          </el-date-picker>
                    </div>
                    <div v-if="chooseindex !=2" style="display: inline-block;margin-top: 20px;">
                        <span>需求类型：</span>
                            <el-select
                              size="mini"
                              v-model="search.demandTypes"
                              style="display: inline-block;min-width: 224px;"
                              multiple
                              collapse-tags
                              placeholder="请选择需求类型">
                              <el-option
                                v-for="item in getdemand_type.dicList"
                                :key="item.dicCode"
                                :label="item.dicName"
                                :value="item.dicCode">
                              </el-option>
                            </el-select>
                          
                    </div>
                    <div v-if="chooseindex == 2" style="display: inline-block;margin-top: 20px;">
                        <span>需求类型：</span>
                            <el-select
                              size="mini"
                              v-model="search.demandTypes"
                              style="display: inline-block;min-width: 224px;"
                              multiple
                              collapse-tags
                              placeholder="请选择需求类型">
                              <el-option
                                v-for="item in getallocate"
                                :key="item.dicCode"
                                :label="item.dicName"
                                :value="item.dicCode">
                              </el-option>
                            </el-select>
                          
                    </div>
                    <div style="display: inline-block;margin-top: 20px;">
                        <span>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
                            <el-select
                              size="mini"
                              v-model="search.status"
                              style="display: inline-block;min-width: 224px;"
                              multiple
                              collapse-tags
                              placeholder="请选择状态">
                              <el-option
                                v-for="item in getstatus.dicList"
                                :key="item.dicCode"
                                :label="item.dicName"
                                :value="item.dicCode">
                              </el-option>
                            </el-select>
                          
                    </div>
                    <!--<div style="display: inline-block;margin-top: 16px;">
                        <span>员&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工：</span>
                            <el-dropdown class="custom-width" trigger="click" size="mini" placement="bottom">
                              <el-button style="width: 224px;overflow: hidden;text-align: left" size="mini" class="custom-width-order">
                                &nbsp;{{staffvalueshow}}&nbsp;
                              </el-button>
                              <el-dropdown-menu style="min-width: 224px;" slot="dropdown">
                                <el-tree node-key="id" :data="stafflist" @check="staffsave"   ref="staff" show-checkbox class="custom-width-order">
                                </el-tree>
                                
                              </el-dropdown-menu>
                            </el-dropdown>

                            
                    </div>-->
                    <div style="display: inline-block;margin-top: 20px;">
                        <el-button @click="find_demand" size="mini" style="margin-right: 10px;" type="primary">搜索</el-button>
                        <el-button @click="clear" size="mini" type="primary">重置</el-button>
                    </div>
                </div>
                <div id="chart_example">
 
                </div>
            </div>
        </div>

        <div class="operation-right">
            <div class="operation-right-top">
                <!--<span class="cursor" style="font-size: 18px;font-weight: 600;padding-right: 30px;" @click="changepage(index)" v-for="(list,index) in demandtypes">{{list.name}}</span>-->
                <span class="cursor" style="font-size: 18px;font-weight: 600;padding-right: 30px;" >{{demandtypes[chooseindex].name}}</span>
                <el-button class="addmain" @click="addmaintenance_dialogVisible = true" size="mini" type="primary">+新增需求</el-button>
            </div>

            <div ref="tablewrap" class="operation-right-bottom">
                <el-table
                    :data="tableData"
                    border
                    :height="tableheight"
                    style="width: 100%;">
                    <el-table-column
                      type="index"
                      label="id"
                      width="40">
                    </el-table-column>
                    <el-table-column
                      prop="groupName"
                      label="部门/小组"
                      width="100">
                    </el-table-column>
                    
                    <el-table-column
                      prop="staffName"
                      label="姓名"
                      width="60">
                    </el-table-column>
                    <el-table-column
                      prop="submitTime"
                      label="提交时间"
                      width="100">
                        <template slot-scope="scope">
                         {{fmtDate(scope.row.submitTime)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="submitTime"
                      label="需求类型"
                      width="100">
                        <template slot-scope="scope">
                         {{tabledemand_type(scope.row.demandType)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="approverName"
                      label="审批人"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="memo"
                      label="内容"
                      width="160"
                      >

                        <template slot-scope="scope">
                         {{tabledemand_type_memo(scope.row.memo)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="status"
                      label="状态"
                      >
                        <template slot-scope="scope">
                         {{tablestatus(scope.row.status)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="submitDay"
                      label="时长(天)"
                      width="80">
                    </el-table-column>
                    <el-table-column
                      prop="submitDay"
                      label="操作"
                      width="140">
                        <template slot-scope="scope">

                          <span  v-if="chooseindex==0" style="color: #0057ff">
                            <span class="cursor"  v-if="scope.row.staffId == getstaffVO.uid && scope.row.status == 1" @click="deleterow(scope.row.id)">删除&nbsp;&nbsp;|&nbsp;&nbsp;</span>

                            <span @click="editrow(scope.row, 'look')" class="cursor">详情</span>
                            &nbsp;
                            <span v-if="scope.row.staffId == getstaffVO.uid && scope.row.status == 1" @click="editrow(scope.row, 'edit')" class="cursor">|&nbsp;&nbsp;修改</span>




                        </span>

                        

                        <span  v-if="chooseindex==1" style="color: #0057ff">
                            <span class="cursor"  v-if="scope.row.status == 1 && scope.row.approverId == getstaffVO.uid" @click="editrow(scope.row, 'editstatus')" >审批&nbsp;&nbsp;|&nbsp;&nbsp;</span>

            

                            <span @click="editrow(scope.row, 'look')" class="cursor">详情</span>
                            
                        </span>


                        <span  v-if="chooseindex==2" style="color: #0057ff">
                            <span class="cursor"  v-if="scope.row.status == 2  && (($isInArray(1) && scope.row.demandType == 1) || ($isInArray(3) && scope.row.demandType == 2) || ($isInArray(5) && scope.row.demandType == 3) || ($isInArray(7) && scope.row.demandType == 4))" @click="editrow(scope.row, 'editfp')" >分配&nbsp;&nbsp;|&nbsp;&nbsp;</span>

            

                            <span @click="editrow(scope.row, 'look')" class="cursor">详情</span>
                            
                        </span>

                        <span  v-if="chooseindex==3" style="color: #0057ff">
                            <span class="cursor"  v-if="scope.row.status == 4 && scope.row.processorId == getstaffVO.uid" @click="editrow(scope.row, 'editcl')" >完成&nbsp;&nbsp;|&nbsp;&nbsp;</span>

            

                            <span @click="editrow(scope.row, 'look')" class="cursor">详情</span>
                            
                        </span>

                        <span  v-if="chooseindex==4" style="color: #0057ff">
                            <span class="cursor" v-if="copyremarkflag(scope.row.demandCopyVOList)" @click="editrow(scope.row, 'lookcopy')" >抄送备注&nbsp;&nbsp;|&nbsp;&nbsp;</span>

            

                            <span @click="editrow(scope.row, 'look')" class="cursor">详情</span>
                            
                        </span>



                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="block-a">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  layout="total,sizes, prev, pager, next"
                  :page-sizes="[20, 30, 40, 50]"
                  :page-size="search.size"
                  :current-page="search.currentPage"
                  :total="search.total">
                </el-pagination>
            </div>
        </div>


        <el-dialog
          title="需求详情"
          :show-close="false"
          :visible.sync="editmaintance.dialogVisible"
          width="700px"
          >
          <span slot="title">{{editmaintance.staffName}}提交的{{tabledemand_type(editmaintance.demandType)}} <span style="padding-left: 10px; color: grey">{{tablestatus(editmaintance.status)}}</span></span>
          <div style="font-size: 12px;" class="wrap">

            <p style="font-size: 14px;padding-left: 20px;">
              <span >所在部门：</span>{{editmaintance.groupName}}
            
            </p>
            <p style="margin-top: 14px;font-size: 14px;padding-left: 20px;">
              <span >姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>{{editmaintance.staffName}}
            
            </p>
            <p style="margin-top: 14px;font-size: 14px;padding-left: 20px;">
              <span style="position: relative;top: -46px;">内&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;容：</span>
                <el-input type="textarea"
                :rows="3"
                readonly style="display: inline-block;width: 530px;font-size: 12px;" v-model="editmaintance.memo" >
                    
                </el-input>
            
            </p>

            <p style="margin-top: 14px;font-size: 14px;padding-left: 20px;">
              <span>复&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</span>
                
              <ul style="display: block;" class="el-upload-list el-upload-list--text">
                <li v-for="(list,index) in fileNamearray" style="margin-bottom: 10px;" class="el-upload-list__item is-success el-list-enter-to">
                  <a style="position: relative;" class="el-upload-list__item-name">
                    <span><i class="el-icon-document"></i><a target="black" :download="list.path" :href="`${list.path}`"> {{list.name}}</a></span>
                    
                  </a>
                </li>
              </ul>
            </p>

            <p class="p-detail">
              明细
            </p>

            <p class="radio-timeline-y" style="margin-top: 16px;">
              
                <ul style="width: 520px;margin: 0 auto;" class="el-timeline">
                  <li class="el-timeline-item">
                    <div class="el-timeline-item__tail"></div>
                    <div style="background: #409eff; color: #ffffff" class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--"><!---->
                      {{editmaintance.staffName}}
                    </div><!---->
                    <div  class="el-timeline-item__wrapper"><!---->
                        <div style="font-size: 20px;font-weight: 700;position: relative;top: 6px;" class="el-timeline-item__content">
                          发起申请
                        </div>

                        <div style="position: absolute;right: 0px;top: 6px;" class="el-timeline-item__timestamp">
                          {{fmtDate(editmaintance.submitTime)}}
                        </div>
 
                    </div>
                  </li>


                  <li class="el-timeline-item">
                    <div class="el-timeline-item__tail"></div>
                    <div style="background: #409eff; color: #ffffff" class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--"><!---->
                      {{editmaintance.approverName}}

                      <i v-if="editmaintance.status>1 && editmaintance.status!=3" style="position: absolute;right: -3px;bottom: 6px;color: green;font-size: 16px;" class="el-icon-success"></i>
                      <i v-if="editmaintance.status==3" style="position: absolute;right: -3px;bottom: 6px;color: red;font-size: 16px;" class="el-icon-error"></i>

                    </div><!---->
                    <div  class="el-timeline-item__wrapper"><!---->
                        <div style="font-size: 20px;font-weight: 700;color:grey" class="el-timeline-item__content">
                          审批


                        </div>
                        <div style="color: grey" class="el-timeline-item__timestamp is-bottom">
                          {{editmaintance.status == 3 ? '已驳回': (editmaintance.status >1 ?'已同意':'待审批')}}

                          <p v-if="editmaintance.status==3">驳回内容： {{editmaintance.approveRemark}}</p>

                          <p v-else>审批内容： {{editmaintance.approveRemark}}</p>
                        </div>


                       <div style="position: absolute;right: 0px;top: 6px;color:grey" class="el-timeline-item__timestamp">
                          {{fmtDate(editmaintance.submitTime)}}


                        </div>
 
                    </div>
                  </li>

                  <li v-if="editmaintance.status==6" class="el-timeline-item">
                    <div class="el-timeline-item__tail"></div>
                    <div style="background: #409eff; color: #ffffff" class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--"><!---->
                      {{editmaintance.sharerName}}

                      <i style="position: absolute;right: -3px;bottom: 6px;color: red;font-size: 16px;" class="el-icon-error"></i>
                      
                    </div><!---->
                    <div  class="el-timeline-item__wrapper"><!---->
                        <div style="font-size: 20px;font-weight: 700;color:grey" class="el-timeline-item__content">
                          分配


                        </div>
                        <div style="color: grey" class="el-timeline-item__timestamp is-bottom">
                          已拒绝

                          <p>拒绝内容： {{editmaintance.statusRemark}}</p>
                        </div>


                       <div style="position: absolute;right: 0px;top: 6px;color:grey" class="el-timeline-item__timestamp">
                          {{fmtDatedetail(editmaintance.approveTime)}}
                        </div>
 
                    </div>
                  </li>


                  <li v-if="editmaintance.status>3 && editmaintance.status!=6" class="el-timeline-item">
                    <div class="el-timeline-item__tail"></div>
                    <div style="background: #409eff; color: #ffffff" class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--"><!---->
                      {{editmaintance.sharerName}}

                      <i v-if="editmaintance.status==4" style="position: absolute;right: -3px;bottom: 6px;color: green;font-size: 16px;" class="el-icon-success"></i>
                      
                    </div><!---->
                    <div  class="el-timeline-item__wrapper"><!---->
                        <div style="font-size: 20px;font-weight: 700;color:grey" class="el-timeline-item__content">
                          分配


                        </div>
                        <div style="color: grey" class="el-timeline-item__timestamp is-bottom">
                          <p>分配内容： {{editmaintance.statusRemark}}</p>
                          
                        </div>


                       <div style="position: absolute;right: 0px;top: 6px;color:grey" class="el-timeline-item__timestamp">
                          {{fmtDatedetail(editmaintance.shareTime)}}
                        </div>
 
                    </div>
                  </li>

                  <li v-if="editmaintance.status==5 || editmaintance.status==4" class="el-timeline-item">
                    <div class="el-timeline-item__tail"></div>
                    <div style="background: #409eff; color: #ffffff" class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--"><!---->
                      {{editmaintance.processorName}}

                      <i v-if="editmaintance.status==4" style="position: absolute;right: -3px;bottom: 6px;color: green;font-size: 18px;" class="el-icon-success"></i>
                      
                    </div><!---->
                    <div  class="el-timeline-item__wrapper"><!---->
                        <div style="font-size: 20px;font-weight: 700;color:grey" class="el-timeline-item__content">
                          处理


                        </div>
                        <div style="color: grey" class="el-timeline-item__timestamp is-bottom">
                          {{editmaintance.status==5 ? '已完成' : '进行中'}}

                        </div>


                       <div style="position: absolute;right: 0px;top: 6px;color:grey" class="el-timeline-item__timestamp">
                          {{fmtDatedetail(editmaintance.processTime)}}
                        </div>
 
                    </div>
                  </li>


                  <li class="el-timeline-item">
                    <div style="background: #409eff; color: #ffffff" class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--"><!---->
                      通知
                    </div><!---->
                    <div  class="el-timeline-item__wrapper"><!---->
                        <div style="font-size: 20px;font-weight: 700;" class="el-timeline-item__content">
                          抄送
                        </div>
                        <div class="el-timeline-item__timestamp is-bottom">
                          已通知
                        </div>
                        <div style="position: absolute;right: 0px;top: 6px;color:grey" class="el-timeline-item__timestamp">
                        </div>
 
                        
                    </div>
                  </li>

                  </ul>  
                  <div style="width: 520px;margin: 0 auto;position: relative;top: -30px;">
                    <div style="padding-left: 44px;">
                      <span v-for="list in editmaintance.demandCopyVOList" style="overflow: hidden"  class="circlediv">
                        {{list.staffName ? list.staffName: `&nbsp;`}}
                      
                      </span>
                      
                    </div>

                    <div v-for="list in editmaintance.demandCopyVOList" style="position: relative;font-size: 14px; color: grey;margin-top: 10px;">
                      抄送备注({{list.staffName}})：{{list.remark}}
                      <div style="position: absolute;right: 0px;top: 0px;color:grey" class="el-timeline-item__timestamp">
                        {{fmtDatedetail(list.remarkTime)}}
                      </div>
 
                    </div>

                    

                  </div> 

                  <p v-if="editmaintance.copystaffedit" style="margin-top: 20px;padding-left: 80px;">
                    <span style="position: relative;top: -80px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                      <el-input type="textarea"
                      :rows="5"
                      placeholder="请输入内容" style="display: inline-block;width: 480px;font-size: 12px;" v-model="editmaintance.copyRemark" >
                          
                      </el-input>
                    
                  </p>   
            </p>

            

          </div>

          <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="warning" v-if="editmaintance.copystaffedit"  @click="copyRemarkchange">确 认</el-button>
            <el-button size="mini" type="primary" @click="editmaintance.dialogVisible=false">关 闭</el-button>
           
          </span>
        </el-dialog>

        <!--自己修改-->
        <el-dialog
          title="需求修改"
          :show-close="false"
          :visible.sync="editmaintance.edittypedialogVisible"
          width="500px"
          >
          <span slot="title">需求修改</span>
          <div style="font-size: 12px;" class="wrap">

            <p >
              <span >需求类型：</span>
              <el-select clearable v-model="editmaintance.demandType" placeholder="请选择" size="mini">
                <el-option
                    v-for="item in getdemand_type.dicList"
                    :key="item.dicCode"
                    :label="item.dicName"
                    :value="item.dicCode">
                </el-option>
              </el-select>
              
            </p>
            
            <p style="margin-top: 20px;">
              <span style="position: relative;top: -80px;">需求备注：</span>
                <el-input type="textarea"
                :rows="5"
                 :disabled="editmaintance.staffId == getstaffVO.uid? false: true" style="display: inline-block;width: 330px;font-size: 12px;" v-model="editmaintance.memo" >
                    
                </el-input>
              
            </p>

            <p style="margin-top: 20px;">
              <span>抄送给：</span>
                <span v-for="list in editmaintance.demandCopyVOList" class="circlediv">
                    {{list.staffName.substring(0,2)}}
                    <i @click="deletestaff(list)" class="el-icon-error delete"></i>
                </span>

            <span  @click="searchstaff" style="background: #ffffff" class="circlediv">
                <i class="el-icon-plus" ></i>
                
            </span>
              
            </p>



            <!--<p style="margin-top: 20px;">
              <span >审批员工：</span>
              <el-select clearable v-model="editmaintance.approverId" placeholder="请选择" size="mini">
                <el-option
                    v-for="item in leader"
                    :key="item.id"
                    :label="item.staffName"
                    :value="item.id">
                </el-option>
              </el-select>
              
            </p>-->

            <p style="margin-top: 20px;">
              <span >上传附件：</span>
              <el-upload
                style="display: inline-block;"
                class="upload-demo"
                :http-request="uploadpicture"
                action="http://upload-z2.qiniup.com/"
                >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <ul style="display: block;" class="el-upload-list el-upload-list--text">
                <li v-for="(list,index) in fileNamearray" style="margin-bottom: 10px;" class="el-upload-list__item is-success el-list-enter-to">
                  <a style="position: relative;" class="el-upload-list__item-name">
                    <span><i class="el-icon-document"></i><a> {{list.name}}</a></span>
                    <i @click="deleteaa(index)" style="position: absolute;right: 10px; color: red" class="el-icon-error"  ></i>
                  </a>
                </li>
              </ul>
              
            </p>
            
            
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button size="mini"  @click="editmaintance.edittypedialogVisible=false">取 消</el-button>
            <el-button size="mini" v-show="editmaintance.staffId == getstaffVO.uid? true: false" @click="edit" type="primary">确 定</el-button>
          </span>
        </el-dialog>



        <el-dialog
          title="抄送给"
          :show-close="false"
          :visible.sync="msg.dialogVisible"
          :close-on-click-modal="false"
          width="500px"
          >
        <div style="font-size: 12px;" class="wrap">
            <p style="margin-top: 20px;">
              <span >抄送给：</span>
              
              <el-select
                v-model="msg.staff"
                filterable
                size="small"
                style="width: 320px;"
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="searchstaffloading">
                <el-option
                  v-for="item in optionsstaff"
                  :key="item.staffId"
                  :label="item.staffName"
                  :value="`${item.staffId}-${item.staffName}`">
                </el-option>
              </el-select>
              
            </p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="warning" @click="msg.dialogVisible=false" >取 消</el-button>
            <el-button size="mini" @click="addstaff"  type="primary">确 定</el-button>
        </span>
        </el-dialog>
        <!--自己修改-->


        <el-dialog
          title="审批"
          :show-close="false"
          :visible.sync="editmaintance.statusdialogVisible"
          width="500px"
          >
          <span slot="title">审批</span>
          <div style="font-size: 12px;" class="wrap">

            <p style="margin-top: 20px;">
              <span style="position: relative;top: -80px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                <el-input type="textarea"
                :rows="5"
                placeholder="请输入内容" style="display: inline-block;width: 330px;font-size: 12px;" v-model="editmaintance.approveRemark" >
                    
                </el-input>
              
            </p>

            <p style="margin-top: 20px;">
              <span >抄送给：</span>
                <span v-for="list in editmaintance.spdemandCopyVOList" class="circlediv">
                    {{list.staffName.substring(0,2)}}
                    <i @click="deletestaff(list, 'sp')" class="el-icon-error delete"></i>
                </span>

            <span  @click="searchstaff" style="background: #ffffff" class="circlediv">
                <i class="el-icon-plus" ></i>
                
            </span>
              
            </p>

            
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="danger" @click="editstatusok('3')">驳回</el-button>
            
            <el-button size="mini" @click="editstatusok('2')" type="primary">审批通过</el-button>
            <el-button size="mini"  @click="editmaintance.statusdialogVisible=false">取 消</el-button>

          </span>
        </el-dialog>


        <!--fp-->
        <el-dialog
          title="分配"
          :show-close="false"
          :visible.sync="editmaintance.fpdialogVisible"
          width="500px"
          >
          <span slot="title">分配</span>
          <div style="font-size: 12px;" class="wrap">

            
            

            <p style="margin-top: 20px;">
              <span style="position: relative;top: -80px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                <el-input type="textarea"
                :rows="5"
                placeholder="请输入内容" style="display: inline-block;width: 330px;font-size: 12px;" v-model="editmaintance.approveRemark" >
                    
                </el-input>
              
            </p>

            <p style="margin-top: 20px;">
              <span >指派员工：</span>
              <el-select clearable v-model="editmaintance.staffIdfp" placeholder="请选择" size="mini">
                <el-option
                    v-for="item in appoint_staff"
                    :key="item.id"
                    :label="item.staffName"
                    :value="item.id">
                </el-option> 
              </el-select>
              
            </p>

            <p style="margin-top: 20px;">
              <span >抄送给：</span>
                <span v-for="list in editmaintance.fpdemandCopyVOList" class="circlediv">
                    {{list.staffName.substring(0,2)}}
                    <i @click="deletestaff(list,'fp')" class="el-icon-error delete"></i>
                </span>

            <span  @click="searchstaff" style="background: #ffffff" class="circlediv">
                <i class="el-icon-plus" ></i>
                
            </span>
              
            </p>





            
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button size="mini" type="danger" @click="editapprove_demand('6')">驳回</el-button>
            
            <el-button size="mini" @click="editapprove_demand('4')" type="primary">指 派</el-button>
            <el-button size="mini"  @click="editmaintance.fpdialogVisible=false">取 消</el-button>
          </span>
        </el-dialog>
        <!--chuli-->
        <el-dialog
          title="处理"
          :show-close="false"
          :visible.sync="editmaintance.cldialogVisible"
          width="500px"
          >
          <span slot="title">处理</span>
          <div style="font-size: 12px;" class="wrap">

            <p style="margin-top: 20px;">
              <span style="position: relative;top: -80px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                <el-input type="textarea"
                :rows="5"
                placeholder="请输入内容" style="display: inline-block;width: 330px;font-size: 12px;" v-model="editmaintance.statusRemark" >
                    
                </el-input>
              
            </p>

            
          </div>

          <span slot="footer" class="dialog-footer">
            
            <el-button size="mini" @click="editstatuspsok()" type="primary">完成</el-button>
            <el-button size="mini"  @click="editmaintance.cldialogVisible=false">取 消</el-button>

          </span>
        </el-dialog>

        <addmaintenance  @close="addmaintenance_dialogVisible = false" :dialogVisible="addmaintenance_dialogVisible"></addmaintenance>
    </div>
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'
import addmaintenance from '../../components/add_maintenance'
const uuidv1 = require('uuid/v1')
var  myChart
export default {
    name: "operation",
    components: {
       addmaintenance 
    },
    data(){
        return{
            fileNamearray: [],
            leader: [],
            editmaintance: {
                copystaffedit: false,
                dialogVisible: false,
                copyRemark: '',
                statusdialogVisible: false,
                edittypedialogVisible: false,
                memo: '',
                demandType: '',
                status: '',
                statusname: '',
                staffId: '',
                staffName: '',
                approverName: '',
                demandCopyVOList: [],
                fpdemandCopyVOList: [],
                processTime: '',
                shareTime: '',
                approveTime: '',
                spdemandCopyVOList: [],
                id: '', 
                remark: '',
                approveRemark: '',
                approverId: '',
                staffIdfp: '',
                fpdialogVisible: false,
                cldialogVisible: false,
                
                groupName: '',
                processorName: '',
                statusRemark: '',
                submitTime: '',
                sharerName: ''
            },
            msg: {
               dialogVisible: false, 
               staff: '',
            },
            searchstaffloading: false,
            optionsstaff: '',
            addmaintenance_dialogVisible: false, 
            appoint_staff: [],
            demandtypes: [
              {
                name: '发起需求',
                choose: true,
                type: 'tj'
              },
              {
                name: '待我审批',
                choose: false,
                type: 'sp',
              },
              {
                name: '待我分配',
                choose: false,
                type: 'fp',
              },
              {
                name: '待我处理',
                choose: false,
                type: 'cl',
              },
              {
                name: '抄送给我',
                choose: false,
                type: 'cs',
              },
            ],
            chooseindex: 0,
            tableheight: 300,
            stafflist: [],

            search: {
                timestart: new Date([new Date().getFullYear(),new Date().getMonth()+1,1].join('-')),
                timeend: new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),
                size: 20,
                total: 10,
                currentPage: 1,
                demandTypes: [],
                status: [],
                staffIds: [],
                staffvalue: '',
            },
            tableData: [],
            option: {
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                
                    bottom: 10,
                    left: 'center',
                    data: []
                },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[
                            
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
        }
    },
    watch: {
        getflagdemand(demad) {
            if(demad) {
               this.find_demand() 
               this.$store.commit('setflagdemand',false)
            }
        }
    },
    computed: {
        ...mapGetters([
            'getpageDict',
            'getstaffVO',
            'getflagdemand'
        ]),
        getstatus() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "demand_status"
            })

            return demand_status[0]
        },
        getdemand_type() {
            let demand_type = this.getpageDict.filter((list) => {
                return list.dicType == "demand_type"
            })


            return demand_type[0]
        },
        staffvalueshow() {
            let string = '请选择员工'

            if (this.search.staffvalue.length > 20 || this.search.staffvalue.length == 20) {
                string = this.search.staffvalue.substr(0, 20) + '...'
            } else if (this.search.staffvalue.length>0 && this.search.staffvalue.length<20) {
                string = this.search.staffvalue
            }

            return string
        },
        getallocate() {
          let array = []
          //运维需求分配
          
          if (this.$isInArray(1)) {
            array.push({dicCode: 1,dicName: "运维需求" ,id: 3,proprity: 1})
          }

          if (this.$isInArray(3)) {
            array.push({dicCode: 2,dicName: "网络需求",id: 4,proprity: 1})
          }

          if (this.$isInArray(5)) {
            array.push({dicCode: 3,dicName: "产品需求",id: 120,proprity: 1})
          }

          if (this.$isInArray(7)) {
            array.push({dicCode: 4,dicName: "账号管理",id: 121,proprity: 1})
          }


          console.info(array)

          return array
        },
    },
    created() {
      this.chooseindex = this.$route.query.status ? this.$route.query.status:0
    },
    mounted(){

        this.get_group_staff_list()

        this.$nextTick(()=>{

            

            this.tableheight = this.$refs.tablewrap.offsetHeight - 80

            
        })
        let this_ = this;
        
      //myChart.setOption(option);
      this.get_approver()
      this.find_demand()


    },
    methods:{
      
      
      
      fmtDatedetail(obj){

        if (obj) {
          var date =  new Date(obj);
          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          //var d = "0"+date.getDate();
          return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length); 
        } else {
          return ''
        }
            
      },
      copyremarkflag(array) {
        let flag = false
        for (let i=0;i<array.length; i++) {
          if (array[i].staffId == this.getstaffVO.uid) {
              flag = true
          }
        }
        return flag

      },
      deleteaa(index) {

        //console.info(this.fileNamearray[index])
        let key = this.fileNamearray[index].path.replace(/http:\/\/hzyymy.cn\//, "")

       
        
        this.deletefile(key,index)
      },
      deletefile(key,index) {
      let that = this
      this.$http.get(`qiniuyun/delete_file?fileName=${key}`) 
             .then((data)=>{
                  
                  //删除数据库

                  if (that.fileNamearray[index].id) {
                    that.delete_demand_file(that.fileNamearray[index].path,index,that.fileNamearray[index].id)
                  } else {
                    that.fileNamearray.splice(index,1)
                    that.$message({
                        message: '删除成功',
                        type: 'error'
                    });
                  }
                  

                  //that.fileNamearray.splice(index,1)
              })
              .catch(function (error) {
                  console.log(error);
                  that.$message({
                      message: '接口报错',
                      type: 'error'
                    });
                });
      },
      delete_demand_file(path,index,id) {
        let that = this
        this.$http.get(`file/delete_demand_file?id=${id}&path=${path}`) 
             .then((data)=>{
                  that.fileNamearray.splice(index,1)
                  that.$message({
                      message: '删除成功',
                      type: 'error'
                    });
              })
              .catch(function (error) {
                  console.log(error);
                  that.$message({
                      message: '接口报错',
                      type: 'error'
                    });
                });
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
        async uploadpicture(filestatus) {
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
                /*let dlItem = this.dialog.find((item) => {
                  return item.newfile.name === filestatus.newfile.name
                })
                let precent = (a.loaded / a.total).toFixed(2)
                filestatus.progressa = precent
                dlItem.progressa = precent * 100*/
              },
            }).then((res) => {
              //保存图片到数据库
              
              this.imgloading = false
              this.fileNamearray.push({path:res.key,name: filestatus.file.name})
              //this.secondstep.url = res.key

              this.$message({
                message: "上传成功",
                type: 'success'
              })


              
              this.add_demand_file(this.editmaintance.id,filestatus.file.name,res.key)
            })
        },
        add_demand_file(fileId, fileName, filePath) {
              this.$http.post(`file/add_demand_file`,{
                fileId: fileId,
                fileName: fileName,
                filePath: `http://hzyymy.cn/${filePath}`,

              }) 
             .then((data)=>{
                  
                  that.$message({
                      message: '新增成功',
                      type: 'success'
                    });
              })
              .catch(function (error) {
                  console.log(error);
                  that.$message({
                      message: '接口报错',
                      type: 'error'
                    });
                });
        },
      addstaff() {
        let that = this

        if (!this.msg.staff) {
          return that.$message({
                  message: '请选择抄送人',
                  type: 'error'
              });
        }

        let array = []
        array = this.msg.staff.split('-')

        //this.dialog.namearray.push({name: array[1], id: array[0]})

        

            
          that.$http.post(`demand/add_demand_copy`, {
            demandId: this.editmaintance.id,
            staffId: array[0]
          })
          .then(function (data) {
          if (data.code == '200'){
            that.$message({
              message: '添加成功',
              type: 'success'
            });

            if (that.demandtypes[that.chooseindex].type=='sp') {
              that.editmaintance.spdemandCopyVOList.push({staffId:array[0],staffName: array[1]})
            } 
            if (that.demandtypes[that.chooseindex].type=='tj') {
              that.editmaintance.demandCopyVOList.push({staffId:array[0],staffName: array[1]})
            } 

            if (that.demandtypes[that.chooseindex].type=='fp') {
              that.editmaintance.fpdemandCopyVOList.push({staffId:array[0],staffName: array[1]})
            } 




            that.msg.staff = ''
            that.msg.dialogVisible = false

            



          } else {
              that.$message({
                  message: data.msg,
                  type: 'error'
              });
          }

          that.find_demand()
          
        })
        .catch(function (error) {
          console.log(error);
          that.$message({
              message: '接口报错',
              type: 'error'
            });
        })
      },
      copyRemarkchange() {
        let that = this

            
          that.$http.post(`demand/update_demand_copy_remark`, {
            demandId: this.editmaintance.id,
            staffId: this.getstaffVO.uid,
            remark: this.editmaintance.copyRemark
          })
              .then(function (data) {
              if (data.code == '200'){
                that.$message({
                  message: '操作成功',
                  type: 'success'
                });
                


              } else {
                  that.$message({
                      message: data.msg,
                      type: 'error'
                  });
              }

              that.editmaintance.dialogVisible=false

              that.find_demand()
              
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            })
      },
      remoteMethod(query) {
            let that = this
            this.$http.get(`staff/select_staff?memo=${query}`)
            .then(function (data) {
                
                
                ///console.info(data)

                that.optionsstaff = data.data

                
              })
              .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
        },
        searchstaff() {
            this.msg.staff = ''
            this.msg.dialogVisible = true
        },

        get_approver() {
           this.$http.get(`staff/get_approver`) 
               .then((data)=>{
                    if (data.code == '200') {
                        if (data.data.length > 0) {
                            this.leader = data.data
                        } else {
                            
                        }
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    this.$message({
                        message: '接口报错',
                        type: 'error'
                      });
                  });

        },
        get_appoint_staff(demandType) {
           this.$http.get(`staff/get_appoint_staff?demandType=${demandType}`) 
               .then((data)=>{
                    if (data.code == '200') {
                        if (data.data.length > 0) {
                            this.appoint_staff = data.data
                        } else {
                            this.$message({
                                message: '您没有领导可以审批此需求，先设置才可以新增需求',
                                type: 'error'
                            });
                        }
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    this.$message({
                        message: '接口报错',
                        type: 'error'
                      });
                  });

        },
        deletestaff(list,tag) {
          let that = this

            
          that.$http.post(`demand/delete_demand_copy`, {
            demandId: this.editmaintance.id,
            staffId: list.staffId
          })
              .then(function (data) {
              if (data.code == '200'){
                that.$message({
                  message: '删除成功',
                  type: 'success'
                });

                if (!tag) {
                   let k=0

                  for (let i=0; i<that.editmaintance.demandCopyVOList.length; i++) {
                    if (list.staffId == that.editmaintance.demandCopyVOList[i].staffId) {
                      k=i

                      break
                    }
                  }

                  that.editmaintance.demandCopyVOList.splice(k,1) 
                }
                

                if (tag && tag=='sp') {
                  let j=0


                  for (let i=0; i<that.editmaintance.spdemandCopyVOList.length; i++) {
                    if (list.staffId == that.editmaintance.spdemandCopyVOList[i].staffId) {
                      j=i

                      break
                    }
                  }


                  that.editmaintance.spdemandCopyVOList.splice(j,1)
                }
                


                

                if (tag && tag=='fp') {

                  let u=0


                  for (let i=0; i<that.editmaintance.fpdemandCopyVOList.length; i++) {
                    if (list.staffId == that.editmaintance.fpdemandCopyVOList[i].staffId) {
                      u=i

                      break
                    }
                  }


                  that.editmaintance.fpdemandCopyVOList.splice(u,1)

                }




                


              } else {
                  that.$message({
                      message: data.msg,
                      type: 'error'
                  });
              }

              that.find_demand()
              
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            })

                  
              
        },
        changepage(index) {
          for (let i=0; i<this.demandtypes.length; i++) {
            this.demandtypes[i].choose = false
          }



          this.demandtypes[index].choose = true

          this.chooseindex = index

          this.find_demand()
        },
        
        tabledemand_type_memo(memo) {
            let string = memo
            if (memo.length > 10) {
                string = memo.substr(0, 10) + '...'
            } else if (memo.length>0 && memo.length<10) {
                string = memo
            }

            return string
        },
        clear() {
            
            this.search.demandTypes = []
            this.search.status = []
            this.search.staffIds = []
            this.search.staffvalue = ''
            this.search.currentPage = 1
            this.find_demand()

        },
        find_demand_detail(id) {
          let that = this
          
        },
        editrow(row,flag) {



            this.$http.post(`demand/find_demand_detail`,{
              id:row.id
            }) 
           .then((data)=>{

                this.editmaintance.memo = ''
                this.editmaintance.status = ''
                this.editmaintance.copyRemark = ''

                this.editmaintance.statusname = ''
                this.editmaintance.approverName = ''

                this.editmaintance.demandType = ''
                this.editmaintance.approveRemark = ''
                this.editmaintance.id = ''
                this.editmaintance.staffId = ''
                
                this.editmaintance.memo = data.data.memo
                this.editmaintance.status = data.data.status

                this.editmaintance.statusname = this.tablestatus(data.data.status)
                this.editmaintance.approverName = data.data.approverName

                this.editmaintance.demandType = data.data.demandType
                this.editmaintance.approveRemark = data.data.approveRemark
                this.editmaintance.id = data.data.id
                this.editmaintance.staffId = data.data.staffId
                this.editmaintance.processorName = data.data.processorName
                this.editmaintance.sharerName = data.data.sharerName
                this.editmaintance.staffName = data.data.staffName
                this.editmaintance.demandCopyVOList = data.data.demandCopyVOList
                this.editmaintance.groupName = data.data.groupName
                this.editmaintance.submitTime = data.data.submitTime
                this.editmaintance.spdemandCopyVOList= []
                this.editmaintance.fpdemandCopyVOList=[]
                this.editmaintance.spdemandCopyVOList=[]
                this.editmaintance.statusRemark = data.data.statusRemark


                this.editmaintance.processTime = data.data.processTime
                this.editmaintance.shareTime = data.data.shareTime
                this.editmaintance.approveTime = data.data.approveTime
                this.editmaintance.copystaffedit = false
                this.fileNamearray = []


                



                for (let i=0; i<data.data.fileList.length; i++) {
                  this.fileNamearray.push({name: data.data.fileList[i].fileName,path: data.data.fileList[i].filePath,id: data.data.fileList[i].fileId})

                }






                if (flag == 'look') {
                  this.editmaintance.dialogVisible = true
                } else if(flag == 'edit' ) {
                  this.editmaintance.edittypedialogVisible = true
                } else if(flag == 'editstatus' ) {
                  this.editmaintance.statusdialogVisible = true
                } else if(flag == 'editfp' ) {
                  this.editmaintance.approveRemark = ''
                  this.editmaintance.fpdialogVisible = true
                  this.get_appoint_staff(this.editmaintance.demandType)
                } else if(flag == 'editcl' ) {
                  this.editstatuspsok()
                  
                } 
                else if(flag == 'lookcopy' ) {
                  this.editmaintance.copystaffedit = true
                  this.editmaintance.dialogVisible = true
                  
                  
                }  
                
            })
            .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
            

            


             
            
        },
        editapprove_demand(status) {

          this.editmaintance.status = status


          if (this.editmaintance.status == 3 && !this.editmaintance.approveRemark) {
              return this.$message({
                        message: '请填写驳回原因',
                        type: 'error'
                      })
          }

          if (this.editmaintance.status == 4 && !this.editmaintance.staffIdfp) {
              return this.$message({
                        message: '请选择指派员工',
                        type: 'error'
                      })
          }






         
          this.$http.get(`demand/share_demand?demandId=${this.editmaintance.id}&status=${this.editmaintance.status}&remark=${this.editmaintance.approveRemark}&staffId=${this.editmaintance.staffIdfp}`)
            .then((data)=>{
                if (data.code == 200) {
                    this.$message({
                        message: data.msg,
                        type: 'success'
                      });

                    
                } else {
                    this.$message({
                        message: data.msg,
                        type: 'error'
                      });
                }
                this.editmaintance.fpdialogVisible = false

                this.find_demand()

            })
            .catch(function (error) {
                console.log(error);
                this.$message({
                    message: '接口报错',
                    type: 'error'
                  });
            })


        },
        editstatusok(status) {
          this.editmaintance.status = status


          if (this.editmaintance.status == 3 && !this.editmaintance.approveRemark) {
              return this.$message({
                        message: '请填写驳回原因',
                        type: 'error'
                      })
          }


          this.$http.get(`demand/approve_demand?demandId=${this.editmaintance.id}&status=${this.editmaintance.status}&remark=${this.editmaintance.approveRemark}`)
            .then((data)=>{
                if (data.code == 200) {
                    this.$message({
                        message: data.msg,
                        type: 'success'
                      });

                    
                } else {
                    this.$message({
                        message: data.msg,
                        type: 'error'
                      });
                }
                this.editmaintance.statusdialogVisible = false

                this.find_demand()

            })
            .catch(function (error) {
                console.log(error);
                this.$message({
                    message: '接口报错',
                    type: 'error'
                  });
            })
        },
        editstatuspsok(id) {


          
          this.$http.post('demand/update_demand_status', {
                id: this.editmaintance.id,
                status: 5,
                //statusRemark: this.editmaintance.statusRemark
            })
            .then((data)=>{
                if (data.code == 200) {
                    this.$message({
                        message: data.msg,
                        type: 'success'
                      });

                    
                } else {
                    this.$message({
                        message: data.msg,
                        type: 'error'
                      });
                }

                this.editmaintance.cldialogVisible = false
                

                this.find_demand()

            })
            .catch(function (error) {
                console.log(error);
                this.$message({
                    message: '接口报错',
                    type: 'error'
                  });
            })
        },
        edit() {

            if (this.editmaintance.staffId != this.getstaffVO.uid) {
                this.editmaintance.dialogVisible = false
                return this.$message({
                    message: "您不能没有权限修改",
                    type: 'success'
                });


            }

            



            this.$http.post('demand/update_demand', {
                //fileName: fileName.length>0 ? fileName.join(','): '',
                //filePath: filePath.length>0 ? filePath.join(','): '',
                demandType: this.editmaintance.demandType,
                id: this.editmaintance.id,
                memo: this.editmaintance.memo,
                //approverId: this.editmaintance.approverId,
               
            })
            .then((data)=>{
                if (data.code == 200) {
                    this.$message({
                        message: data.msg,
                        type: 'success'
                      });

                } else {
                    this.$message({
                        message: data.msg,
                        type: 'error'
                      });
                }
                this.editmaintance.edittypedialogVisible = false

                this.find_demand()

            })
            .catch(function (error) {
                console.log(error);
                this.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
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
        fmtDate(obj){
            var date =  new Date(obj*1000);
            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        },
        tablestatus(row) {
            let rowindex = this.getstatus.dicList.filter((list) => {
                return list.dicCode == row
            })

            if (rowindex[0]) {
              return rowindex[0].dicName
            } else {
              return ''
            }
            
        },
        tabledemand_type(row) {
            let rowindex = this.getdemand_type.dicList.filter((list) => {
                return list.dicCode == row
            })

            //console.info(this.getdemand_type.dicList)

            if (rowindex[0]) {
                return rowindex[0].dicName
            } else {
                return row
            }
            
        },
        handleSizeChange(val) {
          this.search.size = val
          this.search.currentPage = 1

          this.find_demand()
        },
        handleCurrentChange(val) {
          this.search.currentPage = val
          this.find_demand()
        },
        getdiccode() {
            this.$http.get('dic/show_dic')
                .then((data)=>{
                        if (data.code = '200') {

                            console.info(data)
                            
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
        
        deleterow(id) { 
            
            let that = this

            this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                that.$http.get(`demand/delete_demand?demandId=${id}`)
                    .then(function (data) {
                    if (data.code == '200'){
                      that.$message({
                        message: '删除成功',
                        type: 'success'
                      });
                    } else {
                        that.$message({
                            message: data.msg,
                            type: 'error'
                        });
                    }
                    that.find_demand()
                    
                  })
                  .catch(function (error) {
                    console.log(error);
                    that.$message({
                        message: '接口报错',
                        type: 'error'
                      });
                  })

                  
              }).catch(() => {
                that.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });

        },
        find_demand() {
          let demandTypes = ''

            if (this.chooseindex !=2) {
              if (this.search.demandTypes.length>0) {
                demandTypes = this.search.demandTypes.join(',')
              } else {
                demandTypes = '1,2,3,4'

              }
            }


            if (this.chooseindex ==2) {
              if (this.search.demandTypes.length>0) {
                demandTypes = this.search.demandTypes.join(',')
              } else {
                let demandTypesarr = []
                for (let i=0; i<this.getallocate.length; i++) {
                  demandTypesarr.push(this.getallocate[i].dicCode) 
                }

                if (demandTypesarr.length) {
                  demandTypes = demandTypesarr.join(',')
                }

                

              }
            }



            


            this.$http.post('demand/find_demand',{
                "pageNum":this.search.currentPage,
                "pageSize":this.search.size,
                //"staffIds":this.search.staffIds.length>0?this.search.staffIds.join(','): this.getstaffVO.uid,
                "demandTypes":demandTypes,
                "status":this.search.status.length>0 ? this.search.status.join(','): '',
                start: this.search.timestart ? this.search.timestart.getTime().toString().substr(0, 10): '',
                end: this.search.timeend ? this.search.timeend.getTime().toString().substr(0, 10):'',
                type: this.demandtypes[this.chooseindex].type

            })
            .then((data)=>{
                    if (data.code = '200') {
                        myChart = echarts.init(document.getElementById('chart_example'))
                        this.option.series[0].data = []
                        this.option.legend.data = []
                        let total = 0
                        for (let i=0; i<data.data.list.length; i++) {
                            if (data.data.list[i].dicCode)  {

                              total += data.data.list[i].count
                                this.option.series[0].data.push({value:data.data.list[i].count, name: data.data.list[i].status+'('+data.data.list[i].count+')'})
                                this.option.legend.data.push(data.data.list[i].status+'('+data.data.list[i].count+')')
                            }
                            
                        }


                        myChart.setOption(this.option)



                        this.tableData = []
                        this.total = 0

                        


                        if (data.data.pageInfo.length>0) {
                          this.tableData = data.data.pageInfo
                          this.search.total = total
                        }
                        

                        //console.info(data)
                        
                        
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
    },
}
</script>
<style lang="less">
   .circlediv {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: inline-block;
        background: #409EFF;
        border: 1px solid #409EFF;
        line-height: 44px;
        text-align: center;
        color: #ffffff;
        font-size: 12px;
        position: relative;
        margin-right: 3px;
        margin-bottom: 2px;

        &:hover {
           .delete {
            display: inline;
           } 
        }

        .delete {
            position: absolute;
            right: -4px;
            top: 0px;
            color: green;
            font-size: 14px;
            display: none;
        }

       



    }
    
</style>
<style lang="less">


.wrap {
  .p-detail {
    height: 30px;
    line-height: 30px;
    background: rgba(242,242,242,1);
    padding-left: 26px;
    margin-top: 10px;
  }
}
.operation-search .el-input--suffix .el-input__inner {
    padding-right: 0px;
    padding-left: 26px;
}

.el-table__body, .el-table__footer {
    font-size: 12px;
}

.operation-search .el-input__prefix {
    left: 2px;
}
#chart_example{
    width: 300px;
    height:350px;
    margin: 0 auto;
}

.operation {
    padding: 40px;
    display: flex;
    background: rgba(255, 255, 255, 0.80);

    &-left {
        width: 400px;
        height: calc(100vh - 160px); 
        border: 1px solid #e2e2e2;
        margin-right: 20px;

        &-top {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #e2e2e2;
            padding-left: 20px;
            font-size: 15px;

            span {
              padding-right: 30px;

              &.blue {
                color: #0057ff;
              }
            }
        }

        &-bottom {
            padding: 20px;

            .operation-search {
                width: 300px;
                margin: 0 auto;
                font-size: 12px;
            }

        }
    }

    &-right {
        width: calc(100vw - 520px); 
        height: calc(100vh - 160px); 
        border: 1px solid #e2e2e2;
        position: relative;

        &-top {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #e2e2e2;
            padding-left: 20px;
            font-size: 15px;
            position: relative;

            

            .addmain {
              position: absolute;
              right: 26px;
              top: 10px;
            }
        }


        &-bottom {
            width: 100%; 
            height: calc(100vh - 220px); 
            padding: 20px;
            


            

        }

        .block-a {
                position: absolute;
                right: 16px;
                bottom: 14px;
                

              }
    }
}
  
</style>
