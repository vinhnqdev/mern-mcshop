import axios from "axios";

const userApi = {
  login: (data) => {
    const url = "/api/users/login";
    return axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  register: (data) => {
    const url = "/api/users";
    return axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default userApi;
