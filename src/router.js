import {createRouter, createWebHistory} from 'vue-router'
import MainHome from "@/pages/MainHome.vue";
import UserLogin from "@/pages/auth/UserLogin.vue";
import UserRegister from "@/pages/auth/UserRegister.vue";
import StoreInfo from "@/pages/store/StoreInfo.vue";
import AddMenu from "@/pages/store/AddMenu.vue";
import OrderInShoppingCart from "@/pages/order/OrderInShoppingCart.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {path: '/', component: HelloWorld},
        {path: '/', component: MainHome},
        {path: '/login', component: UserLogin, name: 'login'},
        {path: '/register', component: UserRegister},
        {path: '/store/:storeId', component: StoreInfo},
        {path: '/store-menu/add', component: AddMenu},
        {path: '/order', component: OrderInShoppingCart},
    ]
});

export default router;