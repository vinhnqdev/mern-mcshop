import axios from "axios";
import { getToken } from "../helpers/getTokenFromStorage";
const addressApi = {
  add: (shippingAddress) => {
    const url = "/api/addresses/";
    return axios.post(url, shippingAddress, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  getAll: () => {
    const url = "/api/users/addresses/";
    return axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};

export default addressApi;
