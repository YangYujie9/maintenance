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
                <el-button type="primary" plain @click="giftadd" class="btninput cursor" size="small">新增</el-button>
                
            </div>
            <el-table
                :data="giftdata"
                :header-cell-class-name="tableheaderClassName"
                class="border-q"
                :height="table_height"
                border
                style="width: 100%;font-size: 12px;"> 
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
                      {{scope.row.status}}
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
                      {{scope.row.typeName}}
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--增加表格lei数-->
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
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类型</span>
                    <el-select size="mini" v-model="giftdialog.giftTypeCode" class="input-new" placeholder="请选择">
                        <el-option
                          v-for="item in gifttype"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
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
                <el-button size="small" type="primary" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: "gift_manage",
    components: {
        
    },
    data(){
        return{
            giftdialog: {
                    dialogVisible: false,
                    "giftName": "礼品555555",   
                    "giftTypeCode": 4,      
                    "id": 4,          
                    "inventory": 5005555,    
                    "pictureId": 5515,      
                    "remark": "礼品备注554",  
                    "sendOut": 2050,      
                    "soldOutTime": "",     
                    "status": 1,       
            },
            gifttype: [],
            giftdata: [],
            table_height: '300',
            selectTab: [
              {
                  name: '在线礼品(0)',
                  id: '',
                  choose: true
              },
              {
                  name: '下架礼品(0)',
                  id: '0',
                  choose: false
              },
              
            ],
        }
    },
    mounted(){
        this.get_data()
        setTimeout(()=>{
            this.table_height = this.$refs.middle.offsetHeight - 82
        },0)
    },
    methods:{
        giftadd() {
            this.giftdialog.dialogVisible = true
        },
        handleClick(tab) {
          //this.searchItem.statusId = this.selectTab[tab.index].id
          
        },
        tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
        },
        get_data() {
            this.$http.post('gift/findAll')
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
.gift_manage {
    .edit_content {
        font-size: 12px;
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
