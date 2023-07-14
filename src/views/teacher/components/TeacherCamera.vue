<template>
  <div class="teacherCamera">
    <div class="teacherCamera-video" id="local-teacherCamera"></div>
    <!-- 默認圖片 -->
    <img src="@/assets/image/camera.png" alt="">
    <!-- 左上角音視頻操作 -->
    <div class="teacherCamera-leftTop">
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
    <div class="teacherCamera-leftBottom">
      <span></span>
      Teacher’s name
    </div>
  </div>
</template>

<script>
export default {
  name: 'teacher-teacherCamera',
  data() {
    return {
      // 麥克風狀態 false開啟 true關閉
      mikeStatus: true,
      // 視訊狀態 false開啟 true關閉
      cameraStatus: true,
    }
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
.teacherCamera {
  margin-top: 10px;
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
  .teacherCamera-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
  .teacherCamera-leftTop {
    position: absolute;
    left: 12px;
    top: 12px;
    .leftTop-box {
      margin-bottom: 12px;
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
    .leftTop-box:last-child {
      margin-bottom: 0;
    }
  }
  .teacherCamera-leftBottom {
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
}
</style>