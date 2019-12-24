import Cookies from 'js-cookie'

/**
 * 存储token
 */
const TokenKey = 'token'

/**
 * 获取token
 */
export function getToken() {
    return Cookies.get(TokenKey);
}

/**
 * 
 *
 * @export
 * @param {*} data
 * @returns
 */
export function setToken(data) {
    return this.setTokenTime(data, 7 * 24 * 60 * 60 * 1000);
}


/**
 *
 * @param {token值} data
 * @param {过期时间} time
 */
export function setTokenTime(data, time) {
    return Cookies.set(TokenKey, data, {
        expires: time,
        path: '/'
    })
}

/**
 * 删除token
 */
export function removeToken() {
    return Cookies.remove(TokenKey);
}