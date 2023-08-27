const api = `https://64d882525f9bf5b879ce4b1a.mockapi.io/capstoneAdminAPI`;

function fetchProductList() {
  axios({
    url: api,
    method: "GET",
  })
    .then((res) => {
      DanhSachSanPham(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
fetchProductList();
