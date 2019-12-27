export function getMenu() {
    return {
        url: 'http://localhost:8082/menu',
        type: 'get',
        data: {
            'code': 0,
            'msg': 'success',
            'data': {
                'id': '@increment',
                'name': '@name',
                'order|12-20': 12
            }
        }
    }
}