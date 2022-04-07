import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import HomePageView from '../views/HomePageView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProductView from '../views/ProductView.vue'
import UserPageView from '../views/UserPageView.vue'
import ProfileDeliveryAddress from '../components/UserProfile/ProfileDeliveryAddress.vue'
import ProfileOrders from '../components/UserProfile/ProfileOrders.vue'
import AdminPageView from '../views/AdminPageView.vue'
import AdminItems from '../components/Admin/AdminItems.vue'
import AdminUsers from '../components/Admin/AdminUsers.vue'
import AdminOrders from '../components/Admin/AdminOrders.vue'
import AdminNewProduct from '../components/Admin/AdminNewProduct.vue'
import AdminEditProduct from '../components/Admin/AdminEditProduct.vue'
import AdminCategories from '../components/Admin/AdminCategories.vue'
import AdminNewCategory from '../components/Admin/AdminNewCategory.vue'

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
      redirect: '/user/profile',
      name: 'UserPage',
      meta: {requiresAuth: true},
      component: UserPageView,
      children: [
        {
          path: 'profile',
          component: () => import('../components/UserProfile/ProfileInformation.vue'),
          name: 'ProfileInformationPanel'
        },
        {
          path: 'delivery_address',
          component: ProfileDeliveryAddress,
          name: 'ProfileDeliveryAddressPanel'
        },
        {
          path: 'orders',
          component: ProfileOrders,
          name: 'ProfileOrdersPanel'
        }
      ],
    },
    {
      path: '/admin',
      redirect: '/admin/dashboard',
      name: 'AdminPage',
      component: AdminPageView,
      //meta: {requiresAuth: true},
      children: [
        {
          path: 'dashboard',
          component: () => import('../components/Admin/AdminDashboard.vue'),
          name: 'AdminDashboardPanel'
        },
        {
          path: 'items',
          component: AdminItems,
          name: 'AdminItemsPanel'
        },
        {
          path: 'new-product',
          component: AdminNewProduct,
          name: 'AdminNewProductPanel'
        },
        {
          path: ':id/edit',
          component: AdminEditProduct,
          name: 'AdminEditProductPanel'
        },
        {
          path: 'categories',
          component: AdminCategories,
          name: 'AdminCategoriesPanel'
        },
        {
          path: 'new-category',
          component: AdminNewCategory,
          name: 'AdminNewCategoryPanel'
        },
        {
          path: 'users',
          component: AdminUsers,
          name: 'AdminUsersPanel'
        },
        {
          path: 'orders',
          component: AdminOrders,
          name: 'AdminOrdersPanel'
        },
        
      ],
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({name: 'LoginPage'});
  }  else if (store.state.user.token && (to.name === 'LoginPage' || to.name === 'RegisterPage')) {
    next({name: 'HomePage'});
  } else {
    next();
  }
})

export default router
