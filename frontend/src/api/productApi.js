// import axiosClient from "./axiosClient";
import axios from "axios";

const productApi = {
  get(params) {
    const url = "/api/products";
    return axios.get(url, { params });
  },
  getById(id) {
    const url = `/api/products/${id}`;
    return axios.get(url);
  },
};

export default productApi;
