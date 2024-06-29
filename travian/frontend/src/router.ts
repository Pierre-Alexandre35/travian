// router.ts

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import HomePage from '@/views/HomePage.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: LoginPage },
  { path: '/home', component: HomePage, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Check authentication status before each route navigation
router.beforeEach((to, from, next) => {
  const isAuthenticated = true; // Replace with your actual authentication check

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
