import { createAsyncThunk } from "@reduxjs/toolkit";
import addressApi from "../api/addressApi";
import cityApi from "../api/cityApi";
import userApi from "../api/userApi";

export const login = createAsyncThunk("user/login", async (params, thunkAPI) => {
  try {
    const response = await userApi.login(params);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw new Error(
      (error.response && error.response.data.message) || "Failed to login, try again."
    );
  }
});

export const register = createAsyncThunk("user/register", async (params, thunkAPI) => {
  try {
    const response = await userApi.register(params);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw new Error(error.response && error.response.data.message);
  }
});

export const update = createAsyncThunk("user/update", async (params, thunkAPI) => {
  try {
    const response = await userApi.update(params);
    const currentlocalStorageUser = JSON.parse(localStorage.getItem("user"));
    const newlocalStorageUser = { ...currentlocalStorageUser, user: response.data };
    localStorage.setItem("user", JSON.stringify(newlocalStorageUser));
    return response.data;
  } catch (error) {
    throw new Error(error.response && error.response.data.message);
  }
});

export const userDetail = createAsyncThunk("user/userDetail", async (params, thunkAPI) => {
  try {
    const response = await userApi.getDetail();
    return response.data;
  } catch (error) {
    throw new Error(error.response && error.response.data.message);
  }
});

export const addUserAddress = createAsyncThunk("user/addUserAddress", async (params, thunkAPI) => {
  try {
    const { data: address } = await addressApi.add(params);
    const { data: listProvince } = await cityApi.getListProvice();
    const { data: listDistrict } = await cityApi.getListDistrict();
    const { data: listWard } = await cityApi.getListWard();
    if (!listProvince || !listDistrict || !listWard) {
      throw new Error("Something went wrong!");
    }
    const provice = listProvince.find((provice) => provice.code === +address.city).name;
    const district = listDistrict.find((district) => district.code === +address.district).name;
    const ward = listWard.find((ward) => ward.code === +address.ward).name;

    const userAddress = {
      address: `${address.address}, ${ward}, ${district}, ${provice}, Việt Nam.`,
      phone: address.phone,
      name: address.name,
      _id: address._id,
    };

    localStorage.setItem("ad", JSON.stringify(userAddress));
    return userAddress;
  } catch (error) {
    throw new Error(error.response && error.response.data.message);
  }
});

export const getUserAddresses = createAsyncThunk(
  "user/getUserAddresses",
  async (params, thunkAPI) => {
    try {
      const { data: listProvince } = await cityApi.getListProvice();
      const { data: listDistrict } = await cityApi.getListDistrict();
      const { data: listWard } = await cityApi.getListWard();

      if (!listProvince || !listDistrict || !listWard) {
        throw new Error("Something went wrong!");
      }

      const response = await addressApi.getAll();

      const userAddresses = response.data.map((address) => {
        const provice = listProvince.find((provice) => provice.code === +address.city).name;
        const district = listDistrict.find((district) => district.code === +address.district).name;
        const ward = listWard.find((ward) => ward.code === +address.ward).name;

        return {
          ...address,
          userAddress: `${address.address}, ${ward}, ${district}, ${provice}, Việt Nam.`,
        };
      });
      return userAddresses;
      // return response.data;
    } catch (error) {
      throw new Error(error.response && error.response.data.message);
    }
  }
);
