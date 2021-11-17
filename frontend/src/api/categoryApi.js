import axios from "axios";
import { getToken } from "utils";

const categoryApi = {
  add: (category) => {
    const url = "/api/categories";
    return axios.post(url, category, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },

  getAll: () => {
    const url = "/api/categories";
    return axios.get(url);
  },
};

export default categoryApi;
