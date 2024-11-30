import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginPage from '@/views/LoginPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import UserControllPage from '@/views/UserControllPage.vue'
import ProfileView from '@/views/ProfileView.vue'
import AddCrypto from '@/views/AddCrypto.vue'
import RemoveCrypto from '@/views/RemoveCrypto.vue'
import About from '@/views/About.vue'
import EditPorfile from '@/views/EditPorfile.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import NotFound from '@/views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpPage
  },
  {
    path: '/all-users',
    name: "getAllUsers",
    meta: { requiresAuth: true ,role: "admin"},
    component: UserControllPage
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { requiresAuth: true },
    component: ProfileView
  },
  {
    path: '/add-crypto',
    name: 'AddCrypto',
    meta: { requiresAuth: true ,role: "admin"},
    component: AddCrypto
  },
  {
    path: '/remove-crypto',
    name: 'RemoveCrypto',
    meta: { requiresAuth: true ,role: "admin"},
    component: RemoveCrypto
  },
  {
    path: '/about',
    name: 'About',
    meta: { requiresAuth: true },
    component: About
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    meta: { requiresAuth: true },
    component: EditPorfile
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    meta: { requiresAuth: true },
    component: ChangePassword
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (to.meta.requiresAuth) {
    if (!token) {
      next({ name: 'home' });
      alert("cant access this route")
    } else if (to.meta.role && to.meta.role !== userRole) {
      next({ name: 'home' });
      alert("cant access this route")
    } else {
      next();
    }
  } else {
    next();
  }
})


export default router
