import { UserIcon } from "@heroicons/react/solid";
import { Dropdown, Menu } from "antd";
import { userActions } from "app/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ user }) => {
  const dispatch = useDispatch();

  const renderMenu = (user) => {
    if (!user) {
      return (
        <Menu>
          <Menu.Item key={1}>
            <Link style={{ padding: "5px 10px" }} to="/login">
              Đăng nhập
            </Link>
          </Menu.Item>
          <Menu.Item key={2}>
            <Link style={{ padding: "5px 10px" }} to="/register">
              Đăng kí
            </Link>
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu>
          {user?.isAdmin && (
            <>
              <Menu.Item key={1}>
                <Link style={{ padding: "5px 10px" }} to="/admin/product-list">
                  Quản lý sản phẩm
                </Link>
              </Menu.Item>
              <Menu.Item key={2}>
                <Link style={{ padding: "5px 10px" }} to="/admin/order-list">
                  Quản lý đơn hàng
                </Link>
              </Menu.Item>
              <Menu.Item key={3}>
                <Link style={{ padding: "5px 10px" }} to="/admin/user-list">
                  Quản lý người dùng
                </Link>
              </Menu.Item>
            </>
          )}
          {user?.isAdmin && <Menu.Divider />}
          <Menu.Item key={4}>
            <Link style={{ padding: "5px 10px" }} to="/profile/orders">
              Đơn hàng
            </Link>
          </Menu.Item>
          <Menu.Item key={5}>
            <Link style={{ padding: "5px 10px" }} to="/profile/edit">
              Thông tin tài khoản
            </Link>
          </Menu.Item>
          <Menu.Item key={6}>
            <Link style={{ padding: "5px 10px" }} to="/profile/address">
              Sổ địa chỉ
            </Link>
          </Menu.Item>
          <Menu.Item key={7}>
            <Link style={{ padding: "5px 10px" }} to="/profile/reviews">
              Nhận xét hàng đã mua
            </Link>
          </Menu.Item>
          <Menu.Item key={8}>
            <Link
              onClick={() => dispatch(userActions.logout())}
              style={{ padding: "5px 10px" }}
              to="/profile/logout"
            >
              Đăng xuất
            </Link>
          </Menu.Item>
        </Menu>
      );
    }
  };

  return (
    <>
      {user ? (
        <Dropdown overlay={renderMenu(user)} placement="bottomCenter" arrow>
          <div className="hidden self-stretch md:flex items-center space-x-1 cursor-pointer">
            <img className="w-11 p-1 rounded-full" src="/images/avatar.png" alt="Avatar" />
            <span className="text-xs">{user.name}</span>
          </div>
        </Dropdown>
      ) : (
        <Dropdown overlay={renderMenu(user)} placement="bottomRight" arrow>
          <div className="hidden md:flex items-center md:h-full">
            <UserIcon className="rounded-icon" />
          </div>
        </Dropdown>
      )}
    </>
  );
};

export default ProfileDropdown;
