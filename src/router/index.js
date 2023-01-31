import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    children: [
      {
        path: 'test',
        name: 'test',
        component: () => import('@/views/test.vue')
      },
      {
        path: 'reportFileTable',
        name: 'reportFileTable',
        component: () => import('@/views/normativeReport/reportFile/reportFileTable.vue')
      },
      {
        path: 'reportFileForm',
        name: 'reportFileForm',
        component: () => import('@/views/normativeReport/reportFile/reportFileForm.vue')
      },
      {
        path: 'directorySubmitTable',
        name: 'directorySubmitTable',
        component: () => import('@/views/normativeReport/directorySubmit/directorySubmitTable.vue')
      },
      {
        path: 'directorySubmitForm',
        name: 'directorySubmitForm',
        component: () => import('@/views/normativeReport/directorySubmit/directorySubmitForm.vue')
      },
      {
        path: 'outSidePlan',
        name: 'outSidePlan',
        component: () => import('@/views/plan/outSidePlan.vue')
      },
      {
        path: 'planDetail',
        name: 'planDetail',
        component: () => import('@/views/plan/planDetail.vue')
      },
      {
        path: 'legislationCollect',
        name: 'legislationCollect',
        component: () => import('@/views/legislationCollect/index.vue')
      },
      {
        path: 'legislationCollectDetail',
        name: 'legislationCollectDetail',
        component: () => import('@/views/legislationCollect/components/detail.vue')
      },
      {
        path: 'planManage',
        name: 'planManage',
        component: () => import('@/views/planManage')
      },
      {
        path: 'taskAdmin',
        name: 'taskAdmin',
        component: () => import('@/views/legislativeAssessment/taskAdmin')
      },
      {
        path: 'taskAdminDetail',
        name: 'taskAdminDetail',
        component: () => import('@/views/legislativeAssessment/taskAdmin/Detail.vue')
      }
    ],
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },

  
  // {
  //   path: '/team',
  //   name: 'team',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('@/views/team')
  // },
  // {
  //   path: '/reportFileTable',
  //   name: 'reportFileTable',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('@/views/normativeReport/reportFile/reportFileTable.vue')
  // },
  // {
  //   path: '/reportFileForm',
  //   name: 'reportFileForm',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('@/views/normativeReport/reportFile/reportFileForm.vue')
  // },
  // {
  //   path: '/directorySubmitTable',
  //   name: 'directorySubmitTable',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('@/views/normativeReport/directorySubmit/directorySubmitTable.vue')
  // },
  

  //路由重定向
  {
    path: '/',
    redirect: '/main/reportFileTable'
  },
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
