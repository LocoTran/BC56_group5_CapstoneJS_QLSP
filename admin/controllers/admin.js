import productServ from "../service/service.js";
import { onSuccess, renderProductList } from "../controllers/controller.js";

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

window.deleteProduct = (id) => {
  console.log("yes");
  productServ
    .deleteProduct(id)
    .then((res) => {
      console.log("🚀👾👽 ~ .then ~ res:", res);
      fetchProduct();
      onSuccess("Xóa sản phẩm thành công");
    })
    .catch((err) => {
      console.log("🚀👾👽 ~ err:", err);
    });
};
