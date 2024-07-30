import backendAPI from "./api/backendAPI";

export const reformatFooterInfo = (pages, links) => {
  let result = [];

  for (let i = 0; i < pages.length; i++) {
    result[i] = { text: pages[i], link: links[i] };
  }
  return result;
};

export const logOut = async (navigate) => {
  await new backendAPI().signout();
  navigate("/");
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
