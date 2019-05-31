<template>
    <div class="dataview">
       <div class="dataview-top">
       	{{title}}
       </div>
       <div class="dataview-wrap">
	       <div @mouseenter="center_datasetting('wareCountList_option','ware')" ref="dataview_wrap" class="dataview-wrap-left one">
	       		<div class="title">
	       			总款数统计图

	       			<p class="p-icon">
	       				<i @click="compare_type_change('ware')" class="iconfont iconfont-data icon-fsux_tubiao_duibitu"></i>
	       				<i @click="showbigger_wareCountList_ok('ware')" class="iconfont iconfont-data icon-weibiaoti-"></i>
	       				<i @click="wareCountList_change('ware')"  class="iconfont iconfont-data icon-qiehuan"></i>
	       				<i @click="listdatashow('wareCountList')" class="iconfont iconfont-data icon-riqi"></i>
	       			</p>
	       		</div>
	       		<div :style="{height: wrapheight+'px'}" id="wareCountList_chart">
	       			
	       		</div>
	       </div>
	       <div  @mouseenter="center_datasetting('orderCountList_option','orderNum')" class="dataview-wrap-left two">
	       		<div class="title">
	       			总下单量统计图

	       			<p class="p-icon">
	       				<i @click="compare_type_change('order')" class="iconfont iconfont-data icon-fsux_tubiao_duibitu"></i>
	       				<i @click="showbigger_wareCountList_ok('order')" class="iconfont iconfont-data icon-weibiaoti-"></i>
	       				<i @click="wareCountList_change('order')"  class="iconfont iconfont-data icon-qiehuan"></i>
	       				<i @click="listdatashow('orderCountList')" class="iconfont iconfont-data icon-riqi"></i>
	       			</p>
	       		</div>
	       		<div :style="{height: wrapheight+'px'}" id="orderCountList_chart">
	       			
	       		</div>
	       </div>
	       <div class="dataview-wrap-left three">
	       		<div class="title">
	       			总货期统计图

	       			<p class="p-icon p-icon-small">
	       				<i @click="compare_type_qiehuan_change('deliveryTimeList')" class="iconfont iconfont-data icon-fsux_tubiao_duibitu"></i>

	       				<i @click="showbigger_wareCountList_qiehuan_ok('deliveryTimeList_option')" class="iconfont iconfont-data icon-weibiaoti-"></i>
	       				<i @click="listdatashow('deliveryTimeList')" class="iconfont iconfont-data icon-riqi"></i>
	       				
	       			</p>
	       		</div>
	       		<div :style="{height: wrapheight+'px'}" id="deliveryTimeList_chart">
	       			
	       		</div>
	       </div>

	       <div class="dataview-wrap-right one">
	       		<div class="title">
	       			总成本统计图

	       			<p class="p-icon p-icon-small">
	       				<i @click="compare_type_qiehuan_change('costList')" class="iconfont iconfont-data icon-fsux_tubiao_duibitu"></i>

	       				<i @click="showbigger_wareCountList_qiehuan_ok('costList_option')" class="iconfont iconfont-data icon-weibiaoti-"></i>
	       				<i @click="listdatashow('costList')" class="iconfont iconfont-data icon-riqi"></i>
	       				
	       			</p>
	       		</div>
	       		<div :style="{height: wrapheight+'px'}" id="costList_chart">
	       			
	       		</div>
	       </div>
	       <div class="dataview-wrap-right two">
	       		<div class="title">
	       			平均总售价

	       			
	       		</div>
	       		<div style="display: flex;justify-content: center;align-items: center;" :style="{height: wrapheight+'px'}" >
	       			<span style="font-size: 28px;font-weight: 700;color: #ffcc00;position: relative;top: -20px;">{{yellowtotal}}</span>
	       		</div>
	       </div>
	       <div class="dataview-wrap-right three">
	       		<div class="title">
	       			平均退货率

	       			<p class="p-icon">
	       				<i @click="compare_type_change('returnRateList')" class="iconfont iconfont-data icon-fsux_tubiao_duibitu"></i>
	       				<i @click="showbigger_wareCountList_ok('returnRateList')" class="iconfont iconfont-data icon-weibiaoti-"></i>
	       				<i @click="wareCountList_change('returnRateList')"  class="iconfont iconfont-data icon-qiehuan"></i>
	       				<i @click="listdatashow('returnRateList')" class="iconfont iconfont-data icon-riqi"></i>
	       			</p>
	       		</div>

	       		<div :style="{height: wrapheight+'px'}" id="returnRateListCountList_chart">
	       			
	       		</div>

	       </div>
	       
	       <div class="dataview-wrap-center">
	       		<div class="dataview-wrap-center-shai">
	       			<el-popover
					  placement="bottom"
					  width="380"
					  trigger="click">
					  <div class="big-date">
	             		<span :class="{active: searchdata.type == 'year'}" @click="searchdata.type = 'year'" class="year">年</span>
	             		<span :class="{active: searchdata.type == 'month'}" @click="searchdata.type = 'month'" class="year">月</span>
	             		 <div style="margin-top: 16px;">
	             		 	<el-date-picker
						      v-model="searchdata.start"
						      :type="searchdata.type"
						      size="mini"
						      style="width: 110px;"
						      placeholder="选择时间">
						    </el-date-picker>-<el-date-picker
						      v-model="searchdata.end"
						      :type="searchdata.type"
						      size="mini"
						      style="width: 110px;"
						      placeholder="选择时间">
						    </el-date-picker>

						    <el-button size="mini" @click="getdata" style="margin-left: 10px" type="primary">搜索</el-button>
						</div>
	             	</div>
					  <i slot="reference" class="iconfont iconfont-data icon-qiehuan"></i>
					</el-popover>

	       			<i @click="centerdata.dialogVisible=true" class="iconfont iconfont-data icon-riqi"></i>
	       		</div>

	       		<div style="height: 100%;width: 100%"  id="wareCountList_chart_center">
	       			
	       		</div>
	    	</div>


       </div>

       <el-dialog
          :title="listdata[listdata.type].title"
          :visible.sync="totalmoney.dialogVisible"
          width="740px"
          class="visualdialogVisible"
          :close-on-click-modal="false"

          >
          <div class="firststopwrap">
             <table>
			  <tr class="head">
			    <th>{{listdata[listdata.type].head0}}</th>
			    <th>{{listdata[listdata.type].head1}}</th>
			  </tr>
			  <tr v-for="list in listdata[listdata.type].data">
			    <td>{{list.name}}</td>
			    <td>{{list.count}}</td>
			  </tr>
			</table> 
              
          </div>

          
        </el-dialog>

        

        <el-dialog
          title="查看明细"
          :visible.sync="wareCountList_showbigger.dialogVisible"
          width="90%"
          class="visualdialogVisiblebigger"
          :close-on-click-modal="false"

          >
          <div class="title visualdialogVisiblebigger" slot="title">
          		<p class="p-icon">
       				<i  @click="wareCountList_showbigger.dialogVisible = false" class="iconfont iconfont-data icon-weibiaoti-"></i>
       				<i v-if="qiehuan" @click="wareCountList_bigger_change" class="iconfont iconfont-data icon-qiehuan"></i>
       				
       			</p>
          </div>
          <div id="wareCountList_bigger_chart" style="height: 600px;" class="firststopwrap">
             
              
          </div>

          
        </el-dialog>

        <el-dialog
          title="查看明细"
          :visible.sync="wareCountList_compare.dialogVisible"
          width="90%"
          class="visualdialogVisiblebigger"
          :close-on-click-modal="false"

          >
          <div class="title visualdialogVisiblebigger" slot="title">
          		<p class="p-icon">
       				
       				<i v-show="wareCountList_compare.qiehuan" @click="compare_counttype" class="iconfont iconfont-data icon-qiehuan"></i>
       				<i  @click="wareCountList_compare.dialogVisible = false" class="iconfont iconfont-data icon-weibiaoti-"></i>
       				
       			</p>
          </div>
          <div style="height: 600px;" class="firststopwrap">
             <div class="compare-left">
             	<div class="compare-left-title">
             		{{this.compare_setting[this.wareCountList_compare.compare_type].title}}
             	</div>
             	<div class="compare-left-date">
             		<span :class="{active: wareCountList_compare.wareCountList_compare_date_type == 'year'}" @click="wareCountList_compare.wareCountList_compare_date_type = 'year'" class="year">年</span>
             		<span :class="{active: wareCountList_compare.wareCountList_compare_date_type == 'month'}" @click="wareCountList_compare.wareCountList_compare_date_type = 'month'" class="year">月</span>
             		 <div style="margin-top: 16px;">
             		 	<el-date-picker
					      v-model="wareCountList_compare.leftsearch_start"
					      :type="wareCountList_compare.wareCountList_compare_date_type"
					      size="mini"
					      style="width: 110px;"
					      placeholder="选择时间">
					    </el-date-picker>-<el-date-picker
					      v-model="wareCountList_compare.leftsearch_end"
					      :type="wareCountList_compare.wareCountList_compare_date_type"
					      size="mini"
					      style="width: 110px;"
					      placeholder="选择时间">
					    </el-date-picker>

					    <el-button size="mini" @click="compare_search('left')" style="margin-left: 10px" type="primary">搜索</el-button>
					</div>
             	</div>
             	<div style="height: 470px;" id="wareCountList_compare_chart_left">
             		
             	</div>
             </div>
             <div class="compare-left compare-right">
             	<div class="compare-left-title">
             		{{this.compare_setting[this.wareCountList_compare.compare_type].title}}
             	</div>
             	<div class="compare-left-date">
             		<span :class="{active: wareCountList_compare.wareCountList_compare_date_type == 'year'}" @click="wareCountList_compare.wareCountList_compare_date_type = 'year'" class="year">年</span>
             		<span :class="{active: wareCountList_compare.wareCountList_compare_date_type == 'month'}" @click="wareCountList_compare.wareCountList_compare_date_type = 'month'" class="year">月</span>
             		 <div style="margin-top: 16px;">
             		 	<el-date-picker
					      v-model="wareCountList_compare.rightsearch_start"
					      :type="wareCountList_compare.wareCountList_compare_date_type"
					      size="mini"
					      style="width: 110px;"
					      placeholder="选择时间">
					    </el-date-picker>-<el-date-picker
					      v-model="wareCountList_compare.rightsearch_end"
					      :type="wareCountList_compare.wareCountList_compare_date_type"
					      size="mini"
					      style="width: 110px;"
					      placeholder="选择时间">
					    </el-date-picker>
					    <el-button size="mini" @click="compare_search('right')" style="margin-left: 10px" type="primary">搜索</el-button>
					</div>
             	</div>
             	<div style="height: 470px;" id="wareCountList_compare_chart_right">
             		
             	</div>
             </div>
              
          </div>

          
        </el-dialog>

        <el-dialog
          title="汇总"
          :visible.sync="centerdata.dialogVisible"
          width="1190px"
          class="visualdialogVisible"
          :close-on-click-modal="false"

          >
          <div class="firststopwrap">
             <table class="big_td">
			  <tr class="head">
			    <td>服装类型</td>
			    <td>供应链</td>
			    <td>计数项：款数</td>
			    <td>求和量：下单量</td>
			    <td>平均值项：总货期</td>
			    <td>平均值项：成本</td>
			    <td>平均值项：售价</td>
			    <td>平均值项：累计退货率</td>
			  </tr>
			  
			</table> 
              <tr v-for="list in center_arr">
			    <td>{{list.clothName}}</td>
			    <td>{{list.supply}}</td>
			    <td>{{list.wareNum}}</td>
			    <td>{{list.orderNum}}</td>
			    <td>{{list.deliveryTime}}</td>
			    <td>{{list.cost}}</td>
			    <td>{{list.price}}</td>
			    <td>{{list.returnRate}}</td>
			  </tr>
          </div>

          
        </el-dialog>

       
       
    </div>
</template>

<script>
import echarts from 'echarts'
import { mapGetters } from 'vuex'
let wareCountList_msg
let wareCountList_bigger_msg
let wareCountList_compare_chart_left_msg
let wareCountList_compare_chart_right_msg

let orderCountList_msg
let orderCountList_compare_chart_left_msg
let orderCountList_compare_chart_right_msg

let deliveryTimeList_msg

let costList_msg

let returnRateListCountList_msg
let returnRateListCountList_compare_chart_left_msg
let returnRateListCountList_compare_chart_right_msg

let centeroption_msg


let axisLine_setting = {
							show: false,
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#fff',//左边线的颜色
		                        width:'1'//坐标线的宽度
		                    }
		                }

let axisLabel_setting = {
                    textStyle: {
                        color: '#fff',//坐标值得具体的颜色
 
                    }
                }
let grid_setting =  { 
			      x: '40px',
			      x2: '40px',
			      y: '40px',
			      y2: '40px'
			    }
let itemStyle_setting = {
	normal: {
	    color: function(params) {
	        
	        return '#d7b11b'
	    },
	    label: {
	        show: true,
	        position: 'top',
	        formatter: '{c}'
	    }
	}
}

let axisTick_setting = {
	show: false
}

export default {
    name: "index",
    components: {
    },
    data(){
        return{
        	searchdata: {
        		start: new Date(),
        		end: new Date(),
        		type: 'year'
        	},
        	center_arr: [],
        	centerdata: {
        		dialogVisible: false,
        	},
        	yellowtotal: 0,
        	qiehuan: true,
        	centeroption: {
			    tooltip: {
			        trigger: 'item',
			        formatter: "{b}: {c} ({d}%)"
			    },
			    title: {
			        text: '供应链总款数排数',
			        x: 'center',
			        color: "#ffffff",
			        textStyle: {
	                    color: '#ffffff',//坐标值得具体的颜色
	                },
			        label: {
			        	textStyle: {
		                    color: '#ffffff',//坐标值得具体的颜色

		                },
			        },
			        
			        y: '26%'
			    },
			    color: ["#8157e9","#00d98c","#fcb62a","#00e3ec"],
			    legend: {
			        orient: 'vertical',
			        x: 'left',
			        textStyle: {
			            color: '#ffffff'
			        },
			        data:[]
			    },
			    grid: {
			        left: '20%',
			        right: '20%',
			        bottom: '20%',
			        top: '30%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'value',
			            show: false
			        }
			    ],
			    yAxis : [
			        {
			            type : 'category',

			            data : [],
			            axisLine: axisLine_setting,
			            axisLabel: {
			            	textStyle: {
			                    color: '#fff',//坐标值得具体的颜色

			                },
				            
				        }
			        }
			    ],
			    series: [
			         {
			            name:'直接访问',
			            type:'bar',
			            backgroundColor: '#0057ff',
			            barWidth: '16px',
			            data:[]
			        },
			        {
			            name:'',
			            type:'pie',
			            radius: ['100%', '80%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                },
			                emphasis: {
			                    show: true,
			                    textStyle: {
			                        fontSize: '30',
			                        fontWeight: 'bold'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:[
			                
			            ]
			        }
			    ]
			},
        	totalmoney: {
        		dialogVisible: false,
        	},
        	wareCountList_showbigger: {
        		dialogVisible: false,
        		type: 'ware'
        	},
        	
        	wareCountByTimeList_flag: false,
        	orderCountByTimeList_option: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	deliveryTimeList_option: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,

			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	costList_option: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,

			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	deliveryTimeList_option_left: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	costList_option_left: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	costList_option_right: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	deliveryTimeList_option_right: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	wareCountByTimeList_option: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	wareCountByTimeList_option_left: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,

			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	wareCountByTimeList_option_right: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	orderCountByTimeList_option_right: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	orderCountByTimeList_option_left: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	wareCountList_option: {
        		title : {
			     	show: false,
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			      	show: false,
			      	y: '1%',
			    },
			    grid: grid_setting,
			    toolbox: {
			        show : false,
			        
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            axisLine: axisLine_setting,
			            axisLabel: axisLabel_setting,
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine: {
			            	show: false,
			            },
			            axisLine: axisLine_setting,
			            axisTick: axisTick_setting,
			            axisLabel: {
			            	textStyle: {
			                    color: '#fff',//坐标值得具体的颜色

			                },
				            formatter: function (value){
				                
				                return (value)+"款"
				            },
				        }

			            
			        }
			    ],
			    series : [
						       
			        {
			            type:'bar',
			            itemStyle: {
			                normal: {
			　　　　　　　　　　　　　　//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
			                    color: function(params) {
			                        
			                        return '#d7b11b'
			                    },
			                    label: {
			                        show: true,
			                        position: 'top',
			//                             formatter: '{c}'
			                        formatter: '{b}\n{c}'
			                    }
			                }
			            },
			            barWidth:'16px',
			            data:[]
			        }
			    ]
        	},
        	wareCountList_option_left: {
        		title : {
			     	show: false,
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			      	show: false,
			      	y: '1%',
			    },
			    grid: grid_setting,
			    toolbox: {
			        show : false,
			        
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            axisLine: axisLine_setting,
			            axisLabel: axisLabel_setting,
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine: {
			            	show: false,
			            },
			            axisLine: axisLine_setting,
			            axisTick: axisTick_setting,
			            axisLabel: {
			            	textStyle: {
			                    color: '#fff',//坐标值得具体的颜色

			                },
				            formatter: function (value){
				                
				                return (value)+"款"
				            },
				        }

			            
			        }
			    ],
			    series : [
						       
			        {
			            type:'bar',
			            itemStyle: {
			                normal: {
			　　　　　　　　　　　　　　//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
			                    color: function(params) {
			                        
			                        return '#d7b11b'
			                    },
			                    label: {
			                        show: true,
			                        position: 'top',
			//                             formatter: '{c}'
			                        formatter: '{b}\n{c}'
			                    }
			                }
			            },
			            barWidth:'16px',
			            data:[]
			        }
			    ]
        	},
        	orderCountList_option_left: {
        		title : {
			     	show: false,
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			      	show: false,
			      	y: '1%',
			    },
			    grid: grid_setting,
			    toolbox: {
			        show : false,
			        
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            axisLine: axisLine_setting,
			            axisLabel: axisLabel_setting,
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine: {
			            	show: false,
			            },
			            axisLine: axisLine_setting,
			            axisTick: axisTick_setting,
			            axisLabel: {
			            	textStyle: {
			                    color: '#fff',//坐标值得具体的颜色

			                },
				            formatter: function (value){
				                
				                return (value)+"款"
				            },
				        }

			            
			        }
			    ],
			    series : [
						       
			        {
			            type:'bar',
			            itemStyle: {
			                normal: {
			　　　　　　　　　　　　　　//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
			                    color: function(params) {
			                        
			                        return '#d7b11b'
			                    },
			                    label: {
			                        show: true,
			                        position: 'top',
			//                             formatter: '{c}'
			                        formatter: '{b}\n{c}'
			                    }
			                }
			            },
			            barWidth:'16px',
			            data:[]
			        }
			    ]
        	},
        	orderCountList_option_right: {
        		title : {
			     	show: false,
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			      	show: false,
			      	y: '1%',
			    },
			    grid: grid_setting,
			    toolbox: {
			        show : false,
			        
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            axisLine: axisLine_setting,
			            axisLabel: axisLabel_setting,
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine: {
			            	show: false,
			            },
			            axisLine: axisLine_setting,
			            axisTick: axisTick_setting,
			            axisLabel: {
			            	textStyle: {
			                    color: '#fff',//坐标值得具体的颜色

			                },
				            formatter: function (value){
				                
				                return (value)+"款"
				            },
				        }

			            
			        }
			    ],
			    series : [
						       
			        {
			            type:'bar',
			            itemStyle: {
			                normal: {
			　　　　　　　　　　　　　　//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
			                    color: function(params) {
			                        
			                        return '#d7b11b'
			                    },
			                    label: {
			                        show: true,
			                        position: 'top',
			//                             formatter: '{c}'
			                        formatter: '{b}\n{c}'
			                    }
			                }
			            },
			            barWidth:'16px',
			            data:[]
			        }
			    ]
        	},
        	wareCountList_option_right: {
        		title : {
			     	show: false,
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			      	show: false,
			      	y: '1%',
			    },
			    grid: grid_setting,
			    toolbox: {
			        show : false,
			        
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            axisLine: axisLine_setting,
			            axisLabel: axisLabel_setting,
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine: {
			            	show: false,
			            },
			            axisLine: axisLine_setting,
			            axisTick: axisTick_setting,
			            axisLabel: {
			            	textStyle: {
			                    color: '#fff',//坐标值得具体的颜色

			                },
				            formatter: function (value){
				                
				                return (value)+"款"
				            },
				        }

			            
			        }
			    ],
			    series : [
						       
			        {
			            type:'bar',
			            itemStyle: {
			                normal: {
			　　　　　　　　　　　　　　//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
			                    color: function(params) {
			                        
			                        return '#d7b11b'
			                    },
			                    label: {
			                        show: true,
			                        position: 'top',
			//                             formatter: '{c}'
			                        formatter: '{b}\n{c}'
			                    }
			                }
			            },
			            barWidth:'16px',
			            data:[]
			        }
			    ]
        	},
        	returnRateList_option_left: {
        		title : {
			     	show: false,
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			      	show: false,
			      	y: '1%',
			    },
			    grid: grid_setting,
			    toolbox: {
			        show : false,
			        
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            axisLine: axisLine_setting,
			            axisLabel: axisLabel_setting,
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine: {
			            	show: false,
			            },
			            axisLine: axisLine_setting,
			            axisTick: axisTick_setting,
			            axisLabel: {
			            	textStyle: {
			                    color: '#fff',//坐标值得具体的颜色

			                },
				            formatter: function (value){
				                
				                return (value)
				            },
				        }

			            
			        }
			    ],
			    series : [
						       
			        {
			            type:'bar',
			            itemStyle: {
			                normal: {
			　　　　　　　　　　　　　　//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
			                    color: function(params) {
			                        
			                        return '#d7b11b'
			                    },
			                    label: {
			                        show: true,
			                        position: 'top',
			//                             formatter: '{c}'
			                        formatter: '{b}\n{c}'
			                    }
			                }
			            },
			            barWidth:'16px',
			            data:[]
			        }
			    ]
        	},
        	returnRateList_option_right: {
        		title : {
			     	show: false,
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			      	show: false,
			      	y: '1%',
			    },
			    grid: grid_setting,
			    toolbox: {
			        show : false,
			        
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            axisLine: axisLine_setting,
			            axisLabel: axisLabel_setting,
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine: {
			            	show: false,
			            },
			            axisLine: axisLine_setting,
			            axisTick: axisTick_setting,
			            axisLabel: {
			            	textStyle: {
			                    color: '#fff',//坐标值得具体的颜色

			                },
				            formatter: function (value){
				                
				                return (value)
				            },
				        }

			            
			        }
			    ],
			    series : [
						       
			        {
			            type:'bar',
			            itemStyle: {
			                normal: {
			　　　　　　　　　　　　　　//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
			                    color: function(params) {
			                        
			                        return '#d7b11b'
			                    },
			                    label: {
			                        show: true,
			                        position: 'top',
			//                             formatter: '{c}'
			                        formatter: '{b}\n{c}'
			                    }
			                }
			            },
			            barWidth:'16px',
			            data:[]
			        }
			    ]
        	},
        	orderCountList_option: {
        		title : {
			     	show: false,
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			      	show: false,
			      	y: '1%',
			    },
			    grid: grid_setting,
			    toolbox: {
			        show : false,
			        
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            axisLine: axisLine_setting,
			            axisLabel: axisLabel_setting,
			            axisTick: axisTick_setting,
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine: {
			            	show: false,
			            },
			            axisLine: axisLine_setting,
			            axisTick: axisTick_setting,
			            axisLabel: {
			            	textStyle: {
			                    color: '#fff',//坐标值得具体的颜色

			                },
				            formatter: function (value){
				                
				                return (value)+"件"
				            },
				        }

			            
			        }
			    ],
			    series : [
						       
			        {
			            type:'bar',
			            itemStyle: {
			                normal: {
			　　　　　　　　　　　　　　//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
			                    color: function(params) {
			                        
			                        return '#d7b11b'
			                    },
			                    label: {
			                        show: true,
			                        position: 'top',
			//                             formatter: '{c}'
			                        formatter: '{b}\n{c}'
			                    }
			                }
			            },
			            barWidth:'16px',
			            data:[]
			        }
			    ]
        	},
        	returnRateListCountByTimeList_option: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	returnRateByTimeList_option_right: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	returnRateByTimeList_option_left: {
        		xAxis: {
			        type: 'category',
			        axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            axisTick: axisTick_setting,
			        data: []
			    },
			    legend: {
			        data:[],
			        textStyle: {
			        	color: '#ffffff'
			        },
			    },
			    yAxis: {
			    	axisLine: axisLine_setting,
		            axisLabel: axisLabel_setting,
		            splitLine: {
		            	show: false,
		            },
			        type: 'value'
			    },
			    grid: grid_setting,
			    series: []
        	},
        	returnRateListCountList_option: {
        		title : {
			     	show: false,
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			      	show: false,
			      	y: '1%',
			    },
			    grid: grid_setting,
			    toolbox: {
			        show : false,
			        
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            axisLine: axisLine_setting,
			            axisLabel: axisLabel_setting,
			            axisTick: axisTick_setting,
			            data : []
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine: {
			            	show: false,
			            },
			            axisLine: axisLine_setting,
			            axisTick: axisTick_setting,
			            axisLabel: {
			            	textStyle: {
			                    color: '#fff',//坐标值得具体的颜色

			                },
				            formatter: function (value){
				                
				                return (value)+"件"
				            },
				        }

			            
			        }
			    ],
			    series : [
						       
			        {
			            type:'bar',
			            itemStyle: {
			                normal: {
			　　　　　　　　　　　　　　//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
			                    color: function(params) {
			                        
			                        return '#d7b11b'
			                    },
			                    label: {
			                        show: true,
			                        position: 'top',
			//                             formatter: '{c}'
			                        formatter: '{b}\n{c}'
			                    }
			                }
			            },
			            barWidth:'16px',
			            data:[]
			        }
			    ]
        	},
			wrapheight: 20,
			listdata: {
				type: 'wareCountList',
				wareCountList: {
					data: [],
					title: '查看明细（总款数）',
					head0:'服装类型',
					head1:'款数',
				},
				orderCountList: {
					data: [],
					title: '查看明细（总下单量）',
					head0:'服装类型',
					head1:'下单量',
				},
				deliveryTimeList: {
					data: [],
					title: '查看明细（总货期）',
					head0:'服装类型',
					head1:'天数',
				},
				costList: {
					data: [],
					title: '查看明细（总成本）',
					head0:'服装类型',
					head1:'天数',
				},
				returnRateList: {
					data: [],
					title: '查看明细（平均退货率）',
					head0:'服装类型',
					head1:'退货率',
				},
			},
			
			supply: '',
			orderType: '',
			title: '货源部整体看版',
			wareCountList_compare: {
        		dialogVisible: false,
        		leftsearch_start: new Date(),
        		leftsearch_end: new Date(),
        		rightsearch_start: new Date(),
        		rightsearch_end: new Date(),
        		wareCountList_compare_date_type: 'year',
        		compare_type: 'ware',
        		qiehuan: true
        	},
			compare_setting: {
				ware: {
					method: 'get_ware_count',
					left: true,
					title: '总款数',
					counttype: true,
					method_time: 'get_ware_count_by_time'
				},
				order: {
					method: 'get_order_count',
					left: true,
					title: '总下单量数',
					counttype: true,
					method_time: 'get_order_count_by_time'
				},
				deliveryTimeList: {
					method: 'get_deliver_time',
					left: true,
					title: '总货期',
					counttype: true,
					method_time: ''
				},
				costList: {
					method: 'get_cost',
					left: true,
					title: '总成本',
					counttype: true,
					method_time: ''
				},
				returnRateList: {
					method: 'get_return_rate',
					left: true,
					title: '退货率',
					counttype: true,
					method_time: 'get_return_rate_by_time'
				},
			},
			centeroption_type: 'ware'
        }
    },
    computed: {
        ...mapGetters([
            'getpageDict',
            'getstaffVO',
            'getflagdemand'
        ]),
        cloth_type() {
            let demand_type = this.getpageDict.filter((list) => {
                return list.dicType == "cloth_type"
            })

            //console.info(demand_type[0])


            return demand_type[0].dicList
        },
        visual_supply() {
            let demand_type = this.getpageDict.filter((list) => {
                return list.dicType == "visual_supply"
            })

            //console.info(demand_type[0])


            return demand_type[0].dicList
        },
        orderType_flag() {
        	
        	if (this.orderType || (!this.orderType && !this.supply)) {
        		return true
        	} else {
        		return false
        	} 
        	

        	

        }
    },
    created() {
       
    },
    mounted(){
    	this.wrapheight = this.$refs.dataview_wrap.offsetHeight-40

    	

    	this.getdata()
    	//this.get_ware_count()
    },
    methods:{
    	listdatashow(type) {
    		this.listdata.type = type
    		this.totalmoney.dialogVisible = true
    	},
    	compare_type_change(type) {
    		this.wareCountList_compare.compare_type = type
    		this.wareCountList_compare.qiehuan = true
    		this.wareCountList_compare.dialogVisible = true
    		this.compare_search('left')
    	},
    	compare_type_qiehuan_change(type) {
    		this.wareCountList_compare.compare_type = type
    		this.wareCountList_compare.qiehuan = false
    		this.wareCountList_compare.dialogVisible = true
    		this.compare_search('left')
    	},
    	wareCountList_change(type) {


    		let vara = eval(type+'CountList_msg')
    		


      		if (vara) {
                vara.dispose()
                vara = null
            }

            vara = echarts.init(document.getElementById(`${type}CountList_chart`))

            this.$nextTick(()=>{
            	if (this.wareCountByTimeList_flag) {
            		
    				vara.setOption(this[`${type}CountList_option`])
            	} else {
            		vara.setOption(this[`${type}CountByTimeList_option`])
            	}

      			
			})


			this.wareCountByTimeList_flag = !this.wareCountByTimeList_flag
      	},
      	showbigger_wareCountList_qiehuan_ok(type) {
      		this.qiehuan = false


      		if (wareCountList_bigger_msg) {
                wareCountList_bigger_msg.dispose()
                wareCountList_bigger_msg = null
            }
           	this.wareCountList_showbigger.dialogVisible = true

            this.$nextTick(()=>{
            	wareCountList_bigger_msg = echarts.init(document.getElementById('wareCountList_bigger_chart'))
    			wareCountList_bigger_msg.setOption(this[type])
            	
			})

      	},
    	showbigger_wareCountList_ok(type) {
    		this.qiehuan = true


      		this.wareCountList_showbigger.type = type
      		if (wareCountList_bigger_msg) {
                wareCountList_bigger_msg.dispose()
                wareCountList_bigger_msg = null
            }
           	this.wareCountList_showbigger.dialogVisible = true

            this.$nextTick(()=>{
            	 wareCountList_bigger_msg = echarts.init(document.getElementById('wareCountList_bigger_chart'))
            	if (!this.wareCountByTimeList_flag) {
    				wareCountList_bigger_msg.setOption(this[`${type}CountList_option`])
            	} else {
            		wareCountList_bigger_msg.setOption(this[`${type}CountByTimeList_option`])
            	}

            	

      			
			})


			//this.wareCountByTimeList_flag = !this.wareCountByTimeList_flag
      	},
      	wareCountList_bigger_change() {


			if (wareCountList_bigger_msg) {
                wareCountList_bigger_msg.dispose()
                wareCountList_bigger_msg = null
            }
            this.$nextTick(()=>{
            	 wareCountList_bigger_msg = echarts.init(document.getElementById('wareCountList_bigger_chart'))
            	if (!this.wareCountByTimeList_flag) {
    				wareCountList_bigger_msg.setOption(this[`${this.wareCountList_showbigger.type}CountList_option`])
            	} else {
            		wareCountList_bigger_msg.setOption(this[`${this.wareCountList_showbigger.type}CountByTimeList_option`])
            	}

            	

      			
			})


			this.wareCountByTimeList_flag = !this.wareCountByTimeList_flag
      	},
    	compare_counttype() {
    		this.compare_setting[this.wareCountList_compare.compare_type].counttype = !this.compare_setting[this.wareCountList_compare.compare_type].counttype

    		this.compare_search('left')
    	},
    	compare_search(type) {
    		if (type == 'left') {
    			this.compare_setting[this.wareCountList_compare.compare_type].left = true
    		}

    		if (type == 'right') {
    			this.compare_setting[this.wareCountList_compare.compare_type].left = false

    			
    		}

    		//console.info(this.wareCountList_compare.compare_type)

    		if (this.compare_setting[this.wareCountList_compare.compare_type].counttype) {
    			let method = this.compare_setting[this.wareCountList_compare.compare_type].method

    			this[method]()
    		} else {
    			let method = this.compare_setting[this.wareCountList_compare.compare_type].method_time

    			this[method]()
    		}

    		

    	},
    	get_cost() {
    		let start = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_start: this.wareCountList_compare.rightsearch_start

    		let end = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_end: this.wareCountList_compare.rightsearch_end

    		if (this.wareCountList_compare.wareCountList_compare_date_type == 'year') {
    			start = new Date(new Date(start).getFullYear(),1,1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),11,1).getTime().toString().substr(0, 10)
    		} else {
    			start = new Date(new Date(start).getFullYear(),new Date(start).getMonth(),1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),new Date(end).getMonth(),1).getTime().toString().substr(0, 10)
    		}

    		
    		this.$http.post(`visual_report/get_cost`,{
    			start: 1546272000,
				end: 1604198354,
				supply: this.supply,
				orderType: this.orderType,
	        })
	        .then((data)=>{

	        	if (!data.data || !data.data.length) {
	        		return
	        	}
	        	if (this.orderType_flag) {

	        		if (this.compare_setting.costList.left) {
	        			this.costList_option_left.xAxis.data = []
		                this.costList_option_left.series = []
		                this.costList_option_left.legend.data = []

	        			for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })

				            this.costList_option_left.legend.data.push(demand_type[0].dicName)

				           	
				            let series = {
				            	name: demand_type[0].dicName,
						        data: [],
						        type: 'line'
						    }


				            //console.info(data.data.wareCountByTimeList[i].list)

				            for (let j=0;j<data.data[i].list.length;j++) {

				            	this.costList_option_left.xAxis.data.push(this.getyear_month(data.data[i].list[j].time))

				            	series.data.push(data.data[i].list[j].count)


				            }

				            this.costList_option_left.series.push(series)

		                	
				           

		                }


		                if (wareCountList_compare_chart_left_msg) {
	                        wareCountList_compare_chart_left_msg.dispose()
	                        wareCountList_compare_chart_left_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			wareCountList_compare_chart_left_msg = echarts.init(document.getElementById('wareCountList_compare_chart_left'))
		        			wareCountList_compare_chart_left_msg.setOption(this.costList_option_left)
	        			})








	        		} else {
	        			this.costList_option_right.xAxis.data = []
		                this.costList_option_right.series = []
		                this.costList_option_right.legend.data = []

	        			for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })

				            this.costList_option_right.legend.data.push(demand_type[0].dicName)

				           	
				            let series = {
				            	name: demand_type[0].dicName,
						        data: [],
						        type: 'line'
						    }


				            //console.info(data.data.wareCountByTimeList[i].list)

				            for (let j=0;j<data.data[i].list.length;j++) {

				            	this.costList_option_right.xAxis.data.push(this.getyear_month(data.data[i].list[j].time))

				            	series.data.push(data.data[i].list[j].count)


				            }

				            this.costList_option_right.series.push(series)

		                	
				           

		                }


		                if (wareCountList_compare_chart_right_msg) {
	                        wareCountList_compare_chart_right_msg.dispose()
	                        wareCountList_compare_chart_right_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			wareCountList_compare_chart_right_msg = echarts.init(document.getElementById('wareCountList_compare_chart_right'))
		        			wareCountList_compare_chart_right_msg.setOption(this.costList_option_right)
	        			})


	        		} 

	                
	                

	        	}
	        })
    	},
    	get_deliver_time() {
    		let start = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_start: this.wareCountList_compare.rightsearch_start

    		let end = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_end: this.wareCountList_compare.rightsearch_end

    		if (this.wareCountList_compare.wareCountList_compare_date_type == 'year') {
    			start = new Date(new Date(start).getFullYear(),1,1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),11,1).getTime().toString().substr(0, 10)
    		} else {
    			start = new Date(new Date(start).getFullYear(),new Date(start).getMonth(),1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),new Date(end).getMonth(),1).getTime().toString().substr(0, 10)
    		}

    		
    		this.$http.post(`visual_report/get_deliver_time`,{
    			start: 1546272000,
				end: 1604198354,
				supply: this.supply,
				orderType: this.orderType,
	        })
	        .then((data)=>{

	        	if (!data.data || !data.data.length) {
	        		return
	        	}
	        	if (this.orderType_flag) {

	        		if (this.compare_setting.deliveryTimeList.left) {
	        			this.deliveryTimeList_option_left.xAxis.data = []
		                this.deliveryTimeList_option_left.series = []
		                this.deliveryTimeList_option_left.legend.data = []

	        			for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })

				            this.deliveryTimeList_option_left.legend.data.push(demand_type[0].dicName)

				           	
				            let series = {
				            	name: demand_type[0].dicName,
						        data: [],
						        type: 'line'
						    }


				            //console.info(data.data.wareCountByTimeList[i].list)

				            for (let j=0;j<data.data[i].list.length;j++) {

				            	this.deliveryTimeList_option_left.xAxis.data.push(this.getyear_month(data.data[i].list[j].time))

				            	series.data.push(data.data[i].list[j].count)


				            }

				            this.deliveryTimeList_option_left.series.push(series)

		                	
				           

		                }


		                if (wareCountList_compare_chart_left_msg) {
	                        wareCountList_compare_chart_left_msg.dispose()
	                        wareCountList_compare_chart_left_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			wareCountList_compare_chart_left_msg = echarts.init(document.getElementById('wareCountList_compare_chart_left'))
		        			wareCountList_compare_chart_left_msg.setOption(this.deliveryTimeList_option_left)
	        			})








	        		} else {
	        			this.deliveryTimeList_option_right.xAxis.data = []
		                this.deliveryTimeList_option_right.series = []
		                this.deliveryTimeList_option_right.legend.data = []

	        			for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })

				            this.deliveryTimeList_option_right.legend.data.push(demand_type[0].dicName)

				           	
				            let series = {
				            	name: demand_type[0].dicName,
						        data: [],
						        type: 'line'
						    }


				            //console.info(data.data.wareCountByTimeList[i].list)

				            for (let j=0;j<data.data[i].list.length;j++) {

				            	this.deliveryTimeList_option_right.xAxis.data.push(this.getyear_month(data.data[i].list[j].time))

				            	series.data.push(data.data[i].list[j].count)


				            }

				            this.deliveryTimeList_option_right.series.push(series)

		                	
				           

		                }


		                if (wareCountList_compare_chart_right_msg) {
	                        wareCountList_compare_chart_right_msg.dispose()
	                        wareCountList_compare_chart_right_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			wareCountList_compare_chart_right_msg = echarts.init(document.getElementById('wareCountList_compare_chart_right'))
		        			wareCountList_compare_chart_right_msg.setOption(this.deliveryTimeList_option_right)
	        			})


	        		} 

	                
	                

	        	}
	        })
    	},
    	get_return_rate_by_time() {
    		let start = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_start: this.wareCountList_compare.rightsearch_start

    		let end = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_end: this.wareCountList_compare.rightsearch_end

    		if (this.wareCountList_compare.wareCountList_compare_date_type == 'year') {
    			start = new Date(new Date(start).getFullYear(),1,1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),11,1).getTime().toString().substr(0, 10)
    		} else {
    			start = new Date(new Date(start).getFullYear(),new Date(start).getMonth(),1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),new Date(end).getMonth(),1).getTime().toString().substr(0, 10)
    		}

    		
    		this.$http.post(`visual_report/get_return_rate_by_time`,{
    			start: 1546272000,
				end: 1604198354,
				supply: this.supply,
				orderType: this.orderType,
	        })
	        .then((data)=>{

	        	if (!data.data || !data.data.length) {
	        		return
	        	}
	        	if (this.orderType_flag) {

	        		if (this.compare_setting.returnRateList.left) {
	        			this.returnRateByTimeList_option_left.xAxis.data = []
		                this.returnRateByTimeList_option_left.series = []
		                this.returnRateByTimeList_option_left.legend.data = []

	        			for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })

				            this.returnRateByTimeList_option_left.legend.data.push(demand_type[0].dicName)

				           	
				            let series = {
				            	name: demand_type[0].dicName,
						        data: [],
						        type: 'line'
						    }


				            //console.info(data.data.wareCountByTimeList[i].list)

				            for (let j=0;j<data.data[i].list.length;j++) {

				            	this.returnRateByTimeList_option_left.xAxis.data.push(this.getyear_month(data.data[i].list[j].time))

				            	series.data.push(data.data[i].list[j].count)


				            }

				            this.returnRateByTimeList_option_left.series.push(series)

		                	
				           

		                }


		                if (wareCountList_compare_chart_left_msg) {
	                        wareCountList_compare_chart_left_msg.dispose()
	                        wareCountList_compare_chart_left_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			wareCountList_compare_chart_left_msg = echarts.init(document.getElementById('wareCountList_compare_chart_left'))
		        			wareCountList_compare_chart_left_msg.setOption(this.returnRateByTimeList_option_left)
	        			})








	        		} else {
	        			this.returnRateByTimeList_option_right.xAxis.data = []
		                this.returnRateByTimeList_option_right.series = []
		                this.returnRateByTimeList_option_right.legend.data = []

	        			for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })

				            this.returnRateByTimeList_option_right.legend.data.push(demand_type[0].dicName)

				           	
				            let series = {
				            	name: demand_type[0].dicName,
						        data: [],
						        type: 'line'
						    }


				            //console.info(data.data.wareCountByTimeList[i].list)

				            for (let j=0;j<data.data[i].list.length;j++) {

				            	this.returnRateByTimeList_option_right.xAxis.data.push(this.getyear_month(data.data[i].list[j].time))

				            	series.data.push(data.data[i].list[j].count)


				            }

				            this.returnRateByTimeList_option_right.series.push(series)

		                	
				           

		                }


		                if (wareCountList_compare_chart_right_msg) {
	                        wareCountList_compare_chart_right_msg.dispose()
	                        wareCountList_compare_chart_right_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			wareCountList_compare_chart_right_msg = echarts.init(document.getElementById('wareCountList_compare_chart_right'))
		        			wareCountList_compare_chart_right_msg.setOption(this.returnRateByTimeList_option_right)
	        			})


	        		} 

	                
	                

	        	}
	        })
    	},
    	get_ware_count_by_time() {
    		let start = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_start: this.wareCountList_compare.rightsearch_start

    		let end = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_end: this.wareCountList_compare.rightsearch_end

    		if (this.wareCountList_compare.wareCountList_compare_date_type == 'year') {
    			start = new Date(new Date(start).getFullYear(),1,1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),11,1).getTime().toString().substr(0, 10)
    		} else {
    			start = new Date(new Date(start).getFullYear(),new Date(start).getMonth(),1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),new Date(end).getMonth(),1).getTime().toString().substr(0, 10)
    		}

    		
    		this.$http.post(`visual_report/get_ware_count_by_time`,{
    			start: 1546272000,
				end: 1604198354,
				supply: this.supply,
				orderType: this.orderType,
	        })
	        .then((data)=>{

	        	if (!data.data || !data.data.length) {
	        		return
	        	}
	        	if (this.orderType_flag) {

	        		if (this.compare_setting.ware.left) {
	        			this.wareCountByTimeList_option_left.xAxis.data = []
		                this.wareCountByTimeList_option_left.series = []
		                this.wareCountByTimeList_option_left.legend.data = []

	        			for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })

				            this.wareCountByTimeList_option_left.legend.data.push(demand_type[0].dicName)

				           	
				            let series = {
				            	name: demand_type[0].dicName,
						        data: [],
						        type: 'line'
						    }


				            //console.info(data.data.wareCountByTimeList[i].list)

				            for (let j=0;j<data.data[i].list.length;j++) {

				            	this.wareCountByTimeList_option_left.xAxis.data.push(this.getyear_month(data.data[i].list[j].time))

				            	series.data.push(data.data[i].list[j].count)


				            }

				            this.wareCountByTimeList_option_left.series.push(series)

		                	
				           

		                }


		                if (wareCountList_compare_chart_left_msg) {
	                        wareCountList_compare_chart_left_msg.dispose()
	                        wareCountList_compare_chart_left_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			wareCountList_compare_chart_left_msg = echarts.init(document.getElementById('wareCountList_compare_chart_left'))
		        			wareCountList_compare_chart_left_msg.setOption(this.wareCountByTimeList_option_left)
	        			})








	        		} else {
	        			this.wareCountByTimeList_option_right.xAxis.data = []
		                this.wareCountByTimeList_option_right.series = []
		                this.wareCountByTimeList_option_right.legend.data = []

	        			for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })

				            this.wareCountByTimeList_option_right.legend.data.push(demand_type[0].dicName)

				           	
				            let series = {
				            	name: demand_type[0].dicName,
						        data: [],
						        type: 'line'
						    }


				            //console.info(data.data.wareCountByTimeList[i].list)

				            for (let j=0;j<data.data[i].list.length;j++) {

				            	this.wareCountByTimeList_option_right.xAxis.data.push(this.getyear_month(data.data[i].list[j].time))

				            	series.data.push(data.data[i].list[j].count)


				            }

				            this.wareCountByTimeList_option_right.series.push(series)

		                	
				           

		                }


		                if (wareCountList_compare_chart_right_msg) {
	                        wareCountList_compare_chart_right_msg.dispose()
	                        wareCountList_compare_chart_right_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			wareCountList_compare_chart_right_msg = echarts.init(document.getElementById('wareCountList_compare_chart_right'))
		        			wareCountList_compare_chart_right_msg.setOption(this.wareCountByTimeList_option_right)
	        			})


	        		} 

	                
	                

	        	}
	        })
    	},
    	get_order_count_by_time() {
    		let start = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_start: this.wareCountList_compare.rightsearch_start

    		let end = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_end: this.wareCountList_compare.rightsearch_end

    		if (this.wareCountList_compare.wareCountList_compare_date_type == 'year') {
    			start = new Date(new Date(start).getFullYear(),1,1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),11,1).getTime().toString().substr(0, 10)
    		} else {
    			start = new Date(new Date(start).getFullYear(),new Date(start).getMonth(),1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),new Date(end).getMonth(),1).getTime().toString().substr(0, 10)
    		}

    		
    		this.$http.post(`visual_report/get_order_count_by_time`,{
    			start: 1546272000,
				end: 1604198354,
				supply: this.supply,
				orderType: this.orderType,
	        })
	        .then((data)=>{

	        	if (!data.data || !data.data.length) {
	        		return
	        	}
	        	if (this.orderType_flag) {

	        		if (this.compare_setting.order.left) {
	        			this.orderCountByTimeList_option_left.xAxis.data = []
		                this.orderCountByTimeList_option_left.series = []
		                this.orderCountByTimeList_option_left.legend.data = []

	        			for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })

				            this.orderCountByTimeList_option_left.legend.data.push(demand_type[0].dicName)

				           	
				            let series = {
				            	name: demand_type[0].dicName,
						        data: [],
						        type: 'line'
						    }


				            //console.info(data.data.wareCountByTimeList[i].list)

				            for (let j=0;j<data.data[i].list.length;j++) {

				            	this.orderCountByTimeList_option_left.xAxis.data.push(this.getyear_month(data.data[i].list[j].time))

				            	series.data.push(data.data[i].list[j].count)


				            }

				            this.orderCountByTimeList_option_left.series.push(series)

		                	
				           

		                }


		                if (orderCountList_compare_chart_left_msg) {
	                        orderCountList_compare_chart_left_msg.dispose()
	                        orderCountList_compare_chart_left_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			orderCountList_compare_chart_left_msg = echarts.init(document.getElementById('wareCountList_compare_chart_left'))
		        			orderCountList_compare_chart_left_msg.setOption(this.orderCountByTimeList_option_left)
	        			})








	        		} else {
	        			this.orderCountByTimeList_option_right.xAxis.data = []
		                this.orderCountByTimeList_option_right.series = []
		                this.orderCountByTimeList_option_right.legend.data = []

	        			for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })

				            this.orderCountByTimeList_option_right.legend.data.push(demand_type[0].dicName)

				           	
				            let series = {
				            	name: demand_type[0].dicName,
						        data: [],
						        type: 'line'
						    }


				            //console.info(data.data.wareCountByTimeList[i].list)

				            for (let j=0;j<data.data[i].list.length;j++) {

				            	this.orderCountByTimeList_option_right.xAxis.data.push(this.getyear_month(data.data[i].list[j].time))

				            	series.data.push(data.data[i].list[j].count)


				            }

				            this.orderCountByTimeList_option_right.series.push(series)

		                	
				           

		                }


		                if (orderCountList_compare_chart_right_msg) {
	                        orderCountList_compare_chart_right_msg.dispose()
	                        orderCountList_compare_chart_right_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			orderCountList_compare_chart_right_msg = echarts.init(document.getElementById('wareCountList_compare_chart_right'))
		        			orderCountList_compare_chart_right_msg.setOption(this.orderCountByTimeList_option_right)
	        			})


	        		} 

	                
	                

	        	}
	        })
    	},
    	get_ware_count() {
    		let start = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_start: this.wareCountList_compare.rightsearch_start

    		let end = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_end: this.wareCountList_compare.rightsearch_end

    		if (this.wareCountList_compare.wareCountList_compare_date_type == 'year') {
    			start = new Date(new Date(start).getFullYear(),1,1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),11,1).getTime().toString().substr(0, 10)
    		} else {
    			start = new Date(new Date(start).getFullYear(),new Date(start).getMonth(),1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),new Date(end).getMonth(),1).getTime().toString().substr(0, 10)
    		}

    		
    		this.$http.post(`visual_report/get_ware_count`,{
    			start: start,
				end: end,
				supply: this.supply,
				orderType: this.orderType,
	        })
	        .then((data)=>{

	        	if (!data.data || !data.data.length) {
	        		return
	        	}
	        	if (this.orderType_flag) {

	        		if (this.compare_setting.ware.left) {
	        			this.wareCountList_option_left.xAxis[0].data = []
		                this.wareCountList_option_left.series[0].data = []

		                for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })


				            this.wareCountList_option_left.xAxis[0].data.push(demand_type[0].dicName)
				            this.wareCountList_option_left.series[0].data.push({value:data.data[i].count,name:demand_type[0].dicName})
		                }

		                if (wareCountList_compare_chart_left_msg) {
	                        wareCountList_compare_chart_left_msg.dispose()
	                        wareCountList_compare_chart_left_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			wareCountList_compare_chart_left_msg = echarts.init(document.getElementById('wareCountList_compare_chart_left'))
		        			wareCountList_compare_chart_left_msg.setOption(this.wareCountList_option_left)
	        			})


	        		} else {
	        			this.wareCountList_option_right.xAxis[0].data = []
		                this.wareCountList_option_right.series[0].data = []

		                for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })


				            this.wareCountList_option_right.xAxis[0].data.push(demand_type[0].dicName)
				            this.wareCountList_option_right.series[0].data.push({value:data.data[i].count,name:demand_type[0].dicName})
		                }

		                if (wareCountList_compare_chart_right_msg) {
	                        wareCountList_compare_chart_right_msg.dispose()
	                        wareCountList_compare_chart_right_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			wareCountList_compare_chart_right_msg = echarts.init(document.getElementById('wareCountList_compare_chart_right'))
		        			wareCountList_compare_chart_right_msg.setOption(this.wareCountList_option_right)
	        			})

	        		}


	                
	                

	        	}
	        })
    	},
    	get_return_rate() {
    		let start = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_start: this.wareCountList_compare.rightsearch_start

    		let end = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_end: this.wareCountList_compare.rightsearch_end

    		if (this.wareCountList_compare.wareCountList_compare_date_type == 'year') {
    			start = new Date(new Date(start).getFullYear(),1,1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),11,1).getTime().toString().substr(0, 10)
    		} else {
    			start = new Date(new Date(start).getFullYear(),new Date(start).getMonth(),1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),new Date(end).getMonth(),1).getTime().toString().substr(0, 10)
    		}

    		
    		this.$http.post(`visual_report/get_return_rate`,{
    			start: start,
				end: end,
				supply: this.supply,
				orderType: this.orderType,
	        })
	        .then((data)=>{

	        	if (!data.data || !data.data.length) {
	        		return
	        	}
	        	if (this.orderType_flag) {

	        		if (this.compare_setting.returnRateList.left) {
	        			this.returnRateList_option_left.xAxis[0].data = []
		                this.returnRateList_option_left.series[0].data = []

		                for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })


				            this.returnRateList_option_left.xAxis[0].data.push(demand_type[0].dicName)
				            this.returnRateList_option_left.series[0].data.push({value:data.data[i].count,name:demand_type[0].dicName})
		                }

		                if (wareCountList_compare_chart_left_msg) {
	                        wareCountList_compare_chart_left_msg.dispose()
	                        wareCountList_compare_chart_left_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			wareCountList_compare_chart_left_msg = echarts.init(document.getElementById('wareCountList_compare_chart_left'))
		        			wareCountList_compare_chart_left_msg.setOption(this.returnRateList_option_left)
	        			})


	        		} else {
	        			this.returnRateList_option_right.xAxis[0].data = []
		                this.returnRateList_option_right.series[0].data = []

		                for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })


				            this.returnRateList_option_right.xAxis[0].data.push(demand_type[0].dicName)
				            this.returnRateList_option_right.series[0].data.push({value:data.data[i].count,name:demand_type[0].dicName})
		                }

		                if (wareCountList_compare_chart_right_msg) {
	                        wareCountList_compare_chart_right_msg.dispose()
	                        wareCountList_compare_chart_right_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			wareCountList_compare_chart_right_msg = echarts.init(document.getElementById('wareCountList_compare_chart_right'))
		        			wareCountList_compare_chart_right_msg.setOption(this.returnRateList_option_right)
	        			})

	        		}


	                
	                

	        	}
	        })
    	},
    	get_order_count() {
    		let start = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_start: this.wareCountList_compare.rightsearch_start

    		let end = this.compare_setting.ware.left ? this.wareCountList_compare.leftsearch_end: this.wareCountList_compare.rightsearch_end

    		if (this.wareCountList_compare.wareCountList_compare_date_type == 'year') {
    			start = new Date(new Date(start).getFullYear(),1,1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),11,1).getTime().toString().substr(0, 10)
    		} else {
    			start = new Date(new Date(start).getFullYear(),new Date(start).getMonth(),1).getTime().toString().substr(0, 10)
    			end = new Date(new Date(end).getFullYear(),new Date(end).getMonth(),1).getTime().toString().substr(0, 10)
    		}

    		
    		this.$http.post(`visual_report/get_order_count`,{
    			start: start,
				end: end,
				supply: this.supply,
				orderType: this.orderType,
	        })
	        .then((data)=>{

	        	if (!data.data || !data.data.length) {
	        		return
	        	}
	        	if (this.orderType_flag) {

	        		if (this.compare_setting.order.left) {
	        			this.orderCountList_option_left.xAxis[0].data = []
		                this.orderCountList_option_left.series[0].data = []

		                for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })


				            this.orderCountList_option_left.xAxis[0].data.push(demand_type[0].dicName)
				            this.orderCountList_option_left.series[0].data.push({value:data.data[i].count,name:demand_type[0].dicName})
		                }

		                if (orderCountList_compare_chart_left_msg) {
	                        orderCountList_compare_chart_left_msg.dispose()
	                        orderCountList_compare_chart_left_msg = null
	                    }

	                    this.$nextTick(()=>{

			      			orderCountList_compare_chart_left_msg = echarts.init(document.getElementById('wareCountList_compare_chart_left'))
		        			orderCountList_compare_chart_left_msg.setOption(this.orderCountList_option_left)
	        			})


	        		} else {
	        			this.orderCountList_option_right.xAxis[0].data = []
		                this.orderCountList_option_right.series[0].data = []

		                for (let i=0;i<data.data.length;i++) {
		                	let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].id
				            })


				            this.orderCountList_option_right.xAxis[0].data.push(demand_type[0].dicName)
				            this.orderCountList_option_right.series[0].data.push({value:data.data[i].count,name:demand_type[0].dicName})
		                }

		                if (orderCountList_compare_chart_right_msg) {
	                        orderCountList_compare_chart_right_msg.dispose()
	                        orderCountList_compare_chart_right_msg = null
	                    }
	                    this.$nextTick(()=>{

			      			orderCountList_compare_chart_right_msg = echarts.init(document.getElementById('wareCountList_compare_chart_right'))
		        			orderCountList_compare_chart_right_msg.setOption(this.orderCountList_option_right)
	        			})

	        		}


	                
	                

	        	}
	        })
    	},
    	center_datasetting(option,type) {

        	if (!this.orderType && !this.supply) {
            	this.centeroption.series[1].data = []


	    		this.centeroption.legend.data = this[option].xAxis[0].data
	    		this.centeroption_type=type


	    		for (let i=0;i<this[option].series[0].data.length;i++) {
	    			this.centeroption.series[1].data.push({...this[option].series[0].data[i],
	    				itemStyle: {
				            		
				        },

				    })
	    		}
            } else if (this.orderType) {
            	
            } else if (this.supply) {
            	this.centeroption.series[1].data = []
            }

    		
    		this.get_sort_list()
    	},
    	get_sort_list(type) {
    		this.$http.post(`visual_report/get_sort_list`,{
    			"start":1546272000,
				"end":1567267200,
	            type: this.centeroption_type,
				supply: this.supply,
				orderType: this.orderType,
	        })
	        .then((data)=>{
	        	this.centeroption.yAxis[0].data = []
	        	this.centeroption.series[0].data = []
	        	//用类型匹配

	        	let filter_tag = 'visual_supply'
	        	if (!this.orderType && !this.supply) {
	            	filter_tag = 'visual_supply'
	            } else if (this.orderType) {
	            	filter_tag = 'visual_supply'
	            } else if (this.supply) {
	            	filter_tag = 'cloth_type'
	            }
	        		for (let i=0;i<data.data.length;i++) {
	                	let demand_type = this[filter_tag].filter((list) => {
			                return list.dicCode == data.data[i].id
			            })

			            


	                	this.centeroption.yAxis[0].data.push(demand_type[0].dicName)
			            this.centeroption.series[0].data.push({
			            	value:data.data[i].count,
			            	itemStyle: {
			            		color: '#25bccf'
			            	}
			            	
			            })
	                }

	                //console.info(this.centeroption)

	                if (centeroption_msg) {
		                centeroption_msg.dispose()
		                centeroption_msg = null
		            }
		            

		            this.$nextTick(()=>{
		            	centeroption_msg = echarts.init(document.getElementById('wareCountList_chart_center'))	
		    			centeroption_msg.setOption(this.centeroption)
		    			let that = this


		    			centeroption_msg.on('click', function (params) {
						    /*let demand_type = that.cloth_type.filter((list) => {
				                return list.dicName == params.name
				            })

				            this.orderType = demand_type[0].dicCode
				            this.supply = ''*/

				            if (params.componentSubType == 'pie') {
				            	let demand_type = that.cloth_type.filter((list) => {
					                return list.dicName == params.name
					            })

					            that.orderType = demand_type[0].dicCode
					            that.supply = ''

					            that.getdata()
					            that.title = params.name + '类型看版'
				            } else if (params.componentSubType == 'bar') {
				            	let demand_type = that.visual_supply.filter((list) => {
					                return list.dicName == params.name
					            })

					            that.orderType = ''
					            that.supply = demand_type[0].dicCode
					            that.getdata()
					            that.title = '货源部'+params.name  + '看版'
				            }

				            //if(params.)


				            

						});

		            	

		      			
					})


	        	
	        })
    	},
      	
      	
      	
      	getyear_month(datea) {
    		let Month = new Date(datea*1000).getMonth() +1
    		let Year = new Date(datea*1000).getFullYear()

    		
    		

    		return `${Year}/${Month}`

    	},
    	get_price_avg() {
    		let that = this
	        this.$http.post(`visual_report/get_price_avg`,{
	            "start":1546272000,
				"end":1567267200,
				orderType: this.orderType,
	        })
	         .then((data)=>{
	         	this.yellowtotal = data.data
	         })
	                
    	},
    	visual_report_main_show() {
    		let that = this
	        this.$http.post(`visual_report/visual_report_main_show`,{
	            "start":1546272000,
				"end":1567267200,
				orderType: this.orderType,
	        })
	         .then((data)=>{
	         	//console.info(data)
	         	
	         	let arr = []
	         	let cost_t = 0
				let	deliveryTime_t = 0
				let	orderNum_t = 0
				let	price_t = 0
				let	returnRate_t = 0
				let	wareNum_t = 0
					
	         	for (let i=0;i<data.data.length;i++) {
	         		let clothName = ''

	         		if (data.data[i].clothType) {
	         			let demand_type = this.cloth_type.filter((list) => {
			                return list.dicCode == data.data[i].clothType
			            })
			            clothName = demand_type[0].dicName
	         		}
	         		let supply = ''

	         		if (data.data[i].supplyId) {
	         			let demand_type_s = this.visual_supply.filter((list) => {
			                return list.dicCode == data.data[i].supplyId
			            })
			            supply = demand_type_s[0].dicName
	         		}

	         		cost_t+=data.data[i].cost
	         		deliveryTime_t+=data.data[i].deliveryTime
	         		orderNum_t+=data.data[i].orderNum
	         		price_t+=data.data[i].price
	         		returnRate_t+=data.data[i].returnRate
	         		wareNum_t+=data.data[i].wareNum
	         		
	         		
		            arr.push({clothName: clothName,
		            		cost: data.data[i].cost,
							deliveryTime: data.data[i].deliveryTime,
							orderNum: data.data[i].orderNum,
							price: data.data[i].price,
							returnRate: data.data[i].returnRate,
							supplyId: data.data[i].supplyId,
							wareNum: data.data[i].wareNum,
							supply: supply
		            })



		            for (let j=0;j<data.data[i].list.length;j++) {
		            	let clothName = ''

		         		if (data.data[i].list[j].clothType) {
		         			let demand_type = this.cloth_type.filter((list) => {
				                return list.dicCode == data.data[i].list[j].clothType
				            })
				            clothName = demand_type[0].dicName
		         		}
		         		let supply = ''

		         		if (data.data[i].list[j].supplyId) {
		         			let demand_type_s = this.visual_supply.filter((list) => {
				                return list.dicCode == data.data[i].list[j].supplyId
				            })
				            supply = demand_type_s[0].dicName
		         		}

		         		cost_t+=data.data[i].list[j].cost
		         		deliveryTime_t+=data.data[i].list[j].deliveryTime
		         		orderNum_t+=data.data[i].list[j].orderNum
		         		price_t+=data.data[i].list[j].price
		         		returnRate_t+=data.data[i].list[j].returnRate
		         		wareNum_t+=data.data[i].list[j].wareNum

		         		arr.push({clothName: clothName,
		            		cost: data.data[i].list[j].cost,
							deliveryTime: data.data[i].list[j].deliveryTime,
							orderNum: data.data[i].list[j].orderNum,
							price: data.data[i].list[j].price,
							returnRate: data.data[i].list[j].returnRate,
							supplyId: data.data[i].list[j].supplyId,
							wareNum: data.data[i].list[j].wareNum,
							supply: supply
		            	})
		            }



	         	}

	         	arr.push({clothName: '汇总',
		            		cost: cost_t,
							deliveryTime: deliveryTime_t,
							orderNum: orderNum_t,
							price: price_t,
							returnRate: returnRate_t,
							supplyId: '',
							wareNum: wareNum_t,
							supply: ''
		            	})


	         	this.center_arr = arr
	         })
    	},
      	getdata() {
      		this.visual_report_main_show()
      		this.get_price_avg()
      		let that = this
	        this.$http.post(`visual_report/visual_report_show`,{
	            "start":1546272000,
				"end":1567267200,
				orderType: this.orderType,
	        })
	          .then((data)=>{
	                
	                //this.wareCountList_option = {...barsetting}
	            let filter_tag = ''

		            if (!this.orderType && !this.supply) {
		            	filter_tag = 'cloth_type'
		            } else if (this.orderType) {
		            	filter_tag = 'visual_supply'
		            } else if (this.supply) {
		            	filter_tag = 'cloth_type'
		            }

	                this.wareCountList_option.xAxis[0].data = []
	                this.wareCountList_option.series[0].data = []
	                this.listdata.wareCountList.data = []
	                let totalcount = 0
	                for (let i=0;i<data.data.wareCountList.length;i++) {
	                	let demand_type = this[filter_tag].filter((list) => {
			                return list.dicCode == data.data.wareCountList[i].id
			            })


			            this.wareCountList_option.xAxis[0].data.push(demand_type[0].dicName)
			            this.wareCountList_option.series[0].data.push({value:data.data.wareCountList[i].count,name:demand_type[0].dicName})

			            totalcount+=data.data.wareCountList[i].count
			           

			           this.listdata.wareCountList.data.push({name: demand_type[0].dicName,count: data.data.wareCountList[i].count})

	                }

	                this.listdata.wareCountList.data.push({name: '汇总',count: totalcount})

	                this.center_datasetting('wareCountList_option','ware')



	                if (wareCountList_msg) {
                        wareCountList_msg.dispose()
                        wareCountList_msg = null
                    }
                    this.$nextTick(()=>{

		      			wareCountList_msg = echarts.init(document.getElementById('wareCountList_chart'))
	        			wareCountList_msg.setOption(this.wareCountList_option)
        			})

                    this.wareCountByTimeList_option.xAxis.data = []
	                this.wareCountByTimeList_option.series = []
	                this.wareCountByTimeList_option.legend.data = []

        			for (let i=0;i<data.data.wareCountByTimeList.length;i++) {
	                	let demand_type = this[filter_tag].filter((list) => {
			                return list.dicCode == data.data.wareCountByTimeList[i].id
			            })

			            this.wareCountByTimeList_option.legend.data.push(demand_type[0].dicName)

			           	
			            let series = {
			            	name: demand_type[0].dicName,
					        data: [],
					        type: 'line'
					    }


			            //console.info(data.data.wareCountByTimeList[i].list)

			            for (let j=0;j<data.data.wareCountByTimeList[i].list.length;j++) {

			            	this.wareCountByTimeList_option.xAxis.data.push(this.getyear_month(data.data.wareCountByTimeList[i].list[j].time))

			            	series.data.push(data.data.wareCountByTimeList[i].list[j].count)


			            }

			            this.wareCountByTimeList_option.series.push(series)

	                	
			            //this.wareCountList_option.xAxis[0].data.push(demand_type[0].dicName)
			            //this.wareCountList_option.series[0].data.push(data.data.wareCountList[i].count)
			           

	                }


	                this.returnRateListCountList_option.xAxis[0].data = []
	                this.returnRateListCountList_option.series[0].data = []
	                this.listdata.returnRateList.data = []
	                let returnRateListtotalcount = 0
	                for (let i=0;i<data.data.returnRateList.length;i++) {
	                	let demand_type = this[filter_tag].filter((list) => {
			                return list.dicCode == data.data.returnRateList[i].id
			            })


			            this.returnRateListCountList_option.xAxis[0].data.push(demand_type[0].dicName)
			            this.returnRateListCountList_option.series[0].data.push({value:data.data.returnRateList[i].rate,name:demand_type[0].dicName})

			            returnRateListtotalcount+=data.data.returnRateList[i].rate

			           	this.listdata.returnRateList.data.push({name: demand_type[0].dicName,count: data.data.returnRateList[i].rate})

	                }



	                this.listdata.returnRateList.data.push({name: '汇总',count: returnRateListtotalcount})

	                //this.center_datasetting('orderCountList_option')

	                if (returnRateListCountList_msg) {
                        returnRateListCountList_msg.dispose()
                        returnRateListCountList_msg = null
                    }
                    this.$nextTick(()=>{

		      			orderCountList_msg = echarts.init(document.getElementById('returnRateListCountList_chart'))
	        			orderCountList_msg.setOption(this.returnRateListCountList_option)
        			})


        			this.returnRateListCountByTimeList_option.xAxis.data = []
	                this.returnRateListCountByTimeList_option.series = []
	                this.returnRateListCountByTimeList_option.legend.data = []

        			for (let i=0;i<data.data.returnRateByTimeList.length;i++) {
	                	let demand_type = this[filter_tag].filter((list) => {
			                return list.dicCode == data.data.returnRateByTimeList[i].id
			            })

			            this.returnRateListCountByTimeList_option.legend.data.push(demand_type[0].dicName)

			           	
			            let series = {
			            	name: demand_type[0].dicName,
					        data: [],
					        type: 'line'
					    }



			            for (let j=0;j<data.data.returnRateByTimeList[i].list.length;j++) {

			            	this.returnRateListCountByTimeList_option.xAxis.data.push(this.getyear_month(data.data.returnRateByTimeList[i].list[j].time))

			            	series.data.push(data.data.returnRateByTimeList[i].list[j].count)


			            }

			            this.returnRateListCountByTimeList_option.series.push(series)

	                	
			           
			           

	                

	            	}




	                this.orderCountList_option.xAxis[0].data = []
	                this.orderCountList_option.series[0].data = []
	                this.listdata.orderCountList.data = []
	                let ordertotalcount = 0
	                for (let i=0;i<data.data.orderCountList.length;i++) {
	                	let demand_type = this[filter_tag].filter((list) => {
			                return list.dicCode == data.data.orderCountList[i].id
			            })


			            this.orderCountList_option.xAxis[0].data.push(demand_type[0].dicName)
			            this.orderCountList_option.series[0].data.push({value:data.data.orderCountList[i].count,name:demand_type[0].dicName})

			           ordertotalcount+=data.data.orderCountList[i].count

			           	this.listdata.orderCountList.data.push({name: demand_type[0].dicName,count: data.data.orderCountList[i].count})

	                }

	                this.listdata.orderCountList.data.push({name: '汇总',count: ordertotalcount})

	                //this.center_datasetting('orderCountList_option')

	                if (orderCountList_msg) {
                        orderCountList_msg.dispose()
                        orderCountList_msg = null
                    }
                    this.$nextTick(()=>{

		      			orderCountList_msg = echarts.init(document.getElementById('orderCountList_chart'))
	        			orderCountList_msg.setOption(this.orderCountList_option)
        			})



        			this.orderCountByTimeList_option.xAxis.data = []
	                this.orderCountByTimeList_option.series = []
	                this.orderCountByTimeList_option.legend.data = []

        			for (let i=0;i<data.data.orderCountByTimeList.length;i++) {
	                	let demand_type = this[filter_tag].filter((list) => {
			                return list.dicCode == data.data.orderCountByTimeList[i].id
			            })

			            this.orderCountByTimeList_option.legend.data.push(demand_type[0].dicName)

			           	
			            let series = {
			            	name: demand_type[0].dicName,
					        data: [],
					        type: 'line'
					    }



			            for (let j=0;j<data.data.orderCountByTimeList[i].list.length;j++) {

			            	this.orderCountByTimeList_option.xAxis.data.push(this.getyear_month(data.data.orderCountByTimeList[i].list[j].time))

			            	series.data.push(data.data.orderCountByTimeList[i].list[j].count)


			            }

			            this.orderCountByTimeList_option.series.push(series)

	                	
			           
			           

	                

	            	}

	            	this.deliveryTimeList_option.xAxis.data = []
	                this.deliveryTimeList_option.series = []
	                this.deliveryTimeList_option.legend.data = []

	                let deliveryTimeList_count = 0

        			for (let i=0;i<data.data.deliveryTimeList.length;i++) {
	                	let demand_type = this[filter_tag].filter((list) => {
			                return list.dicCode == data.data.deliveryTimeList[i].id
			            })

			            this.deliveryTimeList_option.legend.data.push(demand_type[0].dicName)

			           	
			            let series = {
			            	name: demand_type[0].dicName,
					        data: [],
					        type: 'line'
					    }

					    let deliverycount = 0



			            for (let j=0;j<data.data.deliveryTimeList[i].list.length;j++) {

			            	this.deliveryTimeList_option.xAxis.data.push(this.getyear_month(data.data.deliveryTimeList[i].list[j].time))

			            	series.data.push(data.data.deliveryTimeList[i].list[j].count)

			            	deliverycount+=data.data.deliveryTimeList[i].list[j].count
			            

	                	}

	                	deliveryTimeList_count += deliverycount

	                	if (data.data.deliveryTimeList[i].list.length>0) {
	                		deliverycount = (deliverycount/data.data.deliveryTimeList[i].list.length).toFixed(0)
	                	}

	                	this.listdata.deliveryTimeList.data.push({name: demand_type[0].dicName,count: deliverycount})




	                	



			            this.deliveryTimeList_option.series.push(series)

	              

	            	}



	            	this.listdata.deliveryTimeList.data.push({name: '汇总',count: deliveryTimeList_count})



	            	if (deliveryTimeList_msg) {
                        deliveryTimeList_msg.dispose()
                        deliveryTimeList_msg = null
                    }
                    this.$nextTick(()=>{

		      			deliveryTimeList_msg = echarts.init(document.getElementById('deliveryTimeList_chart'))
	        			deliveryTimeList_msg.setOption(this.deliveryTimeList_option)
        			})





        			this.costList_option.xAxis.data = []
	                this.costList_option.series = []
	                this.costList_option.legend.data = []

	                let costList_count = 0

        			for (let i=0;i<data.data.costList.length;i++) {
	                	let demand_type = this[filter_tag].filter((list) => {
			                return list.dicCode == data.data.costList[i].id
			            })

			            this.costList_option.legend.data.push(demand_type[0].dicName)

			           	
			            let series = {
			            	name: demand_type[0].dicName,
					        data: [],
					        type: 'line'
					    }

					    let deliverycount = 0



			            for (let j=0;j<data.data.costList[i].list.length;j++) {

			            	this.costList_option.xAxis.data.push(this.getyear_month(data.data.costList[i].list[j].time))

			            	series.data.push(data.data.costList[i].list[j].count)

			            	deliverycount+=data.data.costList[i].list[j].count
			            

	                	}

	                	costList_count += deliverycount

	                	if (data.data.costList[i].list.length>0) {
	                		deliverycount = (deliverycount/data.data.costList[i].list.length).toFixed(0)
	                	}

	                	this.listdata.costList.data.push({name: demand_type[0].dicName,count: deliverycount})




	                	



			            this.costList_option.series.push(series)

	              

	            	}



	            	this.listdata.costList.data.push({name: '汇总',count: costList_count})



	            	if (costList_msg) {
                        costList_msg.dispose()
                        costList_msg = null
                    }
                    this.$nextTick(()=>{

		      			costList_msg = echarts.init(document.getElementById('costList_chart'))
	        			costList_msg.setOption(this.costList_option)
        			})









	                //console.info(this.wareCountList)

	             
	            })
	            .catch(function (error) {
	                console.log(error);
	                that.$message({
	                    message: '接口报错',
	                    type: 'error'
	                  });
	            }) 
      	},
    }
}
</script>
<style lang="less">
.big-date {
	width: 330px;
	margin: 0 auto;
	text-align: center;
	margin-bottom: 16px;
	.year {
		
		padding: 1px 40px;
		&.active {
			border-bottom: 1px solid #606266;
		}

	}



}
	.visualdialogVisiblebigger {
		.el-dialog__header {
			background: #434343;
			color: white;
			border: 0px;
			

			.title {
				height: 20px;
				line-height: 20px;
				position: relative;

				

				.p-icon {
		    		position:absolute;
		    		width: 60px;
		    		right: 0px;
		    		top: 0px;

		    		.iconfont-data {
		    			font-size: 18px;
		    			padding-right: 6px;

		    		}
		    	}
			}
		}

		.el-dialog__headerbtn {
			display: none;
		}

		.el-dialog__body {
			background: #434343;
			color: white;
			padding: 20px;

			.firststopwrap {
				width: 100%;
				height: 400px;

				

				.compare-left {
					width: 50%;
					height: 100%;
					float: left;
					border-right: 1px solid #ffffff;

					&-title {
						color: #f3cc00;
						font-size: 16px;
						padding-left: 40px;
						line-height: 46px;
						height: 40px;
					}

					&-date {
						width: 330px;
						margin: 0 auto;
						text-align: center;
						margin-bottom: 16px;
						.year {
							color: #ffffff;
							
							padding: 1px 40px;
							&.active {
								border-bottom: 1px solid #ffffff;
							}

						}



					}


				}

				.compare-right {
					float: right;
					border-right: 0px solid #ffffff;
				}
			}
		}
	}
	.visualdialogVisible {
		.el-dialog__header {
			background: #002965;
			color: white;

			.el-dialog__title {
				color: white;
			}

			.el-dialog__headerbtn .el-dialog__close {
				color: white;
				font-size: 18px;
			}


		}

		.el-dialog__body {
			background: #000066;

			table {
			    border-collapse: collapse;
			    width:100%;
			}

			.head {
				background: #006699;
				text-align: center;
				padding-left: 0px;
			}

			table, td, th {
			    border: 1px solid #ffffff;
			    color: #ffffff;
			    height: 40px;
			    padding-left: 16px;
			    line-height: 40px;


			}

			.head td {
			    border: 1px solid #ffffff;
			    color: #ffffff;
			    height: 40px;
			    padding-left: 0px;
			    line-height: 20px;


			}

			.big_td, td, th  {
			    min-width: 140px;
    			max-width: 140px;	
			}
		}
	}
</style>
<style spoced lang="less">
.dataview {
    height: calc(100vh - 0px);
    background: url("http://hzyymy.cn/bg_dataview.jpg") no-repeat center;
    background-size: cover;
    position: relative;
    padding-top: 40px;

    &-top {
    	width: 500px;
    	margin: 0 auto;
    	height: 80px;
    	color: #66ffff;
    	font-size: 2.8rem;
    	text-align: center;

    }


    &-wrap {
    	width: 100%;
    	position: relative;
    	height: calc(100vh - 40px);
    	position: relative;
    	top: -80px;

    	&-left {
	    	position: absolute;
	    	width: 30%;
	    	height: 32%;
	    	margin-top: 1%;
	    	left: 0px;
	    	background: rgba(255, 255, 255, 0.2);
	    	border: 1px solid rgba(255, 255, 255, 0.6);
	    	padding-top: 6px;

	    	&.two {
	    		top: 33%;
	    	}
	    	&.three {
	    		top: 66%;
	    	}

	    	
	    }

	    .title {
	    	height: 40px;
	    	line-height: 40px;
	    	position:relative;
	    	padding-left: 10px;
	    	font-size: 1.5em;
	    	color: white;


	    	.p-icon {
	    		position:absolute;
	    		width: 130px;
	    		right: 0px;
	    		top: 0px;

	    		.iconfont-data {
	    			font-size: 0.83em;
	    			padding-right: 4px;
	    		}
	    	}

	    	.p-icon-small {
	    		width: 100px;
	    	}
	    }

	    

	    &-right {
	    	position: absolute;
	    	width: 30%;
	    	height: 32%;
	    	margin-top: 1%;
	    	right: 0px;
	    	background: rgba(255, 255, 255, 0.2);
	    	border: 1px solid rgba(255, 255, 255, 0.6);
	    	padding-top: 6px;

	    	&.two {
	    		top: 33%;
	    	}
	    	&.three {
	    		top: 66%;
	    	}
	    }



	    &-center {
	    	width: 35%;
	    	height: 67%;
	    	z-index: 2;
	    	margin: 0 auto;
	    	position: relative;
	    	top: 16%;
	    	padding-top: 40px;


	    	.dataview-wrap-center-shai {
	    		position: absolute;

	    		width: 80px;
			    height: 30px;
			    top: -10px;
			    right: 0px;

			    i {
			    	font-size: 20px;
			    	color: #ffffff;
			    	padding-left: 10px;
			    }
	    	}

	    }

	    



    }

    

    
    

    
}
  
</style>
