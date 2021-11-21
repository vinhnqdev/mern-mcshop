import { CheckIcon, XIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const AddToCartMessage = ({ isShown, onShow }) => {
  const messageAction = useSelector((state) => state.cart.messageAction);
  const history = useHistory();
  return (
    <>
      {messageAction === "add" && (
        <div
          className={clsx(
            "absolute top-full right-0 w-72 space-y-2 bg-white shadow-md p-3 text-black transition transform",
            {
              "translate-x-0": isShown,
              "translate-x-96": !isShown,
            }
          )}
        >
          <div className="flex items-center gap-x-2">
            <CheckIcon className="h-6 w-6 p-1 rounded-full bg-yellow-300 text-white" />
            <div className="text-sm">Thêm vào giỏ hàng thành công</div>
            <XIcon className="h-4 self-start cursor-pointer" onClick={() => onShow(false)} />
          </div>
          <button
            className="border-black uppercase text-xs font-semibold border-2 w-full cursor-pointer text-center py-2 rounded-md transition duration-500 hover:bg-black hover:text-white"
            onClick={() => history.push("/cart")}
          >
            Xem giỏ hàng và thanh toán
          </button>

          <div className="triangle-up"></div>
        </div>
      )}
    </>
  );
};

export default AddToCartMessage;
