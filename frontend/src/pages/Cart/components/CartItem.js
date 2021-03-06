import React, { useState } from "react";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { formatCurrency } from "utils";
import { useDispatch } from "react-redux";
import { cartActions } from "app/cartSlice";
import { Button } from "antd";
import Modal from "components/UI/Modal";
function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [typeRemove, setTypeRemove] = useState();
  const dispatch = useDispatch();
  const originalPrice = item.discount
    ? item.price + (item.price * item.discount) / 100
    : item.price;

  const handleChangeInput = (e) => {
    const quantityItem = e.target.value;

    if (quantityItem === "") {
      setQuantity(quantityItem);
      return;
    }
    setQuantity(quantityItem);

    if (quantityItem < 1) {
      console.warn("you must enter value great than 0");
      setQuantity("");
      return;
    }
    if (quantityItem > 10) {
      console.warn("you must enter value less than 10");
      // setQuantity(quantity);
      return;
    }

    dispatch(
      cartActions.addToCartWithNumberForm({ _id: item._id, quantity: Number(quantityItem) })
    );
  };

  const addToCartHandler = () => {
    dispatch(cartActions.addToCart({ _id: item._id, quantity: 1 }));
    setQuantity((prevState) => +prevState + 1);
  };

  const removeToCartHandler = () => {
    dispatch(cartActions.removeToCart({ _id: item._id }));
    setQuantity((prevState) => +prevState - 1);
  };

  const clearItem = () => {
    dispatch(cartActions.clearItem(item._id));
  };

  const openModal = (type) => {
    setIsModalVisible(true);
    setTypeRemove(type);
  };

  return (
    <li className="bg-white flex space-x-5 border-b last:border-b-0 py-4 md:space-x-7 lg:space-x-8 ">
      {/** LEFT */}
      <div className="flex items-center space-x-2">
        <div className="hidden sm:block lg:hidden xl:block bg-gray-300 p-1 rounded-full">
          <TrashIcon className="h-6 text-white cursor-pointer" onClick={() => openModal("trash")} />
        </div>
        <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-full border p-1 border-gray-600 rounded-lg"
          />
        </div>
      </div>

      {/** RIGHT */}
      <div className="space-y-2 lg:w-full lg:grid lg:grid-cols-4 items-center lg:space-y-0">
        {/** Name */}
        <h4 className="truncate-2-lines font-medium text-gray-800 md:text-base lg:col-span-2 lg:mb-0 lg:px-2 xl:px-0">
          {item.name}
        </h4>
        {/** Price */}
        <div className="sm:flex lg:flex-col items-center sm:space-x-4 lg:col-span-1 lg:space-x-0 lg:mr-4">
          <p className="text-sm mb-0 uppercase font-normal text-gray-700 line-through md:text-base lg:order-1">
            {formatCurrency(originalPrice, "vi-VN", "VND")}
          </p>
          <p className="text-sm mb-0 font-medium uppercase text-yellow-500 md:text-base">
            {formatCurrency(item.price, "vi-VN", "VND")}
          </p>
        </div>
        {/** Quantity */}
        <div className="flex lg:col-span-1 lg:items-center">
          <div className="self-stretch cursor-pointer">
            <MinusIcon
              onClick={item.quantity === 1 ? () => openModal("remove") : removeToCartHandler}
              className="w-6 h-full text-gray-700 border border-gray-300 border-r-0 p-1"
            />
          </div>

          <input
            type="number"
            className="border border-gray-300 h-7 w-10 text-center"
            value={quantity}
            onChange={handleChangeInput}
            min={1}
            max={10}
          />

          <div className="self-stretch cursor-pointer">
            <PlusIcon
              onClick={addToCartHandler}
              className="w-6 text-gray-700 h-full border border-gray-300 border-l-0 p-1"
            />
          </div>
        </div>
      </div>

      <Modal visible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <p className="">B???n mu???n xo?? s???n ph???m n??y?</p>
        <div className="flex justify-end gap-4">
          <Button type="ghost" onClick={() => setIsModalVisible(false)}>
            Kh??ng
          </Button>
          <Button
            type="primary"
            danger
            onClick={typeRemove === "trash" ? clearItem : removeToCartHandler}
          >
            Xo??
          </Button>
        </div>
      </Modal>
    </li>
  );
}

export default CartItem;
