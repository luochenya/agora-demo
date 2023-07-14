<template>
  <div class="studentCamera">
    <div class="studentCamera-video" id="local-studentCamera"></div>
    <!-- 默認圖片 -->
    <img src="@/assets/image/camera.png" alt="">
    <!-- 左上角音視頻操作 -->
    <div class="studentCamera-leftTop">
      <el-popover
        placement="right"
        width="50"
        trigger="hover"
        popper-class="studentCamera-popover"
      >
        <el-slider input-size="mini" v-model="sliderNum" @change="sliderChange"></el-slider>
        <div class="leftTop-box" slot="reference" @click="soundChange()">
          <img v-if="soundStatus" src="@/assets/image/icon-sound-open.png" alt="">
          <img v-if="!soundStatus" src="@/assets/image/icon-sound-close.png" alt="">
        </div>
      </el-popover>
      <div class="leftTop-box">
        <img v-if="observation_studentMikeStatus" src="@/assets/image/icon-mike-open.png" alt="">
        <img v-if="!observation_studentMikeStatus" src="@/assets/image/icon-mike-close.png" alt="">
      </div>
      <div class="leftTop-box">
        <img v-if="observation_studentCameraStatus" src="@/assets/image/icon-camera-open.png" alt="">
        <img v-if="!observation_studentCameraStatus" src="@/assets/image/icon-camera-close.png" alt="">
      </div>
    </div>
    <!-- 左下角名字 -->
    <div class="studentCamera-leftBottom">
      <span></span>
      Student’s name
    </div>
    <!-- 右下角盾牌 -->
    <div class="studentCamera-rightBottom">
      <transition name="el-fade-in">
        <img v-show="observation_permissions" src="@/assets/image/icon-shield-open.png" alt="">
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'observation-studentCamera',
  data() {
    return {
      sliderNum: 50,
      // 聲音狀態 false開啟 true關閉
      soundStatus: true,
    }
  },
  computed: {
    ...mapGetters(['observation_permissions', 'observation_studentMikeStatus', 'observation_studentCameraStatus'])
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
      this.$emit('studentSpeakerSoundChange', this.sliderNum)
    },
    // 音量切換
    sliderChange(val) {
      console.log('當前音量：' + val)
      if (val == 0) {
        this.soundStatus = false
      } else {
        this.soundStatus = true
      }
      this.$emit('studentSpeakerSoundChange', val)
    },
  }
}
</script>

<style lang="scss" scoped>
.studentCamera {
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
  .studentCamera-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
  }
  .studentCamera-leftTop {
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
  .studentCamera-leftBottom {
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
  .studentCamera-rightBottom {
    user-select: none;
    position: absolute;
    right: 12px;
    bottom: 12px;
    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
<style>
/* 修改音量彈窗原生樣式 */
.studentCamera-popover {
  padding: 0 16px !important;
}
</style>