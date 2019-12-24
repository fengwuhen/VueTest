import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 登录页面登录成功后，会将用户信息保存在会话中
  // 存在时间为会话周期，页面关闭即失效
  let user = sessionStorage.getItem('user');
  // 判断是否访问login页面
  if (to.path == '/login') {
    // 如果是访问登录页面，如果用户存在会话信息存在，代表已经登录，跳转到主页
    if (user) {
      next({
        path: '/'
      });
    } else {
      next();
    }
  } else {
    // 如果访问非登录页面并且会话信息不存在，代表未登录，跳转到登录界面
    if (!user) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  }
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})

export default router