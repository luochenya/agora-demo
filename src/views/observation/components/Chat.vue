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
  </div>
</template>

<script>
export default {
  name: 'observation-chat',
  data() {
    return {
      // 消息輸入框
      chatMessage: "",
      // 歷史消息列表
      chatList: [
        {
          type: 2, // 1自己 2別人
          name: 'Student’s name',
          time: '2023-05-23 11:09:18',
          content: 'Hello Guys! Whats your opinion?'
        },
        {
          type: 2, // 1自己 2別人
          name: '客服人員',
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
    height: calc(100% - 40px);
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
}
</style>