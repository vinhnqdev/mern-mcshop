import React, { useState } from "react";

function PaymentMethod({ onCheckPaymentMethod, defaultPayment }) {
  const [paymentMethod, setPaymentMethod] = useState(defaultPayment);

  const paymentMethodData = [
    {
      method: "cod",
      label: "Trả tiền mặt khi nhận hàng",
    },
    {
      method: "visa",
      label: "Thanh toán qua thẻ visa",
    },
  ];

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    onCheckPaymentMethod(method);
  };

  return (
    <div className="md:col-span-4 mt-8">
      <h3 className="uppercase font-bold text-3xl">Phương thức thanh toán</h3>
      <div className="bg-white shadow-xl mt-7 p-4 space-y-3">
        {paymentMethodData.map((checkbox) => (
          <div className="relative" key={checkbox.method}>
            <div className="absolute left-0 p-1 top-0 w-5 h-5 rounded-sm border border-black">
              <span
                className={`${paymentMethod === checkbox.method && "block w-full h-full bg-black"}`}
              ></span>
            </div>
            <input
              className="absolute z-10 w-5 h-5 opacity-0 cursor-pointer"
              type="radio"
              checked={paymentMethod === checkbox.method}
              onChange={() => handlePaymentMethod(checkbox.method)}
              id={checkbox.method}
            />

            <label htmlFor={checkbox.method} className="ml-6 cursor-pointer">
              {checkbox.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentMethod;
