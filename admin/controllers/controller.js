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
            </tr>
            `;
        contentHTML += trString;
      }
    );
  document.getElementById("tbodyTable").innerHTML = contentHTML;
};
