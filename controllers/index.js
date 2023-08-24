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
