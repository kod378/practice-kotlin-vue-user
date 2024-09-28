<template>
  <div class="purchase-screen" v-if="shoppingCart.length > 0">
    <!-- Store information -->
    <div class="store-info">
      <h2>{{ selectedStore.name }}</h2>
      <p>최소결제금액: {{ formatPrice(selectedStore.minimumAmount) }} 원</p>
      <p>배달비: {{ formatPrice(selectedStore.minimumDeliveryAmount) }} 원</p>
    </div>

    <!-- Shopping cart menu items -->
    <div class="cart-items">
      <div v-for="menu in shoppingCart" :key="menu.id" class="cart-item">
        <!-- Remove button (X) -->
        <button class="remove-item" @click="removeItem(menu.id)">X</button>

        <img :src="menu.thumbnailUrl" alt="Menu Image" class="menu-image" />
        <div class="menu-details">
          <h3>{{ menu.name }}</h3>
          <p>{{ formatPrice(menu.amount) }} 원</p>
          <p>수량: {{ menu.quantity }}</p>
          <p>합계: {{ formatPrice(menu.amount * menu.quantity) }} 원</p>
        </div>
      </div>
    </div>

    <!-- Total price and breakdown -->
    <div class="total">
      <h3>총 결제 금액</h3>
      <p>
        물품 총합: {{ formatPrice(cartTotal) }} 원 +
        배달비: {{ formatPrice(selectedStore.minimumDeliveryAmount) }} 원 =
        총 결제 금액: {{ formatPrice(totalAmount) }} 원
      </p>

      <!-- Warning message -->
      <p v-if="cartTotal < selectedStore.minimumAmount" class="warning">
        물품들의 총 결제 금액이 {{ formatPrice(selectedStore.minimumAmount) }} 원 이상이어야 구매가 가능합니다.
        배달비는 최소결제금액에 포함되지 않습니다.
      </p>
    </div>

    <!-- Purchase and Back buttons -->
    <div class="action-buttons">
      <button @click="purchase" :disabled="cartTotal < selectedStore.minimumAmount">구매하기</button>
      <button @click="goBack">뒤로가기</button>
    </div>
  </div>
  <div v-else>
    <p>장바구니에 담긴 상품이 없습니다.</p>
    <button @click="goBack">뒤로가기</button>
  </div>
</template>

<script>
import {apiRequest} from "@/utils/api";

export default {
  data() {
    return {
      selectedStore: {
        // name: "가게 이름",
        // minimumAmount: 10000, // 최소 결제 금액
        // minimumDeliveryAmount: 2000, // 배달비
      },
      shoppingCart: [
        // Example cart items
        // {id: 1, name: "메뉴 1", thumbnailUrl: "/images/menu1.jpg", amount: 5000, quantity: 1},
        // {id: 2, name: "메뉴 2", thumbnailUrl: "/images/menu2.jpg", amount: 3000, quantity: 2},
      ],
    };
  },
  computed: {
    // Calculate the total price of cart items (excluding delivery fee)
    cartTotal() {
      return this.shoppingCart.reduce((acc, item) => acc + item.amount * item.quantity, 0);
    },
    // Calculate total price including delivery fee
    totalAmount() {
      return this.cartTotal + this.selectedStore.minimumDeliveryAmount;
    },
  },
  methods: {
    formatPrice(value) {
      return value.toLocaleString(); // Format price with commas
    },
    async purchase() {
      // Handle purchase logic
      if (this.cartTotal >= this.selectedStore.minimumAmount) {
        const response = await apiRequest(`/api/user-order`, 'POST', {
          storeId: this.selectedStore.id,
          userOrderMenuRequestList: this.shoppingCart.map(item => ({storeMenuId: item.id, quantity: item.quantity})),
        });
        console.log(response);

        // Clear the shopping cart after successful purchase
        await this.$store.dispatch('shoppingCart/clearCart');
        alert("구매 완료!");

        //TODO: Redirect to the order history page

      }
    },
    goBack() {
      // Handle navigation to the previous page
      this.$router.go(-1); // Vue Router's back navigation
    },
    async removeItem(menuId) {
      await this.$store.dispatch('shoppingCart/removeMenu', menuId);
    },
  },
  created() {
    this.selectedStore = this.$store.getters['shoppingCart/store'];
    this.shoppingCart = this.$store.getters['shoppingCart/shoppingCart'];
  }
};
</script>

<style scoped>
.purchase-screen {
  padding: 20px;
}

.store-info, .cart-items, .total {
  margin-bottom: 20px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers the cart items horizontally */
}

.cart-item {
  position: relative;
  display: flex;
  align-items: center; /* Vertically centers content within the item */
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  max-width: 500px; /* Limit the maximum width of the cart item */
  width: 100%; /* Make sure all cart items take the same width */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.menu-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px; /* Space between the image and the menu details */
}

.menu-details {
  flex: none; /* Prevents the details section from expanding too much */
  width: 100%; /* Makes sure the details section has a fixed width */
  max-width: 320px; /* Optional: limit the max width for very long text */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* Aligns text to the left */
}

.menu-details h3 {
  width: 100%;
  white-space: nowrap; /* Prevents text from wrapping onto a new line */
  overflow: hidden; /* Hides overflow text */
  text-overflow: ellipsis; /* Adds ellipsis (...) if the text is too long */
}

.remove-item {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
}

.warning {
  color: red;
  font-weight: bold;
}

.action-buttons {
  display: flex;
  justify-content: center; /* Centers the buttons */
  gap: 10px; /* Space between buttons */
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>