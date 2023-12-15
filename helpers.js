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

 export function removeAllTags(string) {
   console.log(string);
   if (typeof string) return string
  return string.replaceAll(/&/g, '&amp;')
  .replaceAll(/</g, '&lt;')
  .replaceAll(/>/g, '&gt;')
  .replaceAll(/"/g, '&quot;')

 }