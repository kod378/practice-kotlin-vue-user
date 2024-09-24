<template>
  <div class="header">
    <h3>메뉴 리스트</h3>
  </div>
  <div class="menu-list">
    <div v-if="storeMenus.length === 0">
      <p>등록된 메뉴가 없습니다.</p>
    </div>
    <div v-else class="menu-grid">
      <div v-for="menu in storeMenus" :key="menu.id" class="menu-item" @click="selectedMenu(menu.id)">
        <img :src="menu.thumbnailUrl" alt="Menu Image" class="menu-image" />
        <h3 class="menu-name">{{ menu.name }}</h3>
        <p class="menu-price">{{ formatPrice(menu.amount) }} 원</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    storeMenus: {
      type: Array,
      default: () => [],
    },
    store: {
      type: Object,
      default: () => ({}),
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString();
    },
    selectedMenu(menuId) {
      const selectedMenu = this.storeMenus.find((menu) => menu.id === menuId);
      this.$store.commit('setStore', {store: this.store});
      this.$store.commit('setStoreMenu', {storeMenu: selectedMenu});
      this.$router.push(`/store-menu/add`);
    },
  },
};
</script>

<style scoped>
.store-list {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  margin-top: 50px;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 15px;
  text-align: center;
  background-color: #f9f9f9;
}

.menu-image {
  width: 100%;
  height: auto;
  max-width: 180px;
  margin-bottom: 10px;
}

.menu-name {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.menu-price {
  font-size: 16px;
  color: #333;
}
</style>