const state = {
  // 畫板-全屏狀態
  student_full_status: false,
  // 畫板-操作權限
  student_permissions: false,
  
  // agora-老師麥克風狀態
  student_teacherMikeStatus: false,
  // agora-老師視訊狀態
  student_teacherCameraStatus: false,
}

const mutations = {
  SET_FULL_STATUS(store, student_full_status) {
    store.student_full_status = student_full_status
  },
  SET_PERMISSIONS(store, student_permissions) {
    store.student_permissions = student_permissions
  },
  SET_TEACHERMIKESTATUS(store, student_teacherMikeStatus) {
    store.student_teacherMikeStatus = student_teacherMikeStatus
  },
  SET_TEACHERCAMERASTATUS(store, student_teacherCameraStatus) {
    store.student_teacherCameraStatus = student_teacherCameraStatus
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}