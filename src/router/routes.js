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
      name: 'home',
      component: loadView('Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: loadView('About.vue')
    },
    {
      path:'/login',
      name:'login',
      component:loadView('Login.vue')
    }
  ]
  
  export default routes