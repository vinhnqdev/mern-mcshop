import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../app/userThunk";
import UserAddressList from "../Checkout/UserAddressList";

function AddressNotes() {
  const userAddresses = useSelector((state) => state.user.userAddresses);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);
  return (
    <div>
      <UserAddressList loading={loading} userAddresses={userAddresses} isAddBook />
    </div>
  );
}

export default AddressNotes;
