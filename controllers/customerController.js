// render dienthoai
const totalItemInCart = document.querySelector("#cartCount");

function DanhSachSanPham(products) {
  const productList = document.querySelector("#productList");

  if (productList) {
    productList.innerHTML = products
      .map((product) => {
        return `
        <div class="item mr-4 p-2 mt-4">
        <img src="${product.img}" alt="">
        <div class="content">
          <div class="detail">
              <h4 class="text-xl font-semibold py-2">${product.name}</h4>
              <form>
                  <div>
                      <label class="block text-gray-600 text-sm font-medium mb-2" for="screen">Màn hình:</label>
                      <div class="px-3 py-1 border rounded-lg w-full bg-gray-100">${product.screen}</div>
                  </div>
                  <div>
                      <label class="block text-gray-600 text-sm font-medium mb-2" for="backCamera">Camera sau:</label>
                      <div class="px-3 py-1 border rounded-lg w-full bg-gray-100">${product.backCamera}</div>
                  </div>
                  <div>
                      <label class="block text-gray-600 text-sm font-medium mb-2" for="frontCamera">Camera trước:</label>
                      <div class="px-3 py-1 border rounded-lg w-full bg-gray-100">${product.frontCamera}</div>
                  </div>
                  <div>
                      <label class="block text-gray-600 text-sm font-medium mb-2" for="desc">Mô tả:</label>
                      <div class="px-3 py-1 border rounded-lg w-full bg-gray-100">${product.desc}</div>
                  </div>
                  <div class="hidden">
                  <label class="block text-gray-600 text-sm font-medium mb-2" for="type">Loại Máy:</label>
                  <div class="px-3 py-1 border rounded-lg w-full bg-gray-100">${product.type}</div>
              </div>
              </form>
          </div>
          </div>

        
          <div class="price">
          <h4 class="text-lg font-semibold py-1">${product.price}$</h4>
        </div>
        <div>
          <i class="fa fa-star text-yellow-400" aria-hidden="true"></i>
                  <i class="fa fa-star text-yellow-400" aria-hidden="true"></i>
                  <i class="fa fa-star text-yellow-400" aria-hidden="true"></i>
                  <i class="fa fa-star text-yellow-400" aria-hidden="true"></i>
                  <i class="fa fa-star" aria-hidden="true"></i>
        </div>
        <button onclick="addToCart(${product.id})" class="btnAdd"><i class="fa-solid fa-cart-shopping"></i>Add to cart</button>
          </div>
          
          `;
      })
      .join(" ");
  } else {
    // console.error("Không tìm thấy phần tử có id là 'productList'");
  }
}

//////////////////////////////////////////////////////
let productInfoCache = {}; // Đối tượng để lưu trữ thông tin sản phẩm đã lấy từ API

// function để lấy thông tin sản phẩm từ API hoặc cache
async function getProductInfoById(id) {
  if (productInfoCache[id]) {
    // Nếu đã lưu trữ thông tin sản phẩm, trả về nó từ cache
    return productInfoCache[id];
  } else {
    // Nếu chưa có thông tin sản phẩm, gửi yêu cầu API và lưu vào cache
    try {
      const response = await axios.get(`${api}/${id}`);
      const productInfo = response.data;
      productInfoCache[id] = productInfo; // Lưu thông tin vào cache
      return productInfo;
    } catch (error) {
      // console.error(error);
      return null;
    }
  }
}
//////////////////////////////////////////////////////
//sweet alert
let sanPhamTrung = (message) => {
  Swal.fire(message);
};
let onModalSuccess = (message) => {
  Swal.fire(message, "", "success");
};

//////////////////////////////////////////////////////
// giỏ hàng
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateQuantity();
//////////////////////////////////////////////////////
window.addToCart = addToCart;
//////////////////////////////////////////////////////
// add to cart
async function addToCart(id) {
  // Kiểm tra xem có bị trùng sản phẩm hay không
  const cartItem = cart.find((item) => item.id === id);

  if (cartItem) {
    // Sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
    cartItem.quantity += 1;
    onModalSuccess("Đã Thêm vào giỏ hàng!");
  } else {
    const productInfo = await getProductInfoById(id);
    if (productInfo) {
      cart.push({
        id: id,
        quantity: 1,
        price: productInfo.price,
      });
      onModalSuccess("Đã Thêm vào giỏ hàng!");
    }
  }

  updateQuantity();
  updateCart();
  calculateTotalBill();
}

//////////////////////////////////////////////////////
// update cart
function updateCart() {
  localStorage.setItem("CART", JSON.stringify(cart));
}

// Cập nhật số lượng sản phẩm trong giỏ hàng và giao diện
function updateQuantity() {
  const quantity = cart.reduce((total, item) => total + item.quantity, 0);
  totalItemInCart.innerHTML = quantity;
}
//////////////////////////////////////////////////////
//function cập nhật số lượng sản phẩm trong giỏ hàng và giao diện
function updateCartItemQuantity(productId, newQuantity) {
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity = newQuantity;
    updateCart(); // Lưu lại giỏ hàng vào local storage
    updateQuantity(); // Cập nhật số lượng sản phẩm trong giỏ hàng và giao diện
    calculateTotalBill(); // Cập nhật tổng tiền sau khi cập nhật số lượng
  }
}
//////////////////////////////////////////////////////
// xuất giỏ hàng ra cart.html
// Khởi tạo một mảng chứa các đoạn mã HTML sản phẩm
async function renderCart() {
  try {
    const contentHTML = await Promise.all(
      cart.map(async (cartItem) => {
        try {
          const response = await axios.get(`${api}/${cartItem.id}`);
          const cartPro = response.data;
          return `
            <div class="shopping-cart grid gap-4 justify-center">
              <div class="cart-item flex border border-solid border-black m-6 p-3">
                <img class="w-40" src=${cartPro.img} alt="" />
                <div class="details flex flex-col ml-4">
                  <div class="title-price-x w-48 flex items-center justify-between">
                    <h4 class="title-price flex items-center gap-3 ">
                      <p>${cartPro.name}</p>
                    </h4>
                    <i onclick="removeItem(${
                      cartPro.id
                    })" class="bi bi-x-lg font-bold text-red-600 cursor-pointer"></i>
                  </div>
                  <div class="buttons flex flex-row gap-2 text-base items-center">
                    <i onclick="giam(${
                      cartPro.id
                    })" class="bi bi-dash-lg text-red-600 cursor-pointer"></i>
                    <div id="${cartPro.id}" class="quantity">${
            cartItem.quantity
          }</div>
                    <i onclick="tang(${
                      cartPro.id
                    })" class="bi bi-plus-lg text-green-600 cursor-pointer"></i>
                  </div>
                  <h3 class="text-lg mt-2" id="giaTien1SanPham">${cartPro.price.toLocaleString(
                    "en-US",
                    {
                      style: "currency",
                      currency: "USD",
                    }
                  )}</h3>
                </div>
              </div>
            </div>
          `;
        } catch (err) {
          console.log(err);
          return ""; // Trả về chuỗi rỗng nếu có lỗi
        }
      })
    );

    // Kiểm tra xem phần tử có id là "label" có tồn tại không
    const label = document.getElementById("label");

    if (label) {
      // Nếu tồn tại, thêm chuỗi HTML vào label
      label.innerHTML = contentHTML.join("");
    } else {
      // console.error("Không tìm thấy phần tử có id là 'label'");
    }
  } catch (err) {
    console.error(err);
  }
}

// Gọi function để render giỏ hàng
renderCart();

//////////////////////////////////////////////////////
// thanh toán bill
function thanhToanBill() {
  // Xóa toàn bộ nội dung của giỏ hàng
  cart = [];
  onModalSuccess("Đã Thanh Toán!");
  updateCart();
  // refreshPage();
  setTimeout(function () {
    location.reload();
  }, 1000);
}
//////////////////////////////////////////////////////
// xóa giỏ hàng
function xoaGioHang() {
  // Xóa toàn bộ nội dung của giỏ hàng
  cart = [];
  onModalSuccess("Đã Xóa Tất Cả Sản Phẩm!");
  updateCart();
  // refreshPage();
  setTimeout(function () {
    location.reload();
  }, 1000);
}
//////////////////////////////////////////////////////
// function để loại bỏ một sản phẩm khỏi giỏ hàng
function removeItem(productId) {
  cart = cart.filter((item) => item.id !== productId);
  onModalSuccess("Đã Xóa Sản Phẩm!");

  updateCart();
  // Chờ 1 giây trước khi làm mới trang
  setTimeout(function () {
    location.reload();
  }, 1000); // 1000 mili giây tương đương 1 giây
}
//////////////////////////////////////////////////////
// Kiểm tra sản phẩm đã có trong giỏ hàng chưa
function isProductInCart(productId) {
  return cart.some((item) => item.id === productId);
}
//////////////////////////////////////////////////////
//function tăng số lượng
function tang(productId) {
  const quantityElement = document.getElementById(productId);
  const currentQuantity = parseInt(quantityElement.innerText);
  quantityElement.innerText = currentQuantity + 1;
  updateCartItemQuantity(productId, currentQuantity + 1);
  updateQuantity(); // Cập nhật số lượng tổng hiển thị
  calculateTotalBill();
}
//////////////////////////////////////////////////////
//function giảm số lượng
function giam(productId) {
  const quantityElement = document.getElementById(productId);
  const currentQuantity = parseInt(quantityElement.innerText);

  if (currentQuantity > 1) {
    quantityElement.innerText = currentQuantity - 1;
    updateCartItemQuantity(productId, currentQuantity - 1);
    updateQuantity(); // Cập nhật số lượng tổng hiển thị
    calculateTotalBill();
  }
}
//////////////////////////////////////////////////////
// function để cập nhật tổng tiền trong giao diện
function updateTotalBill(totalBill) {
  const totalBillElement = document.getElementById("totalBill");

  if (totalBillElement) {
    totalBillElement.textContent = `Tổng Tiền: ${totalBill.toLocaleString(
      "en-US",
      { style: "currency", currency: "USD" }
    )}`;
  } else {
    // console.error("Không tìm thấy phần tử có id là 'totalBill'");
  }
}
//////////////////////////////////////////////////////
// function để tính tổng tiền của các sản phẩm trong giỏ hàng
async function calculateTotalBill() {
  const promises = cart.map((item) => getProductInfoById(item.id));

  Promise.all(promises)
    .then((productInfos) => {
      let totalBill = 0;

      productInfos.forEach((productInfo, index) => {
        if (productInfo) {
          totalBill += productInfo.price * cart[index].quantity;
        }
      });

      updateTotalBill(totalBill);
    })
    .catch((err) => {
      console.log(err);
    });
}
//////////////////////////////////////////////////////
function refreshPage() {
  location.reload();
}
// Gọi function tính tổng tiền và updateQuantity khi trang đã tải xong
window.onload = function () {
  calculateTotalBill();
  updateQuantity();
};
