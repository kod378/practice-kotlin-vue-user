<template>
  <div>
    <base-header></base-header>
    <section>
<!--      <button @click="logout">Logout</button>-->
<!--      <button @click="checkMe">check me</button>-->
    </section>
    <section>
      <StoreCategory @category-selected="updateSelectedCategory"></StoreCategory>
      <StoreList :selectedCategory="selectedCategory"></StoreList>
    </section>
  </div>
</template>
<script>
import {apiRequest} from "@/utils/api";
import StoreCategory from "@/components/store/StoreCategory.vue";
import StoreList from "@/components/store/StoreList.vue";

export default {
  components: {
    StoreList,
    StoreCategory,
  },
  data() {
    return {
      selectedCategory: null,
    };
  },
  methods: {
    async checkMe() {
      try {
        const response = await apiRequest('/api/user/me');
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.log(error);
        console.error('Fail to get user information');
      }
    },
    updateSelectedCategory(category) {
      console.log(category);
      this.selectedCategory = category;
    }
  },
  created() {
    const accessToken = this.$store.getters.accessToken;
    if (!accessToken) {
      this.$router.push('/login');
    }
  },
}
</script>