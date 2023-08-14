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

export let onSuccess = (mess) => {
  Swal.fire(mess, "", "success");
};
