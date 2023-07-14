<template>
  <div class="requestLoading">
    <div class="requestLoading-box">
      <img class="box-img" src="@/assets/image/requestLoading.png" alt="loading">
      <h2 class="box-h2">教學平台開啟中，請耐心等候。</h2>
      <h5 class="box-h5">The platform is loading. Thank you for your patience.</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-requestLoading'
}
</script>

<style lang="scss" scoped>
.requestLoading {
  width: 100%;
  height: 100vh;
  min-height: 944px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .requestLoading-box {
    text-align: center;
    .box-img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      animation: changeright 3s linear infinite;
    }
    @keyframes changeright{      
      0% {
        transform:rotate(0deg)
      }
      50% {
        transform:rotate(180deg)
      }
      100% {
        transform:rotate(360deg)
      }
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