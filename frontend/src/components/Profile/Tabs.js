import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import { userActions } from "../../app/userSlice";
import { TableIcon, UserIcon, LogoutIcon, LocationMarkerIcon } from "@heroicons/react/solid";
function Tabs({ className }) {
  const dispatch = useDispatch();
  const routerMatch = useRouteMatch();
  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <ul className={className}>
      <li className="text-sm lg:text-base flex items-center border-b border-gray-300 py-2 space-x-2">
        <TableIcon className="h-6 w-6 text-yellow-500" />
        <NavLink
          to={`${routerMatch.path}/orders`}
          activeClassName="activeNav"
          className="block w-full"
        >
          Đơn hàng
        </NavLink>
      </li>
      <li className="text-sm lg:text-base flex items-center border-b border-gray-300 py-2 space-x-2">
        <UserIcon className="h-6 w-6 text-yellow-500" />
        <NavLink
          to={`${routerMatch.path}/edit`}
          activeClassName="activeNav"
          className="block w-full"
        >
          Thông tin tài khoản
        </NavLink>
      </li>
      <li className="text-sm lg:text-base flex items-center border-b border-gray-300 py-2 space-x-2">
        <LocationMarkerIcon className="h-6 w-6 text-yellow-500" />
        <NavLink
          to={`${routerMatch.path}/address`}
          activeClassName="activeNav"
          className="block w-full"
        >
          Sổ địa chỉ
        </NavLink>
      </li>
      <li className="text-sm lg:text-base flex items-center border-b border-gray-300 py-2 space-x-2">
        <LogoutIcon className="h-6 w-6 text-yellow-500" />
        <NavLink
          to={`${routerMatch.path}/logout`}
          activeClassName="activeNav"
          className="block w-full"
          onClick={handleLogout}
        >
          Đăng xuất
        </NavLink>
      </li>
    </ul>
  );
}

export default Tabs;
