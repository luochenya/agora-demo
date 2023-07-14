<template>
  <div class="teacherCamera">
    <div class="teacherCamera-video" id="local-teacherCamera"></div>
    <!-- 默認圖片 -->
    <img src="@/assets/image/camera.png" alt="">
    <!-- 左上角音視頻操作 -->
    <div class="teacherCamera-leftTop">
      <el-popover
        placement="right"
        width="50"
        trigger="hover"
        popper-class="teacherCamera-popover"
      >
        <el-slider input-size="mini" v-model="sliderNum" @change="sliderChange"></el-slider>
        <div class="leftTop-box" slot="reference" @click="soundChange()">
          <img v-if="soundStatus" src="@/assets/image/icon-sound-open.png" alt="">
          <img v-if="!soundStatus" src="@/assets/image/icon-sound-close.png" alt="">
        </div>
      </el-popover>
      <div class="leftTop-box">
        <img v-if="observation_teacherMikeStatus" src="@/assets/image/icon-mike-open.png" alt="">
        <img v-if="!observation_teacherMikeStatus" src="@/assets/image/icon-mike-close.png" alt="">
      </div>
      <div class="leftTop-box">
        <img v-if="observation_teacherCameraStatus" src="@/assets/image/icon-camera-open.png" alt="">
        <img v-if="!observation_teacherCameraStatus" src="@/assets/image/icon-camera-close.png" alt="">
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
import { mapGetters } from "vuex"
export default {
  name: 'observation-teacherCamera',
  data() {
    return {
      // 聲音-音量
      sliderNum: 50,
      // 聲音狀態 false開啟 true關閉
      soundStatus: true,
    }
  },
  computed: {
    ...mapGetters(['observation_teacherMikeStatus', 'observation_teacherCameraStatus'])
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
      this.$emit('teacherSpeakerSoundChange', this.sliderNum)
    },
    // 音量切換
    sliderChange(val) {
      console.log('當前音量：' + val)
      if (val == 0) {
        this.soundStatus = false
      } else {
        this.soundStatus = true
      }
      this.$emit('teacherSpeakerSoundChange', val)
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
      margin-top: 12px;
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
      cursor: pointer;
      margin-top: 0;
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
<style>
/* 修改音量彈窗原生樣式 */
.teacherCamera-popover {
  padding: 0 16px !important;
}
</style>