<template>
    <div class="index-1">
    	<v-header/>
        <router-view/>
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
    mounted(){
      
    },
    methods:{
      
    },
}
</script>

<style spoced lang="less">
.index-1 {
   
}
  
</style>
