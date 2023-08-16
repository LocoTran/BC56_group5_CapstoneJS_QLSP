// render dienthoai
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
            <button class="btnAdd"><i class="fa-solid fa-cart-shopping"></i>Add to cart</button>
        </div>
        `;
    })
    .join(" ");
}
