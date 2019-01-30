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
import exportAxios from './common/exporthttp' 
import store from './vuex'
Vue.use(ElementUI)
import Cookies from 'js-cookie'

//路由拦截
router.beforeEach((to, from, next) => {

    console.info(to.query)
    console.info('to.888')
   console.info(from.query)
   console.info('form.888')

    if (to.query.cid) {
        Cookies.remove('cid')
        Cookies.remove('uid')
        Cookies.remove('token')
        Cookies.set("token", to.query.token);
        Cookies.set("cid", to.query.cid);
        Cookies.set("uid", to.query.uid);
    }

    if (from.query.cid) {
        Cookies.remove('cid')
        Cookies.remove('uid')
        Cookies.remove('token')
        Cookies.set("token", from.query.token);
        Cookies.set("cid", from.query.cid);
        Cookies.set("uid", from.query.uid);
    }


    if (store.state.person.pageDict.channelMap) {
    } else {


      store.dispatch('getUserBaseInfo')
    }

    next()

    
 
})

Vue.$http = Vue.prototype.$http = erpAxios
Vue.$exporthttp = Vue.prototype.$exporthttp = exportAxios


Vue.config.productionTip = false 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'  
})
