import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixin'
import ElementUI from 'element-ui'
import i18n from './i18n'
import './api/axios'


// css样式
import 'css/base/base.less'
// import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'

Vue.config.productionTip = false

Vue.mixin(mixin);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')