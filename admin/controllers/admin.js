import productServ from "../service/service.js";
import {
  getDataForm,
  onSuccess,
  renderProductList,
  showDataForm,
} from "../controllers/controller.js";

// Render danh sách product
let fetchProduct = () => {
  productServ
    .getList()
    .then((res) => {
      renderProductList(res.data);
    })
    .catch((err) => {
      console.log("🚀👾👽 ~ err:", err);
    });
};
fetchProduct();

// Xóa product
window.deleteProduct = (id) => {
  console.log("yes");
  productServ
    .deleteProduct(id)
    .then((res) => {
      fetchProduct();
      onSuccess("Xóa sản phẩm thành công");
    })
    .catch((err) => {
      console.log("🚀👾👽 ~ err:", err);
    });
};

// Thêm product
window.addProduct = () => {
  let product = getDataForm("Product");
  productServ
    .addProduct(product)
    .then((res) => {
      document.querySelector(`[data-modal-hide="exModal"]`).click();
      fetchProduct(res.data);
      onSuccess("Thêm sản phẩm thành công!");
    })
    .catch((err) => {
      console.log("🚀👾👽 ~ err:", err);
    });
};

// Sửa product
window.editProduct = (id) => {
  document.querySelector(`[data-modal-toggle="editModal"]`).click();
  productServ
    .getDetail(id)
    .then((res) => {
      showDataForm(res.data);
    })
    .catch((err) => {
      console.log("🚀👾👽 ~ err:", err);
    });
};

// Update product
window.updateProduct = () => {
  let updPro = getDataForm("Update");
  productServ
    .updateProduct(updPro.id, updPro)
    .then((res) => {
      document.querySelector(`[data-modal-hide="editModal"]`).click();
      fetchProduct();
      onSuccess("Cập nhật sản phẩm thành công!");
    })
    .catch((err) => {
      console.log("🚀👾👽 ~ err:", err);
    });
};

// Reset form Update
window.resetUpd = () => {
  let idPro = document.getElementById("idUpdate").value;
  document.getElementById("formUpdate").reset();
  document.getElementById("idUpdate").value = idPro;
};

// Reset form Thêm
window.resetAdd = () => {
  document.getElementById("formProduct").reset();
};
