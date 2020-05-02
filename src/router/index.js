import Vue from 'vue'
import VueRouter from "vue-router";
import Home from '../Pages/Home'
Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: 'Home'
        },
        {
            path: '/Home',
            name: 'Home',
            component: Home,
        },
        {
            path: '/Favorate',
            name: 'Favorate',
            component: () => import('../Pages/Favorate'),
            meta: { title: "我的最愛", requireLogin: false }
        },
        {
            path: '/Player',
            name: 'Player',
            props: true,
            component: () => import('../Pages/Player'),
            meta: { title: "", requireLogin: false }
        },
    ]

})
