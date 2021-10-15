export const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let token;
  if (user) {
    token = user.token;
    return token;
  }
};
