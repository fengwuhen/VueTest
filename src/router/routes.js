import config from '../config/server'

/**
 * 加载src下的组件
 * @param {组件} component
 */
function load(component) {
  return resolve => require([`@/${component}`], resolve)
}

/**
 * 加载components下的组件
 * @param {组件} component
 */
function loadComp(component) {
  return resolve => require([`components/${component}`], resolve)
}

/**
 * 加载views下的组件
 * @param {组件} component
 */
function loadView(component) {
  return resolve => require([`views/${component}`], resolve)
}

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: loadView('Home.vue'),
    meta: {
      title: config.system_name
    }
  },
  {
    path: '/about',
    name: 'about',
    component: loadView('About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: loadView('Login.vue')
  },
  {
    path: '*',
    name: 'notFound',
    component: loadView('404.vue')
  }
]

export default routes