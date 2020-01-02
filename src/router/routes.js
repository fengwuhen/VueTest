
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
      title: 'action.reset'
    },
    children: [{
        path: '/user',
        name: 'user',
        component: loadView('Menu/User.vue')
      },
      {
        path: '/dept',
        name: 'dept',
        component: loadView('Menu/Dept.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: loadView('Menu/Role.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: loadView('Menu/Menu.vue')
      }, {
        path: '/log',
        name: 'log',
        component: loadView('Menu/Log.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: loadView('About.vue'),
    meta: {
      title: 'common.home'
    },
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