import Vue from "vue";
import Vuex from "vuex";
import getters from './getters'
import agora from './modules/agora'
import employee from './modules/employee'
import observation from './modules/observation'
import student from './modules/student'
import teacher from './modules/teacher'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    agora,
    employee,
    observation,
    student,
    teacher,
  },
  getters
});
