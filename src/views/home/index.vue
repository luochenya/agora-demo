<template>
  <div class="home">
    <!-- 請求狀態-載入中 -->
    <RequestLoading v-if="requestStatus === 1" />
    <!-- 請求狀態-超時 -->
    <RequestTimeOut v-if="requestStatus === 2" />
    <!-- 請求狀態-報錯 -->
    <RequestError v-if="requestStatus === 3" />
  </div>
</template>

<script>
// 此處可以直接使用jquery $
// import $ from 'jquery'
import RequestLoading from "./components/RequestLoading.vue"
import RequestTimeOut from "./components/RequestTimeOut.vue"
import RequestError from "./components/RequestError.vue"
export default {
  name: "Home",
  components: {
    RequestLoading,
    RequestTimeOut,
    RequestError
  },
  data() {
    return {
      // 1載入中 2超時 3報錯 默認載入中
      requestStatus: 1
    }
  },
  created() {
    // 做一個三秒的加載動畫 模擬API請求
    setTimeout(() => {
      this.init()
    }, 3000)
  },
  methods: {
    // 頁面進入初始化 模擬假數據
    init() {
      // 獲取路由的key 進行身份判定 此處使用 1老師 2學生 3客服 4家長 5請求超時 6請求異常
      const key = this.$route.query.key
      // 保存到瀏覽器儲存
      if (key) {
        sessionStorage.setItem('key', key)
        sessionStorage.setItem('agoraChannel', '777')
        sessionStorage.setItem('agoraToken', '007eJxTYNg699LLM33V5oef+aWzfbtc9vuJTgeHX0xyWnqntca88DUKDEkWlubJKSlpiUmWFiZGqRaWKZYpSWkmyaYWhobJBqlGU48fTGkIZGR4vv0HCyMDBIL4zAzm5uYMDADv8CHO')
        sessionStorage.setItem('agoraUid', key)
      }
      // 根據權限跳轉頁面
      if (key == 1) {
        this.$router.push({ path: '/teacher' })
      } else if (key == 2) {
        this.$router.push({ path: '/student' })
      } else if (key == 3) {
        this.$router.push({ path: '/employee' })
      } else if (key == 4) {
        this.$router.push({ path: '/observation' })
      } else if (key == 5) {
        this.requestStatus = 2
      } else {
        this.requestStatus = 3
      }
    }
  }
};
</script>
