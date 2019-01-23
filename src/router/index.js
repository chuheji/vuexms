import Vue from 'vue'
import Router from 'vue-router'
// 异步加载组件
const Login = () => import('@/components/login')
const Index = () => import('@/components/index')
const Home = () => import('@/components/home')
const Userlist = () => import('@/components/userlist')
const Useradd = ()=> import('@/components/useradd')
const Updatepwd = ()=> import('@/components/updatepwd')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/userlist',
          name: 'Userlist',
          component: Userlist
        },
        {
          path: '/useradd',
          name: 'Useradd',
          component: Useradd
        },
        {
          path: '/updatepwd',
          name: 'Updatepwd',
          component: Updatepwd
        },
        {
          path: '/home',
          name: 'Home',
          component: Home
        }
      ]
    }
  ]
})
