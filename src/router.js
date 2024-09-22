import {createRouter, createWebHistory} from 'vue-router'
import MainHome from "@/pages/MainHome.vue";
import UserLogin from "@/pages/auth/UserLogin.vue";
import UserRegister from "@/pages/auth/UserRegister.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {path: '/', component: HelloWorld},
        {path: '/', component: MainHome},
        {path: '/login', component: UserLogin, name: 'login'},
        {path: '/register', component: UserRegister},
    ]
});

export default router;