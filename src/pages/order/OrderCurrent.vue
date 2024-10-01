<template>
  <div>
    <base-header></base-header>
    <div class="order-history">
      <!-- 주문 내역이 있을 때만 카드 출력 -->
      <div v-if="orders.length > 0">
        <div v-for="order in orders" :key="order.userOrderResponse.id" class="order-card">
          <!-- 이미지와 가게 정보는 가로로 정렬 -->
          <div class="store-info">
            <!-- 가게 이미지 -->
            <img :src="order.storeResponse.thumbnailUrl" alt="store image" class="store-thumbnail" />

            <!-- 가게 이름과 주문 시간 (이미지 오른쪽에 출력) -->
            <div class="store-details">
              <h3>{{ order.storeResponse.name }}</h3>
              <p>주문 시간: {{ formatDate(order.userOrderResponse.orderedAt) }}</p>
            </div>
          </div>

          <!-- 진행 단계 표시 -->
          <div class="order-progress">
            <div class="progress-step" v-for="(step, index) in progressSteps" :key="index">
              <div :class="{'progress-circle': true, 'completed': isStepCompleted(order.userOrderResponse, step)}"></div>
              <p>{{ step.description }} <br> <small v-if="getStepTime(order.userOrderResponse, step)">{{ formatDate(getStepTime(order.userOrderResponse, step)) }}</small></p>
              <div v-if="index < progressSteps.length - 1" :class="{'progress-line': true, 'completed': isStepCompleted(order.userOrderResponse, progressSteps[index + 1])}"></div>
            </div>
          </div>

          <!-- 주문 메뉴 리스트 (이미지와 가게 정보 아래에 배치) -->
          <div class="order-menu" @click="openModal(order)">
            <p>{{ simpleUserOrderMenuResponseList(order) }}</p>
            <p>{{ order.userOrderResponse.amount }}원</p>
          </div>
        </div>
      </div>

      <!-- 주문 내역이 없을 때 출력할 메시지 -->
      <div v-else class="no-orders">
        <p>현재 진행 중인 주문이 없습니다.</p>
      </div>

      <!-- 모달 창 컴포넌트 -->
      <OrderDetailModal
          v-if="selectedOrder"
          :order="selectedOrder"
          @close="selectedOrder = null"
      />
    </div>
  </div>
</template>

<script>
import OrderDetailModal from './OrderDetailModal.vue'
import { apiRequest } from "@/utils/api";

export default {
  components: { OrderDetailModal },
  data() {
    return {
      orders: [], // API 응답으로 받은 주문 데이터를 여기에 저장할 거야.
      selectedOrder: null, // 모달을 열 때 선택한 주문을 저장하는 변수야.
      progressSteps: [
        { status: 'ORDER', description: '주문' },
        { status: 'ACCEPT', description: '확인' },
        { status: 'COOKING', description: '요리중' },
        { status: 'DELIVERY', description: '배달중' },
        { status: 'RECEIVE', description: '완료' }
      ],
    };
  },
  methods: {
    formatDate(date) {
      // LocalDateTime을 읽기 쉬운 형식으로 변환하는 함수
      return new Date(date).toLocaleString();
    },
    openModal(order) {
      this.selectedOrder = order;
    },
    async getOrders() {
      const response = await apiRequest(`/api/user-order/current`);
      this.orders = response.data.body;
    },
    // 특정 단계가 완료되었는지 확인
    isStepCompleted(orderResponse, step) {
      const statusToFieldMap = {
        'ORDER': 'orderedAt',
        'ACCEPT': 'acceptAt',
        'COOKING': 'cookingStartedAt',
        'DELIVERY': 'deliveryStartedAt',
        'RECEIVE': 'receivedAt'
      };
      return orderResponse[statusToFieldMap[step.status]] !== null;
    },
    // 각 단계에 해당하는 시간을 반환
    getStepTime(orderResponse, step) {
      const statusToFieldMap = {
        'ORDER': 'orderedAt',
        'ACCEPT': 'acceptAt',
        'COOKING': 'cookingStartedAt',
        'DELIVERY': 'deliveryStartedAt',
        'RECEIVE': 'receivedAt'
      };
      return orderResponse[statusToFieldMap[step.status]];
    },
    simpleUserOrderMenuResponseList(order) {
      if (order.userOrderMenuResponseList.length > 1) {
        return `${order.userOrderMenuResponseList[0].name} 외 ${order.userOrderMenuResponseList.length - 1}개`;
      } else {
        return order.userOrderMenuResponseList[0].name;
      }
    }
  },
  created() {
    this.getOrders();
  }
};
</script>

<style>
.order-history {
  display: flex;
  flex-direction: column;
}

.order-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
}

.store-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.store-thumbnail {
  width: 160px;
  height: 160px;
  margin-right: 20px;
}

.store-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 진행 단계 스타일 */
.order-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}

.progress-step {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  position: relative;
}

.progress-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: lightgray;
  margin-bottom: 5px;
  border: 2px solid pink;
}

.progress-circle.completed {
  background-color: red;
}

.progress-line {
  width: 60px;
  height: 2px;
  background-color: lightgray;
}

.progress-line.completed {
  background-color: red;
}

.order-menu {
  cursor: pointer;
  padding-top: 10px;
  border-top: 1px solid #ddd;
  margin-top: 10px;
}

.no-orders {
  text-align: center;
  color: #888;
  margin-top: 20px;
  font-size: 18px;
}
</style>