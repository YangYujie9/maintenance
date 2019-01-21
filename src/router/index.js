import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/old_passenger_maintenance',
      name: 'index',
      component: resolve => require(['@/view/index'], resolve), 
      children: [
      	{
          path: '/old_passenger_maintenance',
          name: 'old_passenger_maintenance',
          component: resolve => require(['@/view/old_passenger_maintenance/index'], resolve),
          children: [
            {
              path: '/old_cus_order',
              name: 'old_cus_order',
              component: resolve => require(['@/view/old_passenger_maintenance/old_cus_order'], resolve),
            },
            {
              path: '/gift_manage',
              name: 'gift_manage',
              component: resolve => require(['@/view/old_passenger_maintenance/gift_manage'], resolve),
            },
            {
              path: '/active_manage',
              name: 'active_manage',
              component: resolve => require(['@/view/old_passenger_maintenance/active_manage'], resolve),
            },
          ]
        },
      ]
    }
  ]
})