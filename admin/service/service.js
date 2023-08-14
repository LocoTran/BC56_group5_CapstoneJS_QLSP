const BASE_URL = "https://64d882525f9bf5b879ce4b1a.mockapi.io/capstoneAdminAPI";

let getList = () => {
  return axios({
    url: BASE_URL,
    method: "GET",
  });
};

let deleteProduct = (id) => {
  return axios({
    url: `${BASE_URL}/${id}`,
    method: "DELETE",
  });
};

let addProduct = (product) => {
  return axios({
    url: BASE_URL,
    method: "POST",
    data: product,
  });
};

let getDetail = (id) => {
  return axios({
    url: `${BASE_URL}/${id}`,
    method: "GET",
  });
};

let updateProduct = (id, updPro) => {
  return axios({
    url: `${BASE_URL}/${id}`,
    method: "PUT",
    data: updPro,
  });
};

let productServ = {
  getList,
  deleteProduct,
  addProduct,
  getDetail,
  updateProduct,
};

export default productServ;
