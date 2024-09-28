export default {
    addMenu(context, payload) {
        const isMenuExist = context.state.shoppingCart.some(menu => menu.id === payload.menu.id);
        if (isMenuExist) {
            // 화면에서 검증을 하기 때문에, 여기서는 모두 강제 초기화 합니다.
            alert('이미 장바구니에 추가된 메뉴입니다. 장바구니를 초기화합니다.');
            context.commit('setShoppingCart', []);
            context.commit('setStore', null);
            return;
        }

        // 화면에서 검증을 하기 때문에, 여기서는 모두 강제 초기화 합니다.
        if (context.state.store && context.state.store.id !== payload.store.id) {
            alert('다른 가게의 메뉴를 추가할 수 없습니다. 장바구니를 초기화합니다.');
            context.commit('setShoppingCart', []);
            context.commit('setStore', null);
            return;
        }

        if (!context.state.store) {
            context.commit('setStore', payload.store);
        }

        context.commit('addShoppingCart', {
            ...payload.menu,
            quantity: payload.quantity
        });
    },
    clearCart(context) {
        context.commit('setShoppingCart', []);
        context.commit('setStore', null);
    },
    removeMenu(context, payload) {
        const index = context.state.shoppingCart.findIndex(menu => menu.id === payload);
        if (index !== -1) {
            // context.state.shoppingCart.splice(index, 1); //actions에서 state를 직접 수정하는 것은 좋지 않습니다.
            context.commit('removeShoppingCart', index);
        }
    },

    setStore(context, payload) {
        context.commit('setStore', payload);
    },

}