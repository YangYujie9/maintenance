import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/login',
      component: resolve => require(['@/view/index'],resolve),
      children: [
        {
          path: '/setting',
          name: 'setting', 
          redirect: '/setting/auth-setting',
          component: resolve => require(['@/view/setting/index'], resolve),
          children: [
            
            {
              path: '/setting/auth-setting',
              name: 'auth-setting',
              component: resolve => require(['@/view/setting/auth-setting/index'],resolve), 
            },

          ]
        },
        {
          path: '/report',
          name: 'report',
          component: resolve => require(['@/view/report_form/index'],resolve),
          children: [
              {
                path: '/reportcangchu/cangchu',
                name: 'cangchu',
                component: resolve => require(['@/view/report_form/cangchu/index'],resolve),
              },
              
              {
                path: '/reportcangchu/importsearch',
                name: 'importsearch',
                component: resolve => require(['@/view/report_form/cangchu/importsearch'],resolve),
              },
              {
                path: '/reportpinkong/pinkong',
                name: 'pinkong',
                component: resolve => require(['@/view/report_form/cangchu/pinkong'],resolve),
              },
              {
                path: '/reportthree/threecheck',
                name: 'threecheck',
                component: resolve => require(['@/view/report_form/cangchu/threecheck'],resolve),
              },
          ],
        },
        {
          path: '/maintenance/demonsion',
          name: 'maintenancedemonsion',
          component: resolve => require(['@/view/operation_maintenance/maintenance_type'],resolve),
        },
        {
          path: '/report_list',
          name: 'report_list',
          component: resolve => require(['@/view/report_form/report'],resolve),
        },
        {
          path: '/maintenance',
          name: 'maintenance', 
          component: resolve => require(['@/view/operation_maintenance/index'],resolve),
          children: [
              {
                path: '/maintenance/data_center',
                name: 'data_center',
                component: resolve => require(['@/view/operation_maintenance/data_center'],resolve),
              },
              {
                path: '/maintenance/approve',
                name: 'approve',
                component: resolve => require(['@/view/operation_maintenance/approve'],resolve),
              },
              
          ],
        },
        {
          path: '/project',
          name: 'project', 
          component: resolve => require(['@/view/project/index'],resolve),
          children: [
            {
              path: '/project/project_list',
              name: 'project_list',
              component: resolve => require(['@/view/project/project_list'],resolve),
            },
            {
              path: '/project/project_index',
              name: 'project_index',
              component: resolve => require(['@/view/project/project_index'],resolve),
            },
            {
              path: '/project/mission',
              name: 'mission',
              component: resolve => require(['@/view/project/mission'],resolve),
            },
            {
              path: '/project/mission_board',
              name: 'mission_board',
              component: resolve => require(['@/view/project/mission_board'],resolve),
            },
          ]
        },
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../view/login'],resolve),
    },
    
    {
      path: '/demonsion',
      name: 'demonsion',
      component: resolve => require(['../view/demonsion'],resolve),
    },
  ]
})