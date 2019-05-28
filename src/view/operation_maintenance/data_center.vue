<template>
  <div class="data_center">
  	<div class="data_center-top">
        <span @click="$router.push('/maintenance/demonsion')" class="spantopfirst cursor"><i class="iconfont icon-jiantouyou"></i>返回</span>

           <el-dropdown class="custom-width" style="margin-left: 40px;margin-right: 20px;" trigger="click" placement="bottom">
              <el-button style="width: 164px;overflow: hidden;text-align: left;" size="small"  class="custom-width-order">
                &nbsp;{{staffvalueshow}}&nbsp;

              </el-button>
              <el-dropdown-menu style="min-width: 204px;max-height: 300px;overflow: scroll;" slot="dropdown">
                <el-tree :data="leftdata" :props="leftdata_props" @check="staffsave" ref="staff" show-checkbox class="custom-width-order">
                </el-tree>
                
              </el-dropdown-menu>
            </el-dropdown> 

            

            <span >日期：</span>
            <el-date-picker
                size="small"
                v-model="search.start"
                style="width: 160px;"
                type="date"
            class="input-class"
                placeholder="起始日期">
              </el-date-picker>-<el-date-picker
                size="small"
                style="width: 160px;"
                v-model="search.end"
                type="date"
            class="input-class"
                placeholder="终止日期">
            </el-date-picker>
              
            <el-button size="small" @click="clear" style="margin-left: 20px" type="primary">重置</el-button>
            <el-button size="small" @click="getdata" style="margin-left: 20px" type="primary">搜索</el-button>

    </div>
    <div class="data_center-wrap">
    	<div class="data_center-wrap-left">
    		<div ref="wraptab" class="data_center-wrap-left-one two">
    			<p class="title">需求看板</p>
    			<div :style="{height: tableheight+ 'px'}"  class="wrap">
    				<div id="chart_example" :style="{width: demandTypeListwidth + 'px'}" style="height: 260px;margin: 0 auto;">
                                  
                    </div>
    			</div>
    			
    		</div>
    		<div class="data_center-wrap-left-one">
    			<p class="title">总任务： {{allDemandList.total}}</p>
    			<div :style="{height: tableheight+ 'px'}" style="padding-top: 20px;" class="wrap">
    				<div v-for="list in allDemandList.list" class="workdiv">

                        <p>{{list.name}}：{{list.num}}个</p> 
                        <el-progress :text-inside="true" :stroke-width="22" :percentage="list.progress"></el-progress>

                    </div>
                    

    			</div>
    		</div>
    		<div class="data_center-wrap-left-one two three">
    			<p class="title">时长看板</p>
    			<div :style="{height: tableheight+ 'px'}"  class="wrap">
                    <div id="chart_finishTimemsge" :style="{width: finishTimemwidth + 'px'}" style="height: 260px;margin: 0 auto;">
                                  
                    </div>
                </div>

    		</div>
    		<div class="data_center-wrap-left-one ">
    			<p class="title ranktitle">排名
                    <span class="ranktitle-spansecond">
                        完成量
                    </span>
                    <span class="ranktitle-spanthird">
                        完成率
                    </span>
                </p>
    			<div  :style="{height: tableheight+ 'px'}"   style="padding-top: 20px;" class="wrap">
    				<div v-for="(list,index) in demandLevelList" class="ranklist">
                        <span>top{{index}} &nbsp;:&nbsp;{{list.staffName}}</span>
                        <span class="ranklist-spansecond">
                            {{list.finishNum}}个
                        </span>
                        <span class="ranklist-spanthird">
                            {{list.finishRate}}%
                        </span>

                    </div>
                    
    			</div>
    		</div>

    	</div>
    	<div class="data_center-wrap-right">
    		<p class="title">个人看板</p>
            <div :style="{height: (tableheight *2)+ 'px'}" style="overflow: scroll;margin-top: 60px">
                <div id="chart_everyFinishList" :style="{width: everyFinishmsgwidth + 'px',height: (tableheight *2) + 'px'}" >
                                      
                </div>
            </div>
    	</div>
    	
    </div>
    
  </div>
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'
var demandtypemsg
var finishTimemsg
var everyFinishmsg 



  export default {
    name: "system-setting",
    data(){
      return{
        tableheight: 20,
        leftdata: [],
        leftdata_props: {
            value: 'groupId',
            label: 'groupName',
            children: 'groupVOList'
        },
        search: {
            departname: '',
            departids: [],
            start: new Date([new Date().getFullYear(),new Date().getMonth()+1,1].join('-')),
            end:new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1)
        },
        allDemandList: {
            total: 0,
            list: [],
        },
        everyFinishmsgwidth: 600,
        everyFinishList: {
            title : {
                show: false,
                
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['已完成','未完成']
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
        demandLevelList: [],
        finishTimemwidth: 400,
        finishTimeList: {
            title : {
                show: false,
                
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                bottom: 0,
                left: 'center',
                data:[]
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
                        normal : {
                            label : {
                                position : 'inner',
                                formatter: "{d}% /{c}"
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        },
        demandTypeListwidth: 400,
        demandTypeList : {
             title : {
                show: false,
                
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                bottom: 0,
                left: 'center',
                data:[]
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
                        normal : {
                            label : {
                                position : 'inner',
                                formatter: "{d}% /{c}"
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
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
                return list.dicType == "demand_type"
            })


            return demand_type[0]
        },
        staffvalueshow() {
            let string = '请选择部门'

            if (this.search.departname.length > 12 || this.search.departname.length == 12) {
                string = this.search.departname.substr(0, 12) + '...'
            } else if (this.search.departname.length>0 && this.search.departname.length<12) {
                string = this.search.departname
            }

            return string
        },
        getstatus() {
            let demand_status = this.getpageDict.filter((list) => {
                return list.dicType == "demand_status"
            })

            return demand_status[0]
        },
    },
    created() {
        
    },
    mounted(){ 
    	this.$nextTick(()=>{
      		this.tableheight = this.$refs.wraptab.offsetHeight - 72


            
      	})

        
        this.get_group_list()
        this.getdata()

        

    },
    methods:{
        clear() {
           this.search.departname = ''
           this.search.departids = []

           this.getdata()
        },
        staffsave() {
          let checkData = this.$refs.staff.getCheckedNodes()

          //console.info(checkData)

          this.search.departids = []
          this.search.departname = ''
          

          for (let i=0;i<checkData.length;i++) {
            if (!checkData[i].list) {
                this.search.departids.push(checkData[i].groupId)
              
                this.search.departname += checkData[i].groupName+','
            }


          }




          

      },
        get_group_list() {
            this.$http.get('group/get_group_list')
                .then((data)=>{
                    if (data.code = '200') {
                        
                        
                        this.leftdata = data.data




                    }
                })
                .catch(()=>{
                    this.$message({
                      message: '接口报错',
                      type: 'error'
                    })
                })
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
        getdata() {
            let that = this
            this.$http.post('demand/find_all_demand_report',{
                start: this.search.start ? this.search.start.getTime().toString().substr(0, 10): '',
                end: this.search.end ? this.search.end.getTime().toString().substr(0, 10):'',
                groupIds: this.search.departids.length>0 ? this.search.departids.join(','): '',

                //"start":1,
                //"end":1577058500
            })
            .then((data)=>{
               console.info(data)
               if (data.code == 200) {
                //总任务
                let total = 0
                    for (let i=0; i<data.data.allDemandList.length; i++) {
                      total += data.data.allDemandList[i].num
                      data.data.allDemandList[i].name = this.tablestatus(data.data.allDemandList[i].status)

                    }

                    for (let i=0; i<data.data.allDemandList.length; i++) {
                        data.data.allDemandList[i].progress = (data.data.allDemandList[i].num/total).toFixed(2)*100
                    }

                    this.allDemandList.list = data.data.allDemandList
                    this.allDemandList.total = total



                    //demandLevelList排名

                    this.demandLevelList = data.data.demandLevelList
                    this.everyFinishList.xAxis[0].data = []
                    this.everyFinishList.series[0].data = []
                    this.everyFinishList.series[1].data = []



                    //个人看板 everyFinishList
                    for (let i=0; i<data.data.demandLevelList.length; i++) {
                        this.everyFinishList.xAxis[0].data.push(data.data.demandLevelList[i].staffName)

                         this.everyFinishList.series[0].data.push(data.data.demandLevelList[i].finishNum)

                         this.everyFinishList.series[1].data.push(data.data.demandLevelList[i].onTheWayNum)

                         //this.everyFinishList.series[1].data.push(10)


                    }


                    //return console.info(this.everyFinishList)

                    if (everyFinishmsg) {
                        everyFinishmsg.dispose()
                        everyFinishmsg = null
                    }


                    this.everyFinishmsgwidth = data.data.demandLevelList.length*100


                    
                    this.$nextTick(()=>{
                            everyFinishmsg = echarts.init(document.getElementById('chart_everyFinishList'))
                            everyFinishmsg.setOption(this.everyFinishList)
                    })





                    //console.info(this.everyFinishList)



                    //finishTimeList 时长看板


                    
                        this.finishTimeList.series[0].data = []
                        this.finishTimeList.legend.data = []
                        for (let i=0; i<data.data.finishTimeList.length; i++) {
                                this.finishTimeList.series[0].data.push({value:data.data.finishTimeList[i].hour,name: data.data.finishTimeList[i].staffName})
                                this.finishTimeList.legend.data.push(data.data.finishTimeList[i].staffName)
                            
                            
                        }

                        this.finishTimemwidth = data.data.finishTimeList.length * 80

                        //console.info(this.finishTimemwidth)

                        if (finishTimemsg) {
                            finishTimemsg.dispose()
                            finishTimemsg = null
                        }

                        this.$nextTick(()=>{
                            finishTimemsg = echarts.init(document.getElementById('chart_finishTimemsge'))
                            finishTimemsg.setOption(this.finishTimeList)
                        })




                    //demandTypeList 需求看板

                    for (let i=0; i<data.data.demandTypeList.length; i++) {
                      data.data.demandTypeList[i].name = this.tabledemand_type(data.data.demandTypeList[i].demandType)

                    }
                        this.demandTypeList.series[0].data = []
                        this.demandTypeList.legend.data = []
                        for (let i=0; i<data.data.demandTypeList.length; i++) {
                                this.demandTypeList.series[0].data.push({value:data.data.demandTypeList[i].num,name: data.data.demandTypeList[i].name})
                                this.demandTypeList.legend.data.push(data.data.demandTypeList[i].name)
                            
                            
                        }

                        this.demandTypeListwidth = data.data.demandTypeList.length * 100
                        if (demandtypemsg) {
                            demandtypemsg.dispose()
                            demandtypemsg = null
                        }



                        this.$nextTick(()=>{
                            demandtypemsg = echarts.init(document.getElementById('chart_example'))
                            demandtypemsg.setOption(this.demandTypeList)
                        })







               }
            

            })
            .catch(function (error) {
                console.log(error);
                that.$message({
                    message: '接口报错',
                    type: 'error'
                  });
            }) 

        }
    },
  }
</script>

<style scoped lang="less">
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
		height: calc(100vh - 154px);

		&-left {
			min-width: 920px;
            max-width: 920px;
			height: 100%;
			float: left;

			&-one {
				width: 48%;
				height: 49%;
				display: inline-block;
				background: rgba(255, 255, 255, 0.85);
				padding: 10px;
				position: relative;

                .workdiv {
                    width: 100%;
                    padding: 20px;
                    padding-bottom: 0px;

                    p {
                        margin-bottom: 10px;
                        font-size: 16px;

                    }
                }

                .ranklist {
                    margin-bottom: 10px;
                    padding: 20px;
                    padding-bottom: 0px;
                    font-size: 16px;
                    position: relative;

                    &-spansecond {
                        position: absolute;
                        right: 120px;
                    }
                    &-spanthird {
                        position: absolute;
                        right: 40px;
                    }
                }

                .ranktitle {
                    position: relative;

                    &-spansecond {
                        position: absolute;
                        right: 94px;
                        font-weight: normal;
                        font-size: 16px;
                    }
                    &-spanthird {
                        position: absolute;
                        right: 14px;
                        font-weight: normal;
                        font-size: 16px;
                    }
                }
				

				&.two {
					margin-right: 11px;
				
				}

				&.three {
					margin-top: 8px;
				}

				.title {
					height: 46px;
					line-height: 46px;
                    font-weight: 600;
					border-bottom: 1px solid #dcdfe6;
					margin-left: 20px;
                    margin-right: 20px;
					font-size: 20px;
				}

				.wrap {
					width: 100%;
					height: 80%;
					overflow: scroll;
				}
			}




		}

		&-right {
			width: calc(100vw - 940px);
			float: right;

			height: 99%;
			background: rgba(255, 255, 255, 0.85);

            .title {
                    height: 46px;
                    line-height: 46px;
                    border-bottom: 1px solid #dcdfe6;
                    padding-left: 20px;
                    font-size: 20px;
                }
		}
	}
}
  
</style>
