import Vue from 'vue'
import VueRouter from "vue-router";
import Home from '../Pages/Home'
import Player from '../Pages/Player'
import Favorate from '../Pages/Favorate'
Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: 'Home'
        },
        {
            name: 'Home',
            path: '/Home',
            component: Home,
            meta: { title: 'Home' },
        },
        {
            name: 'Player',
            path: '/Player',
            component: Player,
            meta: { title: 'Player' },
            props: true,
        },
        {
            name: 'Favorate',
            path: '/Favorate',
            component: Favorate,
            meta: { title: 'Favorate' },
        },
        // {
        //     path: '/Favorate',
        //     name: 'Favorate',
        //     component: () => import('../Pages/Favorate'),
        //     meta: { title: "我的最愛", requireLogin: false }
        // },
        // {
        //     path: '/Player',
        //     name: 'Player',
        //     props: true,
        //     component: () => import('../Pages/Player'),
        //     meta: { title: "", requireLogin: false }
        // },
    ]

})
