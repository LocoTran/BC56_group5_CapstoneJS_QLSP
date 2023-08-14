import productServ from "../service/service.js";
import { renderProductList } from "../controllers/controller.js";
//render danh sách product
let fetchProduct = () => {
  productServ
    .getList()
    .then((res) => {
      console.log("🚀👾👽 ~ .then ~ res:", res);
      renderProductList(res.data);
    })
    .catch((err) => {
      console.log("🚀👾👽 ~ err:", err);
    });
};
fetchProduct();
