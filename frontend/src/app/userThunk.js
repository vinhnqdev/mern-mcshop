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
    throw new Error((error.response && error.response.data.message) || error.message);
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

      const { data: addressList } = await addressApi.getAll();

      // Logic move default address at the first elem of the list
      const defaultAddressIndex = addressList.findIndex((address) => address.isDefault);
      const defaultAddress = addressList[defaultAddressIndex];
      const newAddressList = addressList.filter((address, index) => index !== defaultAddressIndex);
      newAddressList.unshift(defaultAddress);
      const userAddresses = newAddressList.map((address) => {
        const provice = listProvince.find((provice) => provice.code === +address.city).name;
        const district = listDistrict.find((district) => district.code === +address.district).name;
        const ward = listWard.find((ward) => ward.code === +address.ward).name;

        return {
          ...address,
          userAddress: `${address.address}, ${ward}, ${district}, ${provice}, Việt Nam.`,
        };
      });
      return userAddresses;
    } catch (error) {
      throw new Error(error.response && error.response.data.message);
    }
  }
);

/** ADMIN USER LIST */

export const getUserList = createAsyncThunk("user/getUserList", async (params, thunkAPI) => {
  try {
    const response = await userApi.getUserList();
    return response.data;
  } catch (error) {
    throw new Error((error.response && error.response.data.message) || error.message);
  }
});

export const deleteUserById = createAsyncThunk("user/deleteUserById", async (params, thunkAPI) => {
  try {
    const response = await userApi.deleteUser(params);
    return response.data;
  } catch (error) {
    throw new Error((error.response && error.response.data.message) || error.message);
  }
});

export const getUserById = createAsyncThunk("user/getUserById", async (params, thunkAPI) => {
  try {
    const response = await userApi.getUserById(params);
    return response.data;
  } catch (error) {
    throw new Error((error.response && error.response.data.message) || error.message);
  }
});

export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async ({ id, updateUser: user }, thunkAPI) => {
    try {
      const response = await userApi.updateUserById(id, user);
      return response.data;
    } catch (error) {
      throw new Error((error.response && error.response.data.message) || error.message);
    }
  }
);
