<template>
  <div class="employeeCamera">
    <div class="employeeCamera-video" id="local-employeeCamera"></div>
    <!-- 默認圖片 -->
    <img src="@/assets/image/camera.png" alt="">
    <!-- 左上角音視頻操作 -->
    <div class="employeeCamera-leftTop">
      <div class="leftTop-box" style="cursor: no-drop;">
        <img src="@/assets/image/icon-sound-dis.png" alt="">
      </div>
      <div class="leftTop-box" @click="mikeChange()">
        <img v-if="mikeStatus" src="@/assets/image/icon-mike-open.png" alt="">
        <img v-if="!mikeStatus" src="@/assets/image/icon-mike-close.png" alt="">
      </div>
      <div class="leftTop-box" @click="cameraChange()">
        <img v-if="cameraStatus" src="@/assets/image/icon-camera-open.png" alt="">
        <img v-if="!cameraStatus" src="@/assets/image/icon-camera-close.png" alt="">
      </div>
    </div>
    <!-- 左下角名字 -->
    <div class="employeeCamera-leftBottom">
      <span></span>
      Student’s name
    </div>
    <!-- 右上角切換 -->
    <div class="employeeCamera-rightTop" @click="checkStudent">
      <img src="@/assets/image/icon-cameraCheck-close.png" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'employee-employeeCamera',
  data() {
    return {
      // 麥克風狀態 false開啟 true關閉
      mikeStatus: true,
      // 視訊狀態 false開啟 true關閉
      cameraStatus: true,
    }
  },
  computed: {
    ...mapGetters(['student_permissions'])
  },
  methods: {
    // 聲音狀態切換
    soundChange() {
      this.soundStatus = !this.soundStatus
      if (!this.soundStatus) {
        this.sliderNum = 0
      } else {
        this.sliderNum = 50
      }
    },
    // 麥克風狀態切換
    mikeChange() {
      this.mikeStatus = !this.mikeStatus
      this.$emit('mikeChange', this.mikeStatus)
    },
    // 視訊狀態切換
    cameraChange() {
      this.cameraStatus = !this.cameraStatus
      this.$emit('cameraChange', this.cameraStatus)
    },
    // 切換學生視訊
    checkStudent() {
      this.$store.commit('employee/SET_CAMERA_STATUS', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.employeeCamera {
  margin-top: 12px;
  width: 100%;
  height: calc((100% - 354px) / 2);
  // height: calc((100% - 24px) / 3);
  min-height: 260px;
  border-radius: 8px;
  background: #EFEFEE;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  .employeeCamera-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
  .employeeCamera-leftTop {
    position: absolute;
    left: 12px;
    top: 12px;
    .leftTop-box {
      margin-top: 12px;
      cursor: pointer;
      user-select: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba($color: #FFF, $alpha: 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .leftTop-box:first-child {
      margin-top: 0;
    }
  }
  .employeeCamera-leftBottom {
    position: absolute;
    left: 12px;
    bottom: 12px;
    padding: 5px 6px;
    border-radius: 4px;
    background: rgba($color: #FFF, $alpha: 0.8);
    display: flex;
    align-items: center;
    color: #323130;
    font-size: 12px;
    font-family: Microsoft JhengHei;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    span {
      margin-right: 4px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #58C358;
    }
  }
  .employeeCamera-rightTop {
    cursor: pointer;
    user-select: none;
    position: absolute;
    top: 12px;
    right: 12px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba($color: #FFF, $alpha: 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>