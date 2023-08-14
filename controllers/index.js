const api = `https://64cde6de0c01d81da3ee5a2f.mockapi.io/phones`;

function fetchProductList() {
  axios({
    url: api,
    method: "GET",
  })
    .then(function (res) {
      console.log("🚀 ~ file: main.js:7 ~ res:", res);
      DanhSachSanPham(res.data);
    })
    .catch(function (err) {
      console.log("🚀 ~ file: main.js:12 ~ err:", err);
    });
}
fetchProductList();

