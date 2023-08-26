const api = `https://64d882525f9bf5b879ce4b1a.mockapi.io/capstoneAdminAPI`;

// function fetchProductList() {
//   axios({
//     url: api,
//     method: "GET",
//   })
//     .then((res) => {
//       DanhSachSanPham(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
// fetchProductList();
///////////////////////////////////////////////////////
let originalProductList = [];
const selectType = document.querySelector("#select-type");

// Hàm để tải danh sách sản phẩm từ API và hiển thị
async function fetchAndDisplayProductList() {
  try {
    const res = await axios.get(api);
    originalProductList = res.data;
    DanhSachSanPham(originalProductList);
  } catch (err) {
    console.error(err);
  }
}

// Hàm để lọc và hiển thị danh sách sản phẩm dựa trên lựa chọn của người dùng
function filterProducts(sanPham) {
  const filteredProducts =
    sanPham === "all"
      ? originalProductList
      : originalProductList.filter((product) => {
          return (
            { ...product, type: stringToSlug(product.type) }.type == sanPham
          );
        });
  DanhSachSanPham(filteredProducts);
}

// Gắn sự kiện change vào phần tử select để theo dõi lựa chọn của người dùng
selectType.addEventListener("change", () => filterProducts(selectType.value));

// Sử dụng sự kiện "pageshow" để reload danh sách sản phẩm khi trang web được hiển thị lại
window.addEventListener("pageshow", (event) => {
  // event.persisted sẽ kiểm tra xem trang đã được load lại từ lịch sử duyệt hay không
  if (event.persisted) {
    selectType.value = "all"; // Đặt giá trị mặc định là "all" khi quay lại trang
    fetchAndDisplayProductList();
  }
});

// Đặt giá trị mặc định cho phần tử select là "all" khi trang được tải hoặc reload
document.addEventListener("DOMContentLoaded", () => {
  selectType.value = "all";
  fetchAndDisplayProductList();
});
