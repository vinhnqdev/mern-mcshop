import axios from "axios";
import { getToken } from "../helpers/getTokenFromStorage";
const userApi = {
  login: (data) => {
    const url = "/api/users/login";
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(
    //       axios.post(url, data, {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       })
    //     );
    //   }, 500);
    // });
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
  update: (data) => {
    const url = "/api/users/update";
    return axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  getDetail: () => {
    const url = "/api/users/profile";
    return axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};

export default userApi;
