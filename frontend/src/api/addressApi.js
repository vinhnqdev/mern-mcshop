import axios from "axios";
import { getToken } from "../helpers/getTokenFromStorage";
const addressApi = {
  add: (shippingAddress) => {
    const url = "/api/addresses/me";
    return axios.post(url, shippingAddress, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  myAdressById: (id) => {
    const url = `/api/addresses/me/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  myUpdateById: (address, id) => {
    const url = `/api/addresses/me/${id}`;
    return axios.patch(url, address, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  myDeleteById: (id) => {
    const url = `/api/addresses/me/${id}`;
    return axios.delete(url, {
      headers: {
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
