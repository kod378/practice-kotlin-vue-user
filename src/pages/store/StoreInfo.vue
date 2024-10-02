<template>
  <div>
    <base-header></base-header>
    <section>
      <div class="wrapper">
        <h2>가게 정보</h2>
        <img :src="store.thumbnailUrl" alt="Store Image" class="store-image" />
        <div>
          <p>가게이름: {{ store.name }}</p>
          <p>가게주소: {{store.address}}</p>
          <p>가게번호: {{store.phoneNumber}}</p>
          <p>카테고리: {{getCategoryName(store.category)}}</p>
          <p>최소주문금액: {{store.minimumAmount}}원</p>
          <p>최소배달비: {{store.minimumDeliveryAmount}}원</p>
<!--          <p>별점: {{store.address}}</p>-->
        </div>
      </div>
    </section>
    <section>
      <StoreMenu :storeMenus="storeMenus" :store="store"></StoreMenu>
    </section>
  </div>
</template>

<script>
import {apiRequest} from "@/utils/api";
import StoreMenu from "@/components/store/StoreMenu.vue";

export default {
  components: {StoreMenu},

  data() {
    return {
      store: {
        id: 0,
        name: '',
        address: '',
        phoneNumber: '',
        category: '',
        minimumAmount: 0,
        minimumDeliveryAmount: 0,
        star: 0,
        thumbnailUrl: '',
      },
      storeMenus: [],
    };
  },
  methods: {
    async getStoreInfo() {
      try {
        const response = await apiRequest(`/api/store/info/${this.$route.params.storeId}`, 'GET');
        this.store = response.data.body;
        this.storeMenus = response.data.body.menus;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    getCategoryName(category) {
      switch (category) {
        case 'CHINESE_FOOD':
          return '중식';
        case 'WESTERN_FOOD':
          return '양식';
        case 'KOREAN_FOOD':
          return '한식';
        case 'JAPANESE_FOOD':
          return '일식';
        case 'CHICKEN':
          return '치킨';
        case 'PIZZA':
          return '피자';
        case 'HAMBURGER':
          return '햄버거';
        case 'COFFEE_TEA':
          return '커피&차';
        default:
          return '알 수 없음';
      }
    },
  },
  created() {
    this.getStoreInfo();
  },
}
</script>