<template>
  <div class="requestError">
    <div class="requestError-box">
      <img class="box-img" src="@/assets/image/requestError.png" alt="loading">
      <h2 class="box-h2">請求失敗，請重新整理頁面。</h2>
      <h5 class="box-h5">Request failed, please refresh the page.</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-requestError'
}
</script>

<style lang="scss" scoped>
.requestError {
  width: 100%;
  height: 100vh;
  min-height: 944px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .requestError-box {
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