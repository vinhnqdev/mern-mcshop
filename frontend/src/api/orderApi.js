import axios from "axios";
import { getToken } from "../helpers";

const orderApi = {
  add: (order) => {
    const url = "/api/orders";
    return axios.post(url, order, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  getOrderById: (id) => {
    const url = `/api/orders/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  getMyOrders: () => {
    const url = "/api/orders/me";
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  updatePaidStatus: (orderId, paymentResult) => {
    const url = `/api/orders/${orderId}/pay`;
    return axios.patch(url, paymentResult, {
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
};

export default orderApi;
