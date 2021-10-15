import axios from "axios";

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
    const user = JSON.parse(localStorage.getItem("user"));
    let token;
    if (user) {
      token = user.token;
    }
    const url = "/api/users/update";
    return axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default userApi;
