import Mock from 'mockjs'

import * as login from './modules/login'
import * as user from './modules/user'
import * as dept from './modules/dept'
import * as menu from './modules/menu'


export default Mock.mock('http://localhost:8085/apis/usessssr', { // 输出数据

  'name': '@name', // 随机生成姓名

  'age|1-10': 5

  // 其他数据
});