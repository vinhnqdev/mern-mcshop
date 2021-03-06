import axios from "axios";
import { getToken } from "utils";

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
  getMyOrders: (params) => {
    const url = "/api/orders/me";
    return axios.get(url, {
      params,
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
  getOrderList: () => {
    const url = "/api/orders/";
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
  },
  updateDeliveredStatus: (id) => {
    const url = `/api/orders/${id}/delivered`;
    return axios.patch(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
  },
};

export default orderApi;
