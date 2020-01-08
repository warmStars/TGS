import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import login from '../views/login/index.vue'
import util from '@/api/publicMethods/utils.js';
import scoket from "../views/websocket/index.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/socket',
        name: 'scoket',
        component: scoket
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/home/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.name === 'error-404') {
        next({ path: '/login' })
    } else if (!util.getLocalStorageData('token') && to.name !== 'login') {
        next({ path: '/login' })
    } else {
        next();
    }
})
router.afterEach(to => {
    // TODO 设置 breadcrumbs
    window.scrollTo(0, 0);
});
export default router
