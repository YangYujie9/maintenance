// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './init.less'
import './reset.css'
import erpAxios from './common/http'
import exportAxios from './common/exporthttp' 
import httpBasis from './common/httpBasis' 
import store from './vuex'
Vue.use(ElementUI)
import Cookies from 'js-cookie'




//路由拦截
router.beforeEach((to, from, next) => { 

	//console.info(store.state.person.pageDict)
	


    if( Cookies.get('cid') && Cookies.get('uid') && Cookies.get('token') ) {
    //console.info(store.state.person.userInfo.companyId)
      if (store.state.person.userInfo.staffId) {
      } else {

        store.dispatch('getUserBaseInfo',router)
      }

      if (to.path =='/login') {


        next({
          path: '/demonsion',
        })
      } else {

        next()
      }
    } else {

      if (to.path !='/login') {
        next({
          path: '/login',
        })
      } else {
        next()
      }

    }


    //console.info()

    next()
})

Vue.$isInArray = Vue.prototype.$isInArray = (value) => {
    for(var i = 0; i < store.state.person.powers.length; i++){
        if(value == store.state.person.powers[i]){

            return true;
        }
    }
    return false;
},


Vue.$http = Vue.prototype.$http = erpAxios
Vue.$exporthttp = Vue.prototype.$exporthttp = exportAxios
Vue.$httpBasis = Vue.prototype.$httpBasis = httpBasis


Vue.config.productionTip = false 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'  
})
