// import axiosClient from "./axiosClient";
import axios from "axios";
import { getToken } from "../helpers";

const productApi = {
  get(params) {
    const url = "/api/products";
    return axios.get(url, { params });
  },
  getById(id) {
    const url = `/api/products/${id}`;
    return axios.get(url);
  },
  addProduct: (product) => {
    const url = "/api/products";
    return axios.post(url, product, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  updateProduct: (product, id) => {
    const url = `/api/products/${id}`;
    return axios.patch(url, product, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  deleteProduct: (id) => {
    const url = `/api/products/${id}`;
    return axios.delete(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  reviewProduct: (review, id) => {
    const url = `/api/products/${id}/review`;
    return axios.post(url, review, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};

export default productApi;
