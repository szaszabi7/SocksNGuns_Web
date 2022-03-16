import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '../views/HomePageView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductView from '../views/ProductView.vue'

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
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterView
    },
    {
      path: '/product/:id',
      name: 'ProductPage',
      component: ProductView
    }
  ]
})

export default router
