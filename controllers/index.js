const api = `https://64cde6de0c01d81da3ee5a2f.mockapi.io/phones`;

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
