import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import { userActions } from "../../app/userSlice";
function Tabs({ className }) {
  const dispatch = useDispatch();
  const routerMatch = useRouteMatch();
  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <ul className={className}>
      <li>
        <NavLink
          to={`${routerMatch.path}/orders`}
          activeClassName="activeNav"
          className="block w-full border-b border-gray-300 py-2"
        >
          Đơn hàng
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${routerMatch.path}/edit`}
          activeClassName="activeNav"
          className="block w-full border-b border-gray-300 py-2"
        >
          Thông tin tài khoản
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${routerMatch.path}/logout`}
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
