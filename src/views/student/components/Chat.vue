<template>
  <div class="chat">
    <div class="chat-head">
      <img src="@/assets/image/icon-chat.png" alt="">
    </div>
    <div class="chat-content" ref="chatBox">
      <div
        v-for="(item, index) in chatList"
        :key="index"
        class="chat-content-box" 
       :class="item.type == 1 ? 'type1' : 'type2'"
      >
        <div class="box-name">
          {{ item.name }}
          <span>{{ item.time }}</span>
        </div>
        <div class="box-text">
          {{ item.content }}
        </div>
      </div>
    </div>
    <div class="chat-bottom">
      <div class="chat-bottom-left">
        <div class="chat-bottom-link" @click="linkClick">
          <img src="@/assets/image/icon-link.png" alt="">
        </div>
        <span class="chat-bottom-span"></span>
        <div class="chat-bottom-input">
          <input type="text" placeholder="請輸入訊息 Type your message." v-model="chatMessage" @keyup.enter="sendClick" />
        </div>
      </div>
      <div class="chat-bottom-right">
        <div class="chat-bottom-send" @click="sendClick">
          <img src="@/assets/image/icon-send.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'student-chat',
  data() {
    return {
      // 消息輸入框
      chatMessage: "",
      // 歷史消息列表
      chatList: [
        {
          type: 2, // 1自己 2別人
          name: 'Teacher’s name',
          time: '2023-05-23 11:09:18',
          content: 'Hello Guys! Whats your opinion?'
        },
        {
          type: 1, // 1自己 2別人
          name: 'Student’s name',
          time: '2023-05-23 14:55:00',
          content: 'Yes, It will decrease the loading'
        },
      ]
    }
  },
  created() {
    this.handleScrollBottom()
  },
  methods: {
    // 滚动到底部
    handleScrollBottom() {
      this.$nextTick(() => {
        let scrollElem = this.$refs.chatBox;
        scrollElem.scrollTo({ top: scrollElem.scrollHeight, behavior: 'smooth' });
      });
    },
    // 鏈接按鈕點擊
    linkClick() {

    },
    // 發送信息（發送之後調用handleScrollBottom 即可滾動到最底部）
    sendClick() {
      if (this.chatMessage !== '') {
        this.chatList.push({
          type: 1, // 1自己 2別人
          name: 'Student’s name',
          time: '2023-05-23 14:55:00',
          content: this.chatMessage
        })
        this.chatMessage = ''
        this.handleScrollBottom()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  margin-top: 12px;
  width: 100%;
  height: 320px;
  // height: calc((100% - 24px) / 3);
  // min-height: 260px;
  border-radius: 8px;
  border: 1px solid var(--unnamed, #E9E9EA);
  background: #FFF;
  overflow: hidden;
  .chat-head {
    width: 100%;
    height: 40px;
    background: var(--unnamed, #647CB1);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .chat-content {
    padding: 12px;
    width: 100%;
    height: calc(100% - 90px);
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE10+ */
    &::-webkit-scrollbar {
      display: none; /* ChromeSafari */
    }
    .chat-content-box {
      margin-bottom: 10px;
      display: flex;
      flex-wrap: wrap;
      .box-name {
        margin-bottom: 6px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        color: #333;
        font-size: 16px;
        font-family: Microsoft JhengHei;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        span {
          margin-left: 6px;
          color: #BFBFBF;
          font-size: 10px;
          font-family: Microsoft JhengHei;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
      .box-text {
        max-width: 100%;
        min-height: 49px;
        padding: 14px 16px;
        border-radius: 6px;
        color: #FFF;
        font-size: 16px;
        font-family: Microsoft JhengHei;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
    
    .type1 {
      justify-content: flex-end;
      .box-name {
        justify-content: flex-end;
      }
      .box-text {
        border-top-right-radius: 0;
        background: #333;
      }
    }
    .type2 {
      .box-text {
        border-top-left-radius: 0;
        background: #647CB1;
      }
    }
  }
  .chat-bottom {
    padding: 0 20px;
    width: 100%;
    height: 50px;
    border-top: 1px solid var(--unnamed, #E9E9EA);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .chat-bottom-left {
      width: calc(100% - 62px);
      display: flex;
      align-items: center;
      .chat-bottom-link {
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
      }
      .chat-bottom-span {
        margin: 0 10px 0;
        width: 1px;
        height: 26px;
        background: #E9E9EA;
      }
      .chat-bottom-input {
        flex: 1;
        height: 40px;
        padding: 0 6px;
        input {
          width: 100%;
          height: 100%;
          border: none;
          background: none;
          font-size: 14px;
          font-family: Microsoft JhengHei;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          &:focus {
            outline: none;
          }
          &::placeholder {
            color: #989898;
          }
        }
      }
    }
    .chat-bottom-right {
      width: 62px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .chat-bottom-send {
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
      }
    }
  }
}
</style>