<template>
    <div class="gift_manage">
    	<div ref="middle" class="middle">
            <div class="table_change" >
                <el-tabs type="card" @tab-click="handleClick">
                    <el-tab-pane  class="item" :key="index" v-for="(list,index) in selectTab" :label="list.name" >
                        <span slot="label">{{list.name}}</span>
                    </el-tab-pane>

                </el-tabs>


            </div>
            <div class="input-cus">
                <el-button type="primary" plain @click="gifttypeshow" class="btninput cursor" size="small">分类</el-button>
                <el-button type="primary" plain  @click="giftadd" class="btninput cursor" size="small">新增</el-button>
            </div>
            <el-table
                :data="giftdata"
                :header-cell-class-name="tableheaderClassName"
                class="border-q"
                :height="table_height"
                border
                style="width: 100%;font-size: 12px;"> 
                <el-table-column
                  type="index"
                  label="编号"
                  width="50">
                    <template slot-scope="scope"> 
                      {{scope.row.indexi}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="礼品分类"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.typeName}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="140"
                    label="礼品名字"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.giftName}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="160"
                    label="建立时间"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.createTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="160"
                    label="下架时间"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.soldOutTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="100"
                    label="库存"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.inventory}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="100"
                    label="送出"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.sendOut}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="图片"
                    >
                    <template slot-scope="scope"> 
                      <img v-if="scope.row.pictureIP" style="width: 60px;height: 60px;object-fit: cover;" :src="scope.row.pictureIP"/>
                      <span v-else>没有图片</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="状态"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.statusId == 1? '上架': '下架'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="160"
                    label="备注"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.remark}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    
                    label="操作"
                    >
                    <template slot-scope="scope"> 
                        <el-button
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="lan">
              

              <div class="block-a">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  layout="total,sizes, prev, pager, next"
                  :page-sizes="[10,20, 30, 40, 50]"
                  :page-size="searchItem.size"
                  :current-page="searchItem.currentPage"
                  :total="searchItem.total">
                </el-pagination>
              </div>
            </div>
        </div>


        <!--分类-->
        <el-dialog
            :close-on-click-modal="false"
            :visible.sync="category.dialogVisible"
            width="480px"
            >
            <div style="position: relative;" slot="title">
                分类

                <el-button style="position: absolute;right: 40px;top: -8px;" type="primary" plain @click="gift_type_name_add" class="btninput cursor" size="small">新增分类</el-button>

                
            </div>
            <div class="category_edit">
                <el-table
                    :data="category.tablelist"
                    :header-cell-class-name="tableheaderClassName"
                    class="border-q"
                    :height="230"
                    border
                    style="width: 98%;font-size: 12px;"
                    
                    > 
                   
                    <el-table-column
                        prop="name"
                        width="220"
                        label="礼品分类"
                        >
                        <template slot-scope="scope"> 
                            <div>
                                <el-input size="mini" v-model="scope.row.dicName" class="input-new" placeholder="请输入内容"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        width="220"
                        label="开启"
                        >
                        <template slot-scope="scope"> 
                            <el-switch @change="typeshow(scope.$index, scope.row)"
                              v-model="scope.row.show"
                              >
                            </el-switch>
                        </template>

                    </el-table-column>
                    
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="category.dialogVisible= false">取 消</el-button>
                <el-button size="small" @click="gift_type_name_add_ok" type="primary" >保存</el-button>
            </span>


        </el-dialog>
        <el-dialog
            :close-on-click-modal="false"
            :visible.sync="gift_type_name_dialog.dialogVisible"
            width="380px"
            >
            <div slot="title">
                编辑分类
            </div>
            <div class="gift_type_name_dialog_class">
                <div class="ul">
                    <span class="span">礼品分类</span>
                    <el-input size="mini" v-model="gift_type_name_dialog.dicName" class="input-new" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="gift_type_name_dialog.dialogVisible= false">取 消</el-button>
                <el-button size="small" @click="gift_and_activity_type_add" type="primary" >确 定</el-button>
            </span>
        </el-dialog>


        <!--分类-->
        <!--增加表格数-->
        <el-dialog
            :close-on-click-modal="false"
            :visible.sync="giftdialog.dialogVisible"
            width="580px"
            >
            <span slot="title">
             {{giftdialog.id? '礼品编辑':'礼品新增'}}
            </span>
            <div class="edit_content">
                <div class="ul">
                    <span class="span">礼品分类</span>
                    <el-select v-if="getpageDict.commonMap" size="mini" v-model="giftdialog.giftTypeCode" class="input-new" placeholder="请选择">
                        <el-option
                          v-for="item in typelist"
                          :key="item.dicCode"
                          :label="item.dicName"
                          v-show="giftdialog.id || (!giftdialog.id && !item.disabled)"
                          :value="item.dicCode"
                          :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </div>
                <div class="ul">
                    <span class="span">礼品名字</span>
                    <el-input size="mini" v-model="giftdialog.giftName" class="input-new" placeholder="请输入内容"></el-input>
                </div>
                <div class="ul">
                    <span class="span">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图片</span>
                    <el-upload
                      class="upload-demo"
                      style="display: inline"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :http-request="uploadpicture"
                      >


                      <el-button size="small" type="primary">点击上传</el-button>
                      <span style="margin-left: 10px;">只能上传1张图</span>
                    </el-upload>

                    <ul v-show="giftdialog.progressa>0" style="display: block;" class="el-upload-list el-upload-list--text">
                        <li style="margin-bottom: 10px;" class="el-upload-list__item is-success el-list-enter-to">
                            <a class="el-upload-list__item-name"><i class="el-icon-document"></i>
                                {{giftdialog.filename}}
                            </a>
                            <div style="padding-left: 0px;">
                                <el-progress style="padding-left: 10px;width: 90%;" :percentage="giftdialog.progressa"></el-progress>
                            </div>
                        </li>
                    </ul>

                    <ul v-if="giftdialog.uploadlist.length>0" style="width: 80%;max-height: 220px;overflow-y: scroll;" class="el-upload-list el-upload-list--picture">
                        <li v-for="list in giftdialog.uploadlist" v-if="list.upload==true" tabindex="0" class="el-upload-list__item is-success">
                            <img :src="list.imgurl" alt="" class="el-upload-list__item-thumbnail">
                            <a class="el-upload-list__item-name">
                            <i class="el-icon-document"> 
                            </i>{{list.name}}
                            </a>
                            <label class="el-upload-list__item-status-label">
                            <i class="el-icon-upload-success el-icon-check"></i></label>
                            <i @click="deleteuploadlist(list.name)" class="el-icon-close"></i>
                            <i  class="el-icon-close-tip">按 delete 键可删除</i><!----><!---->
                        </li>

                        <li tabindex="0" v-for="list in giftdialog.uploadlist" v-if="list.upload==false" class="el-upload-list__item is-uploading"><!----><a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{list.name}}
                            </a><label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label><i class="el-icon-close"></i>
                            <i class="el-icon-close-tip">按 delete 键可删除</i>
                            <div role="progressbar" :aria-valuenow="list.progressa" aria-valuemin="0" aria-valuemax="100" class="el-progress el-progress--line">
                                <div class="el-progress-bar"><div class="el-progress-bar__outer" style="height: 2px;">
                                    <div class="el-progress-bar__inner" :style="{width: list.progressa}"><!----></div>
                                </div></div><div class="el-progress__text" style="font-size: 12.8px;">{{list.progressa}}%</div>
                            </div><!---->
                        </li>
                    </ul>
                </div>
                <div class="ul">
                    <span class="span">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;库存</span>
                    <el-input type="number" size="mini" v-model="giftdialog.inventory" class="input-new" placeholder="请输入内容"></el-input>

                    <span class="span" style="padding-left: 16px;">已使用</span>
                    <el-input type="number"  size="mini" v-model="giftdialog.sendOut" class="input-new" placeholder="请输入内容"></el-input>
                </div>
                <div class="ul">
                    <span class="span">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注</span>
                    <el-input size="mini" style="width:200px;" v-model="giftdialog.remark" class="input-new" placeholder="请输入内容"></el-input>
                </div>
                <div class="ul">
                    <span class="span">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上架</span>
                    <el-switch
                      v-model="giftdialog.status"
                      active-color="#13ce66"
                      inactive-color="#ff4949">
                    </el-switch>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="giftdialog.dialogVisible= false">取 消</el-button>
                <el-button size="small" @click="edit_ok" type="primary" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "gift_manage",
    components: {
        
    },
    data(){
        return{
            giftdialog: {
                dialogVisible: false,
                "giftName": "",   
                "giftTypeCode": '',      
                "id": '',          
                "inventory": '',    
                "pictureId": '',      
                "remark": "",  
                "sendOut": '',      
                "soldOutTime": "",     
                "status": true,
                uploadlist: [],     
            },
            gift_type_name_dialog: {
                dialogVisible: false,
                dicName: '',
                dicCode: '',
                status: 'add'
            },
            category: {
                dialogVisible: false,
                tablelist: [],
            },
            typelist: [],
            gifttype: [],
            giftdata: [],
            searchItem: {
                size: 10,
                currentPage: 1,
                total: 10
            },
            table_height: '300',
            statusId: '1',
            selectTab: [
              {
                  name: '在线礼品(0)',
                  id: 1,
                  choose: true
              },
              {
                  name: '下架礼品(0)',
                  id: 0,
                  choose: false
              },
              
            ],
            

        }
    },
    computed: {
        ...mapGetters([
            'getpageDict',
        ]),
    },
    mounted(){
        this.get_data()
        this.gift_count_1()
        this.gift_count_0()
        setTimeout(()=>{
            this.table_height = this.$refs.middle.offsetHeight - 122
        },0)

        this.gift_type_list()

        
    },
    methods:{
        deleteuploadlist(name) {

            let j=0
            for (let i=0; i<this.giftdialog.uploadlist.length; i++) {
                if (this.giftdialog.uploadlist[i].name == name) {
                    j=i 
                    break
                }
            }

            this.giftdialog.uploadlist.splice(j,1)


        },
        handleSizeChange(val) {
          this.searchItem.size = val
          this.searchItem.currentPage =1
          this.get_data()
        },
        handleCurrentChange(val) {
          this.searchItem.currentPage = val
          this.get_data()
        },
        async uploadpicture(filestatus) {

            if (this.giftdialog.uploadlist.length>0) {
                return this.$message({
                      message: "已经有图片，请删除之后再上传",
                      type: 'success'
                    })
            }

            let ext= filestatus.file.name.substr(filestatus.file.name.lastIndexOf(".")+1)
            

            this.giftdialog.uploadlist.push({progressa: 0,name: filestatus.file.name,upload:false, imgurl: '',imguploadname: ''})

            let uploadobj = await this.get_policy()
            let that = this

            
            const formData = new FormData()
            formData.append('key', `${uploadobj.key}.${ext}`)
            formData.append('signature', uploadobj.signature)
            formData.append('OSSAccessKeyId', uploadobj.accessid)
            formData.append('success_action_status', 200)
            formData.append('policy', uploadobj.policy)
            formData.append('file', filestatus.file)

            this.$http({
                url:  `https://crm-jupiter.oss-cn-hangzhou.aliyuncs.com`,
                method: 'POST',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress (a){

                    let dlItem = that.giftdialog.uploadlist.find((item) => {
                        return item.name === filestatus.file.name
                    })

                    

                    let precent = (a.loaded / a.total).toFixed(2)
                    //filestatus.progressa = precent
                    dlItem.progressa = precent * 100
                    
                    

                },
            }).then((res) => {
                //console.info(res)
                //res.fileName = filestatus.newfile.name

                if (!res) {
                    let dlItem = that.giftdialog.uploadlist.find((item) => {
                        return item.name === filestatus.file.name
                    })

                    dlItem.upload = true
                    dlItem.imgurl = `${uploadobj.host}/${uploadobj.key}.${ext}`
                    dlItem.imguploadname = `${uploadobj.host}/${uploadobj.key}.${ext}`


                    this.giftdialog.pictureId = `${uploadobj.host}/${uploadobj.key}.${ext}`
                } else {
                    this.$message({
                      message: "图片上传失败",
                      type: 'success'
                    })
                }

                

            })
            
        },
        get_policy() {
            return new Promise((resolve, reject) => {
                this.$http.get(`oss/get_policy`)
                    .then((data)=>{
                        resolve(data.data)
                    })
            })
            
        },
        typeshow(index, row) {
            let status = row.show?1:0
            this.$http.post(`gift_and_activity_type/show?dicCode=${row.dicCode}&status=${status}&dicType=gift_type`)
            .then((data)=>{
                if (data.code == '100000') {
                    this.$message({
                      message: "操作成功",
                      type: 'success'
                    })
                    this.gift_type() 
                } else {
                    this.$message({
                      message: data.msg,
                      type: 'error'
                    })
                }
            })
        },
        gift_type_list(status) {
            this.$http.get(`gift_and_activity_type/find_all?dicType=gift_type`)
              .then((data)=>{
                    
                    if (data.code == '100000') {
                        for (let i=0; i<data.data.length; i++) {

                            data.data[i].disabled = data.data[i].isShow == 1? false: true
                        }

                        this.typelist = data.data
                    }
                })  
        },
        gift_type_name_add() {
            this.gift_type_name_dialog.dialogVisible = true
            this.gift_type_name_dialog.dicName = ''
            this.gift_type_name_dialog.dicCode = ''
            this.gift_type_name_dialog.status = 'add'
        },
        gift_type_name_add_num() {
            this.gift_type_name_dialog.dialogVisible = true
            this.gift_type_name_dialog.dicName = ''
            this.gift_type_name_dialog.dicCode = ''
            this.gift_type_name_dialog.status = 'edit'
        },
        gifttypeshow() {
            this.category.dialogVisible = true
            this.gift_type()
        },
        handleSelectionChange(val) {
            this.editgifttype = val

        },
        handlegift_type_name_dialogEdit(index,row) {
            this.gift_type_name_dialog.dialogVisible = true
            this.gift_type_name_dialog.dicName = row.dicName
            this.gift_type_name_dialog.dicCode = row.dicCode
            this.gift_type_name_dialog.status = 'edit'
            this.editgifttype = []
            this.editgifttype.push(row)

        },
        gift_type_name_add_ok() {
            let editarray = []
                for (let i=0; i<this.category.tablelist.length; i++) {
                    editarray.push({dicCode: this.category.tablelist[i].dicCode,dicName: this.category.tablelist[i].dicName, dicType: "gift_type"})
                }


                if (editarray.length == 0) {
                    return this.$message({
                      message: '请输入您要保存的分类',
                      type: 'error'
                    })
                }

                this.$http.post(`gift_and_activity_type/edit`,
                     editarray
                )
                .then((data)=>{
                    if (data.code == '100000') {
                        this.$message({
                          message: data.msg,
                          type: 'success'
                        })

                        this.editgifttype = []
                        this.gift_type() 
                        this.category.dialogVisible= false
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }

                    
                })
        },
        gift_and_activity_type_add() {
            if (this.gift_type_name_dialog.uploadimg) {
                return this.$message({
                  message: "图片正在上传中",
                  type: 'error'
                })
                
            }
            this.$http.post(`gift_and_activity_type/add`, {
                    dicName: this.gift_type_name_dialog.dicName,
                    dicType: 'gift_type'
                })
                .then((data)=>{
                    if (data.code == '100000') {
                        this.$message({
                          message: data.msg,
                          type: 'success'
                        })
                        this.gift_type_name_dialog.dialogVisible = false
                        this.gift_type() 
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }

                    
                })
        },
        giftadd() {
            this.giftdialog.giftName = ""
            this.giftdialog.giftTypeCode = ""
            this.giftdialog.id = ""
            this.giftdialog.inventory = ""
            this.giftdialog.pictureId = ""
            this.giftdialog.uploadlist = []
            this.giftdialog.remark = ""
            this.giftdialog.sendOut = ""
            this.giftdialog.status = true
            this.giftdialog.typeName = ""
            this.giftdialog.dialogVisible = true
            this.gift_type_list()
        },
        gift_type() {
            this.$http.get(`gift_and_activity_type/find_all?dicType=gift_type`)
              .then((data)=>{
                    
                    if (data.code == '100000') {
                        for (let i=0; i<data.data.length; i++) {

                            data.data[i].show=data.data[i].isShow == 1? true: false
                        }
                        this.category.tablelist = data.data
                    }
                })  
        },
        handleClick(tab) {
          this.statusId = this.selectTab[tab.index].id

          this.searchItem.currentPage = 1
          this.get_data()
        },
        handleEdit(index, row) {
            this.giftdialog.giftName = row.giftName
            this.giftdialog.giftTypeCode = row.giftTypeCode
            this.giftdialog.id = row.id
            this.giftdialog.inventory = row.inventory
            this.giftdialog.pictureIp = row.pictureIP
            this.giftdialog.uploadlist = []
            if (row.pictureIP) {
                this.giftdialog.uploadlist.push({progressa: 100,name: row.pictureIP,upload:true, imgurl: row.pictureIP, imguploadname: row.pictureIP})
            } else {
                this.giftdialog.uploadlist = []
            }
            
            this.giftdialog.remark = row.remark
            this.giftdialog.sendOut = row.sendOut
            this.giftdialog.status = row.statusId == 1 ? true:false
            this.giftdialog.typeName = row.typeName

            this.giftdialog.dialogVisible = true
        },
        tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
        },
        edit_ok() {
            if (!this.giftdialog.giftName) {
                return this.$message({
                  message: "礼品名字不能为空",
                  type: 'error'
                })

            }
            

            let dlItem = this.giftdialog.uploadlist.find((item) => {
                return !item.upload
            })

            if (dlItem) {
                return this.$message({
                  message: "图片没有上传完，稍后再保存",
                  type: 'error'
                })
            }

            let pictureId = ''
            if (this.giftdialog.uploadlist.length>0) {
                pictureId=this.giftdialog.uploadlist[0].imgurl
            }
            if (!this.giftdialog.giftTypeCode) {
                return this.$message({
                  message: "礼品分类不能为空",
                  type: 'warning'
                })
                
            }

            if (!this.giftdialog.giftTypeCode) {
                return this.$message({
                  message: "礼品分类不能为空",
                  type: 'warning'
                })
                
            }


            if (!this.giftdialog.inventory || (this.giftdialog.inventory && !(/^\d+$/.test(this.giftdialog.inventory)))) {
                return this.$message({
                  message: "输入正确的礼品库存",
                  type: 'warning'
                })
                
            }
            if (this.giftdialog.sendOut && !(/^\d+$/.test(this.giftdialog.sendOut))) {
                return this.$message({
                  message: "输入正确的送出礼品",
                  type: 'warning'
                })
                
            }

            if (this.giftdialog.id) {
                this.$http.post(`gift/edit`, {
                    "giftName": this.giftdialog.giftName,   
                    "giftTypeCode": this.giftdialog.giftTypeCode,      
                    "id": this.giftdialog.id,          
                    "inventory": this.giftdialog.inventory,    
                    "pictureIP": pictureId,  
                    "remark": this.giftdialog.remark,  
                    "sendOut": this.giftdialog.sendOut,      
                    "statusId": this.giftdialog.status? 1:0,  
                })
                .then((data)=>{
                    
                    if (data.code == '100000') {
                        this.$message({
                          message: data.msg,
                          type: 'success'
                        })
                        
                        this.giftdialog.dialogVisible = false
                        this.get_data()
                        this.gift_count_1()
                        this.gift_count_0()
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }
                })
            } else {

                
                this.$http.post(`gift/add`, {
                    "giftName": this.giftdialog.giftName,   
                    "giftTypeCode": this.giftdialog.giftTypeCode,      
                    "inventory": this.giftdialog.inventory,    
                    "pictureIP": pictureId,      
                    "remark": this.giftdialog.remark,  
                    sendOut: this.giftdialog.sendOut, 
                    "statusId": this.giftdialog.status? 1:0,  
                })
                .then((data)=>{
                    if (data.code == '100000') {
                        this.$message({
                          message: data.msg,
                          type: 'success'
                        })
                        
                        this.giftdialog.dialogVisible = false
                        this.get_data()
                        this.gift_count_1()
                        this.gift_count_0()
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }
                })
            }
            
            
        },
        //上架
        gift_count_1() {
            this.$http.get(`gift/count?statusId=1`)
                .then((data)=>{
                    
                    if (data.code == '100000') {
                        this.selectTab[0].name = `在线礼品(${data.data})`
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }
                })
        },
        gift_count_0() {
            this.$http.get(`gift/count?statusId=0`)
                .then((data)=>{
                    
                    if (data.code == '100000') {
                        this.selectTab[1].name = `下架礼品(${data.data})`
                       
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }
                })
        },
        get_data() {
            this.$http.get(`gift/find_all?statusId=${this.statusId}&pageNum=${this.searchItem.currentPage}&pageSize=${this.searchItem.size}`)
                .then((data)=>{
                    
                    if (data.code == '100000') {
                        for (let i=0; i<data.data.list.length; i++) {
                            //console.info(999)
                            data.data.list[i].indexi=(this.searchItem.currentPage-1)*this.searchItem.size+i+1
                        }
                        this.giftdata = data.data.list
                        this.searchItem.total = data.data.total
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
.gift_type_name_dialog_class {

}
.el-table .table-head-th{
    background-color:#f4f4f4;
    color: #000;
    padding: 6px 0;
}

.upload-demo .el-upload-list {
    display: none;
}

.gift_manage {
    .ul {
        margin-bottom: 22px;
        .span {
            padding-right: 16px;
        }

        .input-new {
            display: inline-block;
            width: 160px;
        }
    }
    .edit_content {
        font-size: 12px;
        
    }
    .middle {
     padding: 20px 16px 10px 16px;
     height: calc(100vh - 80px);
     position: relative;

     .lan {
        position: absolute;
        bottom: 0px;
        right: 0px;
        left: 0px;
        height: 48px;
        background: #f4f4f4;;
        line-height: 48px;
        padding-left: 30px;
        font-size: 12px;


        .block-a {
          position: absolute;
          right: 16px;
          bottom: -10px;
          top: 8px;
          

        }

        

      }

     .input-cus {
        position: absolute;
        right: 20px;
        top: 16px;


        .btninput {
            padding: 7px 24px !important;

            .el-button:hover {
              background: #0057ff;
              color: #ffffff;
            }
            
        }
      }

   }
}
  
</style>
