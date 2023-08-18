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
      <div class="cart-item">
      <img width="100" src=${cartPro.img} alt="" />
      <div class="details">
      <div class="title-price-x">
      <h4 class="title-price">
      <p>${cartPro.name}</p>
      <p class="cart-item-price">$ ${cartPro.price}</p>
      </h4>
      <i onclick="removeItem(${cartPro.id})" class="bi bi-x-lg"></i>
      </div>
      <div class="buttons">
      <i onclick="giam(${cartPro.id})" class="bi bi-dash-lg"></i>
      <div id="${cartPro.id}" class="quantity">${cart[i].quantity}</div>
      <i onclick="tang(${cartPro.id})" class="bi bi-plus-lg"></i>
      </div>
      <h3>${cart[i].quantity * cartPro.price}$</h3>
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
//hàm tăng số lượng
function tang(productId) {
  const quantityElement = document.getElementById(productId);
  const currentQuantity = parseInt(quantityElement.innerText);
  quantityElement.innerText = currentQuantity + 1;
  updateCartItemQuantity(productId, currentQuantity + 1);
  updateQuantity(); // Cập nhật số lượng tổng hiển thị
}

//hàm giảm số lượng
function giam(productId) {
  const quantityElement = document.getElementById(productId);
  const currentQuantity = parseInt(quantityElement.innerText);

  if (currentQuantity > 1) {
    quantityElement.innerText = currentQuantity - 1;
    updateCartItemQuantity(productId, currentQuantity - 1);
    updateQuantity(); // Cập nhật số lượng tổng hiển thị
  }
}

/////////////////////////////////////////////////////////
// Gọi updateQuantity khi trang đã tải xong
window.onload = function () {
  updateQuantity();
};
