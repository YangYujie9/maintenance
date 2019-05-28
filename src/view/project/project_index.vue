<template>
  <div class="project_index">
 	<div class="project_index-left">
 		<div class="project_index-left-top">
 			<div class="title">
 				项目总览
 			</div>
 			<div class="content">
 				<div class="total">
 					<p>所有项目</p>
 					<p class="totalnum">{{projectTotalnum}}</p>
 					<div @click="$router.push('/project/project_list')" class="lookall">查看所有&nbsp;&nbsp;<span>-></span></div>
 				</div>
 				<div id="projectTotaldom" class="righttotal">
 					
 				</div>
 			</div>

 		</div>
 		<div class="project_index-left-top project_index-left-bottom">
 			<div class="title">
 				<span class="span-title">
 					任务看板
 				</span>
 				<span @click="$router.push('/project/mission')" class="span-title-right cursor">
 					更多
 				</span>
 			</div>
 			<div class="proje-wrap">
 				<el-table
		            :data="tableDataproject"
		            height="calc(100vh - 510px)"
		            style="width: 100%">
		           <el-table-column
		              type="index"
		              label="id"
		              width="50">
		            </el-table-column>
		            <el-table-column
		              prop="level"
		              label="优先级"
		              >
		            </el-table-column>
		            <el-table-column
		              prop="missionName"
		              label="任务名称"
		              >
		            </el-table-column>
		            <el-table-column
		              prop="status"
		              label="项目状态"
		              >
		              <template slot-scope="scope">
		                {{tablestatus(scope.row.status)}}
		              </template>
		              
		            </el-table-column>
		         </el-table>
 			</div>
 		</div>
 	</div>
 	<div class="project_index-right">
 		<div class="project_index-right-top">
 			<div class="title">
 				<span class="span-title">
 					进度看板
 				</span>
 			</div>

 			<div class="project-status">
 				<div class="project-status-left">
 					<div class="project-status-left-wrap">
	 					<div @click="find_pro_plan_board_list(list)" v-for="list in tableDataproreal" class="list pointer">
	 						{{list.projectName}}
	 					</div>
	 					
	 				</div>

	 				<div class="pagination">
	                  <el-pagination
	                    background
	                    @size-change="handleSizeChange"
	                    @current-change="handleCurrentChange"
	                    :page-sizes="[250, 300, 350, 400, 450]"
	                    :page-size="prosearch.pageSize"
	                    :current-page="prosearch.pageNum"
	                    :total="prosearch.total"
	                    layout="total,sizes, prev, pager, next"
	                    >
	                  </el-pagination>
	                </div>

 				</div>
 				<div class="project-status-right">
 					<div class="project-status-right-left">
 						<el-progress type="circle" :percentage="countList(totalCountVO.finishCount)" status="text">项目进度<p>{{countList(totalCountVO.finishCount)}}%</p>
 						</el-progress>
 						<p style="margin-top: 20px;">总任务</p>
 						<p>{{totalCountVO.total}}</p>
 					</div>

 					<div class="project-status-right-right">
 						<p v-for="list in totalCountVO.countList"><el-progress style="width: 80%;" :stroke-width="16" :percentage="countList(list.count)" :show-text="false" status="success"></el-progress><span>{{list.name}}:{{list.count}}</span></p>
 						
 					</div>

 				</div>

 			</div>
 			<div class="project-status-bottom">
 				<div class="project-status-bottom-top">
 					{{list.projectName}}
 					<el-date-picker
		                size="mini"
		                v-model="date"
		                style="width: 160px;margin-left: 20px;"
		                type="year"
		            	class="input-class"
		                placeholder="选择年份">
		             </el-date-picker>

		             <el-button size="small" @click="find_pro_plan_board(list.id)" style="margin-left: 20px" type="primary">搜索</el-button>
 				</div>
 				<div id="task" class="project-status-bottom-bottom">
 					
 				</div>
 			</div>
 		</div>
 	</div>
    
    

    
  </div>
</template>

<script>
	import echarts from 'echarts'
	import { mapGetters } from 'vuex'
	let projectTotal
	let demandtypemsg
  export default {
    name: "project_index",
    data(){
      return{
      	date: new Date(),
      	option: {
		    title: {
		        text: '阶梯瀑布图',
		        subtext: 'From ExcelHome',
		        show: false,
		        sublink: 'http://e.weibo.com/1341556070/Aj1J2x5a5'  
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        formatter: function (params) {

		            
		            return `${params[1].seriesName}:${params[1].data.tip}--${params[2].seriesName}:${params[2].data.tip}`;
		        }
		    },
		    legend: {
		        data:['支出','收入'],
		        show: false,
		    },
		    grid: {
		        left: '3%',
		        right: '10%',
		        bottom: '3%',
		        top: '3%',
		        containLabel: true
		    },
		    xAxis: {
		        type : 'value',
		        splitLine: {show:false},
		        min: 0,
		        max: 11,
		        splitNumber: 12,
		        axisLabel: {
		            formatter: function (value){
		                
		                return (value+1)+"月"
		            },
		        }
		        
		    },
		    yAxis: {
		        type : 'category',
		        data: ['a','b','c','d']
		        
		    },
		    series: [
		        {
		            name: '开始日期',
		            type: 'bar',
		            stack: '总量',
		            
		            itemStyle: {
		                normal: {
		                    barBorderColor: 'rgba(0,0,0,0)',
		                    color: 'rgba(0,0,0,0)'
		                },
		                label: {
		                    normal: {
		                        show: true,
		                        position: 'right',
		                        formatter: function (value){

		                            
		                            return value.data+"月"
		                        },
		                    }
		                },
		                
		            },
		            data: [1, 1.09, 2.05,6.15]
		        },

		        {
		            name: '开始日期',
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'right',
		                    formatter: function (value){

		                        console.info(value)
		                        
		                        return value.data+"月"
		                    },
		                }
		            },
		            color: '#409EFF',
		            data: [1, 1.09, 2.05, 6.15]
		        },
		        
		        {
		            name: '截止日期',
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'right',
		                    formatter: function (value){

		                        
		                        return value.data+"月"
		                    },
		                }
		            },
		            color: '#409EFF',
		            data: [1.1, 3.15, 2.29, 6.15]
		        }
		    ]
		},
      	prosearch: {
          pageNum: 1,
          pageSize: 250,
          total: 0,
          createorId: [],
          status: '',
          level: '',
        },
        tableDataproreal: [],
      	tableDataproject: [],
      	projectTotalnum: 0,
        projectTotaloption: {
		    color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		        left: '1px',
		        bottom: '1px',
		        left: '1px',
		        top: '20px',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : [],
		            axisTick: {
		                alignWithLabel: true
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            show: false,
		        }
		    ],
		    series : [
		        {
		            name:'',
		            type:'bar',
		            backgroundColor: '#0057ff',
		            barWidth: '16px',
		            data:[],
		            label: {
		                normal: {
		                    show: true,
		                    position: 'top',
		                    color: 'black'
		                }
		            },
		        }
		    ]
		},
		totalCountVO: {
			total: 0,
			finishCount: 0,
			countList: [],
		},
		list: {
			id: '',
			projectName: ''
		}
      }
    },
    computed: {
        ...mapGetters([
            'getpageDict',
            'getstaffVO',
            'getflagdemand'
        ]),
        getdemand_type() {
            let demand_type = this.getpageDict.filter((list) => {
                return list.dicType == "mission_status"
            })

            //console.info(demand_type[0])


            return demand_type[0]
        },
    },
    created() {
        
    },
    mounted(){ 
      this.getdata()
      this.getselecttaskdata()
      this.getselectdata()

      	
      //this.find_pro_plan_board()
    },
    methods:{
    	countList(list) {
    		//console.info(list)
    		if (list === 0 || this.totalCountVO.total === 0) {
	            return 0
	          } else {
	            return ((list/this.totalCountVO.total).toFixed(2))*100
	          }
    	},
    	find_pro_plan_board_list(list) {

    		if (list && list.id) {
    			this.list.id = list.id
	    		this.list.projectName = list.projectName
	    		this.find_pro_plan_board(list.id)
    		}
    		
    	},
    	find_pro_plan_board(id) {


    			let year = this.date ? new Date(this.date).getFullYear(): new Date().getFullYear()
    			let start = year + '-01-01 00:00:00'
    			let end = year + '-12-31 23:59:59'


	    		this.$http.post(`mission/find_pro_plan_board`, {
	    			proId: id,
	    			start: new Date(start).getTime().toString().substr(0, 10),
	    			end: new Date(end).getTime().toString().substr(0, 10),
	    		})
	      		.then((data)=>{
	      			

	      			this.totalCountVO.countList = data.data.totalCountVO.countList
	      			this.totalCountVO.total = data.data.totalCountVO.total
	      			this.totalCountVO.finishCount = data.data.totalCountVO.finishCount

	      			//console.info(this.option)
	      			this.option.yAxis.data= []
	      			this.option.series[0].data = []
	      			this.option.series[1].data = []
	      			this.option.series[2].data = []
	      			for (let i=0;i<data.data.missionPOS.length;i++) {
	      				data.data.missionPOS[i].endTimechan = this.getmonthnum(data.data.missionPOS[i].endTime)


	      				data.data.missionPOS[i].startTimechan = this.getmonthnum(data.data.missionPOS[i].startTime)

	      				data.data.missionPOS[i].endTimechanadd = this.getmonthnumadd(data.data.missionPOS[i].endTime)


	      				data.data.missionPOS[i].startTimechanadd = this.getmonthnumadd(data.data.missionPOS[i].startTime)

	      				

	      				this.option.yAxis.data.push(data.data.missionPOS[i].missionName)

	      				this.option.series[0].data.push(data.data.missionPOS[i].startTimechan)

	      				//this.option.series[0].data.push(data.data.missionPOS[i].endTimechan)

	      				

	      				//this.option.series[1].data.push((data.data.missionPOS[i].endTimechan-data.data.missionPOS[i].startTimechan).toFixed(4)*10)

	      				

	      				this.option.series[1].data.push({
	      					value: (data.data.missionPOS[i].endTimechan-data.data.missionPOS[i].startTimechan).toFixed(2),
	      					tip: data.data.missionPOS[i].endTimechanadd,
	      					label: {
			                    normal: {
			                        show: true,
			                        position: 'right',
			                        color: '#409EFF',
			                        formatter: function (value){

			    	                         
			    	                    return '截止日期：'+data.data.missionPOS[i].endTimechanadd
			    	                },
			                    },
			                    
			                } 
	      				})



	      				this.option.series[2].data.push(
	      					{
		      					value: 0.001,
		      					tip: data.data.missionPOS[i].startTimechanadd,
		      					label: {
				                    normal: {
				                        show: true,
				                        position: 'left',
				                        color: '#000000',
				                        formatter: function (value){

				    	                         
				    	                    return '开始日期：'+data.data.missionPOS[i].startTimechanadd
				    	                },
				                    },
				                    
				                } 
		      				}

	      				)


	      			}


	      			if (demandtypemsg) {
                        demandtypemsg.dispose()
                        demandtypemsg = null
                    }
                    this.$nextTick(()=>{

		      			demandtypemsg = echarts.init(document.getElementById('task'))
	        			demandtypemsg.setOption(this.option)
        			})

	      			//console.info(data.data.missionPOS)

	      		})
	      		.catch((error)=>{

	      		})
    	},
    	getmonthnum(datea) {
    		let Month = new Date(datea*1000).getMonth()
    		let Day = new Date(datea*1000).getDate()

    		Day = Day*3

    		if(Day<10) {
    			Day = '0'+Day
    		}

    		return `${Month}.${Day}`

    	},
    	getmonthnumadd(datea) {
    		let Month = new Date(datea*1000).getMonth()+1
    		let Day = new Date(datea*1000).getDate()

    		
    		if(Day<10) {
    			Day = '0'+Day
    		}

    		return `${Month}.${Day}`

    	},
    	handleSizeChange(val) {
	        this.prosearch.pageSize = val
	        this.prosearch.pageNum = 1
	        this.getselectdata()
	    },
	      handleCurrentChange(val) {
	        this.prosearch.pageNum = val
	        this.getselectdata()
	    },
    	getselectdata() {
	        let that = this
	        this.$http.post(`project/find_project_list`,{
	            level: this.prosearch.level,
	            memo: this.prosearch.memo,
	            status: this.prosearch.status,
	            createorId: '',
	            pageNum: this.prosearch.pageNum,
	            pageSize: this.prosearch.pageSize,
	        })
	          .then((data)=>{
	                //console.info(data)
	              this.tableDataproreal = data.data.list
	              this.prosearch.total = data.data.total
	            
	              this.find_pro_plan_board_list(this.tableDataproreal[0])
	            })
	            .catch(function (error) {
	                console.log(error);
	                that.$message({
	                    message: '接口报错',
	                    type: 'error'
	                  });
	            }) 
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
    	getselecttaskdata() {
    		let that = this
	        this.$http.post(`mission/find_mission`,{
	            level: '',	
	            memo: '',
	            status: '',
	            pageNum: 0,
	            pageSize: 200,
	        })
          .then((data)=>{
                //console.info(data)
              this.tableDataproject = data.data.list
              
              //this.search.total = data.data.total
            

            })
            .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
            }) 
    	},
      	//选择档期
      	getdata() {
	      	this.$http.get(`project/get_project_count`)
	      		.then((data)=>{
	      			//console.info(data)
	      			//this.projectTotaloption.xAxis


	      			this.projectTotalnum = data.data.total


	      			for (let i=0; i<data.data.countList.length; i++) {

	      				this.projectTotaloption.xAxis[0].data.push(data.data.countList[i].name)
	      				this.projectTotaloption.series[0].data.push(data.data.countList[i].count)
	      			}

	      			

	      			projectTotal = echarts.init(document.getElementById('projectTotaldom'))
	                projectTotal.setOption(this.projectTotaloption)


	      		})
	      		.catch((error)=>{

	      		})
      	}
    },
  }
</script>

<style scoped lang="less">
.project_index {
	display: flex;
	padding: 20px 20px;
	&-left {
		width: 520px;
		margin-right: 20px;


			&-top {
				width: 100%;
				height: 280px;
				padding-left: 16px;
				padding-right: 16px;
				padding-top: 16px;
				border: 1px solid #dcdfe6;


				.title {
					font-size: 26px;

				}

				.content {
					margin-top: 30px;

					.righttotal {
						width: 320px;
						height: 160px;
						float: right;

					}


					.total {
						width: 140px;
						text-align: center;
						margin-left: 20px;
						float: left;


						.totalnum {
							font-size: 48px;
							font-weight: 700;
							line-height: 68px;
							margin-bottom: 10px;
							margin-top: 10px
						}

						.lookall {
							width: 120px;
							height: 30px;
							background: #0057ff;
							border-radius: 15px;
							color: white;
							line-height: 30px;
							margin: 0 auto;


							span {
								display: inline-block;
								width: 24px;
								height: 24px;
								line-height: 24px;
								border-radius: 50%;
								background: #003ecb;

							}


						}




   		        
					}
				}
			}


			&-bottom {
				height: calc(100vh - 440px);
				margin-top: 36px;


				.title {
					height: 30px;
					line-height: 20px;
					position: relative;
					border-bottom: 1px solid #dcdfe6;
					font-size: 24px;

					.span-title {
						font-size: 16px;
					}

					.span-title-right {
						position: absolute;
						right: 20px;
						color: #0057ff;
						font-size: 14px;
					}
				}


				.proje-wrap {
					height: calc(100vh - 510px);
					background: red;
					overflow-y: scroll;

				}
			}





	}

	&-right {
		width: calc(100vw - 834px);
		height: calc(100vh - 124px);
		border: 1px solid #dcdfe6;
		overflow-x: scroll;

		.project-status-bottom {
			width: 100%;
			height: calc(100vh - 454px);

			&-top {
				height: 50px;
		        line-height: 50px;
 		        position: relative;
		        padding-left: 24px;
		        border-bottom: 1px solid #dcdfe6;
		        margin-bottom: 16px;
			}

			&-bottom {
				width: 100%;

				height: calc(100vh - 514px);
			}




		}
		

		&-top {
			width: 100%;
			height: 260px;
			padding-left: 16px;
			padding-right: 16px;
			min-width: 700px;

			


			.title {
				height: 56px;
				line-height: 60px;
				position: relative;
				border-bottom: 1px solid #ebeef5;

				.span-title {
					font-size: 16px;
				}
			}



			.project-status {
				display: flex;
				position: relative;
				height: 100%;
				border-bottom: 1px solid #dcdfe6;


				&-left {
					width: 260px;
					height: 220px;
					min-width: 260px;
					margin-top: 16px;
					border-right: 1px solid #dcdfe6;
					position:relative;

					&-wrap {
						height: 200px;
						overflow: scroll;
						.list {
							line-height: 36px;
						}

					}

					.pagination {
			            position: absolute;
			            bottom: -20px;
			            right: 20px;
			         }


					
				}

				&-right {
					width: 80%;
					
					height: 220px;
					margin-top: 16px;
					display: flex;

					&-left {
						padding-top: 6px;
						width: 200px;
						height: 220px;
						text-align: center;
					}

					&-right {
						flex: auto;
						height: 220px;
						padding-top: 30px;
						text-align: center;


						p {
							height:  60px;
							position: relative;
							span {
								position: absolute;
								right: 0px;
								top: -1px;
							}
							

						}
					}
				}
			}

		}
	}

		

}
	

  
</style>
