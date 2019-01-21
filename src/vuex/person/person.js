/*用户信息 企业信息*/
import Vue from 'vue'
import Cookies from 'js-cookie'
const state = {
  //用户信息
  userInfo: {},
  //用户企业信息
  userCompany: {},
  pageDict: {
    
  }
  
}

const getters = {
  userInfo: state => {
    return state.userInfo
  },
  userCompany: state => {
    return state.userCompany
  },
  getpageDict: state => {
    
    return state.pageDict
  },
  
}

const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  },
  setUserCompany(state, data) {

    state.userCompany = data
  },
  setpageDict(state, data) {

    state.pageDict = data
    //console.info(state.pageDict)
  }

}



const actions = {
//获取所有用户信息
  getUserBaseInfo(context, router) {
    Vue.$http.get('staff/base_info')
    .then((data) => {

        if (data.code === 100000) {
          context.commit('setpageDict', data.data.pageDict)

        }
      
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
