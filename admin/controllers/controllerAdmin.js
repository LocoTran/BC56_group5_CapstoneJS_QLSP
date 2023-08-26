////////////////////// Render danh sách product //////////////////////
/**
 *
 * @param {*} list truyền 1 danh sách các product để render ra table
 */
export let renderProductList = (list) => {
  let contentHTML = "";
  list
    .reverse()
    .forEach(
      ({
        id,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type,
      }) => {
        let trString = `
            <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${(price * 1).toLocaleString()} $</td>
            <td>${screen}</td>
            <td>${backCamera}</td>
            <td>${frontCamera}</td>
            <td><img src="${img}" alt="" /></td>
            <td>${desc}</td>
            <td>${type}</td>
            <td>
            <div class="flex items-center">
            <button class="bg-red-500 text-white" onclick="deleteProduct(${id})">Xóa</button>
            <button class="bg-blue-500 text-white" onclick="editProduct(${id})">Sửa</button>
            </div>
            </td>
            </tr>
            `;
        contentHTML += trString;
      }
    );
  document.getElementById("tbodyTable").innerHTML = contentHTML;
};

////////////////////// Show thông báo //////////////////////
/**
 * Dùng thư viện sweetAlert2
 * @param {*} mess để hiện thông báo, các thông số khác là màu sắc và mặc định của thư viện
 */
export let onSuccess = (mess) => {
  Swal.fire(mess, "", "success");
};

////////////////////// Confirm Action ////////////////////////
/**
 * Dùng thư viện sweetAlert2
 * @param {*} mess truyền tin nhắn để người dùng xác nhận
 * @returns 1 promise với resolve và reject để thực thi
 */
export let onConfirm = (mess) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: `Bạn chắn chắn muốn </br> ${mess}?`,
      showDenyButton: true,
      confirmButtonText: `Ok, ${mess}`,
      denyButtonText: `Hủy thao tác`,
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

////////////////////////// Lấy thông tin từ form //////////////////////////
/**
 *
 * @param {*} in4 tên của form cần lấy thông tin
 * @returns obj với các thông số như trên api
 */
export let getDataForm = (in4) => {
  let id = document.getElementById(`id${in4}`).value;
  let name = document.getElementById(`name${in4}`).value;
  let price = document.getElementById(`price${in4}`).value;
  let screen = document.getElementById(`screen${in4}`).value;
  let backCamera = document.getElementById(`backCam${in4}`).value;
  let frontCamera = document.getElementById(`frontCam${in4}`).value;
  let img = document.getElementById(`img${in4}`).value;
  let desc = document.getElementById(`desc${in4}`).value;
  let type = document.getElementById(`type${in4}`).value;
  return {
    id,
    name,
    price,
    screen,
    name,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
  };
};

////////////////////////// Đưa thông tin lên form update ////////////////////////
/**
 *
 * @param {*} data truyền vào 1 product để truyền ngược lại form cho người dùng sửa và update thông tin
 */
export let showDataForm = (data) => {
  let { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
    data;
  document.getElementById("idUpdate").value = id;
  document.getElementById("nameUpdate").value = name;
  document.getElementById("priceUpdate").value = price;
  document.getElementById("screenUpdate").value = screen;
  document.getElementById("backCamUpdate").value = backCamera;
  document.getElementById("frontCamUpdate").value = frontCamera;
  document.getElementById("imgUpdate").value = img;
  document.getElementById("descUpdate").value = desc;
  document.getElementById("typeUpdate").value = type;
};

////////////////////////// Tắt/ bật loading ////////////////////////
export let onLoading = () => {
  document.querySelector("#spinner").style.display = "flex";
};
export let offLoading = () => {
  document.querySelector("#spinner").style.display = "none";
};
