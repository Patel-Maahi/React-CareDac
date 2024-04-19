const setToken = (token) => {
  localStorage.setItem("token", token);
};
const removeToken = () => {
  localStorage.removeItem("token");
};
const getToken = () => {
  return localStorage.getItem("token");
};

export { setToken, removeToken, getToken };
