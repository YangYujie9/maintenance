/*用户信息 企业信息*/
import Vue from 'vue'
import Cookies from 'js-cookie'
const state = {
  //用户信息
  userInfo: {},
  //用户企业信息
  userCompany: {},
  pageDict: {
    channelMap: [],
    sourceMap: []
  }
  
}

const getters = {
  userInfo: state => {
    return state.userInfo
  },
  userCompany: state => {
    return state.userCompany
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
    state.pageDict.channelMap = data.channelMap
    state.pageDict.sourceMap = data.sourceMap
  }

}



const actions = {
//获取所有用户信息
  getUserBaseInfo(context, router) {
    Vue.$http.get('staff/base_info')
    .then((data) => {

        if (data.code === 100000) {
          //console.info(data)
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
