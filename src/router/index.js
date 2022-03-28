import { createRouter, createWebHistory } from 'vue-router'
import HomePageView from '../views/HomePageView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductView from '../views/ProductView.vue'
import store from '../store'
import UserPageView from '../views/UserPageView.vue'

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
    },
    {
      path: '/user',
      name: 'UserPage',
      meta: {requiresAuth: true},
      component: UserPageView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth && !store.state.user.token) {
    next({name: 'LoginPage'});
  } else if (store.state.user.token && (to.name === 'LoginPage' || to.name === 'RegisterPage')) {
    next({name: 'HomePage'});
  } else {
    next();
  }
})

export default router
