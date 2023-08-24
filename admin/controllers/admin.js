//////////////////////// Import ////////////////////////
/**
 * Import hàm từ các file khác
 */
import productServ from "../service/serviceAdmin.js";
import {
  getDataForm,
  offLoading,
  onConfirm,
  onLoading,
  onSuccess,
  renderProductList,
  showDataForm,
} from "./controllerAdmin.js";
import { stringToSlug, validation } from "../util/method.js";

//////////////////// Render danh sách product ////////////////////
/**
 * in ra table danh sách product có trong mock api
 */
let fetchProduct = () => {
  onLoading();
  productServ
    .getList()
    .then((res) => {
      renderProductList(res.data);
      offLoading();
    })
    .catch((err) => {
      offLoading();
      console.log("🚀👾👽 ~ err:", err);
    });
};
fetchProduct();

////////////////////// delete product //////////////////////
/**
 *
 * @param {*} id truyền vào hàm 1 id để xóa chính xác sản phầm đó
 */
window.deleteProduct = (id) => {
  onLoading();
  onConfirm(`xóa sản phẩm ID ${id}`).then((res) => {
    if (res) {
      productServ
        .deleteProduct(id)
        .then((res) => {
          fetchProduct();
          onSuccess("Xóa sản phẩm thành công");
          offLoading();
        })
        .catch((err) => {
          offLoading();
          console.log("🚀👾👽 ~ err:", err);
        });
    } else {
      offLoading();
    }
  });
};

////////////////////// Thêm product //////////////////////
/**
 * kiểm tra validation, nếu hợp lệ thêm product vào mock api và in lại lên table
 */
window.addProduct = () => {
  let product = getDataForm("Product");
  // validation contain letter and number
  let valid =
    validation.isContainLetterAndNumber(
      product.name,
      "tBname",
      "Tên sản phẩm"
    ) &
    validation.isContainLetterAndNumber(
      product.screen,
      "tBscreen",
      "Màn hình sản phẩm"
    ) &
    validation.isContainLetterAndNumber(
      product.backCamera,
      "tBbackCam",
      "Camera sau của sản phẩm"
    ) &
    validation.isContainLetterAndNumber(
      product.frontCamera,
      "tBfrontCam",
      "Camera trước của sản phẩm"
    ) &
    validation.isContainLetterAndNumber(
      product.desc,
      "tBdesc",
      "Mô tả sản phẩm"
    ) &
    validation.isLetter(product.type, "tBtype", "Loại sản phẩm");
  // validation price number
  valid = valid & validation.isNumber(product.price, "tBprice", "Giá sản phẩm");
  // validation url
  valid = valid & validation.isUrl(product.img, "tBimg", "URL hình ảnh");
  // Show err notification
  if (!valid) {
    return;
  }

  onLoading();
  // Add to API and render then show alert
  productServ
    .addProduct(product)
    .then((res) => {
      document.querySelector(`[data-modal-hide="exModal"]`).click();
      fetchProduct(res.data);
      onSuccess("Thêm sản phẩm thành công!");
      offLoading();
    })
    .catch((err) => {
      offLoading();
      console.log("🚀👾👽 ~ err:", err);
    });
};

////////////////////// Sửa product //////////////////////
/**
 *
 * @param {*} id truyền id của product cần chỉnh sửa rồi show thông tin lên form edit
 */
window.editProduct = (id) => {
  onLoading();
  document.querySelector(`[data-modal-toggle="editModal"]`).click();
  productServ
    .getDetail(id)
    .then((res) => {
      showDataForm(res.data);
      offLoading();
    })
    .catch((err) => {
      offLoading();
      console.log("🚀👾👽 ~ err:", err);
    });
};

////////////////////// Update product //////////////////////
/**
 * kiểm tra validation, nếu hợp lệ cập nhật product vào mock api và in lại lên table
 */
window.updateProduct = () => {
  let updPro = getDataForm("Update");
  // validation contain letter and number
  let valid =
    validation.isContainLetterAndNumber(
      updPro.name,
      "tBnameUpd",
      "Tên sản phẩm"
    ) &
    validation.isContainLetterAndNumber(
      updPro.screen,
      "tBscreenUpd",
      "Màn hình sản phẩm"
    ) &
    validation.isContainLetterAndNumber(
      updPro.backCamera,
      "tBbackCamUpd",
      "Camera sau của sản phẩm"
    ) &
    validation.isContainLetterAndNumber(
      updPro.frontCamera,
      "tBfrontCamUpd",
      "Camera trước của sản phẩm"
    ) &
    validation.isContainLetterAndNumber(
      updPro.desc,
      "tBdescUpd",
      "Mô tả sản phẩm"
    ) &
    validation.isLetter(updPro.type, "tBtypeUpd", "Loại sản phẩm");
  // validation price number
  valid =
    valid & validation.isNumber(updPro.price, "tBpriceUpd", "Giá sản phẩm");
  // validation url
  valid = valid & validation.isUrl(updPro.img, "tBimgUpd", "URL hình ảnh");
  // Show err notification
  if (!valid) {
    return;
  }

  onLoading();
  // Update Product with ID and new Data then render to table
  productServ
    .updateProduct(updPro.id, updPro)
    .then((res) => {
      document.querySelector(`[data-modal-hide="editModal"]`).click();
      fetchProduct();
      onSuccess("Cập nhật sản phẩm thành công!");
      offLoading();
    })
    .catch((err) => {
      offLoading();
      console.log("🚀👾👽 ~ err:", err);
    });
};

////////////////////// Reset form Update //////////////////////
/**
 * reset form update và reset form add
 */
window.resetUpd = () => {
  document.getElementById("formUpdate").reset();
};
window.resetAdd = () => {
  document.getElementById("formProduct").reset();
};

////////////////////// Find by name //////////////////////
/**
 * Tìm kiếm dựa trên tên sản phẩm khi người dùng nhập vào ô tìm kiểm
 */
document.getElementById("searchByName").oninput = function () {
  offLoading();
  let keyword = stringToSlug(document.getElementById("searchByName").value);
  let arrResult = [];
  if (keyword == "") {
    fetchProduct();
    return;
  } else {
    productServ
      .getList()
      .then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          if (stringToSlug(res.data[index].name).search(keyword) !== -1) {
            arrResult.push(res.data[index]);
          }
        }
        renderProductList(arrResult);
      })
      .catch((err) => {
        console.log("🚀👾👽 ~ err:", err);
      });
  }
};

////////////////////// Sắp xếp tăng giảm //////////////////////
/**
 * Sử dụng thư viện lodash, tên thuộc tính và kiểu sắp xếp để sắp xếp dữ liệu tăng hay giảm dần
 */
let arrTh = document.querySelectorAll("th[data-title]");

for (let i = 0; i < arrTh.length; i++) {
  arrTh[i].onclick = function (event) {
    onLoading();
    let tenThuocTinh = event.target.getAttribute("data-title");
    let order = event.target.getAttribute("data-order");

    productServ
      .getList()
      .then((res) => {
        res.data = _.orderBy(res.data, [tenThuocTinh], [order]);
        renderProductList(res.data);
        offLoading();
      })
      .catch((err) => {
        offLoading();
        console.log("🚀👾👽 ~ err:", err);
      });

    if (order == "asc") {
      event.target.setAttribute("data-order", "desc");
      document
        .querySelector("#priceSort")
        .setAttribute("class", "fa-solid fa-arrow-up-wide-short");
    } else {
      event.target.setAttribute("data-order", "asc");
      document
        .querySelector("#priceSort")
        .setAttribute("class", "fa-solid fa-arrow-down-short-wide");
    }
  };
}
