<template>
  <div class="employee" :class="employee_full_status ? 'employee-full' : ''">
    <!-- 頭部組件 -->
    <Header
      v-show="!employee_full_status"
      ref="HeaderRef"
      @exitClassroom="agoraLeave"
    />
    <div class="employee-box">
      <div class="employee-box-left">
        <!-- 畫板 -->
        <Sketchpad />
      </div>
      <div class="employee-box-right" v-show="!employee_full_status">
        <!-- 老師畫面 -->
        <TeacherCamera @teacherSpeakerSoundChange="teacherSpeakerSoundChange" />
        <!-- 學生畫面 -->
        <StudentCamera @studentSpeakerSoundChange="studentSpeakerSoundChange" />
        <!-- 聊聊 -->
        <Chat />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import AgoraRTC from "agora-rtc-sdk-ng";
import Header from "./components/Header.vue"
import Sketchpad from "./components/Sketchpad.vue"
import TeacherCamera from "./components/TeacherCamera.vue"
import StudentCamera from "./components/StudentCamera.vue"
import Chat from "./components/Chat.vue"
export default {
  name: 'Observation',
  components: {
    Header,
    Sketchpad,
    TeacherCamera,
    StudentCamera,
    Chat
  },
  data() {
    return {
      // 用戶信息
      userId: sessionStorage.getItem('agoraUid'),
      // agora配置
      // appId
      agoraAppId: process.env.VUE_APP_AGORA_APPID,
      // 頻道號
      agoraChannel: sessionStorage.getItem('agoraChannel'),
      // 根據頻道號生成的token
      agoraToken: sessionStorage.getItem('agoraToken'),
      // 加入 Uid = 43 + 用戶id
      agoraUid: Number('43' + sessionStorage.getItem('agoraUid')),

      // agora實例
      // 加入頻道實例
      agoraClient: null,

      // 遠端音頻列表
      remoteUserAudioList: {},
      // 遠端視頻列表
      remoteUserVideoList: {},

      // 上線驗證時間戳
      onlineTime: 0,
      // 上線驗證時長
      onlineSecond: 5,
    }
  },
  computed: {
    ...mapGetters(['employee_full_status'])
  },
  created() {
    this.agoraInit()
  },
  methods: {
    // 初始加入頻道 創建本地agora實例
    async agoraInit() {
      // 創建agora實例
      this.agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      // 添加監聽事件 監聽用戶離開加入
      this.agoraClient.on("user-published", this.agoraUserPublished);
      this.agoraClient.on("user-unpublished", this.agoraUserUnpublished);
      this.agoraClient.on("user-joined", this.agoraUserJoined);
      // 創建一個時間戳 用於做上線驗證
      this.onlineTime = new Date().getTime()
      // 加入頻道
      await this.agoraClient.join(this.agoraAppId, this.agoraChannel, this.agoraToken, this.agoraUid);
    },
    // 用戶監聽-監聽遠端用戶加入頻道 用於加入教室彈窗
    agoraUserJoined(user) {
      // 當前時間
      const nowTime = new Date().getTime()
      // 用當前時間和加入頻道時間對比 監聽用戶加入 彈出加入房間彈窗
      if (nowTime - this.onlineTime > this.onlineSecond * 1000) {
        this.$refs.HeaderRef.enteredHandel(user.uid)
      }
    },
    // 用戶監聽-訂閱遠端用戶發佈音視頻軌道
    async agoraUserPublished(user, mediaType) {
      // 訂閱遠程用戶
      await this.agoraClient.subscribe(user, mediaType);
      // 根據uid區分並渲染畫面
      const type = user.uid.toString().slice(0, 2)

      // 音頻播放
      if (mediaType == 'audio') {
        // 加入至列表暫存
        this.remoteUserAudioList[user.uid] = user
        // 播放音頻
        user.audioTrack.play()
        // 根據type設置用戶的播放按鈕狀態  11老師 21學生
        if (type == 11) {
          this.$store.commit('observation/SET_TEACHERMIKESTATUS', true)
        }
        if (type == 21) {
          this.$store.commit('observation/SET_STUDENTMIKESTATUS', true)
        }
      }
      // 視頻播放
      if (mediaType == 'video') {
        // 加入至列表暫存
        this.remoteUserVideoList[user.uid] = user
        // 根據type設置用戶的播放按鈕狀態  11老師 21學生
        if (type == 11) {
          user.videoTrack.play("local-teacherCamera")
          this.$store.commit('observation/SET_TEACHERCAMERASTATUS', true)
        }
        if (type == 21) {
          user.videoTrack.play("local-studentCamera")
          this.$store.commit('observation/SET_STUDENTCAMERASTATUS', true)
        }
      }
    },
    // 用戶監聽-訂閱遠端用戶取消發佈音視頻軌道
    async agoraUserUnpublished(user, mediaType) {
      // 根據uid區分並渲染畫面
      const type = user.uid.toString().slice(0, 2)
      // 音頻停止
      if (mediaType == 'audio') {
        // 根據type設置用戶的播放按鈕狀態  11老師 21學生
        if (type == 11) {
          this.$store.commit('observation/SET_TEACHERMIKESTATUS', false)
        }
        if (type == 21) {
          this.$store.commit('observation/SET_STUDENTMIKESTATUS', false)
        }
      }
      // 音頻停止
      if (mediaType == 'video') {
        // 根據type設置用戶的播放按鈕狀態  11老師 21學生
        if (type == 11) {
          this.$store.commit('observation/SET_TEACHERCAMERASTATUS', false)
        }
        if (type == 21) {
          this.$store.commit('observation/SET_STUDENTCAMERASTATUS', false)
        }
      }
      // 從列表移除
      if (this.remoteUserAudioList[user.uid]) {
        delete this.remoteUserAudioList[user.uid]
      }
      if (this.remoteUserVideoList[user.uid]) {
        delete this.remoteUserVideoList[user.uid]
      }
    },

    // 老師揚聲器音量調整
    teacherSpeakerSoundChange(num) {
      for (let key in this.remoteUserAudioList) {
        let type = key.toString().slice(0, 2)
        if (['11'].includes(type)) {
          this.remoteUserAudioList[key].audioTrack.setVolume(num)
        }
      }
    },
    // 學生揚聲器音量調整
    studentSpeakerSoundChange(num) {
      for (let key in this.remoteUserAudioList) {
        let type = key.toString().slice(0, 2)
        if (['21'].includes(type)) {
          this.remoteUserAudioList[key].audioTrack.setVolume(num)
        }
      }
    },

    // 離開頻道 停止所有本地播放
    async agoraLeave() {
      this.remoteUserAudioList = {};
      this.remoteUserVideoList = {};
      await this.agoraClient.leave();
    },
  },
  beforeDestroy() {
    // 頁面銷毀時 離開agora
    this.agoraLeave()
  },
}
</script>

<style lang="scss" scoped>
.employee {
  width: 100%;
  height: 100%;
  .employee-box {
    padding: 0 20px 10px;
    min-height: calc(100% - 60px);
    display: flex;
    .employee-box-left {
      padding-right: 16px;
      flex: 1;
    }
    .employee-box-right {
      width: 468px;
    }
  }
}
.employee-full {
  .employee-box {
    padding: 0 150px;
    height: 100%;
    .employee-box-left {
      padding-right: 0;
    }
  }
}
</style>