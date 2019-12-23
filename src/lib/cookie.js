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
 * @param {token值} token
 * @param {过期时间} time
 */
export function setToken(token, time) {
    return Cookies.set(TokenKey, token, {
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