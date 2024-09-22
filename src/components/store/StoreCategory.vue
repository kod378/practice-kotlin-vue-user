<template>
  <div class="category-wrapper">
    <h2>카테고리 선택</h2>
    <div class="categories">
      <button
          v-for="category in categories"
          :key="category.value"
          :class="{ selected: selectedCategory === category.value }"
          @click="selectCategory(category)"
      >
        {{ category.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { label: "중식", value: "CHINESE_FOOD" },
        { label: "양식", value: "WESTERN_FOOD" },
        { label: "한식", value: "KOREAN_FOOD" },
        { label: "일식", value: "JAPANESE_FOOD" },
        { label: "치킨", value: "CHICKEN" },
        { label: "피자", value: "PIZZA" },
        { label: "햄버거", value: "HAMBURGER" },
        { label: "커피&차", value: "COFFEE_TEA" },
      ],
      selectedCategory: null,
      preSelectedCategory: null,
    };
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category.value;
      // 이미 선택된 카테고리를 다시 선택하면 선택을 해제합니다.
      if (this.preSelectedCategory === this.selectedCategory) {
        this.selectedCategory = null;
        this.preSelectedCategory = null;
        return;
      }
      this.preSelectedCategory = this.selectedCategory;

      // alert(`${category.label} 카테고리를 선택했습니다.`);
      this.$emit("category-selected", category.value); // 부모 컴포넌트로 이벤트 발생
    },
  },
};
</script>

<style scoped>
.category-wrapper {
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 100%; /* 부모 요소에 맞춰 전체 너비 설정 */
}

h2 {
  margin-bottom: 20px; /* h2 아래에 공간 추가 */
}

.categories {
  display: flex;
  gap: 10px;
  flex-wrap: wrap; /* 화면 크기에 따라 버튼이 줄바꿈되도록 설정 */
  justify-content: center; /* 버튼들을 중앙으로 정렬 */
}

button {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}

button.selected {
  background-color: #3498db;
  color: white;
}
</style>