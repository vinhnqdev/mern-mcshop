import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { userActions } from "../../app/userSlice";
import Loading from "../UI/Loading";

function UserAddressList({
  loading,
  userAddresses,
  isAddressBook,
  onRemove,
  onEdit,
  redirectAction,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const routeMatch = useRouteMatch();

  const handleShippingAddress = (_id) => {
    const address = userAddresses.find((address) => address._id === _id);
    if (!address) return;
    dispatch(
      userActions.updateAddress({
        address: address.userAddress,
        phone: address.phone,
        name: address.name,
        _id: address._id,
      })
    );
    history.push("/checkout/placeorder");
  };

  if (loading) {
    return <Loading />;
  }

  if (userAddresses.length === 0) {
    return <p>Bạn chưa có địa chỉ nào</p>;
  }

  return (
    <>
      <ul className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {userAddresses.map(({ _id, name, phone, userAddress, isDefault }) => (
          <li
            key={_id}
            className={`border px-3 rounded-md py-2 ${
              isDefault ? "border-green-900 border-dashed" : "border-gray-800 border-solid"
            }`}
          >
            <div className="flex items-center justify-between">
              <h5 className="font-semibold">{name}</h5>
              {isDefault && <span className="text-green-500 text-xs font-medium">Mặc định</span>}
            </div>
            <p className="text-sm">{userAddress}</p>
            <p className="text-sm">Điện thoại: {phone}</p>

            <div className="space-x-3 mt-2">
              {!isAddressBook && (
                <button
                  className={`text-sm text-white border border-transparent rounded-sm py-1 px-3 ${
                    isDefault ? "bg-yellow-400" : "bg-gray-600"
                  }`}
                  onClick={() => handleShippingAddress(_id)}
                >
                  Giao đến địa chỉ này
                </button>
              )}

              <button
                onClick={
                  redirectAction
                    ? () => history.push(`${routeMatch.path}/${_id}`)
                    : () => onEdit(_id)
                }
                className={`text-sm py-1 rounded-sm px-3 border border-gray-500`}
              >
                Sửa
              </button>
              {!isDefault && (
                <button
                  onClick={() => onRemove(_id)}
                  className={`text-sm py-1 rounded-sm px-3 border border-gray-500`}
                >
                  Xoá
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserAddressList;
