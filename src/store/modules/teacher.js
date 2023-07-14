const state = {
  // 畫板-全屏狀態
  teacher_full_status: false,
  // 畫板-操作權限
  teacher_permissions: false,
  
  // agora-學生麥克風狀態
  teacher_studentMikeStatus: false,
  // agora-學生視訊狀態
  teacher_studentCameraStatus: false,
}

const mutations = {
  SET_FULL_STATUS(store, teacher_full_status) {
    store.teacher_full_status = teacher_full_status
  },
  SET_PERMISSIONS(store, teacher_permissions) {
    store.teacher_permissions = teacher_permissions
  },
  SET_STUDENTMIKESTATUS(store, teacher_studentMikeStatus) {
    store.teacher_studentMikeStatus = teacher_studentMikeStatus
  },
  SET_STUDENTCAMERASTATUS(store, teacher_studentCameraStatus) {
    store.teacher_studentCameraStatus = teacher_studentCameraStatus
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}