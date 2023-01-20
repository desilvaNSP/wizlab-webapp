export const getCookie = cookieName => {
  var value = "";
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      value = c.substring(name.length, c.length);
      return value;
    }
  }
  return "";
};

export const setCookie = (cookieName, cookieValue, expireAt, domain) => {
  var expires = "";
  if (expireAt) {
    var d = new Date();
    d.setTime(d.getTime() + expireAt * 1000);
    expires = ";expires=" + d.toUTCString();
  }
  document.cookie = `${cookieName}=${cookieValue}${expires};path=/;domain=${domain}`;
};

export const deleteCookie = name => {
  setCookie(name, "", -1);
};

export default {
  getCookie,
  setCookie,
  deleteCookie
};
