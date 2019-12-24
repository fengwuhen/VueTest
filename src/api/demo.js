const demo = {
    /* get请求 */
    get() {
        return service.get('banner/json');
    },
    /* get请求带参数 */
    get2(data) {
        return service_test.get('friend/json');
    },
    /* post请求带参数 */
    post(data) {
        return service.post('api/post', data);
    }
};
export default demo;