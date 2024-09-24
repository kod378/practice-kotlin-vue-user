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
          <p>가게번호: {{store.address}}</p>
          <p>카테고리: {{store.address}}</p>
          <p>최소주문금액: {{store.address}}</p>
          <p>최소배달비: {{store.address}}</p>
          <p>별점: {{store.address}}</p>
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
        rating: 0,
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
  },
  created() {
    this.getStoreInfo();
  },
}
</script>