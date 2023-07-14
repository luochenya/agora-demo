const getters = {
  agora_appid: state => state.agora.agora_appid,
  
  employee_full_status: state => state.employee.employee_full_status,
  employee_permissions: state => state.employee.employee_permissions,
  employee_camera_status: state => state.employee.employee_camera_status,
  employee_teacherMikeStatus: state => state.employee.employee_teacherMikeStatus,
  employee_teacherCameraStatus: state => state.employee.employee_teacherCameraStatus,
  employee_studentMikeStatus: state => state.employee.employee_studentMikeStatus,
  employee_studentCameraStatus: state => state.employee.employee_studentCameraStatus,

  observation_full_status: state => state.observation.observation_full_status,
  observation_permissions: state => state.observation.observation_permissions,
  observation_teacherMikeStatus: state => state.observation.observation_teacherMikeStatus,
  observation_teacherCameraStatus: state => state.observation.observation_teacherCameraStatus,
  observation_studentMikeStatus: state => state.observation.observation_studentMikeStatus,
  observation_studentCameraStatus: state => state.observation.observation_studentCameraStatus,

  student_full_status: state => state.student.student_full_status,
  student_permissions: state => state.student.student_permissions,
  student_teacherMikeStatus: state => state.student.student_teacherMikeStatus,
  student_teacherCameraStatus: state => state.student.student_teacherCameraStatus,

  teacher_full_status: state => state.teacher.teacher_full_status,
  teacher_permissions: state => state.teacher.teacher_permissions,
  teacher_studentMikeStatus: state => state.teacher.teacher_studentMikeStatus,
  teacher_studentCameraStatus: state => state.teacher.teacher_studentCameraStatus,
}
export default getters