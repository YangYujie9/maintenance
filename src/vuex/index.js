import Vuex from 'vuex'
import Vue from 'vue'




import person from './person/person'
Vue.use(Vuex)

export default new Vuex.Store({
  	modules: {
      person
  	}
})
