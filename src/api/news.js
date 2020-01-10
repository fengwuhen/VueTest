const news = {
  create(data) {
    return service.post("news/create", data);
  },
  update(data) {
    return service.post("news/update", data);
  },
  destroy(data) {
    return service.post(`news/destroyMore`, data);
  },
  list(offset, limit, name) {
    return service.get(`news/list/${offset}/${limit}?name=${name}`);
  },
  upload(data) {
    return service.post("attach/create", data);
  }
};

export default news;
