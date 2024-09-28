import {createRouter, createWebHistory} from 'vue-router'
import MainHome from "@/pages/MainHome.vue";
import UserLogin from "@/pages/auth/UserLogin.vue";
import UserRegister from "@/pages/auth/UserRegister.vue";
import StoreInfo from "@/pages/store/StoreInfo.vue";
import AddMenu from "@/pages/store/AddMenu.vue";
import OrderInShoppingCart from "@/pages/order/OrderInShoppingCart.vue";
import OrderHistory from "@/pages/order/OrderHistory.vue";
import OrderCurrent from "@/pages/order/OrderCurrent.vue";

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
        {path: '/order/history', component: OrderHistory},
        {path: '/order/current', component: OrderCurrent},
    ]
});

export default router;