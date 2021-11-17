import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { userActions } from "../../app/userSlice";
import {
  TableIcon,
  UserIcon,
  LogoutIcon,
  LocationMarkerIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";

export const Tabs = ({ onChange, mbScreen, isAdmin }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (onChange) {
      onChange();
    }

    dispatch(userActions.logout());
  };

  const handleTabChangeClick = () => {
    if (!onChange) return;
    onChange();
  };

  return (
    <ul>
      {mbScreen && isAdmin && (
        <>
          <li className="text-sm flex items-center border-b border-gray-300 py-2 space-x-2">
            <TableIcon className="h-6 w-6 text-yellow-500" />
            <NavLink
              to={`/admin/order-list`}
              activeClassName="activeNav"
              onClick={handleTabChangeClick}
              className="block w-full text-black hover:text-black"
            >
              Quản lý đơn hàng
            </NavLink>
          </li>
          <li className="text-sm flex items-center border-b border-gray-300 py-2 space-x-2">
            <TableIcon className="h-6 w-6 text-yellow-500" />
            <NavLink
              to={`/admin/product-list`}
              activeClassName="activeNav"
              onClick={handleTabChangeClick}
              className="block w-full text-black hover:text-black"
            >
              Quản lý sản phẩm
            </NavLink>
          </li>
          <li className="text-sm flex items-center border-b border-gray-300 py-2 space-x-2">
            <TableIcon className="h-6 w-6 text-yellow-500" />
            <NavLink
              to={`/admin/user-list`}
              activeClassName="activeNav"
              onClick={handleTabChangeClick}
              className="block w-full text-black hover:text-black"
            >
              Quản lý khách hàng
            </NavLink>
          </li>
        </>
      )}

      <li className="text-sm flex items-center border-b border-gray-300 py-2 space-x-2">
        <TableIcon className="h-6 w-6 text-yellow-500" />
        <NavLink
          to={`/profile/orders`}
          activeClassName="activeNav"
          onClick={handleTabChangeClick}
          className="block w-full text-black hover:text-black"
        >
          Đơn hàng của tôi
        </NavLink>
      </li>
      <li className="text-sm flex items-center border-b border-gray-300 py-2 space-x-2">
        <UserIcon className="h-6 w-6 text-yellow-500" />
        <NavLink
          to={`/profile/edit`}
          activeClassName="activeNav"
          onClick={handleTabChangeClick}
          className="block w-full text-black hover:text-black"
        >
          Thông tin tài khoản
        </NavLink>
      </li>
      <li className="text-sm flex items-center border-b border-gray-300 py-2 space-x-2">
        <LocationMarkerIcon className="h-6 w-6 text-yellow-500" />
        <NavLink
          to={`/profile/address`}
          activeClassName="activeNav"
          onClick={handleTabChangeClick}
          className="block w-full text-black hover:text-black"
        >
          Sổ địa chỉ
        </NavLink>
      </li>

      <li className="text-sm flex items-center border-b border-gray-300 py-2 space-x-2">
        <AnnotationIcon className="h-6 w-6 text-yellow-500" />
        <NavLink
          to={`/profile/reviews`}
          activeClassName="activeNav"
          onClick={handleTabChangeClick}
          className="block w-full text-black hover:text-black"
        >
          Nhận xét hàng đã mua
        </NavLink>
      </li>

      <li className="text-sm flex items-center py-2 space-x-2">
        <LogoutIcon className="h-6 w-6 text-yellow-500" />
        <NavLink
          to={`/profile/logout`}
          activeClassName="activeNav"
          className="block w-full text-black hover:text-black"
          onClick={handleLogout}
        >
          Đăng xuất
        </NavLink>
      </li>
    </ul>
  );
};
