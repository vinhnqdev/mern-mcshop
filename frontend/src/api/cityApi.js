import axios from "axios";

const cityApi = {
  // API Handle Select-Option Form
  getProvices: () => {
    return axios.get("https://provinces.open-api.vn/api/?depth=1");
  },
  getDistricts: (code, params) => {
    return axios.get(`https://provinces.open-api.vn/api/p/${code}`, { params });
  },
  getWards: (code, params) => {
    return axios.get(`https://provinces.open-api.vn/api/d/${code}`, { params });
  },
  getListProvice: () => {
    return axios.get("https://provinces.open-api.vn/api/p/");
  },
  getListDistrict: () => {
    return axios.get("https://provinces.open-api.vn/api/d/");
  },
  getListWard: () => {
    return axios.get("https://provinces.open-api.vn/api/w/");
  },
  getProviceByCode: (code) => {
    return axios.get(`https://provinces.open-api.vn/api/p/${code}`);
  },
  getDistrictByCode: (code) => {
    return axios.get(`https://provinces.open-api.vn/api/d/${code}`);
  },
  getWardByCode: (code) => {
    return axios.get(`https://provinces.open-api.vn/api/w/${code}`);
  },
};

export default cityApi;
