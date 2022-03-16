import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '../views/HomePageView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePageView
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginView
    }
  ]
})

export default router
