import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from '../mixin'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.mixin(mixin);
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')