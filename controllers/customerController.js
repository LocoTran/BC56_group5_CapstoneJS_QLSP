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
            <button onclick="addToCart(${product.id}" class="btnAdd"><i class="fa-solid fa-cart-shopping"></i>Add to cart</button>
        </div>
        `;
    })
    .join(" ");
}
// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// add to cart
function addToCart(id) {
  // kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  if (cart.some((item) => item.id === id)) {
    // changeNumberOfUnits("plus", id);
  } else {
    const item = Product.find((Product) => Product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  updateCart();
}
// update cart
function updateCart() {
  // renderCartItem();
  renderSubtotal();
  // lưu vào local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}
// tính tiền và hiển thị
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  totalItemInCart.innerHTML = totalItems;
}
