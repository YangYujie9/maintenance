<template>
    <div class="add_maintenance">
    	<el-dialog
		  title="运维需求"
		  :show-close="false"
		  :visible.sync="dialogVisible"
          :close-on-click-modal="false"
		  width="500px"
		  >
		  <span slot="title">运维需求</span>
		  <div style="font-size: 12px;" class="wrap">
		  	<p style="margin-top: 20px;">
	          <span >需求类型：</span>
	          <el-select clearable v-model="dialog.demandType" placeholder="请选择" size="mini">
	            <el-option
                    v-if="getdemand_type && getdemand_type.dicList"
	                v-for="item in getdemand_type.dicList"
	                :key="item.dicCode"
	                :label="item.dicName"
	                :value="item.dicCode">
	            </el-option>
	          </el-select>
	          
	        </p>
		  	<p style="margin-top: 20px;">
	          <span style="position: relative;top: -80px;">需求描述：</span>
	          	<el-input type="textarea"
	  			:rows="5"
	  			placeholder="请输入内容" style="display: inline-block;width: 330px;font-size: 12px;" v-model="dialog.memo" >
	  				
	  			</el-input>
	          
	        </p>
            <p style="margin-top: 20px;">
              <span >审批员工：</span>
              <el-select clearable v-model="dialog.approverId" placeholder="请选择" size="mini">
                <el-option
                    v-for="item in leader"
                    :key="item.id"
                    :label="item.staffName"
                    :value="item.id">
                </el-option>
              </el-select>
              
            </p>
            
            <p style="margin-top: 20px;">
              <span >抄&nbsp;送&nbsp;给&nbsp;：</span>
                <span v-for="list in dialog.namearray" class="circlediv">
                    {{list.name.substring(0,2)}}
                    <i @click="deletestaff(list)" class="el-icon-error delete"></i>
                </span>

            <span  @click="searchstaff" style="background: #ffffff" class="circlediv">
                <i class="el-icon-plus"></i>
                
            </span>
              
            </p>

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
                <li v-for="(list,index) in dialog.fileNamearray" style="margin-bottom: 10px;" class="el-upload-list__item is-success el-list-enter-to">
                  <a style="position: relative;" class="el-upload-list__item-name">
                    <span><i class="el-icon-document"></i><a> {{list.path}}</a></span>
                    <i @click="deleteaa(index)" style="position: absolute;right: 10px; color: red" class="el-icon-error"  ></i>
                  </a>
                </li>
              </ul>
              
            </p>
            


		  </div>

		  <span slot="footer" class="dialog-footer">
		    <el-button size="mini"  @click="$emit('close')">取 消</el-button>
		    <el-button size="mini" @click="submit" type="primary">确 定</el-button>
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
                multiple
                filterable
                size="small"
                style="width: 320px;"
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="item in options"
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
    
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
const uuidv1 = require('uuid/v1')

export default {
    name: "add_maintenance",
    components: {
        
    },
    props: {
	    dialogVisible: Boolean,
	},
    data(){
        return{
        	dialog: {
        		staffId: '',
        		demandType: '',
        		memo: '',
                approverId: '',
                msgstaff: new Set(),
                fileName: '',
                fileNamearray: [],
                filePath: '',
                fileNamepath: '',
                namearray: []
        	},
            msg: {
               dialogVisible: false, 
               staff: [],
            },
            options: [],
            loading: false,
            leader: [],
            imgloading: false
        }
    },
    watch: {
        dialogVisible(value) {
            if (value && this.leader.length == 0) {
               this.get_approver() 
            }
        }
    },
    computed: {
        ...mapGetters([
            'getpageDict',
            'getstaffVO'
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


            if (demand_type[0]) {
                return demand_type[0]
            } else {
                return []
            }


            
        },
        
    },
    mounted(){
        this.dialog.demandType = ''
        this.dialog.memo = ''
        this.dialog.approverId = ''
        this.dialog.msgstaff = new Set()
        this.dialog.namearray = []
        this.dialog.fileNamearray = []
        

    },
    methods:{
        deleteaa(index) {

          //console.info()
          let name = this.dialog.fileNamearray[index].name


          this.deletefile(this.dialog.fileNamearray[index].name,index)
         


        },
        deletefile(key,index) {
          let that = this
          this.$http.get(`qiniuyun/delete_file?fileName=${key}`) 
                 .then((data)=>{
                      that.dialog.fileNamearray.splice(index,1)
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
              this.dialog.fileNamearray.push({name:res.key,path: filestatus.file.name})
              //this.secondstep.url = res.key

              this.$message({
                message: "上传成功",
                type: 'success'
              })


              
              //this.savereource(res)
            })
        },
        addstaff() {

            
            for (let i=0; i<this.msg.staff.length; i++) {
                this.dialog.msgstaff.add(this.msg.staff[i])
            }

            this.dialog.namearray = []

            for(let i of this.dialog.msgstaff.keys()){
                let array = []
                array = i.split('-')

                this.dialog.namearray.push({name: array[1], id: array[0]})
                
            }

            this.msg.dialogVisible = false

            
            
        },
        deletestaff(list) {
            this.dialog.msgstaff.delete(`${list.id}-${list.name}`)

            this.dialog.namearray = []

            for(let i of this.dialog.msgstaff.keys()){
                let array = []
                array = i.split('-')

                this.dialog.namearray.push({name: array[1], id: array[0]})
                
            }
        },
        searchstaff() {
            this.msg.staff = []
            this.msg.dialogVisible = true
        },
        remoteMethod(query) {
            let that = this
            this.$http.get(`staff/select_staff?memo=${query}`)
            .then(function (data) {
                
                
                ///console.info(data)

                that.options = data.data

                
              })
              .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });
        },
        get_approver() {

            let that = this
           this.$http.get('staff/get_approver') 
               .then((data)=>{
                    if (data.code == '200') {
                        if (data.data.length > 0) {
                            let array = data.data.filter((list) => {
                                return list
                            })


                            that.leader = array



                        } else {
                            
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
        submit() {
            let copyStaffIds = []
            let that = this

            for(let i of this.dialog.msgstaff.keys()){
                let array = []
                array = i.split('-')

                copyStaffIds.push(array[0])

                
                
            }
            let fileName = []
            let filePath = []

            for(let i=0; i<this.dialog.fileNamearray.length; i++){
                fileName.push(this.dialog.fileNamearray[i].path)
                filePath.push(`http://hzyymy.cn/${this.dialog.fileNamearray[i].name}`)
            }



            if (this.leader.length ==0) {
                return this.$message({
                                message: '请选择审批人',
                                type: 'error'
                            });
            }
        	this.$http.post('demand/add_demand',{
        		demandType: this.dialog.demandType,
                fileName: fileName.length>0 ? fileName.join(','): '',
                filePath: filePath.length>0 ? filePath.join(','): '',
        		memo: this.dialog.memo,
                approverId: this.dialog.approverId,
                copyStaffIds: copyStaffIds.length>0 ? copyStaffIds.join(','): '',
        	})
        	.then((data)=>{
        		if (data.code == 200) {
        			this.$message({
	                    message: data.msg,
	                    type: 'success'
	                  });

        			this.$emit('close')
        			this.$store.commit('setflagdemand',true)

        		} else {
        			that.$message({
	                    message: data.msg,
	                    type: 'error'
	                  });
        		}


                this.dialog.demandType = ''
                this.dialog.memo = ''
                this.dialog.approverId = ''
                this.dialog.msgstaff = new Set()
                this.dialog.namearray = []
                this.dialog.fileNamearray = []

                this.msg.staff = []


        		

        	})
        	.catch(function (error) {
                console.log(error);
                this.$message({
                    message: '接口报错',
                    type: 'error'
                  });
              });

        }
    },
}
</script>

<style lang="less">
.el-upload-list{
      display: none;
    }
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

        .el-icon-plus {
            font-size: 24px; 
            color: #409EFF;
            position: relative;
            top: 4px;
        }



    }
    

  
</style>
