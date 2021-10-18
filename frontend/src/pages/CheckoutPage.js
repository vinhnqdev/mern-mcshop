import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { cartActions } from "../app/cartSlice";
import ShippingForm from "../components/Form/ShippingForm";
import { useSelector } from "react-redux";
function CheckoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const shippingAdress = useSelector((state) => state.cart.shippingAddress);

  const handleShippingSubmit = (shippingAddress) => {
    dispatch(cartActions.addShippingAddress(shippingAddress));
    history.push("/checkout/payment");
  };

  const initialValues = {
    ...shippingAdress,
  };

  return (
    <div>
      {shippingAdress && Object.keys(shippingAdress) && (
        <ShippingForm initialValues={initialValues} onSubmit={handleShippingSubmit} />
      )}
    </div>
  );
}

export default CheckoutPage;
