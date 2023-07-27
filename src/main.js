import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/style/index.scss"
import { Popover, Slider, Input, Select, Option, OptionGroup, ColorPicker, Loading } from 'element-ui';
Vue.use(Popover)
Vue.use(Slider)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(ColorPicker)
Vue.use(Loading)

Vue.config.productionTip = false;

// 路由守衛
router.beforeEach(async(to, form, next) => {
  // 設置頁面title
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'New TP'
  }
  const whiteList = ['/']
  if (whiteList.includes(to.path)) {
    next()
  } else {
    if (sessionStorage.getItem('key')) {
      next()
    } else {
      next('/')
    }
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
