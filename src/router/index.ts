import VueRouter from 'vue-router'
// import { getToken } from '~/utils/auth' // getToken from cookie
// import { getUserInfo } from '~/api/user'

const routes = [
  { path: '/login', name: 'login', component: () => import('~/views/login.vue') },
  { path: '/signup', component: () => import('~/views/login/signup.vue') },
  { path: '/', component: () => import('~/views/index.vue') },
  { path: '/dashboard', component: () => import('~/views/Dashboard.vue') },
  { path: '/chartpanel/:id', component: () => import('~/views/ChartPanel.vue'), meta: { activeMenu: '/chartpanel/create' }},
  { path: '/fullscreendb/:id', component: () => import('~/views/Dashboard/fullScreenDb.vue') },
  { path: '/source', component: () => import('~/views/source/index.vue') },
  { path: '*', component: () => import('~/views/NotFound.vue') }
]

export const menuRoutes = routes


 const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })

const whiteList = ['/login', '/auth-redirect', '/signup']

// router.beforeEach(async(to, from, next) => {
//   if (store.state.user.username) {
//     if (to.name === 'login') {
//       next({ path: '/' })
//     } else {
//       next()
//     }
//   } else if (whiteList.includes(to.path)) { // 在免登录白名单，直接进入
//     next()
//   } else {
//     try {
//       await store.dispatch('user/GetUserInfo')
//       next()
//     } catch (err) {
//       next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
//     }
//   }
// })

export default router


