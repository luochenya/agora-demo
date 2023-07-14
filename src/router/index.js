import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
    meta: {
      title: 'New TP'
    }
  },
  {
    path: "/teacher",
    name: "Teacher",
    component: () => import(/* webpackChunkName: "teacher" */ "@/views/teacher/index.vue"),
    meta: {
      title: 'Teacher'
    }
  },
  {
    path: "/student",
    name: "Student",
    component: () => import(/* webpackChunkName: "student" */ "@/views/student/index.vue"),
    meta: {
      title: 'Student'
    }
  },
  {
    path: "/observation",
    name: "Observation",
    component: () => import(/* webpackChunkName: "observation" */ "@/views/observation/index.vue"),
    meta: {
      title: 'Observation'
    }
  },
  {
    path: "/employee",
    name: "Employee",
    component: () => import(/* webpackChunkName: "employee" */ "@/views/employee/index.vue"),
    meta: {
      title: 'Employee'
    }
  },
  {
    path: '*',
    redirect: '/',
  }
];

const router = new VueRouter({
  mode: "hash",
  routes,
});

export default router;
