import mutations from "@/store/storeMenu/mutations";
import actions from "@/store/storeMenu/actions";
import getters from "@/store/storeMenu/getters";

export default {
    namespaced: true,
    state() {
        return {
            storeMenu: null,
            store: null,
        }
    },
    mutations,
    actions,
    getters,
}