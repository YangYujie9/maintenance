<template>
    <div class="apartment">
        <div class="apartment-left">
            <div class="apartment-left-top">
                <el-button size="small" @click="addrole.dialogVisible = true" style="width: 200px;" type="primary">新增角色</el-button>



            </div>
            <div class="apartment-left-bottom">
                <el-menu
                  class="el-menu-vertical-demo"
                  > 
                  
                    <el-menu-item @click.native.stop="show_detail(list)" :key="listindex" v-for="(list,listindex) in leftdata" :index="list.roleName">
                        {{list.roleName}}
                
                    </el-menu-item>
                </el-menu>
            </div>
            
        </div>
        <div class="apartment-right">
            <div class="apartment-right-top">
                <span class="groupName">{{selectlist.rolename}}</span>
                <div class="staffadd">
                  <el-input size="mini" style="display: inline-block;width: 160px;" v-model="memo" placeholder="请输入内容"></el-input>
                  <el-button @click="select_staff" size="mini" type="primary" style="margin-right: 30px;margin-left: 10px;" icon="el-icon-search">搜索</el-button>
                 
                </div>
            </div>
            <div class="apartment-right-bottom">
                <div class="apartment-right-bottom-wrap" >
                   <p class="p-wrap">
                       <span>权限名称：</span>
                       <el-input placeholder="请输入密码" v-model="addrole.rolename"  size="mini" class="input-input"
                        ></el-input>
                   </p>


                   <div class="p-wrap-1">
                       <span class="p-wrap-1-span">查看权限：</span>
                       <div class="p-wrap-1-div" >
                           

                          <el-checkbox v-for="(list,index) in lookpower" :key="index" v-model="list.checked">{{list.powerName}}</el-checkbox>
                          
                       </div>
                   </div>


                   <div class="p-wrap-1">
                       <span class="p-wrap-1-span">编辑权限：</span>
                       <div class="p-wrap-1-div" >
                           

                          <el-checkbox :key="index" v-for="(list,index) in editpower" v-model="list.checked">{{list.powerName}}</el-checkbox>
                          
                       </div>
                   </div>

                   <div class="p-wrap-1">
                       <span class="p-wrap-1-span">设置权限：</span>
                       <div class="p-wrap-1-div" >
                           

                          <el-checkbox :key="index" v-for="(list,index) in settingpower" v-model="list.checked">{{list.powerName}}</el-checkbox>
                          
                       </div>
                   </div>

                   <div class="p-wrap-1">
                       <span class="p-wrap-1-span">报表查看：</span>
                       <div class="p-wrap-1-div" >
                           

                          <el-checkbox :key="index" v-for="(list,index) in lookreportpower" v-model="list.checked">{{list.powerName}}</el-checkbox>
                          
                       </div>
                   </div>

                   <div style="margin-top: 80px;" class="p-wrap-1">
                       <el-button size="small" @click="edit_role" style="width: 81%;" type="primary">保存</el-button>

                   </div>
                   <div class="p-wrap-1 p-wrap-2">
                       <el-button size="small" @click="deleteapart" style="width: 81%" type="warning">删除</el-button>

                   </div>



                </div>
            </div>
        </div>
        <!--新增部门-->

        <el-dialog
          title="角色"
          :visible.sync="addrole.dialogVisible"
          width="500px"
          >
          <div class="wrap">
            
            <p class="input-p">
              <span >角色名字：</span>
              <el-input placeholder="请输入角色名称"  size="mini" class="input-input"
                 v-model="addrole.roleName" ></el-input>
              
            </p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="addrole.dialogVisible = false">取 消</el-button>
            <el-button size="mini" @click="addroleok" type="primary" >确 定</el-button>
          </span>
        </el-dialog>

    
    </div>
</template>

<script>

export default {
    name: "apartment",
    components: {
        
    },
    data(){
        return{
            memo: '',
            addrole: {
                dialogVisible: false,
                roleName: ''
            },
            addapartroledata: {

            },
            selectlist: {
                groupId: '',
                groupName: '',
                rolename: ''
            },
            leftdata: [],
            checked: false,
            choosepower: [],
            powers: []
        }
    },
    computed:{
        lookpower() {
           let filtered = this.powers.filter((ele)=>{
             return ele.powerType == 1
           }) 

           return filtered
        },

        editpower() {
           let filtered = this.powers.filter((ele)=>{
             return ele.powerType == 2
           }) 

           return filtered
        },
        settingpower() {
           let filtered = this.powers.filter((ele)=>{
             return ele.powerType == 3
           }) 

           return filtered
        },
        lookreportpower() {
           let filtered = this.powers.filter((ele)=>{
             return ele.powerType == 4
           }) 

           return filtered
        }
    },
    mounted(){
      this.getroles()
      this.getallpower()
    },
    methods:{
        select_staff() {
          let that = this
          this.$http.get(`role/find_role_by_key?key=${this.memo}`)
          .then(function (data) {
            
                  
                  ///console.info(data)

                  that.leftdata = data.data


                  console.info(that.leftdata)

                  
                })
                .catch(function (error) {
                  console.log(error);
                  that.$message({
                      message: '接口报错',
                      type: 'error'
                    });
                });
        },
        show_detail(list) {
            this.selectlist.groupId = list.id
            this.selectlist.groupName = list.roleName
            this.selectlist.rolename = list.roleName
            this.addrole.rolename = list.roleName
            this.getrolepower()
        },
        getallpower() {
            this.$http.get('power/get_all_power')
                .then((data)=>{
                    if (data.code = '200') {
                        for (let i=0; i<data.data.length; i++) {
                            data.data[i].checked = false
                        }
                        this.powers = data.data
                    }
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

                        this.leftdata = data.data

                        this.show_detail(this.leftdata[0])
                    }
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
        }, 
        tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
        },
        addroleok() {
            this.$http.get(`role/add_role?roleName=${this.addrole.roleName}`)
                .then((data)=>{
                this.getroles()
                if (data.code == '200') {
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    })

                    
                    this.addrole.dialogVisible = false
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
        edit_role() {
            let filtered = this.powers.filter((ele)=>{
                return ele.checked
            }) 

            let powerIds = []

            for (let i=0; i<filtered.length; i++) {
                powerIds.push(filtered[i].id)
            }

            this.$http.post(`role/edit_role`,{
                roleName: this.addrole.rolename,
                id: this.selectlist.groupId,
                powerIds: powerIds.join(',')
            })
                .then((data)=>{

                    this.$store.dispatch('setroleInfo')

                    if (data.code == '200') {
                        this.$message({
                          message: data.msg,
                          type: 'success'
                        })

                        
                        

                    }else {
                        this.$message({
                          message: data.msg,
                          type: 'error'
                        })
                    }

                    let that = this

                    let changearray = this.leftdata.filter((list) => {
                        return list.id == that.selectlist.groupId
                    })



                    if (changearray[0]) {
                        changearray[0].roleName = this.addrole.rolename
                        this.show_detail(changearray[0])
                    } else {
                        this.getroles()
                    }






                //
                
            })
            .catch(()=>{
                this.$message({
                  message: '接口报错',
                  type: 'error'
                })
            })
        },
        getrolepower() {
            this.$http.get(`power/get_power_by_role?roleId=${this.selectlist.groupId}`)
               .then((data)=>{
                    if (data.code = '200') {
                        //this.powers
                        for (let j=0; j<this.powers.length; j++) {
                                
                                this.powers[j].checked = false
                            
                        }
                        for (let i=0; i<data.data.length; i++) {
                            for (let j=0; j<this.powers.length; j++) {
                                
                                if (data.data[i].id == this.powers[j].id) {
                                    this.powers[j].checked = true
                                }
                            }
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
        deleteapart() {
            let that = this
            this.$confirm('此操作将永久删除此数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.get(`role/delete_role?roleId=${this.selectlist.groupId}`)
                    .then(function (data) {
                        //this.getroles()
                        
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


                        that.getroles()
                        
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
.apartment .el-checkbox__label {
    font-size: 12px;
}

.apartment .el-checkbox {
    margin-left: 0px;
    margin-right: 30px;
    margin-bottom: 10px;
}

.apartment .el-checkbox+.el-checkbox {
    margin-left: 0px !important;
}
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

            lable {
                color: red;
            }
        }
    }

    &-left {
        height: calc(100vh - 180px);
        border: 1px solid #e2e2e2;

        &-top {
            padding: 10px;
            border-bottom: 1px solid #e2e2e2;
            
        }

        .apartment-left-bottom {
            height: 100%;

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
        width: calc(100vw - 470px);
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

            &-wrap {
                width: 100%;
                height: 100%;
                background: white;
                padding: 30px;
                padding-left: 40px;
                overflow-y: scroll;

                .p-wrap {
                    
                    width: 100%;
                    max-width: 800px;
                    .input-input {
                        width: 70%;
                    }
                }

                .p-wrap-1 {
                    width: 100%;
                    max-width: 800px;
                    margin-top: 40px;
                    position: relative;


                    &-span {
                        position: absolute;

                        top: 20px;
                    }

                    .p-wrap-1-div {
                        position: relative;
                        left: 64px;
                        width: 70%;
                        border: 1px solid #e2e2e2;
                        display: inline-block;
                        padding: 10px;
                        padding-left: 20px;
                        padding-top: 20px;
                        border-radius: 6px;

                    }

                }

                .p-wrap-2 {
                    margin-top: 10px;
                }


            }
        }
    }

}
  
</style>
