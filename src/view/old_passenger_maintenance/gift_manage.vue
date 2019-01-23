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
                    width="120"
                    label="礼品名字"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.giftName}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="建立时间"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.createTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="下架时间"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.soldOutTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
                    label="库存"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.inventory}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
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
                      {{scope.row.typeName}}
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
                    width="120"
                    label="备注"
                    >
                    <template slot-scope="scope"> 
                      {{scope.row.remark}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    width="120"
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
        </div>


        <!--分类-->
        <el-dialog
            :close-on-click-modal="false"
            :visible.sync="category.dialogVisible"
            width="580px"
            >
            <div style="position: relative;" slot="title">
                分类

                <el-button style="position: absolute;right: 40px;top: -8px;" type="primary" plain @click="gift_type_name_add" class="btninput cursor" size="small">新增分类</el-button>

                <el-button style="position: absolute;right: 160px;top: -8px;" type="primary" plain @click="gift_type_name_add_num" class="btninput cursor" size="small">批量修改</el-button>
            </div>
            <div class="category_edit">
                <el-table
                    :data="category.tablelist"
                    :header-cell-class-name="tableheaderClassName"
                    class="border-q"
                    :height="230"
                    border
                    style="width: 98%;font-size: 12px;"
                    @selection-change="handleSelectionChange"
                    > 
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        width="160"
                        label="礼品分类"
                        >
                        <template slot-scope="scope"> 
                          {{scope.row.dicName}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        width="160"
                        label="开启"
                        >
                        <template slot-scope="scope"> 
                            <el-switch @change="typeshow(scope.$index, scope.row)"
                              v-model="scope.row.show"
                              >
                            </el-switch>
                        </template>

                    </el-table-column>
                        <el-table-column
                        prop="name"
                        width="160"
                        label="操作"
                        >
                        <template slot-scope="scope"> 
                            <el-button
                              size="mini"
                              @click="handlegift_type_name_dialogEdit(scope.$index, scope.row)">编辑
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>



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
                    <span>礼品分类</span>
                    <el-input size="mini" v-model="gift_type_name_dialog.dicName" class="input-new" placeholder="请输入内容"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="gift_type_name_dialog.dialogVisible= false">取 消</el-button>
                <el-button size="small" @click="gift_type_name_add_ok" type="primary" >确 定</el-button>
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
             礼品编辑
            </span>
            <div class="edit_content">
                <div class="ul">
                    <span>礼品分类</span>
                    <el-select v-if="getpageDict.commonMap" size="mini" v-model="giftdialog.giftTypeCode" class="input-new" placeholder="请选择">
                        <el-option
                          v-for="item in typelist"
                          :key="item.dicCode"
                          :label="item.dicName"
                          :value="item.dicCode"
                          :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </div>
                <div class="ul">
                    <span>礼品名字</span>
                    <el-input size="mini" v-model="giftdialog.giftName" class="input-new" placeholder="请输入内容"></el-input>
                </div>
                <div class="ul">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;库存</span>
                    <el-input size="mini" v-model="giftdialog.inventory" class="input-new" placeholder="请输入内容"></el-input>

                    <span style="padding-left: 16px;">已使用</span>
                    <el-input size="mini" v-model="giftdialog.sendOut" class="input-new" placeholder="请输入内容"></el-input>
                </div>
                <div class="ul">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注</span>
                    <el-input size="mini" style="width:200px;" v-model="giftdialog.remark" class="input-new" placeholder="请输入内容"></el-input>
                </div>
                <div class="ul">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上架</span>
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
            editgifttype: []
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
            this.table_height = this.$refs.middle.offsetHeight - 82
        },0)

        this.gift_type_list()

        
    },
    methods:{
        typeshow(index, row) {
            let status = row.show?1:0
            this.$http.post(`giftType/show?dicCode=${row.dicCode}&status=${status}`)
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
        gift_type_list() {
            this.$http.get(`giftType/findAll`)
              .then((data)=>{
                    
                    if (data.code == '100000') {
                        let arr = data.data.filter((list) => {
                            return list.isShow == 1
                        })


                        this.typelist = arr
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
            if (!this.gift_type_name_dialog.dicName) {
                return this.$message({
                  message: "礼品分类不能为空",
                  type: 'error'
                })
                
            }
            if (this.gift_type_name_dialog.status == 'edit') {

                if (this.editgifttype.length == 0) {
                    this.$message({
                      message: '请选择你要修改的礼品分类',
                      type: 'error'
                    })
                }

             
                let editarray = []
                for (let i=0; i<this.editgifttype.length; i++) {
                    editarray.push({dicCode: this.editgifttype[i].dicCode,dicName: this.gift_type_name_dialog.dicName})
                }

               

                this.$http.post(`giftType/edit`,
                     editarray
                )
                .then((data)=>{
                    if (data.code == '100000') {
                        this.gift_type_name_dialog.dialogVisible = false
                        this.editgifttype = []
                        this.gift_type() 
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }

                    
                })

            } else {
                this.$http.post(`giftType/add`, {
                    dicName: this.gift_type_name_dialog.dicName
                })
                .then((data)=>{
                    if (data.code == '100000') {
                        this.gift_type_name_dialog.dialogVisible = false
                        this.gift_type() 
                    } else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }

                    
                })
            }
        },
        giftadd() {
            this.giftdialog.giftName = ""
            this.giftdialog.giftTypeCode = ""
            this.giftdialog.id = ""
            this.giftdialog.inventory = ""
            this.giftdialog.pictureId = ""
            this.giftdialog.remark = ""
            this.giftdialog.sendOut = ""
            this.giftdialog.status = true
            this.giftdialog.typeName = ""
            this.giftdialog.dialogVisible = true
            this.gift_type_list()
        },
        gift_type() {
            this.$http.get(`giftType/findAll`)
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
          this.get_data()
        },
        handleEdit(index, row) {
            this.giftdialog.giftName = row.giftName
            this.giftdialog.giftTypeCode = row.giftTypeCode
            this.giftdialog.id = row.id
            this.giftdialog.inventory = row.inventory
            this.giftdialog.pictureId = row.pictureId
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
            if (!this.giftdialog.giftTypeCode) {
                return this.$message({
                  message: "礼品分类不能为空",
                  type: 'error'
                })
                
            }
            if (!this.giftdialog.inventory) {
                return this.$message({
                  message: "礼品库存不能为空",
                  type: 'error'
                })
                
            }
            if (this.giftdialog.id) {
                this.$http.post(`gift/edit`, {
                    "giftName": this.giftdialog.giftName,   
                    "giftTypeCode": this.giftdialog.giftTypeCode,      
                    "id": this.giftdialog.id,          
                    "inventory": this.giftdialog.inventory,    
                    "pictureId": this.giftdialog.pictureId,      
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
                    "pictureId": this.giftdialog.pictureId,      
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
            this.$http.get(`gift/findAll?statusId=${this.statusId}`)
                .then((data)=>{
                    
                    if (data.code == '100000') {
                       this.giftdata = data.data
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

.gift_manage {
    .ul {
        margin-bottom: 22px;
        span {
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
     height: calc(100vh - 100px);
     position: relative;

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
