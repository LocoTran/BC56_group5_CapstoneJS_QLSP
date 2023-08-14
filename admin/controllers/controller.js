// Render danh sách product
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
            <td>${price}</td>
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

// Show thông báo
export let onSuccess = (mess) => {
  Swal.fire(mess, "", "success");
};

// Lấy thông tin từ form thêm
export let getDataForm = (a) => {
  let id = document.getElementById(`id${a}`).value;
  let name = document.getElementById(`name${a}`).value;
  let price = document.getElementById(`price${a}`).value;
  let screen = document.getElementById(`screen${a}`).value;
  let backCamera = document.getElementById(`backCam${a}`).value;
  let frontCamera = document.getElementById(`frontCam${a}`).value;
  let img = document.getElementById(`img${a}`).value;
  let desc = document.getElementById(`desc${a}`).value;
  let type = document.getElementById(`type${a}`).value;

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

// Đưa thông tin lên form update
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
