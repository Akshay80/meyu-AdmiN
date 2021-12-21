export function getToken() {
  let token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
}

export function setUserDetail(userDetail) {
  localStorage.setItem("userDetail", userDetail);
  console.log("parse detail", JSON.parse(userDetail));
}

export function setUserToken(token) {
  if (token !== undefined) {
    localStorage.setItem("token", token);
  } else {
  }
}

export function getUserToken() {
  return localStorage.getItem("token");
}

export function clearToken() {
  localStorage.clear();
}
