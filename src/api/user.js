const user = {
  create(data) {
    return service.post("user/create", data);
  },
  update(data) {
    return service.post("user/update", data);
  },
  destroy(data) {
    return service.post(`user/destroyMore`,data);
  },
  list(offset, limit, name) {
    return service.get(`user/list/${offset}/${limit}?name=${name}`);
  }
};

export default user;
