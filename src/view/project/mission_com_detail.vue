<template>
    <div class="project_list">

        <el-dialog
          :show-close="false"
          :visible.sync="dialogVisible"
          width="860px"
          :close-on-click-modal="false"
          >
          <div slot="title">
            <span style="font-size: 16px;">基本信息</span>

            <button @click="$emit('close')" type="button"  class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button>
          </div>
          <div class="detailproject_body">
            <div v-if="!editdetailproject" class="detailproject_top">
              <p>任务基本信息</p>
              <div class="detailproject_top_wrap">
              	<span>任务名称：{{detailproject.missionName}}</span>
              	<span style="padding-left: 180px;">优先级：{{detailproject.missionLevel}}</span>
              	<span style="padding-left: 130px;" class="span_second">创建人：{{detailproject.createorName}}</span>
              </div>
              <!--<div class="detailproject_top_wrap">
              	<span>创建日期：{{fmtDate(detailproject.createTime)}}</span><span class="span_second">启动日期：{{detailproject.startTime ? fmtDate(detailproject.startTime) : '未开始'}}</span></div>-->
              <div class="detailproject_top_wrap_a">任务描述：{{detailproject.memo}}</div>
              
            </div>

            <div v-if="editdetailproject" class="detailproject_top">
              <p>任务基本信息</p>
              <div class="detailproject_top_wrap">
              	<span>任务名称：
              		<el-input placeholder="请输入内容" style="width:160px;" class="input-select" size="mini" v-model="detailproject.missionName">
                	</el-input>
            	</span>
            	<span style="padding-left: 70px;">优先级：
			        <el-select v-model="detailproject.missionLevel" class="input-select" size="mini" placeholder="优先级">
		                <el-option

		                  v-for="item in projectLevelselect"
		                  :key="item.value"
		                  :label="item.label"
		                  :value="item.value">
		                </el-option>
		            </el-select>


	            </span>

                <!--<span style="padding-left: 220px;" class="span_second">创建人：{{detailproject.createorName}}</span>-->
              </div>

              <!--<div class="detailproject_top_wrap"><span>创建日期：{{fmtDate(detailproject.createTime)}}</span><span class="span_second">启动日期：{{detailproject.startTime ? fmtDate(detailproject.startTime) : '未开始'}}</span></div>-->

              <div style="margin-top: 10px;" class="detailproject_top_wrap_a"><span style="position: relative;top: -40px;">任务描述：</span><el-input type="textarea"
                  :rows="5"
                  placeholder="请输入任务描述" style="display: inline-block;width: 340px;font-size: 12px;" v-model="detailproject.memo" ></el-input>
                </div>
            </div>

            <div class="detailproject_top detailproject_middle">
              <p>文档资料</p>
              <div @click="filethirddialogVisible(1,true)" style="float: left" class="detailproject_middle_list">
                <i style="color: yellow; font-size: 18px;" class="iconfont icon-wenjianjia1"></i>
                任务详情
              </div>
              <div @click="filethirddialogVisible(2,false)" style="float: right;width: 200px;" class="detailproject_middle_list">
                <i style="color: yellow; font-size: 18px;" class="iconfont icon-wenjianjia1"></i>
                工作汇报
              </div>
            </div>

            <div class="detailproject_top detailproject_middle detailproject_middle_two">
              <p>最近动态</p>
              <div class="detailproject_middle_two_list_wrap">
                <!--<div class="list">
                  2016-01-80 <span style="padding-left: 5px;">chjadakshda</span>
                </div>-->
              </div>

            </div>
            <div class="detailproject_top detailproject_middle">
              <p>相关成员</p>
              <div class="detailproject_middle_two_list_wrap">
                <div class="detailproject_middle_two_list_wrap_flex">
                  <div v-for="(list,index) in detailproject.staffList" class="people-list"><i class="el-icon-user-solid"></i> {{list.staffName}}{{list.level==1 ? '(负责人)': ''}}
                    <i class="el-icon-error" v-if="(list.level==2) && (getstaffVO.uid == detailproject.createorId || getstaffVO.uid == detailproject.principalId)" @click="deletemember_ok(index)" style="color: red;padding-left: 6px;"></i>
                    <i class="el-icon-error" v-if="(list.level==1) && (getstaffVO.uid == detailproject.createorId || getstaffVO.uid == detailproject.principalId)" @click="deletememberaction(index)" style="color: red;padding-left: 6px;"></i>
                  </div>


                  <div v-if="getstaffVO.uid == detailproject.createorId || getstaffVO.uid == detailproject.principalId" class="people-list" @click="add_member_clear"><i style="color: grey"  class="el-icon-plus"></i> 团队管理</div>

                </div>
              </div>
            </div>

            <div class="detailproject_top detailproject_middle detailproject_middle_two">
              <p>工时进度</p>
              <div class="detailproject_middle_two_list_wrap">
                <!--任务进度 <el-progress style="display: inline-block;width: 240px;margin-left: 16px;" :percentage="70"></el-progress>-->

                <div style="margin-left: 60px;margin-top: 6px;">
                  <p style="font-size: 13px; color:grey;line-height: 26px;">开始日期&nbsp; &nbsp;&nbsp; <span style="color: #606266">{{detailproject.startTime ? fmtDate(detailproject.startTime) : '未开始'}}</span></p>
                  <p style="font-size: 13px; color:grey;line-height: 26px;">截止日期&nbsp; &nbsp;&nbsp;  <span style="color: #606266">{{detailproject.endTime ? fmtDate(detailproject.endTime) : '未开始'}}</span></p>
                  <p style="font-size: 13px; color:grey;line-height: 26px;">可用工时&nbsp; &nbsp;&nbsp;  <span style="color: #606266">{{detailproject.day}}</span></p>

                </div>
              </div>

            </div>

            <div class="detailproject_top detailproject_middle detailproject_middle_three">
              <p>基本情况</p>
              <div class="detailproject_middle_two_list_wrap">
                <span style="padding-left: 10px;">所属项目：{{detailproject.projectName}}</span>
                <span style="padding-left: 20px;">优先级：{{detailproject.projectLevel}}</span>
                <span style="padding-left: 20px;">项目创始人：{{detailproject.projectCreateorName}}</span>
              </div>

            </div>
            <div class="detailproject_top detailproject_middle detailproject_middle_three detailproject_middle_two">
              <p>操作</p>
              <div v-if="getstaffVO.uid == detailproject.createorId || getstaffVO.uid == detailproject.principalId" style="line-height: 30px;overflow: hidden" class="detailproject_middle_two_list_wrap" >


               

                <el-button size="mini" v-if="detailproject.status==1" @click="edit_status(2)" type="danger" >开始</el-button>


                <el-button size="mini" v-if="!editdetailproject" @click="editdetailproject = true">编辑</el-button>


                <el-button size="mini" v-if="editdetailproject" @click="edit_project">保存</el-button>


                <el-button size="mini"  v-if="detailproject.status==2 || detailproject.status==5" @click="edit_status(4)"  type="info" >完成</el-button>

                <el-button size="mini"  v-if="detailproject.status==4"   type="info" >已完成</el-button>

                 <el-button   size="mini" v-if="detailproject.status==3 && getstaffVO.uid==detailproject.createorId" @click="edit_status(5)"  type="info" >驳回</el-button>

                 <el-button size="mini"  v-if="detailproject.status==3 && getstaffVO.uid==detailproject.createorId" @click="edit_status(4)"  type="info">确认完成</el-button>



                <el-button size="mini"  v-if="detailproject.status!=6"  @click="edit_status(6)" type="primary">关闭</el-button>
                <el-button size="mini" v-if="detailproject.status==6" @click="edit_status(2)" type="primary">开启</el-button>
              </div>

              <div style="line-height: 30px;overflow: hidden" class="detailproject_middle_two_list_wrap" v-if="detailproject.status==4">
                
                <el-button  size="mini" type="danger">已完成</el-button>



                
              </div>

            </div>
            

          </div>


        </el-dialog>

        <el-dialog
          title="团队管理"
          :visible.sync="add_member.dialogVisible"
          width="500px"
          :close-on-click-modal="false"
          >
          <div class="add_member_body">
              <!--<p>
                <span >选择成员：&nbsp;&nbsp;&nbsp;</span>
                <el-dropdown class="custom-width" trigger="click" size="mini" placement="bottom">
                  <el-button style="width: 224px;overflow: hidden;text-align: left" size="mini" class="custom-width-order">
                    &nbsp;选择成员&nbsp;
                  </el-button>
                  <el-dropdown-menu  style="min-width: 224px;height: 200px;overflow-x: scroll;" slot="dropdown">
                    <el-tree node-key="id" :data="stafflist" @check="staffsave"   ref="staff" show-checkbox class="custom-width-order">
                    </el-tree>
                    
                  </el-dropdown-menu>
                </el-dropdown>
              </p>-->

              <p style="margin-top: 20px;">
                <span >搜索成员：&nbsp;&nbsp;&nbsp;</span>
                <!--<el-select
                  v-model="add_member.staffsearch"
                  filterable
                  size="small"
                  style="width: 220px;"
                  @change="staffchange"
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  >
                  <el-option
                    v-for="item in optionsstaff"
                    :key="item.staffId"
                    :label="item.staffName"
                    :value="`${item.staffId}-${item.staffName}`">
                  </el-option>
                </el-select>-->
                <el-select
                  v-model="add_member.staffsearch"
                  filterable
                  size="small"
                  style="width: 220px;"
                  @change="staffchange"
                  
                  placeholder="请输入关键词"
                  >
                  <el-option
                    v-for="item in project_staff"
                    :key="item.staffId"
                    :label="item.staffName"
                    :value="`${item.staffId}-${item.staffName}`">
                  </el-option>
                </el-select>

                <div class="staffwrap" style="">
                  <span v-if="(list.level == 2) && ( getstaffVO.uid == detailproject.createorId || getstaffVO.uid == detailproject.principalId )"  v-for="(list,index) in add_member.simplestaffarray" style="padding: 2px 14px;background: #ebeef5;border-radius: 4px;margin-bottom: 8px;display: inline-block;position: relative;">{{list.name}}
                    <i @click="deletesimplestaffarray(index)" class="el-icon-error iconstaff_delete"></i>
                  
                  </span>
                  
                </div>
              </p>

              <p style="margin-top: 20px;">
                <span >搜索负责人：</span>
                <!--<el-select
                  v-model="add_member.staffadminsearch"
                  filterable
                  size="small"
                  style="width: 220px;"
                  @change="staffadminchange"
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  >
                  <el-option
                    v-for="item in optionsstaff"
                    :key="item.staffId"
                    :label="item.staffName"
                    :value="`${item.staffId}-${item.staffName}`">
                  </el-option>
              </el-select>-->
              <el-select
                  v-model="add_member.staffadminsearch"
                  filterable
                  size="small"
                  style="width: 220px;"
                  @change="staffadminchange"
                  
                  placeholder="请输入关键词"
                  >
                  <el-option
                    v-for="item in add_member.simplestaffarray"
                    v-if="item.level == 2"
                    :key="item.id"
                    :label="item.name"
                    :value="`${item.id}-${item.name}`">
                  </el-option>
              </el-select>
              <!--1 负责人。2普通员工-->
                <div class="staffwrap" style="">
                  <span v-if="list.level == 1" v-for="(list,index) in add_member.simplestaffarray" style="padding: 2px 14px;background: #ebeef5;border-radius: 4px;margin-bottom: 8px;display: inline-block;position: relative;">{{list.name}}
                    <i @click="deletesimplestaffarraylevel(index,list)" class="el-icon-error iconstaff_delete"></i>
                  
                  </span>
                  
                </div>
              </p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="add_member.dialogVisible = false">取 消</el-button>
            <el-button size="mini" @click="add_member_ok" type="primary" >确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          
          :visible.sync="deletemember.dialogVisible"
          width="400px"
          :close-on-click-modal="false"
          >
          <span slot="title">&nbsp;</span>
          <div style="width: 260px;margin: 0 auto;" >
            <el-button style="margin-right: 30px" size="medium" @click="edit_member_role(deletemember.index)" type="primary">撤销负责人职位</el-button>
            <el-button size="medium" @click="deletemember_ok(deletemember.index)" type="danger">删除</el-button>
          </div>
        </el-dialog>

        

        

        <el-dialog
          title="任务"
          :visible.sync="filethird.dialogVisible"
          width="700px"

          :close-on-click-modal="false"
          >
          <div  style="position: relative;" slot="title">
            任务
            <el-button v-if="filethird.type==2" size="small" style="display: inline-block;position: absolute;right: 180px;top: -6px;" @click="submit_file" type="primary">上传到项目</el-button>
            <el-upload
              style="display: inline-block;position: absolute;right: 40px;top: -6px;"
              class="upload-demo"
              :http-request="uploadpicture"
              action="http://upload-z2.qiniup.com/"
              >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>



          </div>
          <div v-show="filethird.upload" class="filethird_body">
            <p  v-for="(list,index) in filethird.filelist">
              <i @click="deleteprofile(list,index)" style="color: red; font-size: 16px;position: absolute;right: 8px;top: 1px;" class="el-icon-error iconerror"></i>
              <i v-if="!IsImageFile(list.filePath)" style="color: blue; font-size: 46px;" class="iconfont icon-wenjian3 doc">
              </i>

              <img  @dblclick="openBigImg(`http://hzyymy.cn/${list.filePath}`)" style="width: 50px;" v-if="IsImageFile(list.filePath)" :src="`http://hzyymy.cn/${list.filePath}`"/>

              <br/>
              

              <a :download="`${list.fileName}`" target="_blank" :href="`http://hzyymy.cn/${list.filePath}`" >{{list.fileName}}</a>
              
            </p>
            
            
          </div>
          <div  v-show="!filethird.upload" class="filethird_body">

            <p :class="{clickborder: list.check}" @click="list.check = !list.check" v-for="(list,index) in filethird.filelist">
              <i @click="deleteprofile(list,index)" style="color: red; font-size: 16px;position: absolute;right: 8px;top: 1px;" class="el-icon-error iconerror"></i>
              <i v-if="!IsImageFile(list.filePath)" style="color: blue; font-size: 46px;" class="iconfont icon-wenjian3 doc">
              </i>

              <img  @dblclick="openBigImg(`http://hzyymy.cn/${list.filePath}`)" style="width: 50px;" v-if="IsImageFile(list.filePath)" :src="`http://hzyymy.cn/${list.filePath}`"/>

              <br/>
              

              <a :download="`${list.fileName}`" target="_blank" :href="`http://hzyymy.cn/${list.filePath}`" >{{list.fileName}}</a>
              
            </p>
            
            
            
          </div>

        </el-dialog>

        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Draggable from '../../components/drag/draggable'
import Droppable from '../../components/drag/droppable'
import {
  isImageFile,
  isVideoFile,
  matchType
} from '../../util'
const uuidv1 = require('uuid/v1')

export default {
    name: "index",
    props: {
	    dialogVisible: Boolean,
	    id: Number,
	 },
    components: {
    },
    data(){
        return{
            projectcomdetail_dialogVisible: false,
            detailprojec_id: 0,
            falgs: 'article',
            disabled: false,
        	  projectclike: true,
            filethird: {
              upload: false,
              dialogVisible: false,
              type: 2,
              filelist: [],
              filename: [],
              filepath: [],
            },
            filesecond: {
              dialogVisible: false,
            },
            filefirst: {
              dialogVisible: false,
            },
            deletemember: {
              dialogVisible: false,
              index: -1,
            },
            add_member: {
              dialogVisible: false,
              staffLevel: '',
              staffId: '',
              staffsearch: '',
              simplestaffarray:[],
              staffadminsearch: '',
            },
            stafflist: [],
            projectadd: {
              dialogVisible: false,
              projectName: '',
              
              endTime: '',
              memo: '',
              projectLevel: '',
            },
            projectLevelselect: [
              {
                value: 'A',
                label: 'A',
              }, {
                value: 'B',
                label: 'B',
              }, {
                value: 'C',
                label: 'C'
              }
            ],
            input2: '',
            options: [],
            optionsstaff: [],
            value: '',
            tableData: [],
            search: {
              pageNum: 1,
              pageSize: 250,
              total: 0,
              status: '',
              projectId: '',
              level: '',
              date: '',
              modal: true,
            },
            editdetailproject: false,
            detailproject: {
              dialogVisible: false,
            },
            board: {
            	statusone: [],
            	statusoneshow: false,
            	statustwoshow: false,
            	statusthreeshow: false,
            	statusfourshow: false,
            	statusfiveshow: false,
            	statussixshow: false,
            	statustwo: [],
            	statusthree: [],
            	statusfour: [],
            	statusfive: [],
            	statussix: [],

            },
            searchproject: {
            	pageNum: 1,
	            pageSize: 250,
              	total: 0,
              	createorId: [],
              	status: '',
              	level: '',
            },
            tableDataproject: [],
            dragid: '',
            project_staff: []
        }
    },
    watch: {
    	id(value) {
    		if(value) {
    			this.find_project_detail(value)
    		}
    	}
    },
    computed: {
        ...mapGetters([
            'getpageDict',
            'getstaffVO',
            'getflagdemand',
            'userInfo'
        ]),
        getdemand_type() {
            let demand_type = this.getpageDict.filter((list) => {
                return list.dicType == "mission_status"
            })

            //console.info(demand_type[0])


            return demand_type[0]
        },
        getproject_type() {
            let demand_type = this.getpageDict.filter((list) => {
                return list.dicType == "project_type"
            })

            console.info(demand_type[0])


            return demand_type[0]
        },
    },
    created() {
       
    },
    mounted(){
      this.getselectdata()
      //this.get_group_staff_list()
      //this.find_mission_board()
      this.get_group_staff_list()
    },
    methods:{
      get_project_staff() {
        let that = this
        this.$http.get(`staff/get_project_staff?id=${this.detailproject.projectId}&memo=`) 
          .then(function (data) {
                that.project_staff = data.data
              
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
      },
      edit_status(status) {
        let that = this
        this.$http.post(`mission/edit_status`,{
          status: status,
          missionId: this.detailproject.id,
          createor: this.detailproject.createorId,
          projectId: this.detailproject.projectId,
        }) 
          .then(function (data) {
                
                
                that.find_project_detail(that.detailproject.id)
                that.$emit('getchangedata')
                that.$message({
                  message: '操作成功',
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
     
      submit_file() {
        let ids = []
        for (let i=0; i<this.filethird.filelist.length; i++) {
          if (this.filethird.filelist[i].check) {
            ids.push(this.filethird.filelist[i].id)
          }
        }

        if (!ids.length) {
         return this.$message({
                  message: '请选择需要上传的文件',
                  type: 'error'
                });
        }
        let that = this

        this.$http.get(`file/submit_file?ids=${ids.join(',')}`) 
          .then(function (data) {
                that.find_project_file()
                that.$message({
                  message: '操作成功',
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
      deleteprofile(list, index) {

        let that = this
        this.$http.get(`qiniuyun/delete_file?fileName=${list.filePath}`) 
               .then((data)=>{
                    
                    //删除数据库

                    if (this.filethird.filelist[index].id) {
                      that.delete_project_file(this.filethird.filelist[index].filePath,index,this.filethird.filelist[index].id)
                    } else {
                      this.filethird.filelist.splice(index,1)
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
      delete_project_file(path,index,id) {
        let that = this
        this.$http.get(`file/delete_project_file?id=${id}&url=${path}`) 
             .then((data)=>{
                  this.filethird.filelist.splice(index,1)
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
      IsImageFile(url) {
          let re = matchType(url)
          return re == 'image' ? true: false
      },
      openBigImg(imgPath) {
          window.open(imgPath)
      },
      filethirddialogVisible(type,flag) {

        this.filethird.type = type
        this.filethird.upload = flag
        this.find_project_file()

        this.filethird.dialogVisible = true
      },
    	
        tablestatus(row) {
            let rowindex = this.getdemand_type.dicList.filter((list) => {
                return list.dicCode == row
            })

            if (rowindex[0]) {
              return rowindex[0].dicName
            } else {
              return ''
            }
            
        },
        project_start() {
          let that = this
          this.$http.get(`project/project_start?projectId=${this.detailproject.id}`)
              .then(function (data) {
                  if (data.code == 200) {
                    that.find_project_detail(that.detailproject.id)
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
        project_stop() {
          let that = this
          this.$http.get(`project/project_stop?projectId=${this.detailproject.id}`)
              .then(function (data) {
                  if (data.code == 200) {
                    that.find_project_detail(that.detailproject.id)
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
        project_finish() {
          let that = this
          this.$http.get(`project/project_finish?projectId=${this.detailproject.id}`)
              .then(function (data) {
                  if (data.code == 200) {
                    that.find_project_detail(that.detailproject.id)
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
        async uploadpicture(filestatus,type) {

          
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

              this.filethird.filename.push(filestatus.file.name)
              this.filethird.filepath.push(res.key)

              //console.info()
              
              this.$message({
                message: "图片上传成功",
                type: 'success'
              })
              
              this.upload_project_file(res.key,filestatus.file.name)
            })
        },
        find_project_file() {
          let that = this
          this.$http.post(`file/find_mission_file`,{
            missionId: this.detailproject.id,
            status: false,
            type: this.filethird.type
          })
              .then(function (data) {
                  if (data.code == 200) {
                    that.filethird.filelist = []
                    for (let i=0; i<data.data.length; i++) {
                      that.filethird.filename.push(data.data[i].fileName)
                      that.filethird.filepath.push(data.data[i].filePath)
                      that.filethird.filelist.push({
                        fileName: data.data[i].fileName,
                        filePath:data.data[i].filePath,
                        id:data.data[i].id,
                        check: false,

                      })
                    }
                     

                    //console.info(that.filethird)

                    that.filesecond.dialogVisible = true
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
        upload_project_file(path,name) {

          
          let that = this
          this.$http.post(`file/add_mission_file`,{
            //projectId: this.detailproject.id,
            missionId: this.detailproject.id,
            filePath: path,
            fileName: name,
            type: this.filethird.type
          })
          .then(function (data) {
                that.find_project_file()
                that.$message({
                  message: '操作成功',
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
        edit_member_role(index) {
          let that = this
          this.$http.get(`mission/del_principal?staffId=${this.detailproject.staffList[index].staffId}&missionId=${this.detailproject.id}`)
              .then(function (data) {
                  
                    that.$message({
                      message: '操作成功',
                      type: 'success'
                    });
                  
                    that.find_project_detail(that.detailproject.id)
                    that.deletemember.dialogVisible = false
                    that.deletemember.index = -1
                  
                })
                .catch(function (error) {
                  console.log(error);
                  that.$message({
                      message: '接口报错',
                      type: 'error'
                    });
                });
        },
        deletemember_ok(index) {
          let that = this
          this.deletemember.dialogVisible = false
          this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this.$http.get(`mission/del_mission_staff?staffId=${this.detailproject.staffList[index].staffId}&missionId=${this.detailproject.id}`)
              .then(function (data) {
                  
                    that.$message({
                      message: '操作成功',
                      type: 'success'
                    });
                  
                    that.find_project_detail(that.detailproject.id)
                  
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
        deletememberaction(index) {
          this.deletemember.dialogVisible = true
          this.deletemember.index = index
          
        },
        add_member_clear() {
          this.add_member.simplestaffarray = []
          for (let i=0;i<this.detailproject.staffList.length;i++) {
            this.add_member.simplestaffarray.push({id: this.detailproject.staffList[i].staffId,staffName: this.detailproject.staffList[i].staffName, level: this.detailproject.staffList[i].level,name: this.detailproject.staffList[i].staffName})
          }

          
          this.add_member.dialogVisible = true
        },
        add_member_ok() {
          let that = this

          

          let staffId = []
          let staffLevel = []

          if (!this.add_member.simplestaffarray.length) {
            return that.$message({
                    message: '选择成员在保存',
                    type: 'error'
                  });
          }
          let levelcount = 0

          for (let i=0; i<this.add_member.simplestaffarray.length; i++) {
              staffId.push(this.add_member.simplestaffarray[i].id)
              staffLevel.push(this.add_member.simplestaffarray[i].level)

              if (this.add_member.simplestaffarray[i].level == 1) {
                levelcount++
              }

          }

          if (levelcount>1) {
            return that.$message({
                    message: '项目负责人只能有一个人',
                    type: 'error'
                  });
          }




          staffId = staffId.length>0 ? staffId.join(','): ''
          staffLevel = staffLevel.length>0 ? staffLevel.join(','): ''


          

          this.$http.post(`mission/add_member`,{
            staffIds: staffId,
            staffLevels: staffLevel,
            id: this.detailproject.id
          })
            .then(function (data) {
                
                  that.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  

                  that.add_member.dialogVisible = false
                  that.find_project_detail(that.detailproject.id)

                
              })
              .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
        },
        deletesimplestaffarray(index) {

          this.add_member.simplestaffarray.splice(index,1)
        },
        deletesimplestaffarraylevel(index,list) {
          let that = this
          this.$http.get(`mission/del_principal?staffId=${list.id}&missionId=${this.detailproject.id}`)
              .then(function (data) {
                  
                    that.$message({
                      message: '操作成功',
                      type: 'success'
                    });


                  that.add_member.simplestaffarray.splice(index,1)
                    
                  
                })
                .catch(function (error) {
                  console.log(error);
                  that.$message({
                      message: '接口报错',
                      type: 'error'
                    });
                });
        },
        
        staffchange() {

          if (this.add_member.staffsearch) {
            let array = this.add_member.staffsearch.split('-')



            let t=-1

            for (let j=0; j<this.add_member.simplestaffarray.length;j++) {
              if ((this.add_member.simplestaffarray[j].id == array[0] && this.add_member.simplestaffarray[j].level == 2) || this.detailproject.createorId  == array[0]) {


                t = j
                break
              }
            }

            if (t<0) {
              this.add_member.simplestaffarray.push({name: array[1], id: array[0],level: 2})
            }

            this.add_member.staffsearch = ''
          }

          


        },
        staffadminchange() {
          if (this.add_member.staffadminsearch) {
            let array = this.add_member.staffadminsearch.split('-')

            let t=-1

            for (let j=0; j<this.add_member.simplestaffarray.length;j++) {
              if ((this.add_member.simplestaffarray[j].id == array[0] && this.add_member.simplestaffarray[j].level == 1) || this.detailproject.createorId  == array[0]) {


                t = j
                break
              }
            }

            if (t<0) {
              this.add_member.simplestaffarray.push({name: array[1], id: array[0],level: 1})
            }





            this.add_member.staffadminsearch = ''



          }
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
        staffsave() {
          let checkData = this.$refs.staff.getCheckedNodes()


          console.info(checkData)


          for (let i=0;i<checkData.length;i++) {
            if (!checkData[i].children) {
                //this.search.staffIds.push(checkData[i].id)

                this.add_member.simplestaffarray.push({id: checkData[i].value,name: checkData[i].label,level: 2})
              
                //this.search.staffvalue += checkData[i].label+','
            }


          }
        },
        deleteproject(id) {

          let that = this
          this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            

            this.$http.get(`project/delete_project?id=${id}`)
              .then(function (data) {
                if (data.code = '100000'){
                  that.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                }
                thithats.detailproject.dialogVisible = false


                that.getselectdata()



                
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
        clear() {
          this.search.pageNum = 1
          this.search.status = ''
          this.search.level = ''
          this.search.createorId = []

        },
        get_group_staff_list() {
            this.$http.get(`staff/get_group_staff_list?groupId=`)
                .then((data)=>{


                        let array = []





                        for (let i=0; i<data.data.length; i++) {
                            array.push({label: data.data[i].groupName, value: data.data[i].groupId})
                            
                            if ((data.data[i].list && data.data[i].list.length>0) || (data.data[i].groupStaffVOS && data.data[i].groupStaffVOS.length>0)) {
                                array[array.length-1]['children']=[]

                                for(let j=0; j<data.data[i].list.length; j++) {
                                    array[array.length-1]['children'].push({value: data.data[i].list[j].id, label: data.data[i].list[j].staffName})
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

                
               array.push({label: groupStaffVOS.groupName,value: groupStaffVOS.groupId})



               if ((groupStaffVOS.list && groupStaffVOS.list.length>0) || (groupStaffVOS.groupStaffVOS && groupStaffVOS.groupStaffVOS.length>0)) {

                    array[array.length-1]['children'] = []

                   

                                

                    for(let j=0; j<groupStaffVOS.list.length; j++) {
                        array[array.length-1]['children'].push({value: groupStaffVOS.list[j].id, label: groupStaffVOS.list[j].staffName})
                    }



                    for(let j=0; j<groupStaffVOS.groupStaffVOS.length; j++) {



                        this.diguidata(groupStaffVOS.groupStaffVOS[j],array[array.length-1]['children'])
                    }


                }

                
                
            
            
        },
      dblclickdetail(index,row) {
          this.detailproject.dialogVisible = true

          this.find_project_detail(index.id)
      },
      fmtDate(obj){
            var date =  new Date(obj*1000);

            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            return y+"/"+m.substring(m.length-2,m.length)+"/"+d.substring(d.length-2,d.length);
      },
      find_project_detail(id) {
        this.$http.get(`mission/find_mission_detail?missionId=${id}`)
          .then((data)=>{
            console.info(data)
            this.detailproject = {...this.detailproject,...data.data}

            this.get_project_staff()

            //console.info(this.detailproject)

          })
          .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
          }) 
      },
      handleSizeChange(val) {
        this.search.pageSize = val
        this.search.pageNum = 1
        this.getselectdata()
      },
      handleCurrentChange(val) {
        this.search.pageNum = val
        this.getselectdata()
      },
      taskdetail(list) {
        this.search.projectId = list.id

        this.find_mission_board()
      },
      find_mission_board() {
      		let that = this
      		this.$http.post(`mission/find_mission_board`, {
	            level: this.search.level,
	            memo: this.search.memo,
	            date: this.search.date,
	            projectId: this.search.projectId,
          	})
	      	.then((data)=> {
	      		this.board.statusone = []
	      		this.board.statustwo = []
	      		this.board.statusthree = []
	      		this.board.statusfour = []
	      		this.board.statusfive = []
	      		this.board.statussix = []
	            for (let i=0;i<data.data.length;i++) {
	            	if (data.data[i].status == 1) {
	            		this.board.statusone = data.data[i].list
	            	} else if (data.data[i].status == 2) {
	            		this.board.statustwo = data.data[i].list
	            	}
	            	else if (data.data[i].status == 3) {
	            		this.board.statusthree = data.data[i].list
	            	}
	            	else if (data.data[i].status == 4) {
	            		this.board.statusfour = data.data[i].list
	            	}
	            	else if (data.data[i].status == 5) {
	            		this.board.statusfive = data.data[i].list
	            	}
	            	else if (data.data[i].status == 6) {
	            		this.board.statussix = data.data[i].list
	            	}
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
      edit_project() {
        let that = this

          this.$http.post(`mission/edit_mission`, {
            missionName: this.detailproject.missionName,
            memo: this.detailproject.memo,
            level: this.detailproject.missionLevel,
            id: this.detailproject.id,
          })
            .then(function (data) {
              if (data.code = '100000'){
                that.$message({
                  message: '编辑成功',
                  type: 'success'
                });
              }






              that.find_project_detail(that.detailproject.id)
              that.editdetailproject = false



              
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
      },
      add_project() {
        let that = this

          this.$http.post(`project/add_project`, {
            projectName: this.projectadd.projectName,
            memo: this.projectadd.memo,
            endTime: this.projectadd.endTime ? this.projectadd.endTime.getTime().toString().substr(0, 10) : '',
            projectLevel: this.projectadd.projectLevel,
            
          })
            .then(function (data) {
              if (data.code = '100000'){
                that.$message({
                  message: '新增成功',
                  type: 'success'
                });
              }

              that.projectadd.dialogVisible = false

              that.getselectdata()



              
            })
            .catch(function (error) {
              console.log(error);
              that.$message({
                  message: '接口报错',
                  type: 'error'
                });
            });
      },
      getselectdata() {
        let that = this
        this.$http.post(`mission/find_mission`,{
            level: this.search.level,
            memo: this.search.memo,
            //status: this.search.status,
            date: this.search.date,
            pageNum: this.search.pageNum,
            pageSize: this.search.pageSize,
        })
          .then((data)=>{
                //console.info(data)
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
<style lang="less">
.clickborder {
  border: 1px solid green;
}
.filefirst_body {
  font-size: 12px;
  min-height: 400px;

  p {
    display: inline-block;
    width: 70px;
    text-align: center;
    height: 74px;
    overflow: hidden;

    i {
      color: #f7d673; 
      font-size: 50px;
    }
  }


}

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
.add_member_body {
  .staffwrap {
    margin-left: 90px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 300px;

    span {
      padding: 2px 14px;
      background: #ebeef5;
      border-radius: 4px;
      margin-bottom: 8px;
      display: inline-block;
      position: relative;
      margin-right: 8px;

      &:hover {
        .iconstaff_delete {
          display: block;
        }
      }

      .iconstaff_delete {
        position: absolute;
        right: -3px;
        top:-3px;
        color: red;
        display: none;
      }
    }
  }
}
.detailproject_top {
    border: 1px solid #e2e2e2;
    padding: 6px 8px;

    p {
      font-size: 17px;
      margin-bottom: 6px;
      font-weight: 700;
    }

    .detailproject_top_wrap {
      height: 30px;
      line-height: 30px;
      .span_second {
        position: absolute;
        left: 420px;
      }
    }


}

.detailproject_top_wrap_a {
  line-height: 30px;
}

.detailproject_body {
  overflow: hidden;
}

.detailproject_middle {
  border: 1px solid #e2e2e2;
  padding: 6px 8px;
  margin-top: 16px;
  width: 402px;
  float: left;
  margin-right: 16px;
  height: 210px;
  



  .detailproject_middle_list {
    margin-top: 13px;
  }
}

.detailproject_middle_three {
  height: 100px;

  .detailproject_middle_two_list_wrap {
    line-height: 50px;
    overflow: hidden;
  }

}

.detailproject_middle_two {
  margin-right: 0px;

  .detailproject_middle_two_list_wrap {
    height: 150px;
    overflow-y: scroll;
    margin-top: 16px;
    margin-bottom: 16px;



    .list {
      height: 30px;
      line-height: 30px;
    }




  }
}

.detailproject_middle_two_list_wrap_flex {
  height: 150px;
  overflow-y: scroll;
  margin-top: 16px;

  .people-list {
    display: inline-block;
    width: 49%;
    font-size: 12px;
    line-height: 26px;

    
  }

  
}
  
</style>
<style spoced lang="less">
.pagination {
            position: absolute;
            bottom: 16px;
            right: 20px;
          }

.project_list {
	position: relative;

	.project-show {
		position: absolute;
		width: 440px;
		top: 70px;
		height: calc(100vh - 170px); 
		right: -10px;
		display: flex;
		z-index: 100;
		-webkit-transition: right 0.6s, -webkit-transform 0.6s;
        transition: right 0.6s, transform 0.6s;

        &.project-show-antimate {
        	right: -410px;
        }


		.small {
			width: 40px;
			height: 140px;
			background: #ffffff;
			margin-top: calc(100vh - 560px); 
			padding-left: 10px;
			font-size: 16px;
			padding-top: 10px;

		}
		.big {
			width: 400px;
			height: 100%;
			background: #ffffff;
			padding-left: 10px;
			padding-right: 10px;
			padding-top: 10px;

			  &-top {
			  	height: 50px;
			  	line-height: 50px;
			  	border-bottom: 1px solid #e2e2e2;
			  	font-size: 18px;

			  }

			  &-search {
			  	padding-top: 10px;
			  	height: 60px;

			  }
			  &-bottom {
			  	height: calc(100vh - 300px); 
			  }
 		}
	}
    .project_list-top {
        padding: 14px 0 14px 20px;

        border-bottom: 1px solid #e2e2e2;

        .input-select {
            margin-right: 16px;
        }
    }


    &-middle {
      padding: 10px;
      height: calc(100vh - 200px); 

      .pagination {
            position: absolute;
            bottom: 16px;
            right: 20px;
          }

    }

    &-kanban {
    	height: calc(100vh - 140px);
    	width: calc(100vw - 280px); 
    	overflow-x: scroll;
    	overflow-y: hidden;

    	.list-wrap {
    		width: 2310px;
    	}

    	.list {
    		width: 360px;
    		height: calc(100vh - 170px); 
    		margin-right: 20px;
    		border: 1px solid #e2e2e2;
    		display: inline-block;

    		&-top {
    			height: 50px;
    			line-height: 50px;
    			color: #ffffff;
    			padding-left: 16px;
    			font-size: 16px;
    			background: grey;
    		}

    		&-bottom {
    			height: calc(100vh - 220px); 
    			overflow-y: scroll;
    			padding-left: 16px;
    			padding-right: 16px;

    			&-detail {
    				margin-top: 16px;
    				height: 110px;
    				background: #ffffff;
    				border: 1px solid #e2e2e2;
    				padding: 20px 10px 10px 12px;

    				.title {
    					font-size: 20px;
    					font-weight: 600;
    				}
    				.memo {
    					font-size: 16px;
    					margin-top: 16px;
    				}

    			}
    		}
    	}


    }
}
  
</style>
