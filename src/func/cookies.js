import Cookies from "js-cookie";

export const setCookie = (name, value, exp = 30) => {
  Cookies.set(name, value, {
    expires: exp,
    secure: false,
    sameSite: "strict",
    path: "/",
  });
};

export const acceptCookie = () => {
  setCookie("acceptCookie", true);
};

export const declineCookie = () => {
  setCookie("acceptCookie", false);
};

export const getAcceptCookie = () => {
  return Cookies.get("acceptCookie");
};
