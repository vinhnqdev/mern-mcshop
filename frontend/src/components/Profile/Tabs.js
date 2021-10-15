import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { userActions } from "../../app/userSlice";
function Tabs({ className }) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <ul className={className}>
      <li>
        <NavLink
          to="/profile/orders"
          activeClassName="activeNav"
          className="block w-full border-b border-gray-300 py-2"
        >
          Đơn hàng
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile/edit"
          activeClassName="activeNav"
          className="block w-full border-b border-gray-300 py-2"
        >
          Thông tin tài khoản
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile/logout"
          activeClassName="activeNav"
          className="block w-full border-b border-gray-300 py-2"
          onClick={handleLogout}
        >
          Đăng xuất
        </NavLink>
      </li>
    </ul>
  );
}

export default Tabs;
