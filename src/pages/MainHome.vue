<template>
  <div>
    <base-header></base-header>
    <section>
<!--      <button @click="logout">Logout</button>-->
      <button @click="checkMe">check me</button>
      <br>
      <br>
    </section>
  </div>
</template>
<script>
import {apiRequest} from "@/utils/api";

export default {
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
    checkLogin() {
      const accessToken = this.$store.getters.accessToken;
      if (!accessToken) {
        this.$router.push('/login');
      }
    },
  },
  created() {
    this.checkLogin();
  },
}
</script>