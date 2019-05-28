<template>
    <div class="index-1">
    	<v-header/>
        <div class="router-wrap">
            <router-view/>
        </div>
    </div>
</template>

<script>
import vHeader from '@/components/v-header'


export default {
    name: "index",
    components: {
         'v-header': vHeader
    },
    data(){
        return{
        
        }
    },
    created() {
       
    },
    mounted(){
      
    },
    methods:{
      
    },
}
</script>

<style spoced lang="less">
.index-1 {
    height: calc(100vh - 0px);
    background: url("https://static.z.qiein.com/img/login/bg3green.png") no-repeat center;
    background-size: cover;

    .router-wrap {
        margin-top: 4px;
        height: calc(100vh - 64px);
        background: rgba(255, 255, 255, 0.7);
    }
}
  
</style>
