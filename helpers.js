export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

//  export function removeAllTags(string) {
//    console.log(string);
//    if (typeof string) return string
//   return string.replaceAll(/&/g, '&amp;')
//   .replaceAll(/</g, '&lt;')
//   .replaceAll(/>/g, '&gt;')
//   .replaceAll(/"/g, '&quot;')

//  }
// export function removeAllTags(string) {
//      console.log(string);
//     return string
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;")
//    }


//  commentsData.push({
//   name: nameInputElement.value
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;")


export function removeHtmlTags(str) {
  if (typeof str === 'string') {
  return str.replace(/<[^>]*>/g, '');
}else {
  // Возвращаем значение как есть, если это не строка, или можно обработать ошибку по-другому
  console.error('removeHtmlTags: Предоставленный аргумент не является строкой');
  return str;
}
}
