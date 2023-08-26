export function stringToSlug(title) {
  //Đổi chữ hoa thành chữ thường
  let slug = title.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");

  return slug;
}

export let validation = {
  isUrl: function (str, name, content) {
    let regexUrl = /^(http(s)?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    if (regexUrl.test(str)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(`#${name}`).innerHTML =
      content + " không được bỏ trống và đúng định dạng!";
    return false;
  },
  isEmpty: function (value, name, content) {
    if (value.trim() == "") {
      // document.querySelector(`p[data-error-required=${name}]`)
      document.querySelector(`#${name}`).style.display = "block";
      document.querySelector(`#${name}`).innerHTML =
        content + " không được bỏ trống !";
      return false;
    }
    document.querySelector(`#${name}`).style.display = "none";
    document.querySelector(`#${name}`).innerHTML = "";
    return true;
  },

  isLetter: function (value, name, content) {
    let slugValue = stringToSlug(value);

    // kiểm tra từ có chữ cái, khoảng trắng hoặc '-'
    let regexLetter = /^[A-Z a-z\s'-]+$/;
    if (regexLetter.test(slugValue)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(`#${name}`).innerHTML =
      content + " không được bỏ trống và chỉ ghi chữ!";
    return false;
  },
  isContainLetterAndNumber: function (value, name, content) {
    let regexLetterAndNum = /^[A-Z a-z 0-9]+$/;
    if (regexLetterAndNum.test(value)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(`#${name}`).innerHTML =
      content + " không được bỏ trống và chỉ ghi chữ hoặc số!";
    return false;
  },

  isEmailValid: function (value, name, content) {
    let regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if (regexEmail.test(value)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(`#${name}`).innerHTML =
      content + " không được bỏ trống và đúng định dạng!";
    return false;
  },

  isNumberAndValueValid: function (value, name, content, minValue, maxValue) {
    value = Number(value);
    let regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value) && value >= minValue && value <= maxValue) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(
      `#${name}`
    ).innerHTML = `${content} không được để trống, tất cả phải là số và có giá trị từ ${minValue.toLocaleString()} - ${maxValue.toLocaleString()} !`;
    return false;
  },

  isNumber: function (value, name, content) {
    let regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }

    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(`#${name}`).innerHTML =
      content + " không được bỏ trống, chỉ ghi số!";
    return false;
  },

  isLengthValid: function (value, name, minLength, maxLength) {
    let length = value.length;
    if (length < minLength || length > maxLength) {
      document.querySelector(
        `[data-error-min-max-length=${name}]`
      ).innerHTML = `${name} có giá trị từ ${minLength} - ${maxLength}`;
      return false;
    }
    document.querySelector(
      `[data-error-min-max-length=${name}]`
    ).innerHTML = ``;
    return true;
  },

  isValueValid: function (value, name, minValue, maxValue) {
    if (Number(value) < minValue || Number(value) > maxValue) {
      document.querySelector(
        `[data-error-min-max-value=${name}]`
      ).innerHTML = `${name} giá trị từ ${minValue} - ${maxValue}  !`;
      return false;
    }
    document.querySelector(`[data-error-min-max-value=${name}]`).innerHTML = ``;
    return true;
  },

  isPassValid: function (value, name) {
    let regexPassword =
      /(?=.*\d)(?=.*[A-Z])(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{6,10}/; //(?=.*[a-z])
    if (regexPassword.test(value)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    } else {
      document.querySelector(`#${name}`).style.display = "block";
      document.querySelector(`#${name}`).innerHTML =
        "Mật khẩu không được bỏ trống, phải chứa ít nhất 1 số, 1 chữ hoa, 1 ký tự đặc biệt và độ dài từ 6-10 ký tự !";
      return false;
    }
  },

  isDateValid: function (value, name, content) {
    let regexDate = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (regexDate.test(value)) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(
      `#${name}`
    ).innerHTML = `${content} không được để trống, và đúng định dạng mm/dd/yyyy`;
    return false;
  },

  isUserIDNumberLengthExist: function (
    arr,
    prop,
    userID,
    name,
    content,
    minLength,
    maxLength
  ) {
    let length = userID.length;
    let regexNumber = /^[0-9]+$/;
    //test exist
    for (let index = 0; index < arr.length; index++) {
      if (arr[index][prop] === userID) {
        document.querySelector(`#${name}`).style.display = "block";
        document.querySelector(
          `#${name}`
        ).innerHTML = `${content} cần nhập lại do trùng với người khác, nếu bạn sở hữu tài khoản này hãy nhập mật khẩu`;
        return false;
      }
    }
    //test length and number
    if (
      regexNumber.test(userID) &&
      length >= minLength &&
      length <= maxLength
    ) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }

    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(
      `#${name}`
    ).innerHTML = `${content} không được để trống, tất cả phải là số và độ dài từ ${minLength} - ${maxLength} ký tự!`;
    return false;
  },

  isNumberAndLengthValid: function (
    value,
    name,
    content,
    minLength,
    maxLength
  ) {
    let length = value.length;
    let regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value) && length >= minLength && length <= maxLength) {
      document.querySelector(`#${name}`).style.display = "none";
      document.querySelector(`#${name}`).innerHTML = "";
      return true;
    }
    document.querySelector(`#${name}`).style.display = "block";
    document.querySelector(
      `#${name}`
    ).innerHTML = `${content} không được để trống, tất cả phải là số và độ dài từ ${minLength} - ${maxLength} ký tự!`;
    return false;
  },
};

// phương thức lưu dữ liệu vào localStorage
export function saveStorageArr(arr) {
  let strArr = JSON.stringify(arr);

  localStorage.setItem("arr", strArr);
}

// phương thức lấy dữ liệu từ localStorage
export function getStorageJSON(name) {
  if (localStorage.getItem(name)) {
    let str = localStorage.getItem(name);
    let jsonValue = JSON.parse(str);

    return jsonValue;
  }
  return null;
}

// kiểm tra và gọi dữ liệu đã lưu trong storage
export function getDataStorage() {
  if (getStorageJSON("arr")) {
    arrNhanVien = getStorageJSON("arr");
    renderTableNhanVien(arrNhanVien);
  }
}

/**
 * @param {*} arrstrings mảng chứa nhiều chuỗi bên trong
 * @returns chuỗi xuất hiện nhiều nhất trong hàm
 */
export function findMostCommonString(arrstrings) {
  let chuoiXuatHienNhieuNhat = "";
  let tanSuatMax = 0;
  for (let index = 0; index < arrstrings.length; index++) {
    let tuanSuat = 0;
    for (let j = 0; j < arrstrings.length; j++) {
      if (arrstrings[j] == arrstrings[index]) {
        tuanSuat++;
      }
    }
    if (tuanSuat > tanSuatMax) {
      tanSuatMax = tuanSuat;
      chuoiXuatHienNhieuNhat = arrstrings[index];
    }
  }
  return chuoiXuatHienNhieuNhat;
}

/**
 * @param {*} obj 1 object có nhiều thuộc tính
 * @param {*} prop thuộc tính cần lấy giá trị
 * @returns
 */
export function getValue(obj, prop) {
  if (obj.hasOwnProperty(prop)) {
    return obj[prop];
  } else if (prop.includes(".")) {
    const [parentProp, childProp] = prop.split(".");
    if (
      obj.hasOwnProperty(parentProp) &&
      obj[parentProp].hasOwnProperty(childProp)
    ) {
      return obj[parentProp][childProp];
    }
  }
  return undefined;
}

/**
 * @param {*} array 1 chuỗi chứa các số
 * @returns vị trí và giá trị min, max trong chuỗi
 */
export function findHighestAndLowest(array) {
  let indexMax = 0;
  let valueMax = array[0];
  let indexMin = 0;
  let valueMin = array[0];

  for (let i = 0; i < array.length; i++) {
    if (array[i] > valueMax) {
      valueMax = array[i];
      indexMax = i;
    } else if (array[i] < valueMin) {
      valueMin = array[i];
      indexMin = i;
    }
  }
  return {
    highest: { value: valueMax, index: indexMax },
    lowest: { value: valueMin, index: indexMin },
  };
}

/**
 * @param {*} str chuỗi
 * @returns đảo ngược của chuỗi
 */
export function recursiveReverse(str) {
  return str.split("").reverse().join("");
}

/**
 * Tìm chuỗi con dài nhất ko chứa ký tự đặc biệt
 * @param {*} str
 * @returns
 */
export function longestSubstr(str) {
  let longest = "";
  let current = "";

  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i);
    if (/^[0-9a-zA-Z]+$/.test(char)) {
      current += char;
      if (current.length > longest.length) {
        longest = current;
      }
    } else {
      current = "";
    }
  }

  return longest;
}

/**
 * Tính b lũy thừa e
 * @param {*} b
 * @param {*} e
 * @returns
 */
export function powerOfNumber(b, e) {
  let result = 1;
  for (let i = 0; i < e; i++) {
    result *= b;
  }
  return result;
}

/**
 * Tính giai thừa của số n
 * @param {*} n
 * @returns
 */
export function factorial(n) {
  let giaiThua = 1;
  for (let i = 1; i <= n; i++) {
    giaiThua *= i;
  }
  return giaiThua;
}

/**
 * Tính tổng từ 1 đến n
 * @param {*} n
 * @returns
 */
export function sumWithRecursion(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

/**
 * In hoa từ đầu VD: str = "hello case" => upperCase(str) = "Hello Case"
 * @param {*} string
 * @returns
 */
export function upperCase(string) {
  let words = string.split(" ");
  words = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  return words.join(" ");
}
