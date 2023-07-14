<template>
  <div class="sketchpad" :class="student_full_status ? 'sketchpad-full' : ''">
    <!-- 畫板頭部 -->
    <transition name="el-fade-in">
      <div class="sketchpad-head">
        <div class="sketchpad-head-left" v-show="!student_full_status">
          <p>Practical English</p>
          <img src="@/assets/image/icon-right.png" alt="">
          <span>Unit 1</span>
          <img src="@/assets/image/icon-right.png" alt="">
          <span>Page 7</span>
          <img src="@/assets/image/icon-right.png" alt="">
          <span>xxxxxxxx.jpg</span>
          <img src="@/assets/image/icon-right.png" alt="">
        </div>
      </div>
    </transition>
    <!-- 畫板內容 -->
    <div class="sketchpad-box">
      <transition name="el-zoom-in-center">
        <div
          class="sketchpad-box-left"
          v-show="!student_full_status || (student_full_status && fullLeftShow)"
          @mouseover="fullLeftMouseover" @mouseleave="fullLeftMouseleave"
        >
          <div class="sketchpad-box-left-mask" v-if="!student_permissions"></div>
          <!-- 文字 -->
          <div
            class="left-box"
            :class="toolTextStatus ? 'tool-btns' : 'tool-btn'"
            @click="toolStatusChange('toolTextStatus')"
          >
            <img v-if="!toolTextStatus" src="@/assets/image/icon-tool2-close.png" alt="">
            <img v-if="toolTextStatus" src="@/assets/image/icon-tool2-open.png" alt="">
          </div>
          <!-- 隨意畫 -->
          <div class="left-box">
            <el-popover placement="right" trigger="hover" popper-class="sketchpad-popover">
              <div class="box-div" @mouseover="fullLeftMouseover" @mouseleave="fullLeftMouseleave">
                <div
                  :class="toolRandomCheck == 1 ? 'tool-btns' : 'tool-btn'"
                  @click="toolCheckChange('toolRandomCheck', 1)"
                >
                  <img v-if="toolRandomCheck == 1" src="@/assets/image/icon-tool3-open.png" alt="">
                  <img v-else src="@/assets/image/icon-tool3-close.png" alt="">
                </div>
                <div
                  :class="toolRandomCheck == 2 ? 'tool-btns' : 'tool-btn'"
                  @click="toolCheckChange('toolRandomCheck', 2)"
                >
                  <img v-if="toolRandomCheck == 2" src="@/assets/image/icon-tool4-open.png" alt="">
                  <img v-else src="@/assets/image/icon-tool4-close.png" alt="">
                </div>
                <div
                  :class="toolRandomCheck == 3 ? 'tool-btns' : 'tool-btn'"
                  @click="toolCheckChange('toolRandomCheck', 3)"
                >
                  <img v-if="toolRandomCheck == 3" src="@/assets/image/icon-tool5-open.png" alt="">
                  <img v-else src="@/assets/image/icon-tool5-close.png" alt="">
                </div>
              </div>
              <div
                slot="reference"
                :class="toolRandomStatus ? 'tool-btns' : 'tool-btn'"
                @click="toolStatusChange('toolRandomStatus')"
              >
                <img v-if="!toolRandomStatus && toolRandomCheck == 1" src="@/assets/image/icon-tool3-close.png" alt="">
                <img v-if="!toolRandomStatus && toolRandomCheck == 2" src="@/assets/image/icon-tool4-close.png" alt="">
                <img v-if="!toolRandomStatus && toolRandomCheck == 3" src="@/assets/image/icon-tool5-close.png" alt="">
                <img v-if="toolRandomStatus && toolRandomCheck == 1" src="@/assets/image/icon-tool3-open.png" alt="">
                <img v-if="toolRandomStatus && toolRandomCheck == 2" src="@/assets/image/icon-tool4-open.png" alt="">
                <img v-if="toolRandomStatus && toolRandomCheck == 3" src="@/assets/image/icon-tool5-open.png" alt="">
              </div>
            </el-popover>
          </div>
          <!-- 形狀 -->
          <div class="left-box">
            <el-popover placement="right" trigger="hover" popper-class="sketchpad-popover">
              <div class="box-div" @mouseover="fullLeftMouseover" @mouseleave="fullLeftMouseleave">
                <div
                  :class="toolshapeCheck == 1 ? 'tool-btns' : 'tool-btn'"
                  @click="toolCheckChange('toolshapeCheck', 1)"
                >
                  <img v-if="toolshapeCheck == 1" src="@/assets/image/icon-tool7-open.png" alt="">
                  <img v-else src="@/assets/image/icon-tool7-close.png" alt="">
                </div>
                <div
                  :class="toolshapeCheck == 2 ? 'tool-btns' : 'tool-btn'"
                  @click="toolCheckChange('toolshapeCheck', 2)"
                >
                  <img v-if="toolshapeCheck == 2" src="@/assets/image/icon-tool8-open.png" alt="">
                  <img v-else src="@/assets/image/icon-tool8-close.png" alt="">
                </div>
                <div
                  :class="toolshapeCheck == 3 ? 'tool-btns' : 'tool-btn'"
                  @click="toolCheckChange('toolshapeCheck', 3)"
                >
                  <img v-if="toolshapeCheck == 3" src="@/assets/image/icon-tool9-open.png" alt="">
                  <img v-else src="@/assets/image/icon-tool9-close.png" alt="">
                </div>
              </div>
              <div
                slot="reference"
                :class="toolshapeStatus ? 'tool-btns' : 'tool-btn'"
                @click="toolStatusChange('toolshapeStatus')"
              >
                <img v-if="!toolshapeStatus && toolshapeCheck == 1" src="@/assets/image/icon-tool7-close.png" alt="">
                <img v-if="!toolshapeStatus && toolshapeCheck == 2" src="@/assets/image/icon-tool8-close.png" alt="">
                <img v-if="!toolshapeStatus && toolshapeCheck == 3" src="@/assets/image/icon-tool9-close.png" alt="">
                <img v-if="toolshapeStatus && toolshapeCheck == 1" src="@/assets/image/icon-tool7-open.png" alt="">
                <img v-if="toolshapeStatus && toolshapeCheck == 2" src="@/assets/image/icon-tool8-open.png" alt="">
                <img v-if="toolshapeStatus && toolshapeCheck == 3" src="@/assets/image/icon-tool9-open.png" alt="">
              </div>
            </el-popover>
          </div>
          <!-- 調色板 -->
          <div
            class="left-box"
            :class="toolPaletteStatus ? 'tool-btns' : 'tool-btn'"
            @click="toolStatusChange('toolPaletteStatus')"
          >
            <div :style="{ background: paletteBackground }"></div>
          </div>
          <!-- 物件選取 -->
          <div
            class="left-box"
            :class="toolSelectStatus ? 'tool-btns' : 'tool-btn'"
            @click="toolStatusChange('toolSelectStatus')"
          >
            <img v-if="!toolSelectStatus" src="@/assets/image/icon-tool13-close.png" alt="">
            <img v-if="toolSelectStatus" src="@/assets/image/icon-tool13-open.png" alt="">
          </div>
          <!-- 橡皮擦 -->
          <div
            class="left-box"
            :class="toolEraserStatus ? 'tool-btns' : 'tool-btn'"
            @click="toolStatusChange('toolEraserStatus')"
          >
            <img v-if="!toolEraserStatus" src="@/assets/image/icon-tool14-close.png" alt="">
            <img v-if="toolEraserStatus" src="@/assets/image/icon-tool14-open.png" alt="">
          </div>
          <!-- 蓋章 -->
          <div class="left-box">
            <el-popover placement="right" trigger="hover" popper-class="sketchpad-popover">
              <div class="box-imgList" @mouseover="fullLeftMouseover" @mouseleave="fullLeftMouseleave">
                <div
                  v-for="(item, index) in stampList"
                  :key="index"
                  :class="toolStampCheck == item ? 'box-imgList-divs' : 'box-imgList-div'"
                  @click="toolCheckChange('toolStampCheck', item)"
                >
                  <img :src="item" alt="">
                </div>
              </div>
              <div
                slot="reference"
                :class="toolStampStatus ? 'tool-btns' : 'tool-btn'"
                @click="toolStatusChange('toolStampStatus')"
              >
                <img v-if="!toolStampStatus" src="@/assets/image/icon-tool15-close.png" alt="">
                <img v-if="toolStampStatus" src="@/assets/image/icon-tool15-open.png" alt="">
              </div>
            </el-popover>
          </div>
        </div>
      </transition>
      <div class="sketchpad-box-right">
        <div class="sketchpad-box-right-head"></div>
        <div class="sketchpad-box-right-foo" v-if="!student_full_status">
          <div class="foo-left">
            
          </div>
          <div class="foo-right">
            <div class="foo-media" v-if="mediaShow">
              <div class="foo-media-btn">
                <img src="@/assets/image/icon-play-dis.png" alt="">
              </div>
              <div class="foo-media-btn">
                <img src="@/assets/image/icon-stop-dis.png" alt="">
              </div>
              <div class="foo-media-time">
                {{ mediaCurrentDuration }}
              </div>
              <div class="foo-media-slider">
                <el-slider v-model="mediaSlider" :show-tooltip="false" disabled @change="mediaChange"></el-slider>
              </div>
              <div class="foo-media-time">
                {{ mediaTotalDuration }}
              </div>
            </div>
            <div class="foo-volume" v-if="volumeShow">
              <div class="volume-btn" @click="volumeClick">
                <img v-if="!volumeStatus" src="@/assets/image/icon-volume-open.png" alt="">
                <img v-if="volumeStatus" src="@/assets/image/icon-volume-close.png" alt="">
              </div>
              <div class="volume-slider">
                <el-slider v-model="volumeSlider" :show-tooltip="false" @change="volumeChange"></el-slider>
              </div>
            </div>
            <div class="foo-full" @click="fullChange">
              <img src="@/assets/image/icon-full-open.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 全屏模式的音頻操作 -->
    <transition name="el-zoom-in-bottom">
      <div
        class="sketchpad-box-right-bottom"
        v-show="student_full_status && fullBottomShow"
        @mouseover="fullBottomMouseover" @mouseleave="fullBottomMouseleave"
      >
        <div class="bottom-slider">
          <el-slider v-model="mediaSlider" v-if="mediaShow" disabled :show-tooltip="false" @change="mediaChange"></el-slider>
        </div>
        <div class="bottom-box">
          <div class="bottom-box-left">
            <div class="bottom-media-btn" style="cursor: no-drop;" v-if="mediaShow">
            <img src="@/assets/image/icon-play-dis.png" alt="">
            </div>
            <div class="bottom-media-btn" style="cursor: no-drop;" v-if="mediaShow">
            <img src="@/assets/image/icon-stop-dis.png" alt="">
            </div>
            <div class="bottom-media-time" v-if="mediaShow">
              {{ mediaCurrentDuration }} / {{ mediaTotalDuration }}
            </div>
          </div>
          <div class="bottom-box-right">
            <div class="bottom-media-volume" v-if="volumeShow" @click="volumeClick">
              <img v-if="!volumeStatus" src="@/assets/image/icon-volume-open.png" alt="">
              <img v-if="volumeStatus" src="@/assets/image/icon-volume-close.png" alt="">
            </div>
            <div class="bottom-media-slider" v-if="volumeShow">
              <el-slider v-model="volumeSlider" :show-tooltip="false" @change="volumeChange"></el-slider>
            </div>
            <div class="bottom-media-btn" @click="fullChange" v-if="student_full_status">
              <img src="@/assets/image/icon-full-close.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 全屏模式下 鼠標滑上觸發展示塊 -->
    <div class="sketchpad-full-left" @mouseover="fullLeftMouseover" @mouseleave="fullLeftMouseleave"></div>
    <div class="sketchpad-full-bottom" @mouseover="fullBottomMouseover"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'student-sketchpad',
  data() {
    return {
      // 音視頻下拉選
      fileSelectCheck: {},
      // 音視頻列表
      fileSelectList: [
        {
          label: '音檔',
          list: [
            { type: 1, id: 'A1', label: 'A0001.mp3' },
            { type: 1, id: 'A2', label: 'A0002.mp3' },
            { type: 1, id: 'A3', label: 'A0003.mp3' },
          ]
        },
        {
          label: '影片',
          list: [
            { type: 2, id: 'B1', label: 'B0001.mp4' },
            { type: 2, id: 'B2', label: 'B0002.mp4' },
            { type: 2, id: 'B3', label: 'B0003.mp4' },
            { type: 2, id: 'B4', label: 'B0004.mp4' },
            { type: 2, id: 'B5', label: 'B0005.mp4' },
          ]
        },
      ],
      // 蓋章列表
      stampList: [
        require('@/assets/image/stampList/stamp1.png'),
        require('@/assets/image/stampList/stamp2.png'),
        require('@/assets/image/stampList/stamp3.png'),
        require('@/assets/image/stampList/stamp4.png'),
        require('@/assets/image/stampList/stamp5.png'),
      ],
      
      // 工具欄選中狀態-文字
      toolTextStatus: false,
      // 工具欄選中狀態-隨意畫
      toolRandomStatus: false,
      toolRandomCheck: 1,
      // 工具欄選中狀態-形狀
      toolshapeStatus: false,
      toolshapeCheck: 1,
      // 工具欄選中狀態-調色板
      toolPaletteStatus: false,
      paletteBackground: '#D60839',
      // 工具欄選中狀態-物件選取
      toolSelectStatus: false,
      // 工具欄選中狀態-橡皮擦
      toolEraserStatus: false,
      // 工具欄選中狀態-蓋章
      toolStampStatus: false,
      toolStampCheck: '',


      // 媒體操作-顯示狀態
      mediaShow: true,
      // 媒體播放-當前時長
      mediaCurrentDuration: '00:11',
      // 媒體播放-總時長
      mediaTotalDuration: '39:16',
      // 媒體時長滑塊
      mediaSlider: 28.5,

      // 媒體音量-顯示狀態
      volumeShow: true,
      // 媒體音量狀態
      volumeStatus: false,
      // 媒體音量滑塊
      volumeSlider: 40,

      // 全屏模式-左側工具欄顯示
      fullLeftShow: false,
      // 全屏模式-底部進度條顯示
      fullBottomShow: false,
    }
  },
  computed: {
    ...mapGetters(['student_full_status', 'student_permissions'])
  },
  methods: {
    // 工具欄選中切換
    toolStatusChange(type) {
      this[type] = !this[type]
    },
    // 工具欄下的子類選中切換
    toolCheckChange(type, num) {
      this[type] = num
    },
    // 媒體播放進度切換
    mediaChange(val) {
      console.log('當前音量：' + val)
    },
    // 媒體聲音切換
    volumeClick() {
      this.volumeStatus = !this.volumeStatus
      if (this.volumeStatus) {
        this.volumeSlider = 0
      } else {
        this.volumeSlider = 40
      }
    },
    // 媒體音量切換
    volumeChange(val) {
      if (val == 0) {
        this.volumeStatus = true
      } else {
        this.volumeStatus = false
      }
    },
    // 全屏切換
    fullChange() {
      this.$store.commit('student/SET_FULL_STATUS', !this.student_full_status)
    },
    // 全屏模式-左側工具欄劃上顯示
    fullLeftMouseover() {
      this.fullLeftShow = true
    },
    // 全屏模式-左側工具欄劃開隱藏
    fullLeftMouseleave() {
      this.fullLeftShow = false
    },
    // 全屏模式-底部播放欄劃上顯示
    fullBottomMouseover() {
      this.fullBottomShow = true
    },
    // 全屏模式-底部播放欄劃開隱藏
    fullBottomMouseleave() {
      this.fullBottomShow = false
    },    
  }
}
</script>

<style lang="scss" scoped>
.sketchpad {
  width: 100%;
  height: 100%;
  .sketchpad-head {
    z-index: 2;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sketchpad-head-left {
      display: flex;
      align-items: center;
      p {
        color: #1F2937;
        font-size: 12px;
        font-family: Microsoft JhengHei;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
      img {
        margin: 0 12px 0 6px;
        width: 12px;
        height: 12px;
      }
      span {
        color: #6B7280;
        font-size: 12px;
        font-family: Microsoft JhengHei;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
      }
    }
  }
  .sketchpad-box {
    width: 100%;
    height: calc(100% - 40px);
    display: flex;
    justify-content: space-between;
    .sketchpad-box-left {
      padding: 15px 10px;
      width: 60px;
      max-height: 100%;
      overflow: auto;
      border-radius: 8px;
      border: 1px solid #E9E9EA;
      background: #FFF;
      position: relative;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE10+ */
      &::-webkit-scrollbar {
        display: none; /* ChromeSafari */
      }
      .sketchpad-box-left-mask {
        cursor: no-drop;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba($color: #FFF, $alpha: 0.7);
      }
      .left-box {
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .sketchpad-box-right {
      width: calc(100% - 76px);
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      .sketchpad-box-right-head {
        width: 100%;
        height: calc(100% - 58px);
        border-radius: 8px;
        border: 1px solid #E9E9EA;
        background: #FFF;
      }
      .sketchpad-box-right-foo {
        padding: 0 12px;
        width: 100%;
        height: 50px;
        border-radius: 8px;
        border: 1px solid #E9E9EA;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .foo-left {
          display: flex;
          align-items: center;
          .foo-left-box {
            cursor: pointer;
            user-select: none;
            width: 40px;
            height: 40px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
              background: #F3F4F6;
            }
            img {
              width: 16px;
              height: 16px;
            }
          }
          .foo-left-music {
            cursor: pointer;
            user-select: none;
            width: 40px;
            height: 40px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 16px;
              height: 16px;
            }
          }
          .foo-left-div {
            margin: 0 5px;
            min-width: 40px;
            color: #000;
            font-size: 13px;
            font-family: Microsoft JhengHei;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
          }
          .foo-left-select {
            width: 180px;
            height: 30px;
            border-radius: 4px;
            position: relative;
            ::v-deep .el-select {
              width: 100%;
              height: 100%;
              .el-input {
                width: 100%;
                height: 100%;
                .el-input__inner {
                  padding: 5px 34px 5px 14px;
                  width: 100%;
                  height: 100%;
                  border: 1px solid rgba(0, 0, 0, 0.20);
                  color: #323130;
                  font-size: 12px;
                  font-family: Microsoft JhengHei;
                  font-style: normal;
                  font-weight: 400;
                  line-height: normal;
                }
                .el-input__suffix {
                  display: none;
                }
              }
            }
            .foo-left-select-div {
              position: absolute;
              top: 5px;
              right: 10px;
              width: 20px;
              height: 20px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
        .foo-right {
          display: flex;
          align-items: center;
          .foo-media {
            display: flex;
            align-items: center;
            .foo-media-btn {
              user-select: none;
              cursor: no-drop;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 5px;
              &:hover {
                background: #F2F2F2;
              }
              img {
                width: 24px;
                height: 24px;
              }
            }
            .foo-media-time {
              margin: 0 5px;
              color: #000;
              font-size: 14px;
              font-family: Microsoft JhengHei;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
            .foo-media-slider {
              margin: 0 20px;
              width: 246px;
            }
          }
          .foo-volume {
            margin: 0 50px;
            display: flex;
            align-items: center;
            .volume-btn {
              cursor: pointer;
              user-select: none;
              width: 40px;
              height: 40px;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              &:hover {
                background: #F3F4F6;
              }
              img {
                width: 24px;
                height: 24px;
              }
              span {
                width: 24px;
                height: 24px;
              }
            }            .volume-slider {
              margin-left: 10px;
              width: 130px;
            }
          }
          .foo-full {
            cursor: pointer;
            user-select: none;
            width: 40px;
            height: 40px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
              background: #F3F4F6;
            }
            img {
              width: 24px;
              height: 24px;
            }
          }
        }
        @media screen and (max-width: 1880px) {
          .foo-right {
            .foo-media {
              .foo-media-slider {
                margin: 0 15px;
                width: 180px;
              }
            }
            .foo-volume {
              margin: 0 30px;
              .volume-slider {
                margin-left: 10px;
                width: 100px;
              }
            }
          }
        }
        @media screen and (max-width: 1680px) {
          .foo-right {
            .foo-media {
              .foo-media-slider {
                margin: 0 15px;
                width: 150px;
              }
            }
            .foo-volume {
              margin: 0 10px;
            }
          }
        }
        @media screen and (max-width: 1580px) {
          .foo-right {
            .foo-media {
              .foo-media-slider {
                margin: 0 15px;
              }
            }
            .foo-volume {
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
}
// 全屏的樣式
.sketchpad-full {
  background: #FFF;
  .sketchpad-head {
    width: auto;
    position: fixed;
    top: 10px;
    right: 20px;
  }
  .sketchpad-box {
    height: 100%;
    .sketchpad-box-left {
      position: fixed;
      top: calc(50% - 203px);
      left: 25px;
    }
    .sketchpad-box-right {
      width: 100%;
      height: 100%;
      .sketchpad-box-right-head {
        width: 100%;
        height: 100%;
        border-radius: 0;
      }
    }
  }
  .sketchpad-full-left {
    position: fixed;
    top: 0;
    left: 0;
    width: 30px;
    height: 100vh;
  }
  .sketchpad-full-bottom {
    z-index: 1;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 30px;
  }
}

.sketchpad-box-right-bottom {
  z-index: 2;
  padding: 40px 25px 25px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 130px;
  .bottom-slider {
    width: 100%;
    height: 40px;
  }
  .bottom-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bottom-box-left {
      display: flex;
      align-items: center;
      .bottom-media-time {
        margin: 0 16px;
        color: #000;
        font-size: 14px;
        font-family: Microsoft JhengHei;
        font-style: normal;
        font-weight: 290;
        line-height: normal;
      }
      .bottom-media-div {
        color: #000;
        font-size: 13px;
        font-family: Microsoft JhengHei;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
      .bottom-media-music {
        cursor: pointer;
        user-select: none;
        width: 40px;
        height: 40px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 16px;
          height: 16px;
        }
      }
      .bottom-media-select {
        width: 180px;
        height: 30px;
        border-radius: 4px;
        position: relative;
        ::v-deep .el-select {
          width: 100%;
          height: 100%;
          .el-input {
            width: 100%;
            height: 100%;
            .el-input__inner {
              padding: 5px 34px 5px 14px;
              width: 100%;
              height: 100%;
              border: 1px solid rgba(0, 0, 0, 0.20);
              color: #323130;
              font-size: 12px;
              font-family: Microsoft JhengHei;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
            .el-input__suffix {
              display: none;
            }
          }
        }
        .bottom-media-select-div {
          position: absolute;
          top: 5px;
          right: 10px;
          width: 20px;
          height: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .bottom-box-right {
      display: flex;
      align-items: center;
      .bottom-media-volume {
        cursor: pointer;
        user-select: none;
        width: 40px;
        height: 40px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 24px;
          height: 24px;
        }
      }
      .bottom-media-slider {
        margin: 0 30px 0 10px;
        width: 130px;
      }
    }
    .bottom-media-btn {
      cursor: pointer;
      user-select: none;
      width: 40px;
      height: 40px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: #F3F4F6;
      }
      img {
        width: 24px;
        height: 24px;
      }
      .img1 {
        width: 16px;
        height: 16px;
      }
    }
  }
}
.box-div {
  padding: 10px;
  display: flex;
  align-items: center;
  .tool-btn, .tool-btns {
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
}
.tool-btn {
  user-select: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  &:hover {
    background: #F2F2F2;
  }
  img {
    width: 24px;
    height: 24px;
  }
  div {
    width: 20px;
    height: 20px;
  }
}
.tool-btns {
  user-select: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #418EF2;
  img {
    width: 24px;
    height: 24px;
  }
  div {
    width: 20px;
    height: 20px;
  }
}
.box-imgList {
  padding: 10px;
  max-width: 370px;
  max-height: 370px;
  overflow-y: auto;
  .box-imgList-div {
    user-select: none;
    cursor: pointer;
    width: 70px;
    height: 70px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    &:hover {
      background: #F2F2F2;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .box-imgList-divs {
    user-select: none;
    cursor: pointer;
    width: 70px;
    height: 70px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: #418EF2;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}

</style>
<style>
/* 修改彈窗原生樣式 */
.sketchpad-popover {
  padding: 0 !important;
}
.sketchpad-popovers {
  min-width: 40px;
  padding: 15px 0 !important;
  display: flex;
  justify-content: center;
}
</style>