import axios from "axios";
import { getToken } from "utils";

const brandApi = {
  add: (brand) => {
    const url = "/api/brands";
    return axios.post(url, brand, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  getAll: () => {
    const url = "/api/brands";
    return axios.get(url);
  },
};

export default brandApi;
