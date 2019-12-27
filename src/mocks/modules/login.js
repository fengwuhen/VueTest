export function login() {
    return {
        url: 'http://loclahost:8082/login',
        type: 'get',
        data: {
            'code': 0,
            'msg': 'success',
            'data': {
                'token': '123456'
            }
        }
    }
}