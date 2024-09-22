<template>
  <div v-if="selectedCategory">
    <div class="store-list">
      <div v-if="isLoading">로딩 중...</div>
      <div v-else-if="storeList.length === 0">
        <p>등록된 메뉴가 없습니다.</p>
      </div>
      <div v-else class="menu-grid">
        <div v-for="store in storeList" :key="store.id" class="menu-item">
          <img :src="store.thumbnailUrl" alt="Menu Image" class="menu-image" />
          <h3 class="menu-name">{{ store.name }}</h3>
          <p class="menu-price">최소결제금액:{{ formatPrice(store.minimumAmount) }} 원</p>
          <p class="menu-price">최소배달비:{{ formatPrice(store.minimumDeliveryAmount) }} 원</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {apiRequest} from "@/utils/api";

export default {
  props: {
    selectedCategory: {
      type: [String, null],
      default: null,
    },
  },
  data() {
    return {
      storeList: [],
      isLoading: false,
    };
  },
  watch: {
    selectedCategory(newCategory) {
      this.getStoreList(newCategory);
    },
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString();
    },
    async getStoreList(category) {
      this.isLoading = true;
      try {
        // API 요청
        const response = await apiRequest(`/api/store/search?storeCategory=${category}`, 'GET');
        console.log(response);
        this.storeList = response.data.body;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
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