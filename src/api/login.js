var login = {
    login(data) {
        return service.post('user/login', data);
    }
}

export default login;