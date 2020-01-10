const news = {
  create(data) {
    return service.post("dict/create", data);
  },
  update(data) {
    return service.post("dict/update", data);
  },
  destroy(data) {
    return service.post(`dict/destroyMore`, data);
  },
  list(offset, limit, parentId, name) {
    return service.get(
      `dict/list/${offset}/${limit}?parentid=${parentId}&name=${name}`
    );
  },
  lazy(parentId, name) {
    return service.get(`dict/lazy?parentid=${parentId}&name=${name}`);
  }
};

export default news;
