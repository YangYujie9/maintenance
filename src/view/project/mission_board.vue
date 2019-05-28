<template>
    <div class="data_center">
   	
    	<div class="data_center-wrap">
    		<div class="data_center-wrap-top">
    			<div class="title">
    				<span style="font-size: 20px;">全部项目</span>
    				<el-dropdown class="custom-width" style="margin-left: 40px;margin-right: 20px;" trigger="click" placement="bottom">
		              	<el-button style="width: 164px;overflow: hidden;text-align: left;" size="small"  class="custom-width-order">
		                &nbsp;{{staffvalueshow}}&nbsp;

		              	</el-button>
		              	<el-dropdown-menu  style="min-width: 224px;height: 200px;overflow-x: scroll;" slot="dropdown">
		                    <el-tree node-key="id" :data="stafflist" @check="staffsave"   ref="staff" show-checkbox class="custom-width-order">
		                    </el-tree>
		                    
		             	</el-dropdown-menu>
		            </el-dropdown> 
		            <el-date-picker
		                size="small"
		                v-model="search.date"
		                style="width: 160px;"
		                type="year"
		            	class="input-class"
		                placeholder="选择年份">
		             </el-date-picker>
		              
		            
		            <el-button size="small" @click="get_project_borad" style="margin-left: 20px" type="primary">搜索</el-button>
                <el-button size="small" @click="clear" style="margin-left: 20px" type="primary">重置</el-button>
    			</div>
    			<div class="left">
    				<el-progress type="circle" :percentage="ratepro"></el-progress>
    				<p style="margin-top: 20px;">总项目&nbsp;&nbsp;&nbsp;已完成</p>
    				<p>{{proonTheWayCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{profinishCount}}</p>
    			</div>
    			<div  id="chart_everyFinish" class="right">
    				
    			</div>
    		</div>
    		<div class="data_center-wrap-top data_center-wrap-bottom">
    			<div class="title">
    				<span style="font-size: 20px;">全部任务</span>
    				<el-dropdown class="custom-width" style="margin-left: 40px;margin-right: 20px;" trigger="click" placement="bottom">
		              	<el-button style="width: 164px;overflow: hidden;text-align: left;" size="small"  class="custom-width-order">
		                &nbsp;{{staffvalueshowmis}}&nbsp;

		              	</el-button>
		              	<el-dropdown-menu  style="min-width: 224px;height: 200px;overflow-x: scroll;" slot="dropdown">
		                    <el-tree node-key="id" :data="stafflist" @check="staffsavemis"   ref="staffmis" show-checkbox class="custom-width-order">
		                    </el-tree>
		                    
		             	</el-dropdown-menu>
		            </el-dropdown> 

		            <el-date-picker
		                size="small"
		                v-model="missionsearch.date"
		                style="width: 160px;"
		                type="month"
		            	  class="input-class"
		                placeholder="选择年份">
		             </el-date-picker>
		              
		            
		            <el-button size="small" @click="get_mission_board" style="margin-left: 20px" type="primary">搜索</el-button>
                <el-button size="small" @click="clearmis" style="margin-left: 20px" type="primary">重置</el-button>
    			</div>
    			<div class="left">
    				<el-progress type="circle" :percentage="ratepromis"></el-progress>
    				<p style="margin-top: 20px;">总任务&nbsp;&nbsp;&nbsp;已完成</p>
    				<p>{{proonTheWayCountmis}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{profinishCountmis}}</p>
    			</div>
    			<div  id="chart_everyFinishmis" class="right">
    				
    			</div>
    		</div>
    	</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import echarts from 'echarts'
let everyFinishmsg 
let everyFinishmsgmis 

export default {
    name: "index",
    components: {
         
    },
    data(){
        return{
        	stafflist: [],
        	search: {
        		date: new Date(),
        		staffIds: [],
        		staffvalue: '',
        	},
        	defaultstaff: '',
        	missionsearch: {
        		date: new Date(),
        		staffIds: [],
        		staffvalue: '',
        	},
        	everyFinishList: {
	            title : {
	                show: false,
	                
	            },
	            tooltip : {
	                trigger: 'axis'
	            },
	            legend: {
	                data:['已完成','未完成'],
	                position: 'left',
	            },
	            grid: {
	                x: '30px',
	                x2: '30px',

	            },
	            toolbox: {
	                show : true,
	                
	            },
	            calculable : true,
	            xAxis : [
	                {
	                    type : 'category',
	                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	                }
	            ],
	            yAxis : [
	                {
	                    type : 'value'
	                }
	            ],
	            series : [
	                {
	                    name:'已完成',
	                    type:'bar',
	                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
	                    barGap: '50%',
	                    barWidth: '16px',
	                },
	                {
	                    name:'未完成',
	                    type:'bar',
	                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
	                    barGap: '50%',
	                    barWidth: '16px',
	                }
	            ]
	        },
	        everyFinishListmis: {
	            title : {
	                show: false,
	                
	            },
	            tooltip : {
	                trigger: 'axis'
	            },
	            legend: {
	                data:['已完成','未完成'],
	                position: 'left',
	            },
	            grid: {
	                x: '30px',
	                x2: '30px',

	            },
	            toolbox: {
	                show : true,
	                
	            },
	            calculable : true,
	            xAxis : [
	                {
	                    type : 'category',
	                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
	                }
	            ],
	            yAxis : [
	                {
	                    type : 'value'
	                }
	            ],
	            series : [
	                {
	                    name:'已完成',
	                    type:'bar',
	                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
	                    barGap: '50%',
	                    barWidth: '16px',
	                },
	                {
	                    name:'未完成',
	                    type:'bar',
	                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
	                    barGap: '50%',
	                    barWidth: '16px',
	                }
	            ]
	        },
	        profinishCount: 0,
	        proonTheWayCount: 0,
	       	profinishCountmis: 0,
	        proonTheWayCountmis: 0,
        }
    },
    computed: {
    	...mapGetters([
            'getpageDict',
            'getstaffVO',
            'getflagdemand',
            'userInfo'
        ]),
        ratepro() {
          if (this.profinishCount == 0 || this.proonTheWayCount == 0) {
            return 0
          } else {
            return Number(((this.profinishCount/this.proonTheWayCount)*100).toFixed(0))
          }
        },
        ratepromis() {
          if (this.profinishCountmis == 0 || this.proonTheWayCountmis == 0) {
            return 0
          } else {
            return Number(((this.profinishCountmis/this.proonTheWayCountmis)*100).toFixed(0))
          }
        },
    	staffvalueshow() {
            let string = '请选择员工'

            if (this.search.staffvalue.length > 10 || this.search.staffvalue.length == 10) {
                string = this.search.staffvalue.substr(0, 10) + '...'
            } else if (this.search.staffvalue.length>0 && this.search.staffvalue.length<10) {
                string = this.search.staffvalue
            }

            return string
        },
        staffvalueshowmis() {
            let string = '请选择员工'

            if (this.missionsearch.staffvalue.length > 10 || this.missionsearch.staffvalue.length == 10) {
                string = this.missionsearch.staffvalue.substr(0, 10) + '...'
            } else if (this.missionsearch.staffvalue.length>0 && this.missionsearch.staffvalue.length<10) {
                string = this.missionsearch.staffvalue
            }

            return string
        },
    },
    created() {
       
    },
    mounted(){
      this.get_group_staff_list()
      this.$nextTick(()=>{
      	this.getdepartmem()
      })

     
    },
    methods:{
    	clear() {
    		this.search.staffIds = []
        this.search.date = new Date()
        this.search.staffvalue = ''
        this.get_project_borad()
    	},
    	clearmis() {
    		this.missionsearch.staffIds = []
        this.missionsearch.staffvalue = ''
        this.search.date = new Date()
        this.get_mission_board()
    	},
    	staffsave() {
          let checkData = this.$refs.staff.getCheckedNodes()

          this.search.staffIds = []
          this.search.staffvalue = ''


          for (let i=0;i<checkData.length;i++) {
            if (!checkData[i].children) {
                this.search.staffIds.push(checkData[i].value)
              
                this.search.staffvalue += checkData[i].label+','
            }


          }
        },
        staffsavemis() {
          let checkData = this.$refs.staffmis.getCheckedNodes()

          this.missionsearch.staffIds = []
          this.missionsearch.staffvalue = ''


          for (let i=0;i<checkData.length;i++) {
            if (!checkData[i].children) {
                this.missionsearch.staffIds.push(checkData[i].value)
              
                this.missionsearch.staffvalue += checkData[i].label+','
            }


          }
        },
        get_project_borad() {
        	let year = this.search.date ? new Date(this.search.date).getFullYear(): ''
        	let staffIds = this.search.staffIds.length ? this.search.staffIds.join(','): this.defaultstaff
        	this.$http.get(`project/get_project_borad?year=${year}&staffIds=${staffIds}`)
    			.then((data)=>{
      				if (data.code = '200') {
      					
      					
	                    this.everyFinishList.series[0].data = []
	                    this.everyFinishList.series[1].data = []
	                    this.profinishCount = data.data.finishCount
	                    this.proonTheWayCount = data.data.total



	                    //个人看板 everyFinishList
	                    for (let i=0; i<data.data.list.length; i++) {
	                       

	                         this.everyFinishList.series[0].data.push(data.data.list[i].finishCount)

	                         this.everyFinishList.series[1].data.push(data.data.list[i].onTheWayCount)

	                         //this.everyFinishList.series[1].data.push(10)





	                    }

	                    if (everyFinishmsg) {
	                        everyFinishmsg.dispose()
	                        everyFinishmsg = null
	                    }


	                    
	                    
	                    this.$nextTick(()=>{
	                            everyFinishmsg = echarts.init(document.getElementById('chart_everyFinish'))
	                            everyFinishmsg.setOption(this.everyFinishList)
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
        get_mission_board() {
        	let year = this.missionsearch.date ? new Date(this.missionsearch.date).getFullYear()+'-'+new Date(this.missionsearch.date).getMonth()+1: ''
        	let staffIds = this.missionsearch.staffIds.length ? this.missionsearch.staffIds.join(','): this.defaultstaff
        	this.$http.get(`mission/get_mission_board?month=${year}&staffIds=${staffIds}`)
    			.then((data)=>{
      				if (data.code = '200') {
      					
      					this.everyFinishListmis.xAxis[0].data = []
	                    this.everyFinishListmis.series[0].data = []
	                    this.everyFinishListmis.series[1].data = []
	                    this.profinishCountmis = data.data.finishCount
	                    this.proonTheWayCountmis = data.data.total



	                    //个人看板 everyFinishList
	                    for (let i=0; i<data.data.list.length; i++) {
	                       
	                    	this.everyFinishListmis.xAxis[0].data.push(data.data.list[i].name)
	                         this.everyFinishListmis.series[0].data.push(data.data.list[i].finishCount)

	                         this.everyFinishListmis.series[1].data.push(data.data.list[i].onTheWayCount)

	                         //this.everyFinishList.series[1].data.push(10)





	                    }

	                    if (everyFinishmsgmis) {
	                        everyFinishmsgmis.dispose()
	                        everyFinishmsgmis = null
	                    }


	                    
	                    
	                    this.$nextTick(()=>{
	                            everyFinishmsgmis = echarts.init(document.getElementById('chart_everyFinishmis'))
	                            everyFinishmsgmis.setOption(this.everyFinishListmis)
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
        getdepartmem() {
        	this.$http.get(`staff/staff_list?groupId=${this.userInfo.groupId}`)
    			.then((data)=>{
      				if (data.code = '200') {
      					
      					if (data.data) {
      						let staff = []
      						
      						for (let i=0;i<data.data.list.length;i++) {
      							staff.push(data.data.list[i].id)
      						}

      						this.defaultstaff = staff.join(',')

      						this.get_mission_board()
      						this.get_project_borad()
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
    },
}
</script>

<style spoced lang="less">
.data_center {
	&-top {
		height: 60px;
        line-height: 60px;
		background: rgba(255, 255, 255, 0.85);
		margin-bottom: 16px;
        position: relative;
        padding-left: 24px;

        .spantopfirst {
            font-size: 20px;
            color: #409EFF;

        }




	}

	&-wrap {
		width: 100%;
		height: calc(100vh - 74px);

		&-top {
			width: 100%;
			height: 48%;
			position: relative;
			background: #ffffff;

			.title {
				height: 60px;
		        line-height: 60px;
				background: rgba(255, 255, 255, 0.85);
 		        position: relative;
		        padding-left: 24px;
		        border-bottom: 1px solid #dcdfe6;
		        margin-bottom: 16px;
            position: relative;
			}

			
			.left {
				width: 300px;
				text-align: center;
				
				padding-top: 70px;
				float: left;


			}

			.right {
				width: calc(100vw - 564px);
				text-align: center;
				height: 80%;
				float: right;

			}
			

			
		}

		&-bottom {
			width: 100%;
			height: 48%;
			margin-top: 2%;
		}





	}
}
</style>
