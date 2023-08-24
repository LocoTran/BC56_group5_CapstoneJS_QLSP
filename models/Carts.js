const api = `https://64cde6de0c01d81da3ee5a2f.mockapi.io/phones`;
let label = document.querySelector("#label");
let gioHang = JSON.parse(localStorage.getItem("CART")) || [];
let contentHTML = "";
