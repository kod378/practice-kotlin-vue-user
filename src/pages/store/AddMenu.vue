<template>
  <div class="menu-container">
    <h2>{{ menu.name }}</h2>
    <img :src="menu.thumbnailUrl" alt="Menu Image" />
    <p>{{ menu.amount }} 원</p>

    <div class="quantity-selector">
      <button @click="decreaseQuantity">-</button>
      <span>{{ quantity }}</span>
      <button @click="increaseQuantity">+</button>
    </div>

    <div class="action-buttons">
      <button @click="addToCart">담기</button>
      <button @click="cancel">취소</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1,
      menu: {},
    };
  },
  methods: {
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    addToCart() {
      // 선택된 수량과 함께 메뉴를 장바구니에 추가하는 로직
    },
    cancel() {
      this.$router.go(-1); // 이전 페이지로 이동
    }
  },
  created() {
    // vuex에서 메뉴 정보를 가져오는 로직
    this.menu = this.$store.getters.storeMenu;
  },
}
</script>

<style scoped>
.menu-container {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 좌우 중앙 정렬 */
  text-align: center; /* 텍스트 가운데 정렬 */
  margin: 0 auto; /* 좌우 중앙 정렬 */
  max-width: 600px; /* 컨테이너의 최대 너비 지정 */
}

.quantity-selector {
  display: flex;
  justify-content: center; /* 수량 부분 좌우 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  margin: 20px 0; /* 수량 설정 부분 위아래 여백 */
}

.quantity-selector button {
  padding: 10px 20px;
  margin: 0 20px; /* 버튼과 수량 텍스트 사이 간격 */
}

.quantity-selector span {
  font-size: 18px;
  min-width: 50px; /* 수량 텍스트에 최소 너비 설정 */
  text-align: center; /* 텍스트 중앙 정렬 */
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center; /* 버튼을 좌우 중앙에 정렬 */
}

.action-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
}
</style>