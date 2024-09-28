import mutations from "@/store/shoppingCart/mutations";
import getters from "@/store/shoppingCart/getters";
import actions from "@/store/shoppingCart/actions";

export default {
    namespaced: true,
    state() {
        return {
            shoppingCart: [],
            store: null,
        }
    },
    mutations,
    getters,
    actions
}