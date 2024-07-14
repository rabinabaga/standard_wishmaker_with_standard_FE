import Cookies from "js-cookie";

export const setCookie = ({
  cookieName,
  value,
  expiresIn,
}: {
  cookieName: string;
  value: string;
  expiresIn: number;
}) => {
  Cookies.set(cookieName, value, { expires: expiresIn });
};

export const removeCookie = (cookieName: string) => Cookies.remove(cookieName);
export const getCookie = (cookieName: string) => Cookies.get(cookieName);
