const BASE_URL = "https://64d882525f9bf5b879ce4b1a.mockapi.io/capstoneAdminAPI";

let getList = () => {
  return axios({
    url: BASE_URL,
    method: "GET",
  });
};



let productServ = {
  getList,
};

export default productServ;
