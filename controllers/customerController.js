// render dienthoai
const totalItemInCart = document.querySelector("#cartCount");
function DanhSachSanPham(products) {
  document.querySelector("#productList").innerHTML = products
    .map((product) => {
      return `
        <div class="item mr-4 p-2 mt-4">
          <img src="${product.img}" alt="">
            <div class="content">
                <div class="detail">
                  <h4 class="text-xl font-semibold py-2">${product.name}</h4>
                  <p><span>${product.screen}</span></p>
                  <p>Camera sau: <span>${product.backCamera}</span></p>
                  <p>Camera trước: <span>${product.frontCamera}</span></p>
                  <p>${product.desc}</p>
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
}
///////////////////////////////////////////////////////////////
// giỏ hàng
// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateQuantity();

// add to cart
window.addToCart = addToCart;
function addToCart(id) {
  const existingItem = cart.find((item) => item.id === id); // quan . item
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: id, quantity: 1 });
  }
  updateQuantity();
  calculateTotalBill();
  updateCart(); // Lưu lại giỏ hàng vào local storage
}

// update cart
function updateCart() {
  localStorage.setItem("CART", JSON.stringify(cart));
}

// Cập nhật số lượng sản phẩm trong giỏ hàng và giao diện
function updateQuantity() {
  let quantity = 0;
  for (const item of cart) {
    quantity += item.quantity;
  }
  totalItemInCart.innerHTML = quantity;
}

//hàm cập nhật số lượng sản phẩm trong giỏ hàng và giao diện
function updateCartItemQuantity(productId, newQuantity) {
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity = newQuantity;
    updateCart();
  }
}
////////////////////////////////////////////////////
// xuất giỏ hàng ra cart.html
/////////////////////////////////
for (let i = 0; i < cart.length; i++) {
  axios({
    url: `${api}/${cart[i].id}`,
    method: "GET",
  })
    .then((res) => {
      //res.data
      let cartPro = res.data;
      let divString = `
      <div class="shopping-cart grid gap-4 justify-center">
        <div class="cart-item flex border border-solid border-black m-6 p-3">
          <img class="w-40" src=${cartPro.img} alt="" />
          <div class="details flex flex-col ml-4">
            <div class="title-price-x w-48 flex items-center justify-between">
              <h4 class="title-price flex items-center gap-3 ">
                <p>${cartPro.name}</p>
                <p class="cart-item-price bg-black text-white rounded-md py-1 px-2">${cartPro.price.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}</p>
              </h4>
              <i onclick="removeItem(${
                cartPro.id
              })" class="bi bi-x-lg font-bold text-red-600 cursor-pointer"></i>
            </div>
            <div class="buttons flex flex-row gap-2 text-base items-center">
              <i onclick="giam(${
                cartPro.id
              })" class="bi bi-dash-lg text-red-600 cursor-pointer"></i>
              <div id="${cartPro.id}" class="quantity">${cart[i].quantity}</div>
              <i onclick="tang(${
                cartPro.id
              })" class="bi bi-plus-lg text-green-600 cursor-pointer"></i>
            </div>
            <h3 class="text-lg mt-2">${cartPro.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}</h3>
          </div>
        </div>
      </div>
    `;

      contentHTML += divString;
      label.innerHTML = contentHTML;
    })
    .catch((err) => {
      console.log(err);
    });
}
// ///////////////
// xóa giỏ hàng
function xoaGioHang() {
  // Xóa toàn bộ nội dung của giỏ hàng
  cart = [];
  updateCart();
  refreshPage();
}
// Hàm để loại bỏ một sản phẩm khỏi giỏ hàng
function removeItem(productId) {
  //  Tìm ID của sản phẩm trong mảng giỏ hàng
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    // Loại bỏ sản phẩm khỏi mảng giỏ hàng
    cart.splice(itemIndex, 1);
    updateCart();
    refreshPage();
  }
}

//hàm tăng số lượng
function tang(productId) {
  const quantityElement = document.getElementById(productId);
  const currentQuantity = parseInt(quantityElement.innerText);
  quantityElement.innerText = currentQuantity + 1;
  updateCartItemQuantity(productId, currentQuantity + 1);
  updateQuantity(); // Cập nhật số lượng tổng hiển thị
  calculateTotalBill();
}

//hàm giảm số lượng
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

/////////////////////////////////////////////////////////
// Gọi updateQuantity khi trang đã tải xong
window.onload = function () {
  updateQuantity();
};
// Làm mới trang để thể hiện giỏ hàng đã được cập nhật

// /////////////////////
// Hàm để tính tổng tiền của các sản phẩm trong giỏ hàng
function calculateTotalBill() {
  let totalBill = 0;
  for (const item of cart) {
    axios({
      url: `${api}/${item.id}`,
      method: "GET",
    })
      .then((res) => {
        let cartPro = res.data;
        totalBill += cartPro.price * item.quantity;
        updateTotalBill(totalBill);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Hàm để cập nhật tổng tiền trong giao diện
function updateTotalBill(totalBill) {
  const totalBillElement = document.getElementById("totalBill");
  totalBillElement.textContent = `Tổng Tiền: ${totalBill.toLocaleString(
    "en-US",
    { style: "currency", currency: "USD" }
  )}`;
}
function refreshPage() {
  location.reload();
}
// Gọi hàm tính tổng tiền khi trang đã tải xong
window.onload = function () {
  calculateTotalBill();
};
