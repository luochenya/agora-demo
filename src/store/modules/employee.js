const state = {
  // 畫板-全屏狀態
  employee_full_status: false,
  // 畫板-學生操作權限
  employee_permissions: true,
  // 視訊-學生和員工視訊切換狀態 true學生 false員工
  employee_camera_status: true,

  // agora-老師麥克風狀態
  employee_teacherMikeStatus: false,
  // agora-老師視訊狀態
  employee_teacherCameraStatus: false,
  // agora-學生麥克風狀態
  employee_studentMikeStatus: false,
  // agora-學生視訊狀態
  employee_studentCameraStatus: false,
}

const mutations = {
  SET_FULL_STATUS(store, employee_full_status) {
    store.employee_full_status = employee_full_status
  },
  SET_PERMISSIONS(store, employee_permissions) {
    store.employee_permissions = employee_permissions
  },
  SET_CAMERA_STATUS(store, employee_camera_status) {
    store.employee_camera_status = employee_camera_status
  },

  SET_TEACHERMIKESTATUS(store, employee_teacherMikeStatus) {
    store.employee_teacherMikeStatus = employee_teacherMikeStatus
  },
  SET_TEACHERCAMERASTATUS(store, employee_teacherCameraStatus) {
    store.employee_teacherCameraStatus = employee_teacherCameraStatus
  },
  SET_STUDENTMIKESTATUS(store, employee_studentMikeStatus) {
    store.employee_studentMikeStatus = employee_studentMikeStatus
  },
  SET_STUDENTCAMERASTATUS(store, employee_studentCameraStatus) {
    store.employee_studentCameraStatus = employee_studentCameraStatus
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}