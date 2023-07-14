const state = {
  // 畫板-全屏狀態
  observation_full_status: false,
  // 畫板-學生操作權限
  observation_permissions: true,

  // agora-老師麥克風狀態
  observation_teacherMikeStatus: false,
  // agora-老師視訊狀態
  observation_teacherCameraStatus: false,
  // agora-學生麥克風狀態
  observation_studentMikeStatus: false,
  // agora-學生視訊狀態
  observation_studentCameraStatus: false,
}

const mutations = {
  SET_FULL_STATUS(store, observation_full_status) {
    store.observation_full_status = observation_full_status
  },
  SET_PERMISSIONS(store, observation_permissions) {
    store.observation_permissions = observation_permissions
  },
  SET_TEACHERMIKESTATUS(store, observation_teacherMikeStatus) {
    store.observation_teacherMikeStatus = observation_teacherMikeStatus
  },
  SET_TEACHERCAMERASTATUS(store, observation_teacherCameraStatus) {
    store.observation_teacherCameraStatus = observation_teacherCameraStatus
  },
  SET_STUDENTMIKESTATUS(store, observation_studentMikeStatus) {
    store.observation_studentMikeStatus = observation_studentMikeStatus
  },
  SET_STUDENTCAMERASTATUS(store, observation_studentCameraStatus) {
    store.observation_studentCameraStatus = observation_studentCameraStatus
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}