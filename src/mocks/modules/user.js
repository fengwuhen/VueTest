export function getUser() {
    return {
        url: 'http://localhost:8082/user',
        type: 'get',
        data: {
            'code': 0,
            'msg': 'success',
            'data': {
                'id': '@increment',
                'name': '@name',
                'email': '@email',
                'age|12-20': 12
            }
        }
    }
}