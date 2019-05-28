<template>
  <div class="setting">

    
    <div class="wrap">

    	<div class="left boxshadow">
    		<div class="btndislplay" style="font-size: 18px;">项目</div>
    		<div :class="{active: list.choose}" @click="changeRouter(index)" v-for="(list, index) in category" class="list cursor">
          <img style="width: 30px;position: relative;top: 8px;margin-right: 4px;" :src="list.icon"/>
          {{list.name}}
        </div>
    	</div>
    	<!--设置路由-->
      <div class="right">
        <router-view class="right boxshadow"/>
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
            name:'首页',
            link:'/project/project_index',
            icon: require('../../assets/index.png'),
            choose: true
          },
          {
            name:'项目',
            link:'/project/project_list',
            icon: require('../../assets/project.png'),
            choose: false
          },
          {
            name:'任务',
            link:'/project/mission',
            icon: require('../../assets/task.png'),
            choose: false
          },
          {
            name:'整体看版',
            link:'/project/mission_board',
            icon: require('../../assets/datalook.png'),
            choose: false
          }
        ]
      }
    },
    created() {
        
    },
    watch: {
      '$route'(value) {
        //console.info(this.$route.path)
        for (let i=0; i<this.category.length; i++) {
          if (value.path == this.category[i].link) {
            this.category[i].choose = true
          } else {
            this.category[i].choose = false
          }
        }

      }
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
    		  flex: 0 240px;
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
            line-height: 30px;
        		padding-top: 2px;
        		padding-left: 46px;
            position: relative;
            font-size: 16px;

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
        	width: calc(100vw - 250px);



	        
    	}

    }
}
  
</style>
