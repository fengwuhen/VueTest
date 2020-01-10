
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
    redirect: '/user',
    component: loadView('Home.vue'),
    meta: {
      title: 'common.home'
    },
    children: [{
        path: '/user',
        name: 'user',
        component: loadView('Menu/User.vue'),
        meta:{
          title:'sys.userMng'
        }
      },
      {
        path: '/dept',
        name: 'dept',
        component: loadView('Menu/Dept.vue'),
        meta:{
          title:'sys.deptMng'
        }
      },
      {
        path: '/role',
        name: 'role',
        component: loadView('Menu/Role.vue'),
        meta:{
          title:'sys.roleMng'
        }
      },
      {
        path: '/menu',
        name: 'menu',
        component: loadView('Menu/Menu.vue'),
        meta:{
          title:'sys.menuMng'
        }
      }, 
      {
        path: '/log',
        name: 'log',
        component: loadView('Menu/Log.vue'),
        meta:{
          title:'sys.logMng'
        }
      },
      {
        path: '/news',
        name: 'news',
        component: loadView('Menu/News.vue'),
        meta:{
          title:'sys.newsMng'
        }
      },
      {
        path: '/dict',
        name: 'dict',
        component: loadView('Menu/Dict.vue'),
        meta: {
          title: 'sys.DictMng'
        },
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
    component: loadView('Login.vue'),
    meta:{
      title:'common.loginLogo'
    }
  },
  {
    path: '*',
    name: 'notFound',
    component: loadView('404.vue')
  }
]

export default routes