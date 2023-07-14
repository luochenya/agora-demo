<template>
  <div class="requestTimeOut">
    <div class="requestTimeOut-box">
      <img class="box-img" src="@/assets/image/requestTimeOut.png" alt="loading">
      <h2 class="box-h2">請求超時，請重新整理頁面。</h2>
      <h5 class="box-h5">Request timed out, please refresh the page.</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-requestTimeOut'
}
</script>

<style lang="scss" scoped>
.requestTimeOut {
  width: 100%;
  height: 100vh;
  min-height: 944px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .requestTimeOut-box {
    text-align: center;
    .box-img {
      width: 100px;
      height: 100px;
    }
    .box-h2 {
      margin: 40px 0 14px;
      color: #000;
      font-size: 14px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .box-h5 {
      color: #989898;
      font-size: 14px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}
</style>