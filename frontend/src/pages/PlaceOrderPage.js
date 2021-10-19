import React from "react";
import { useSelector } from "react-redux";

const PlaceOrderPage = () => {
  const userAddress = useSelector((state) => state.user.userAddress);
  console.log(userAddress);
  return <div>PlaceOrderPage</div>;
};

export default PlaceOrderPage;
