export default {
    setShoppingCart(state, payload) {
        state.shoppingCart = payload;
    },
    addShoppingCart(state, payload) {
        state.shoppingCart.push(payload);
    },
    removeShoppingCart(state, payload) {
        state.shoppingCart.splice(payload, 1);
    },
    setStore(state, payload) {
        state.store = payload;
    }
}