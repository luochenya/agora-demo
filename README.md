```bash
# 安裝依賴
npm install

# 本地運行
npm run dev

# 測試服務器打包
npm run build:stage

# 生產服務器打包
npm run build:prod
```

```bash
# 臨時訪問路徑（進入頁面3秒載入動畫 然後跳轉至對應路由 路由不對會跳轉至請求失敗頁）
# 老師端
http://localhost:8080/#/?key=1
# 學生端
http://localhost:8080/#/?key=2
# 客服端
http://localhost:8080/#/?key=3
# 家長端
http://localhost:8080/#/?key=4
# 請求超時
http://localhost:8080/#/?key=5
# 請求失敗
http://localhost:8080/#/?key=6
```

```bash
# agora視訊規則
# 
## userId = sessionStorage.getItem('agoraUid')

# 老師端
## appid = process.env.VUE_APP_AGORA_APPID
## channel = sessionStorage.getItem('agoraChannel')
## token = sessionStorage.getItem('agoraToken')
## uid = 
### 加入頻道 '13' + userId
### 視訊 '11' + userId
### 熒幕分享 '21' + userId

# 學生端
## appid = process.env.VUE_APP_AGORA_APPID
## channel = sessionStorage.getItem('agoraChannel')
## token = sessionStorage.getItem('agoraToken')
## uid = 
### 加入頻道 '23' + userId
### 視訊 '21' + userId

# 員工端（僅加入音頻）
## appid = process.env.VUE_APP_AGORA_APPID
## channel = sessionStorage.getItem('agoraChannel')
## token = sessionStorage.getItem('agoraToken')
## uid = 
### 加入頻道 '33' + userId
### 視訊 '31' + userId

# 遊客端
## appid = process.env.VUE_APP_AGORA_APPID
## channel = sessionStorage.getItem('agoraChannel')
## token = sessionStorage.getItem('agoraToken')
## uid = 
### 加入頻道 '43' + userId
```

```bash
# 前端環境配置
npm => 6.14.16
node => 14.19.0
vue => 2.6.11
vue/cli => 4.5.6
```

```bash
# 文件目录结构
├── dist 打包後的靜態資源文件夾
├── node_modules 依賴包文件夾
├── public 放置靜態資源的文件夾，例如 index.html 和其他不需要經過 webpack 處理的文件
├── src 主要的源代碼目錄
│   ├── assets 靜態資源文件夾（img、css）
│   ├── components 公用組件文件夾
│   ├── router Vue Router相關的配置文件
│   ├── store VueX相關的配置文件夾，用於狀態管理
│   |   ├── modules 模塊化vuex文件夾
│   |   |   ├── agora.js agora相關vuex
│   |   |   └── teacher.js 老師端相關vuex
│   |   ├── getters.js 暴露vuex的變量
│   |   └── index.js 集成vuex目錄
│   ├── views 放置路由對應的頁面組件
│   |   ├── home 首頁文件夾
│   |   |   ├── components 首頁相關文件
│   |   |   |   ├── RequestError.vue 請求失敗組件
│   |   |   |   ├── RequestLoading.vue 請求載入中組件
│   |   |   |   └── RequestTimeOut.vue 請求超時組件
│   |   |   └── index.vue 首頁主頁面
│   |   ├── employee 員工端（客服）文件夾
│   |   |   ├── components 首頁相關文件
│   |   |   |   ├── Chat.vue 聊天窗口組件
│   |   |   |   ├── Header.vue 頭部功能欄組件
│   |   |   |   ├── Sketchpad.vue 畫板組件
│   |   |   |   ├── StudentCamera.vue 學生端視訊組件
│   |   |   |   └── TeacherCamera.vue 老師端視訊組件
│   |   |   └── index.vue 員工（客服）端主頁面
│   |   ├── observation 觀察者（家長）端文件夾
│   |   |   ├── components 首頁相關文件
│   |   |   |   ├── Chat.vue 聊天窗口組件
│   |   |   |   ├── Header.vue 頭部功能欄組件
│   |   |   |   ├── Sketchpad.vue 畫板組件
│   |   |   |   ├── StudentCamera.vue 學生端視訊組件
│   |   |   |   └── TeacherCamera.vue 老師端視訊組件
│   |   |   └── index.vue 觀察者（家長）端主頁面
│   |   ├── student 學生端文件夾
│   |   |   ├── components 首頁相關文件
│   |   |   |   ├── Chat.vue 聊天窗口組件
│   |   |   |   ├── Header.vue 頭部功能欄組件
│   |   |   |   ├── Sketchpad.vue 畫板組件
│   |   |   |   ├── StudentCamera.vue 學生端視訊組件
│   |   |   |   └── TeacherCamera.vue 老師端視訊組件
│   |   |   └── index.vue 學生端主頁面
│   |   └── teacher 老師端文件夾
│   |       ├── components 首頁相關文件
│   |       |   ├── Chat.vue 聊天窗口組件
│   |       |   ├── Header.vue 頭部功能欄組件
│   |       |   ├── Sketchpad.vue 畫板組件
│   |       |   ├── StudentCamera.vue 學生端視訊組件
│   |       |   └── TeacherCamera.vue 老師端視訊組件
│   |       └── index.vue 老師端主頁面
│   ├── App.vue 應用的根組件
│   └── main.js 應用的入口文件，初始化Vue實例和其他全局配置
├── .env.development 本地環境變量配置文件
├── .env.production 生產環境變量配置文件
├── .env.staging 測試環境變量配置文件
├── package.json 專案的依賴包配置文件
└── vue.config.js 打包文件配置、全局公用配置文件
```