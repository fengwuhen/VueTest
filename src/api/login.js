const login = {
     login(data) {
        return service.post('user/login', data);
    },
    logout(){
        alert('123');
    }
};

export default login;