<template>
  <header class="header">
    <div class="header-content">
      <div class="left-space"></div> <!-- Empty space on the left -->

      <div class="logo">
        <img src="@/assets/logo.png" alt="Logo" />
      </div>

      <div class="right-section">
        <div v-if="shoppingCartCount > 0" class="shopping-cart" @click="goOrder">
          🛒 {{ shoppingCartCount }}
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
  flex: 1; /* This creates an empty space on the left */
}

.logo {
  flex: 1;
  display: flex;
  justify-content: center; /* Centers the logo */
}

.logo img {
  height: 40px;
}

.right-section {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Aligns shopping cart and profile to the right */
  flex: 1;
}

.shopping-cart {
  font-size: 18px;
  font-weight: bold;
  color: #ff6600;
  margin-right: 20px; /* Space between the cart and profile */
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