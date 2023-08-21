const api = `https://64cde6de0c01d81da3ee5a2f.mockapi.io/phones`;

let label = document.querySelector("#label");
// let shoppingCart = document.querySelector("#shopping-cart");
let gioHang = JSON.parse(localStorage.getItem("CART")) || [];
console.log(gioHang);
let contentHTML = "";

// for (let i = 0; i < gioHang.length; i++) {
//   axios({
//     url: `${api}/${gioHang[i].id}`,
//     method: "GET",
//   })
//     .then((res) => {
//       //res.data
//       let cartPro = res.data;
//       let divString = `
//       <div class="cart-item">
//       <img width="100" src=${cartPro.img} alt="" />
//       <div class="details">
//       <div class="title-price-x">
//       <h4 class="title-price">
//       <p>${cartPro.name}</p>
//       <p class="cart-item-price">$ ${cartPro.price}</p>
//       </h4>
//       <i onclick="removeItem(${cartPro.id})" class="bi bi-x-lg"></i>
//       </div>
//       <div class="buttons">
//       <i onclick="giam(${cartPro.id})" class="bi bi-dash-lg"></i>
//       <div id="${cartPro.id}" class="quantity">${gioHang[i].quantity}</div>
//       <i onclick="tang(${cartPro.id})" class="bi bi-plus-lg"></i>
//       </div>
//       </div>
//       </div>
//       `;
//       contentHTML += divString;
//       label.innerHTML = contentHTML;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// function tang(productId) {
//   const quantityElement = document.getElementById(productId);
//   const currentQuantity = parseInt(quantityElement.innerText);
//   quantityElement.innerText = currentQuantity + 1;
// }

// // Define a function to decrease quantity
// function giam(productId) {
//   const quantityElement = document.getElementById(productId);
//   const currentQuantity = parseInt(quantityElement.innerText);

//   if (currentQuantity > 1) {
//     quantityElement.innerText = currentQuantity - 1;
//   }
// }
// let tang = (id) => {
//   let selectedItem = id;
//   let search = gioHang.find((x) => x.id === selectedItem.id);
//   if(search===undefined){
//     gioHang.push({
//       id:selectedItem.id
//       item:1
//     })
//   }else{
//     search.item+=
//   }
// };
