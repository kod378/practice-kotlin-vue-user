<template>
  <header class="header">
    <div class="header-content">
      <div class="left-space">
        <!-- 주문기록 이동버튼 -->
        <button class="order-history-button" @click="goOrderHistory">
          주문기록
        </button>

        <!-- 현재주문 이동버튼 -->
        <button class="current-order-button" @click="goCurrentOrder">
          현재주문
        </button>
      </div>

      <div class="logo-container">
        <div class="logo" @click="replaceToMain">
          <img src="@/assets/logo.png" alt="Logo" />
        </div>
      </div>

      <div class="right-section">
        <div v-if="shoppingCartCount > 0" class="shopping-cart" @click="goOrder">
          🛒 {{ shoppingCartCount }}
        </div>
        <div v-else class="shopping-cart">
          🛒
        </div>
        <div class="profile">
          <img class="profile-icon" :src="userProfile.iconUrl" alt="Profile Icon" />
          <span class="profile-name">{{ username }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      userProfile: {
        iconUrl: require('@/assets/profile-icon.png'), // 사용자 아이콘 URL
      },
      username: this.$store.getters.username,
    };
  },
  computed: {
    shoppingCartCount() {
      const shoppingCart = this.$store.getters['shoppingCart/shoppingCart'];
      return shoppingCart.length;
    },
  },
  methods: {
    goOrder() {
      this.$router.push('/order');
    },
    replaceToMain() {
      this.$router.replace('/');
    },
    goOrderHistory() {
      this.$router.push('/order/history'); // 주문 기록 페이지로 이동
    },
    goCurrentOrder() {
      this.$router.push('/order/current'); // 현재 주문 페이지로 이동
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.left-space {
  display: flex;
  align-items: center;
  flex: 1;
}

.order-history-button,
.current-order-button {
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.order-history-button:hover,
.current-order-button:hover {
  background-color: #e55d00;
}

.logo-container {
  flex: 1;
  display: flex;
  justify-content: center;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  height: 40px;
}

.right-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
}

.shopping-cart {
  font-size: 18px;
  font-weight: bold;
  color: #ff6600;
  margin-right: 20px;
}

.profile {
  display: flex;
  align-items: center;
}

.profile-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-name {
  font-size: 16px;
  font-weight: 500;
}
</style>