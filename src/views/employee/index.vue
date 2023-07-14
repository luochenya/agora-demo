<template>
  <div class="employee" :class="employee_full_status ? 'employee-full' : ''">
    <!-- 頭部組件 -->
    <Header
      v-show="!employee_full_status"
      ref="HeaderRef"
      :agoraCamerasList="agoraCamerasList"
      :agoraMicrophoneList="agoraMicrophoneList"
      :agoraSpeakerList="agoraSpeakerList"
      @cameraChange="agoraCamerasChange"
      @microphoneChange="agoraMicrophoneChange"
      @speakerChange="agoraSpeakerChange"
      @exitClassroom="agoraLeave"
    />
    <div class="employee-box">
      <div class="employee-box-left">
        <!-- 畫板 -->
        <Sketchpad />
      </div>
      <div class="employee-box-right" v-show="!employee_full_status">
        <!-- 老師畫面 -->
        <TeacherCamera
          @teacherSpeakerSoundChange="teacherSpeakerSoundChange"
        />
        <!-- 學生畫面 -->
        <StudentCamera
          v-show="employee_camera_status"
          @studentSpeakerSoundChange="studentSpeakerSoundChange"
        />
        <!-- 員工畫面 -->
        <EmployeeCamera
          v-show="!employee_camera_status"
          @cameraChange="agoraCameraEnabled"
          @mikeChange="agoraMicrophoneEnabled"
        />
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
import EmployeeCamera from "./components/EmployeeCamera.vue"
import Chat from "./components/Chat.vue"
export default {
  name: 'Employee',
  components: {
    Header,
    Sketchpad,
    TeacherCamera,
    StudentCamera,
    EmployeeCamera,
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
      // 加入 Uid = 33 + 用戶id
      agoraUid: Number('33' + sessionStorage.getItem('agoraUid')),
      // 視訊 Uid = 31 + 用戶id
      agoraCameraUid: Number('31' + sessionStorage.getItem('agoraUid')),
      
      // agora實例
      // 加入頻道實例
      agoraClient: null,
      // 視訊實例
      agoraCameraClient: null,
      // 視頻本地實例
      localCameraClient: null,
      // 音頻本地實例
      localMicrophoneClient: null,

      // 遠端音頻列表
      remoteUserAudioList: {},
      // 遠端視頻列表
      remoteUserVideoList: {},

      // 媒體設備列表
      // 視訊列表
      agoraCamerasList: [],
      // 麥克風列表
      agoraMicrophoneList: [],
      // 喇叭列表
      agoraSpeakerList: [],

      // 上線驗證時間戳
      onlineTime: 0,
      // 上線驗證時長
      onlineSecond: 5,
    }
  },
  computed: {
    ...mapGetters(['employee_full_status', 'employee_camera_status'])
  },
  created() {
    this.getMedia()
    this.agoraInit()
  },
  methods: {
    // 獲取媒體設備列表
    async getMedia() {
      // 獲取agora的視訊列表
      this.agoraCamerasList = await AgoraRTC.getCameras()
      // 獲取agora的麥克風列表
      this.agoraMicrophoneList = await AgoraRTC.getMicrophones()
      // 獲取agora的喇叭列表
      this.agoraSpeakerList = await AgoraRTC.getPlaybackDevices()
    },
    // 切換視訊設備
    agoraCamerasChange(val) {
      if (this.localCameraClient) {
        this.localCameraClient.setDevice(this.agoraCamerasActive).then(() => {
          console.log('切換視訊成功 => ')
        }).catch(err => {
          console.log('切換視訊報錯 => ', err)
        })
      } else {
        alert('切換異常，請刷新後重試！')
      }
    },
    // 切換麥克風設備
    agoraMicrophoneChange(val) {
      if (this.localMicrophoneClient) {
        this.localMicrophoneClient.setDevice(this.agoraMicrophoneActive).then(() => {
          console.log('切換麥克風成功 => ')
        }).catch(err => {
          console.log('切換麥克風報錯 => ', err)
        })
      } else {
        alert('切換異常，請刷新後重試！')
      }
    },
    // 切換喇叭設備
    agoraSpeakerChange(val) {
      for (let key in this.remoteUserAudioList) {
        this.remoteUserAudioList[key].audioTrack.setPlaybackDevice(val).then(() => {
          console.log('切換喇叭成功 => ')
        }).catch(err => {
          console.log('切換喇叭報錯 => ', err)
        })
      }
    },

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
      // 開啟視訊
      this.agoraCamera()
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
      // 根據uid獲取用戶id
      const userId = user.uid.toString().slice(2, user.uid.length)
      // 音頻播放
      if (mediaType == 'audio') {
        // 播放音頻 除開自己的
        if (userId != this.userId) {
          // 加入至列表暫存
          this.remoteUserAudioList[user.uid] = user
          user.audioTrack.play()
        }
        // 根據type設置用戶的播放按鈕狀態  11老師 21學生
        if (type == 11) {
          // 設置音頻播放按鈕狀態
          this.$store.commit('employee/SET_TEACHERMIKESTATUS', true)
        }
        if (type == 21) {
          // 設置音頻播放按鈕狀態
          this.$store.commit('employee/SET_STUDENTMIKESTATUS', true)
        }
      }
      // 視頻播放
      if (mediaType == 'video') {
        // 加入至列表暫存
        this.remoteUserVideoList[user.uid] = user
        // 根據type設置用戶的播放按鈕狀態  11老師 21學生
        if (type == 11) {
          // 播放視頻
          user.videoTrack.play("local-teacherCamera")
          // 設置視頻播放按鈕狀態
          this.$store.commit('employee/SET_TEACHERCAMERASTATUS', true)
        }
        if (type == 21) {
          // 播放視頻
          user.videoTrack.play("local-studentCamera")
          // 設置視頻播放按鈕狀態
          this.$store.commit('employee/SET_STUDENTCAMERASTATUS', true)
        }
      }
    },
    // 用戶監聽-訂閱遠端用戶取消發佈音視頻軌道
    async agoraUserUnpublished(user, mediaType) {
      const type = user.uid.toString().slice(0, 2)
      // 判斷是不是老師的參數 是則關閉麥克風狀態
      if (type == 11) {
        if (mediaType == 'audio') {
          this.$store.commit('employee/SET_TEACHERMIKESTATUS', false)
        }
        if (mediaType == 'video') {
          this.$store.commit('employee/SET_TEACHERCAMERASTATUS', false)
        }
      }
      // 判斷是不是學生的參數 是則關閉麥克風狀態
      if (type == 21) {
        if (mediaType == 'audio') {
          this.$store.commit('employee/SET_STUDENTMIKESTATUS', false)
        }
        if (mediaType == 'video') {
          this.$store.commit('employee/SET_STUDENTCAMERASTATUS', false)
        }
      }
      if (this.remoteUserAudioList[user.uid]) {
        delete this.remoteUserAudioList[user.uid]
      }
      if (this.remoteUserVideoList[user.uid]) {
        delete this.remoteUserVideoList[user.uid]
      }
    },

    // 視訊實例創建及推流
    async agoraCamera() {
      // 創建agora實例
      this.agoraCameraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      // 加入頻道
      await this.agoraCameraClient.join(this.agoraAppId, this.agoraChannel, this.agoraToken, this.agoraCameraUid);
      // 創建視頻流
      this.localCameraClient = await AgoraRTC.createCameraVideoTrack();
      // 創建音頻流
      this.localMicrophoneClient = await AgoraRTC.createMicrophoneAudioTrack();
      // 加入訂閱推流
      await this.agoraCameraClient.publish([this.localCameraClient, this.localMicrophoneClient]);
      // 播放本地視頻
      this.localCameraClient.play("local-employeeCamera");
    },
    // 關閉視訊頻道
    async agoraCameraLeave() {
      // 關閉視頻軌道
      if (this.localCameraClient) {
        this.localCameraClient.stop();
        this.localCameraClient.close();
      }
      // 關閉音頻軌道
      if (this.localMicrophoneClient) {
        this.localMicrophoneClient.stop();
        this.localMicrophoneClient.close();
      }
      // 斷開客戶鏈接
      if (this.agoraClient) {
        await this.agoraClient.leave();
      }
    },
    // 視訊狀態開關
    async agoraCameraEnabled(val) {
      console.log('視訊狀態開關', val)
      if (this.localCameraClient) {
        await this.localCameraClient.setEnabled(val)
      }
    },
    // 麥克風狀態開關
    async agoraMicrophoneEnabled(val) {
      console.log('麥克風狀態開關', val)
      if (this.localMicrophoneClient) {
        await this.localMicrophoneClient.setEnabled(val)
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
    agoraLeave() {
      this.remoteUserAudioList = {};
      this.remoteUserVideoList = {};
      this.agoraCameraLeave();
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