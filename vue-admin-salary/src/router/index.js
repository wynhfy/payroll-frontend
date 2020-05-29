import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '员工工资管理后台',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/employee',  
    component: Layout,
    redirect: '/employee/list',
    name: '员工管理',
    meta: { title: '员工管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: '员工列表',
        component: () => import('@/views/payroll/employee/list'),
        meta: { title: '员工列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加员工',
        component: () => import('@/views/payroll/employee/save'),
        meta: { title: '添加员工', icon: 'tree' }
      },
      {
        //隐藏路由
        path: 'edit/:id',
        name: '编辑员工信息',
        component: () => import('@/views/payroll/employee/save'),
        meta: { title: '编辑员工信息', noCache:true },
        hidden:true
      }
    ]
  },


  {
    path: '/department',  
    component: Layout,
    redirect: '/department/table',
    name: '部门管理',
    meta: { title: '部门管理', icon: 'example'},
    children: [
      {
        path: 'table',
        name: '部门列表',
        component: () => import('@/views/payroll/department/list'),
        meta: { title: '部门列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加部门',
        component: () => import('@/views/payroll/department/save'),
        meta: { title: '添加部门', icon: 'tree' }
      },
      {
        //隐藏路由
        path: 'edit/:id',
        name: '编辑部门信息',
        component: () => import('@/views/payroll/department/save'),
        meta: { title: '编辑部门信息', noCache:true },
        hidden:true
      },
      {
        //隐藏路由
        path: 'list/:id',
        name: '部门员工列表',
        component: () => import('@/views/payroll/department/employeelist'),
        meta: { title: '部门员工列表', noCache:true },
        hidden:true
      },
      {
        //隐藏路由
        path: 'edit/:id/:deptId',
        name: '编辑员工信息',
        component: () => import('@/views/payroll/department/employee'),
        meta: { title: '编辑员工信息', noCache:true },
        hidden:true
      }
    ]
  },

  {
    path: '/salary',  
    component: Layout,
    redirect: '/salary/list',
    name: '工资管理',
    meta: { title: '工资管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: '工资列表',
        component: () => import('@/views/payroll/salary/list'),
        meta: { title: '工资列表', icon: 'table' }
      }
    ]
  },



  {
    path: '/address',  
    component: Layout,
    redirect: '/address/table',
    name: '住址管理',
    meta: { title: '住址管理', icon: 'form' },
    children: [
      {
        path: 'table',
        name: '住址列表',
        component: () => import('@/views/payroll/address/list'),
        meta: { title: '住址管理', icon: '住址管理' }
      }
    ]
  },

  {
    path: '/work',  
    component: Layout,
    redirect: '/work/list',
    name: '工种管理',
    meta: { title: '工种管理', icon: 'nested' },
    children: [
      {
        path: 'list',
        name: '工种列表',
        component: () => import('@/views/payroll/work/list'),
        meta: { title: '工种列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加工种',
        component: () => import('@/views/payroll/work/save'),
        meta: { title: '添加工种', icon: 'table' }
      }
    ]
  },

  {
    path: '/overWorkInfo',  
    component: Layout,
    redirect: '/overWorkInfo/list',
    name: '加班类别管理',
    meta: { title: '加班类别管理', icon: 'table' },
    children: [
      {
        path: 'list',
        name: '加班类别列表',
        component: () => import('@/views/payroll/overWorkInfo/list'),
        meta: { title: '加班类别列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加加班类别',
        component: () => import('@/views/payroll/overWorkInfo/save'),
        meta: { title: '添加加班类别', icon: 'table' }
      },
      {
        //隐藏路由
        path: 'edit/:id',
        name: '修改加班类别',
        component: () => import('@/views/payroll/overWorkInfo/save'),
        meta: { title: '修改加班类别信息', noCache:true },
        hidden:true
      }
    ]
  },

  {
    path: '/attendance',  
    component: Layout,
    redirect: '/attendance/list',
    name: '考勤记录',
    meta: { title: '考勤记录', icon: 'table' },
    children: [
      {
        path: 'list',
        name: '考勤记录',
        component: () => import('@/views/payroll/attendance/list'),
        meta: { title: '考勤记录', icon: '考勤记录' }
      }
    ]
  },

  {
    path: '/overWork',  
    component: Layout,
    redirect: '/overWork/list',
    name: '加班记录',
    meta: { title: '加班记录', icon: 'table' },
    children: [
      {
        path: 'list',
        name: '加班记录',
        component: () => import('@/views/payroll/overWork/list'),
        meta: { title: '加班记录', icon: '加班记录' }
      }
    ]
  },

  {
    path: '/account',  
    component: Layout,
    redirect: '/account/list',
    name: '账号管理',
    meta: { title: '账号管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: '账号管理',
        component: () => import('@/views/payroll/account/list'),
        meta: { title: '账号管理', icon: '账号' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
