<template>
  <div class="setting">

    
    <div class="wrap">

    	<!--<div class="left boxshadow">
    		<div class="btndislplay"><i class="el-icon-setting"></i>运维</div>
    		<div :class="{active: list.choose}" @click="changeRouter(index)" v-for="(list, index) in category" class="list cursor">
          <div v-if="list.choose" class="line"></div>
          {{list.name}}
        </div>
    	</div>-->
    	<!--设置路由-->
      <div class="right">
        <router-view class="right"/>
      </div>
    	
    </div>

    
  </div>
</template>

<script>

  export default {
    name: "system-setting",
    data(){
      return{
        category:[
          {
            name:'运维需求',
            link:'/maintenance/operation',
            choose: false
          }
        ]
      }
    },
    created() {
        
    },
    mounted(){ 
      
    },
    methods:{
      //选择档期
      changeRouter(index){
      	  	for (let i=0; i<this.category.length; i++) {
	          	this.category[i].choose = false
	      	}
	      	this.category[index].choose = true

        this.$router.push(this.category[index].link)
      },
    },
  }
</script>

<style scoped lang="less">
.setting {
    width:100%;
    font-size:14px; 
    

    .wrap {
    	display: flex;
    	flex: auto;
    	height: calc(100vh - 60px); 
    	
    	padding-top: 10px;
    	padding-left: 8px;
      	padding-right: 8px;
    	padding-bottom: 8px;

    	.left {
    		  flex: 0 200px;
        	height:100%; 
        	
        	border-radius: 3px;
        	margin-right: 10px;
        	.btndislplay {
        		height: 50px;
        		line-height: 50px;
        		padding-left: 20px;
            	margin-bottom: 4px;


            i {
              margin-right: 6px;
              font-size: 16px;
            }
        	}

        	.list {
        		width: 100%;
        		height: 50px;
            	line-height: 40px;
        		padding-top: 6px;
        		padding-left: 46px;
           		position: relative;

            .line {
              position: absolute;
              background: #0057ff;
              height: 100%;
              width: 3px;
              left: 0px;
              top: 0px;
            }



        		&.active {
        			background-color: rgb(218, 239, 255);
        		}
        	}
    	}

    	.right {
    		  flex: auto;
        	height:100%; 
        	width: calc(100vw - 20px);




	        
    	}

    }
}
  
</style>
