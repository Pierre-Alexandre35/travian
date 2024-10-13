import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import HomePage from '@/views/HomePage.vue';
import { useAuthStore } from '@/store/auth';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: LoginPage },
  { path: '/home', component: HomePage, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth) && !authStore.isLoggedIn) {
    await authStore.initializeStore();  // Ensure store is initialized
    if (!authStore.isLoggedIn) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
