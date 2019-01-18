/*用户信息 企业信息*/
import Vue from 'vue'
import Cookies from 'js-cookie'
const state = {
  //用户信息
  userInfo: {},
  //用户企业信息
  userCompany: {},
  
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

}



const actions = {
//获取所有用户信息
  /*getUserBaseInfo(context, router) {
    Vue.$httpBasis.get('base_info/erp_base_info',{
      headers:{
        cid: Cookies.get('cid'),
        uid: Cookies.get('uid'),
        token: Cookies.get('token'),
      }
    })
    .then((data) => {

      if (data) {
        if (data.code === 100000) {
          context.commit('setUserInfo', data.data.staffBaseInfo)

          context.commit('setUserCompany', data.data.companyBaseInfo)

          context.commit('setJurisdiction', data.data.personalAuth)

          Vue.$http.get('common_info/get_all_common_info')
            .then((data) => {
              if (data.code === 100000) {
                
                context.commit('setmealTypeColorMap', data.data.mealTypeColorMap)
              }
              
            })




        } else if (data.code > 100 && data.code<199) {
          Cookies.remove('cid')
          Cookies.remove('uid')
          Cookies.remove('token')
          router.push('/login')

        }
      }
    })
  }*/
}

export default {
  state,
  getters,
  mutations,
  actions
}
