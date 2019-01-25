<template>
    <div class="active_manage">
        <div ref="middle" class="middle">
            <div class="table_change" >
                <el-tabs type="card" @tab-click="handleClick">
                    <el-tab-pane  class="item" :key="index" v-for="(list,index) in selectTab" :label="list.name" >
                        <span slot="label">{{list.name}}</span>
                    </el-tab-pane>

                </el-tabs>
            </div>
            <div class="input-cus">
                <el-button type="primary" @click="gifttypeshow" plain class="btninput cursor" size="small">分类</el-button>
                <el-button type="primary" @click="handleadd" plain  class="btninput cursor" size="small">新增</el-button>
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
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="活动分类"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.dicName}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="140"
                    label="活动名字"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.activityName}}
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
                    label="头部图片"
                    >
                    <template slot-scope="scope"> 
                      <img v-if="scope.row.headPictureIP" style="width: 60px;height: 60px;object-fit: cover;" :src="scope.row.headPictureIP"/>
                      <span v-else>没有图片</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="320"
                    label="内容图片"
                    >
                    <template slot-scope="scope"> 
                      <img v-if="scope.row.picturePOS.length>0" v-for="list in scope.row.picturePOS" style="margin-right: 10px;width: 60px;height: 60px;object-fit: cover;" :src="list.pictureRemotePath"/>
                      <span v-else>没有图片</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="160"
                    label="状态"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.statusId == 1? '上架': '下架'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="180"
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
                  :page-sizes="[10, 20, 30, 40, 50]"
                  :page-size="searchItem.size"
                  :current-page="searchItem.currentPage"
                  :total="searchItem.total">
                </el-pagination>
              </div>
            </div>

        </div>
        <!--增加表格数-->
        <el-dialog
            :close-on-click-modal="false"
            :visible.sync="giftdialog.dialogVisible"
            width="580px"
            >
            <span slot="title">
                {{giftdialog.id? '活动编辑':'活动新增'}}
            </span>
            <div class="edit_content">
                <div class="ul">
                    <span class="span">活动分类</span>
                    <el-select size="mini" v-model="giftdialog.activityTypeCode" class="input-new" placeholder="请选择">
                        <el-option
                          v-for="(item,index) in typelist"
                          :key="item.index"
                          :label="item.dicName"
                          v-show="giftdialog.id || (!giftdialog.id && !item.disabled)"
                          :value="item.dicCode"
                          :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </div>
                <div class="ul">
                    <span class="span">活动名字</span>
                    <el-input size="mini" v-model="giftdialog.activityName" class="input-new" placeholder="请输入内容"></el-input>
                </div>
                <div class="ul">
                    <span class="span">头部图片</span>
                    <el-upload
                      class="upload-demo"
                      style="display: inline"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :http-request="uploadpicture"
                      >


                      <el-button size="small" type="primary">点击上传</el-button>
                      <span style="margin-left: 10px;">只能上传1张图</span>
                    </el-upload>

                    <ul v-if="giftdialog.headimglist.length>0" style="width: 80%;max-height: 220px;overflow-y: scroll;" class="el-upload-list el-upload-list--picture">
                        <li v-for="list in giftdialog.headimglist" v-if="list.upload==true" tabindex="0" class="el-upload-list__item is-success">
                            <img :src="list.imgurl" alt="" class="el-upload-list__item-thumbnail">
                            <a class="el-upload-list__item-name">
                            <i class="el-icon-document"> 
                            </i>{{list.name}}
                            </a>
                            <label class="el-upload-list__item-status-label">
                            <i class="el-icon-upload-success el-icon-check"></i></label>
                            <i @click="deleteheaduploadlist(list.name)" class="el-icon-close"></i>
                            <i  class="el-icon-close-tip">按 delete 键可删除</i>
                        </li>

                        <li tabindex="0" v-for="list in giftdialog.headimglist" v-if="list.upload==false" class="el-upload-list__item is-uploading"><a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{list.name}}
                            </a><label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label><i class="el-icon-close"></i>
                            <i class="el-icon-close-tip">按 delete 键可删除</i>
                            <div role="progressbar" :aria-valuenow="list.progressa" aria-valuemin="0" aria-valuemax="100" class="el-progress el-progress--line">
                                <div class="el-progress-bar"><div class="el-progress-bar__outer" style="height: 2px;">
                                    <div class="el-progress-bar__inner" :style="{width: list.progressa}"></div>
                                </div></div><div class="el-progress__text" style="font-size: 12.8px;">{{list.progressa}}%</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="ul">
                    <span class="span">内容图片</span>
                    <el-upload
                      class="upload-demo"
                      style="display: inline"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :http-request="uploadpicturecontent"
                      multiple
                      >


                      <el-button size="small" type="primary">点击上传</el-button>
                      <span style="margin-left: 10px;">只能上传12张图</span>
                    </el-upload>

                    <ul v-if="giftdialog.contentimglist.length>0" style="width: 80%;max-height: 220px;overflow-y: scroll;" class="el-upload-list el-upload-list--picture">
                        <li v-for="list in giftdialog.contentimglist" v-if="list.upload==true" tabindex="0" class="el-upload-list__item is-success">
                            <img :src="list.imgurl" alt="" class="el-upload-list__item-thumbnail">
                            <a class="el-upload-list__item-name">
                            <i class="el-icon-document"> 
                            </i>{{list.name}}
                            </a>
                            <label class="el-upload-list__item-status-label">
                            <i class="el-icon-upload-success el-icon-check"></i></label>
                            <i @click="deletecontentuploadlist(list.name)" class="el-icon-close"></i>
                            <i  class="el-icon-close-tip">按 delete 键可删除</i>
                        </li>

                        <li tabindex="0" v-for="list in giftdialog.contentimglist" v-if="list.upload==false" class="el-upload-list__item is-uploading"><a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{list.name}}
                            </a><label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check"></i></label><i class="el-icon-close"></i>
                            <i class="el-icon-close-tip">按 delete 键可删除</i>
                            <div role="progressbar" :aria-valuenow="list.progressa" aria-valuemin="0" aria-valuemax="100" class="el-progress el-progress--line">
                                <div class="el-progress-bar"><div class="el-progress-bar__outer" style="height: 2px;">
                                    <div class="el-progress-bar__inner" :style="{width: list.progressa}"></div>
                                </div></div><div class="el-progress__text" style="font-size: 12.8px;">{{list.progressa}}%</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="ul">
                    <span class="span">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间</span>
                    <!--连级时间-->
                    <el-date-picker
                        v-model="giftdialog.putawayTime" 
                        class="widthtwo"
                        size="mini"
                        type="datetime"
                        placeholder="选择日期时间">
                      </el-date-picker>
                      -
                    <el-date-picker
                        v-model="giftdialog.soldOutTime"
                        class="widthtwo"
                        size="mini"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
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
        <el-dialog
            :close-on-click-modal="false"
            :visible.sync="category.dialogVisible"
            width="480px"
            >
            <div style="position: relative;" slot="title">
                分类

                <el-button @click="gift_type_name_add"  style="position: absolute;right: 40px;top: -8px;" type="primary" plain  class="btninput cursor" size="small">新增分类</el-button>

                
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
                新增分类
            </div>
            <div class="gift_type_name_dialog_class">
                <div class="ul">
                    <span>活动分类</span>
                    <el-input size="mini" v-model="gift_type_name_dialog.dicName" class="input-new" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="gift_type_name_dialog.dialogVisible= false">取 消</el-button>
                <el-button size="small" @click="gift_and_activity_type_add"  type="primary" >确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import axios from 'axios'


export default {
    name: "active_manage",
    components: {
        
    },
    data(){
        return{
            category: {
                dialogVisible: false,
                tablelist: [],
            },
            gift_type_name_dialog: {
                dialogVisible: false,
                dicName: '',
                dicCode: '',
                status: 'add'
            },
            searchItem: {
                size: 10,
                currentPage: 1,
                total: 10
            },
            statusId: '1',
            giftdata: [],
            table_height: '300',
            typelist: [],
            giftdialog: {
                dialogVisible: false,
                activityName: '',
                activityTypeCode: '',      
                soldOutTime: new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1),                       
                putawayTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
                id: '',
                remark: '',
                status: true, 
                headimglist: [], 
                contentimglist: []     
            },
            editgifttype: [],
            selectTab: [
              {
                  name: '在线活动(0)',
                  id: 1,
                  choose: true
              },
              {
                  name: '下架活动(0)',
                  id: 0,
                  choose: false
              },
              
            ],
        }
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
        deleteheaduploadlist(name) {

            let j=0
            for (let i=0; i<this.giftdialog.headimglist.length; i++) {
                if (this.giftdialog.headimglist[i].name == name) {
                    j=i 
                    break
                }
            }

            this.giftdialog.headimglist.splice(j,1)


        },
        handleSizeChange(val) {
          this.searchItem.size = val
          this.searchItem.currentPage = 0
          this.get_data()
        },
        handleCurrentChange(val) {
          this.searchItem.currentPage = val
          this.get_data()
        },
        deletecontentuploadlist(name) {

            let j=0
            for (let i=0; i<this.giftdialog.contentimglist.length; i++) {
                if (this.giftdialog.contentimglist[i].name == name) {
                    j=i 
                    break
                }
            }

            this.giftdialog.contentimglist.splice(j,1)


        },
        handleClick(tab) {
          this.statusId = this.selectTab[tab.index].id
          this.get_data()
        },
        async uploadpicturecontent(filestatus) {

            if (this.giftdialog.contentimglist.length>12) {
                return this.$message({
                      message: "只能上传12张图，请删除之后再上传",
                      type: 'success'
                    })
            }

            let ext = filestatus.file.name.substr(filestatus.file.name.lastIndexOf(".")+1)
            

            this.giftdialog.contentimglist.push({progressa: 0,name: filestatus.file.name,upload:false, imgurl: '',imguploadname: ''})

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

                    let dlItem = that.giftdialog.contentimglist.find((item) => {
                        return item.name === filestatus.file.name
                    })

                    

                    let precent = (a.loaded / a.total).toFixed(2)
                    console.info(precent)
                    //filestatus.progressa = precent
                    dlItem.progressa = precent * 100
                    
                    

                },
            }).then((res) => {
                //console.info(res)
                //res.fileName = filestatus.newfile.name

                if (!res) {
                    let dlItem = that.giftdialog.contentimglist.find((item) => {
                        return item.name === filestatus.file.name
                    })

                    dlItem.upload = true
                    dlItem.imgurl = `${uploadobj.host}/${uploadobj.key}.${ext}`
                    dlItem.imguploadname = `${uploadobj.host}/${uploadobj.key}.${ext}`


                } else {
                    this.$message({
                      message: "图片上传失败",
                      type: 'success'
                    })
                }

                

            })
            
        },
        async uploadpicture(filestatus) {

            if (this.giftdialog.headimglist.length>0) {
                return this.$message({
                      message: "已经有图片，请删除之后再上传",
                      type: 'success'
                    })
            }

            let ext = filestatus.file.name.substr(filestatus.file.name.lastIndexOf(".")+1)
            

            this.giftdialog.headimglist.push({progressa: 0,name: filestatus.file.name,upload:false, imgurl: '',imguploadname: ''})

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

                    let dlItem = that.giftdialog.headimglist.find((item) => {
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
                    let dlItem = that.giftdialog.headimglist.find((item) => {
                        return item.name === filestatus.file.name
                    })

                    dlItem.upload = true
                    dlItem.imgurl = `${uploadobj.host}/${uploadobj.key}.${ext}`
                    dlItem.imguploadname = `${uploadobj.host}/${uploadobj.key}.${ext}`


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
            this.$http.post(`gift_and_activity_type/show?dicCode=${row.dicCode}&status=${status}&dicType=activity_type`)
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
        tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
        },
        gifttypeshow() {
            this.category.dialogVisible = true
        },
        gift_type_list() {
            this.$http.get(`gift_and_activity_type/find_all?dicType=activity_type`)
              .then((data)=>{
                    
                    if (data.code == '100000') {
                        

                        for (let i=0; i<data.data.length; i++) {
                            data.data[i].disabled = data.data[i].isShow == 1? false: true
                        }


                        this.typelist = data.data
                    }
                })  
        },
        gift_type_name_add_num() {
            this.gift_type_name_dialog.dialogVisible = true
            this.gift_type_name_dialog.dicName = ''
            this.gift_type_name_dialog.dicCode = ''
            this.gift_type_name_dialog.status = 'edit'
        },
        handleEdit(index, row) {
            
            this.giftdialog.activityName =row.activityName 
            this.giftdialog.id =row.id 
            this.giftdialog.soldOutTime =row.soldOutTime 
            this.giftdialog.putawayTime =row.putawayTime 
            this.giftdialog.remark =row.remark
            this.giftdialog.headimglist = []
            if (row.headPictureIP) {
                this.giftdialog.headimglist.push({progressa: 100,name: row.headPictureIP,upload:true, imgurl: row.headPictureIP, imguploadname: row.headPictureIP})
            } else {
                this.giftdialog.headimglist = []
            }

            this.giftdialog.contentimglist = []

            if (row.picturePOS.length>0) {
                for (let i=0;i<row.picturePOS.length;i++) {
                   this.giftdialog.contentimglist.push({progressa: 100,name: row.picturePOS[i].pictureRemotePath,upload:true, imgurl: row.picturePOS[i].pictureRemotePath, imguploadname: row.picturePOS[i].pictureRemotePath}) 
                }
                
            } else {
                this.giftdialog.contentimglist = []
            }

            this.giftdialog.activityTypeCode =row.activityTypeCode
            this.giftdialog.status = row.statusId == 1 ? true:false 
            this.gift_type_list()
            
            this.giftdialog.dialogVisible = true
        },
        gifttypeshow() {
            this.category.dialogVisible = true
            this.gift_type()
        },
        gift_type_name_add_ok() {
            
                let editarray = []
                for (let i=0; i<this.category.tablelist.length; i++) {
                    editarray.push({dicCode: this.category.tablelist[i].dicCode,dicName: this.category.tablelist[i].dicName, dicType: "activity_type"})
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
            if (!this.gift_type_name_dialog.dicName) {
                return this.$message({
                  message: "分类名字不能为空",
                  type: 'error'
                })
                
            }
            this.$http.post(`gift_and_activity_type/add`, {
                    dicName: this.gift_type_name_dialog.dicName,
                    dicType: 'activity_type'
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
        handleSelectionChange(val) {
            this.editgifttype = val
        },
        gift_type_name_add() {
            this.gift_type_name_dialog.dialogVisible = true
            this.gift_type_name_dialog.dicName = ''
            this.gift_type_name_dialog.dicCode = ''
            this.gift_type_name_dialog.status = 'add'
        },
        gift_type() {
            this.$http.get(`gift_and_activity_type/find_all?dicType=activity_type`)
              .then((data)=>{
                    
                    if (data.code == '100000') {
                        for (let i=0; i<data.data.length; i++) {

                            data.data[i].show=data.data[i].isShow == 1? true: false
                        }
                        this.category.tablelist = data.data
                    }
                })  
        },
        //上架
        gift_count_1() {
            this.$http.get(`activity/count?status=1`)
                .then((data)=>{
                    
                    if (data.code == '100000') {
                        
                        this.selectTab[0].name = `在线活动(${data.data})`
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }
                })
        },
        gift_count_0() {
            this.$http.get(`activity/count?status=0`)
                .then((data)=>{
                    
                    if (data.code == '100000') {
                        this.selectTab[1].name = `下架活动(${data.data})`
                       
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }
                })
        },
        handleadd() {
            
            this.giftdialog.activityName =""
            this.giftdialog.id =""
            this.giftdialog.soldOutTime =""
            this.giftdialog.putawayTime =""
            this.giftdialog.remark =""
            this.giftdialog.activityTypeCode =""
            this.giftdialog.headimglist = []
            this.giftdialog.contentimglist = []

            this.giftdialog.status = true
            this.gift_type_list()
            
            this.giftdialog.dialogVisible = true

        },
        edit_ok() {
            if (!this.giftdialog.activityName) {
                return this.$message({
                  message: "活动名字不能为空",
                  type: 'warning'
                })

            }
            if (!this.giftdialog.activityTypeCode) {
                return this.$message({
                  message: "活动分类不能为空",
                  type: 'warning'
                })
                
            }


            let dlItem = this.giftdialog.headimglist.find((item) => {
                return !item.upload
            })

            if (dlItem) {
                return this.$message({
                  message: "图片没有上传完，稍后再保存",
                  type: 'warning'
                })
            }

            let headPictureIP = ''
            if (this.giftdialog.headimglist.length>0) {
                headPictureIP=this.giftdialog.headimglist[0].imgurl
            }



            let dlItemcontentimg = this.giftdialog.contentimglist.find((item) => {
                return !item.upload
            })

            if (dlItemcontentimg) {
                return this.$message({
                  message: "图片没有上传完，稍后再保存",
                  type: 'warning'
                })
            }

            let contentPictureip = []
            if (this.giftdialog.contentimglist.length>0) {
                for (let i=0;i<this.giftdialog.contentimglist.length;i++) {
                    contentPictureip.push(this.giftdialog.contentimglist[i].imgurl)
                }

                
            }


            


            if (!this.giftdialog.putawayTime) {
                return this.$message({
                  message: "上架时间不能为空",
                  type: 'warning'
                })
                
            }
            if (!this.giftdialog.soldOutTime) {
                return this.$message({
                  message: "下架时间不能为空",
                  type: 'warning'
                })
                
            }
            
            if (this.giftdialog.id) {
                this.$http.post(`activity/edit`, {
                    "activityTypeCode": this.giftdialog.activityTypeCode,   
                    "activityName": this.giftdialog.activityName, 
                    "id": this.giftdialog.id,  
                    headPictureIP: headPictureIP, 
                    contentPictureip: contentPictureip,   
                    "putawayTime": new Date(this.giftdialog.putawayTime).getTime()/1000,    
                    "soldOutTime": new Date(this.giftdialog.soldOutTime).getTime()/1000,  
                    "remark": this.giftdialog.remark,  
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
                this.$http.post(`activity/add`, {
                    "activityTypeCode": this.giftdialog.activityTypeCode, 
                    headPictureIP: headPictureIP,      
                    "activityName": this.giftdialog.activityName,
                    contentPictureip: contentPictureip,         
                    "putawayTime": new Date(this.giftdialog.putawayTime).getTime()/1000,    
                    "soldOutTime": new Date(this.giftdialog.soldOutTime).getTime()/1000,    
                    "remark": this.giftdialog.remark,  
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
                        
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }
                })
            }
        },
        get_data() {
            this.$http.get(`activity/find_all?status=${this.statusId}&pageNum=${this.searchItem.currentPage}&pageSize=${this.searchItem.size}`)
                .then((data)=>{
                    
                    if (data.code == '100000') {
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


.el-table .table-head-th{
    background-color:#f4f4f4;
    color: #000;
    padding: 6px 0;
}

.upload-demo .el-upload-list {
    display: none;
}
.active_manage {
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
