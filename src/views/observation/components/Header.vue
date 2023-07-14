<template>
  <div class="header">
    <div class="header-left">
      yyyymmdd-教室號碼
    </div>
    <div class="header-right">
      <div class="header-right-time">
        hh:mm:ss
      </div>
      <div class="header-right-icon" @click="quitOpen">
        <img src="@/assets/image/icon-quit.png" alt="">
      </div>
    </div>

    <!-- 有人進入教室彈窗 -->
    <transition name="el-zoom-in-center">
      <div class="notify-popup" v-show="joinClassroomShow">
        <p class="notify-popup-p">{{ joinClassroomUserName }}已經進入教室</p>
        <p class="notify-popup-span">{{ joinClassroomUserName }} has entered the classroom.</p>
      </div>
    </transition>

    <!-- 離開教室彈窗 -->
    <transition name="el-fade-in">
      <div class="popup" v-show="quitShow">
        <transition name="el-zoom-in-center">
          <div class="popup-box quit-box" v-if="quitShow">
            <div class="box-img">
              <img src="@/assets/image/popup-quit.png" alt="離開">
            </div>
            <h3 class="box-h3">
              確定離開教室123.123.123.123:1234 顯示
            </h3>
            <h5 class="box-h5">
              Are you sure you want to leave the classroom?
            </h5>
            <div class="box-btn">
              <button class="button1" @click="quitCancel">
                <p>取消</p>
                <span>Cancel</span>
              </button>
              <button @click="quitSubmit">
                <p>確定</p>
                <span>YES</span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'observation-header',
  data() {
    return {
      // 有人進入教室彈窗
      joinClassroomShow: false,
      // 進入教室用戶名
      joinClassroomUserName: '',
      // 離開教室彈窗狀態
      quitShow: false,
    }
  },
  watch: {
    // 監聽進入教室彈窗 三秒後關閉
    joinClassroomShow: {
      handler(val) {
        if (val) {
          setTimeout(() => {
            this.joinClassroomShow = false
          }, 4000)
        }
      },
      immediate: true
    },
  },
  methods: {
    // 用戶加入教室
    enteredHandel(uid) {
      // 根據uid區分角色 13老師 23學生 33客服
      const type = uid.toString().slice(0, 2)
      if (type == 13) {
        this.joinClassroomUserName = '老師'
        this.joinClassroomShow = true
      }
      if (type == 23) {
        this.joinClassroomUserName = '學生'
        this.joinClassroomShow = true
      }
      if (type == 33) {
        this.joinClassroomUserName = '客服'
        this.joinClassroomShow = true
      }
    },
    // 離開教室彈窗打開
    quitOpen() {
      this.quitShow = true
    },
    // 離開教室彈窗（取消）
    quitCancel() {
      this.quitShow = false
    },
    // 離開教室彈窗（確定）
    quitSubmit() {
      this.quitShow = false
      this.$emit('exitClassroom')
    },
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 0 26px;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid var(--gray-100, #F3F4F6);
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-left {
    color: #000;
    font-size: 16px;
    font-family: Microsoft JhengHei;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .header-right {
    display: flex;
    align-items: center;
    .header-right-time {
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-size: 14px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.14px;
      img {
        margin-left: 14px;
        width: 28px;
        height: 24px;
      }
    }
    .header-right-record {
      margin-left: 16px;
      user-select: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #F00;
      font-size: 14px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      letter-spacing: 0.14px;
      img {
        margin-left: 8px;
        width: 16px;
        height: 16px;
      }
    }
    .header-right-icon {
      cursor: pointer;
      margin-left: 16px;
      width: 42px;
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      &:hover {
        background: var(--gray-100, #F3F4F6);
      }
    }
  }
  // 打卡彈窗樣式
  .checkIn-box {
    .box-img {
      margin-bottom: 16px;
      padding: 12px 70px;
      text-align: center;
      img {
        width: 70px;
        height: 70px;
      }
    }
    .box-h3 {
      color: #000;
      text-align: center;
      font-size: 18px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .box-h5 {
      margin: 4px 0 33px;
      color: #666;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .box-btn {
      user-select: none;
      cursor: pointer;
      width: 230px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 4px;
      background: linear-gradient(180deg, #71AFFF 0%, #418EF2 100%);color: #FFF;
      font-size: 15px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  // 熒幕分享彈窗樣式
  .screenShare-box {
    .box-h3 {
      color: #000;
      text-align: center;
      font-size: 18px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .box-h5 {
      margin-top: 12px;
      color: #666;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .box-btn {
      margin-top: 33px;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        user-select: none;
        cursor: pointer;
        width: 230px;
        height: 48px;
        border: none;
        border-radius: 4px;
        background: linear-gradient(180deg, #71AFFF 0%, #418EF2 100%);color: #FFF;
        text-align: center;
        p {
          width: 100%;
          color: #FFF;
          font-size: 15px;
          font-family: Microsoft JhengHei;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        span {
          color: #FFF;
          font-size: 12px;
          font-family: Microsoft JhengHei;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }
  }
  // 呼叫客服彈窗樣式
  .service-box {
    .box-img {
      text-align: center;
      img {
        width: 210px;
        height: 126px;
      }
    }
    .box-h3 {
      color: #000;
      text-align: center;
      font-size: 18px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .box-h5 {
      margin-top: 4px;
      color: #666;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .box-btn {
      margin-top: 33px;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        user-select: none;
        cursor: pointer;
        width: 133px;
        height: 48px;
        border: none;
        border-radius: 4px;
        background: linear-gradient(180deg, #71AFFF 0%, #418EF2 100%);color: #FFF;
        text-align: center;
        p {
          width: 100%;
          color: #FFF;
          font-size: 15px;
          font-family: Microsoft JhengHei;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        span {
          color: #FFF;
          font-size: 12px;
          font-family: Microsoft JhengHei;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
      .button1 {
        margin-right: 14px;
        background: #ECECEC;
        p {
          color: #666;
        }
        span {
          color: #666;
        }
      }
    }
  }
  // 呼叫客服成功通知
  .notify-popup {
    position: fixed;
    left: 110px;
    bottom: 80px;
    padding: 24px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.80);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    .notify-popup-p {
      color: #FFF;
      text-align: center;
      font-size: 16px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .notify-popup-span {
      margin-top: 10px;
      color: #FFF;
      font-size: 16px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  // 設備設定彈窗樣式
  .device-popup {
    z-index: 1100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    .popup-box {
      padding: 40px 0;
      width: 600px;
      border-radius: 16px;
      background: #FFF;
      position: relative;
      .box-close {
        cursor: pointer;
        user-select: none;
        position: absolute;
        top: 30px;
        right: 24px;
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
          width: 100%;
          height: 100%;
        }
      }
      .box-h2 {
        padding: 0 60px 20px;
        color: #000;
        font-size: 23px;
        font-family: Microsoft JhengHei;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .box-hr {
        width: 100%;
        height: 1px;
        background: #E9E9EA;
      }
      .box-label {
        padding: 20px 60px 14px;
        color: #989898;
        font-size: 16px;
        font-family: Microsoft JhengHei;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .box-select {
        padding: 0 60px 10px;
        width: 100%;
        height: 50px;
        ::v-deep .el-select {
          width: 100%;
          height: 100%;
          .el-input {
            width: 100%;
            height: 100%;
            .el-input__inner {
              width: 100%;
              height: 100%;
              border: 1px solid #eee;
              color: #000;
              font-size: 16px;
              font-family: Microsoft JhengHei;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
          }
        }
      }
    }
  }
  // 離開教室彈窗樣式
  .quit-box {
    .box-img {
      margin: 0 auto 16px;
      padding: 12px 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 68px;
        height: 56px;
      }
    }
    .box-h3 {
      color: #000;
      text-align: center;
      font-size: 18px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .box-h5 {
      margin-top: 4px;
      color: #666;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft JhengHei;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .box-btn {
      margin-top: 33px;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        user-select: none;
        cursor: pointer;
        width: 133px;
        height: 48px;
        border: none;
        border-radius: 4px;
        background: linear-gradient(180deg, #71AFFF 0%, #418EF2 100%);color: #FFF;
        text-align: center;
        p {
          width: 100%;
          color: #FFF;
          font-size: 15px;
          font-family: Microsoft JhengHei;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        span {
          color: #FFF;
          font-size: 12px;
          font-family: Microsoft JhengHei;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
      .button1 {
        margin-right: 14px;
        background: #ECECEC;
        p {
          color: #666;
        }
        span {
          color: #666;
        }
      }
    }
  }
}
.header-right-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header-right-icon {
    cursor: pointer;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    &:hover {
      background: var(--gray-100, #F3F4F6);
    }
    img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>

<style>
.header-popover {
  min-width: 110px;
  padding: 10px !important;
}
</style>