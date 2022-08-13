import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router';
import Home from '../views/landing/Home.vue';
import About from '../views/landing/About.vue';
import Farm from '../views/landing/Farm.vue';

const isServer = typeof window === 'undefined';
const history = isServer ? createMemoryHistory() : createWebHistory();
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/farm',
        name: 'Farm',
        component: Farm,
        props: (route) => ({ foo: route.query.foo }),
    }
];

const router = createRouter({
    history,
    routes,
});

export default router;