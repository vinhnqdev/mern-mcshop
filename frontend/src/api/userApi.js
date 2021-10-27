import axios from "axios";
import { getToken } from "../helpers/getTokenFromStorage";
const userApi = {
  // POST /api/users/login
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
  // POST /api/users/signup
  register: (data) => {
    const url = "/api/users/signup";
    return axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  // PATCH api/users/update/me
  update: (data) => {
    const url = "/api/users/update/me";
    return axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  /// GET api/users/me
  getDetail: () => {
    const url = "/api/users/me";
    return axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  // GET api/users/ (ADMIN)
  getUserList: () => {
    const url = "/api/users/";
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  // DELETE api/users/:id (ADMIN)
  deleteUser: (id) => {
    const url = `/api/users/${id}`;
    return axios.delete(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  // GET api/users/:id (ADMIN)
  getUserById: (id) => {
    const url = `/api/users/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  // PATCH api/users/:id (ADMIN)
  updateUserById: (id, user) => {
    const url = `/api/users/${id}`;

    return axios.patch(url, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};

export default userApi;
