// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './init.less'
import './reset.css'
import "./assets/font/iconfont.css"
import erpAxios from './common/http' 
import store from './vuex'
Vue.use(ElementUI)

//路由拦截
router.beforeEach((to, from, next) => {

    if (store.state.person.pageDict.channelMap) {
    } else {


      store.dispatch('getUserBaseInfo')
    }

    next()

    
 
})

Vue.$http = Vue.prototype.$http = erpAxios


Vue.config.productionTip = false 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'  
})
