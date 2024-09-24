export default {
    setStoreMenu(context, payload) {
        context.commit('setStoreMenu', payload);
    },
    setStore(context, payload) {
        context.commit('setStore', payload);
        // // If the store is null, set the store
        // if (context.state.store === null) {
        //     context.commit('setStore', payload);
        // } else if (context.state.store.id !== payload.store.id) {
        //     /**
        //      * If the store is not null and the store id is different from the payload store id,
        //      * clear menu items and set the store
        //      * because the store has changed
        //      */
        //     context.commit('clearStoreMenu');
        //
        // }
    }
}