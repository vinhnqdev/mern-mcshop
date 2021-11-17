import React, { useEffect, useRef, useState } from "react";

import {
  SearchIcon,
  UserIcon,
  ShoppingCartIcon,
  CheckIcon,
  XIcon,
  ViewListIcon,
} from "@heroicons/react/solid";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Dropdown } from "antd";
import SearchTop from "./SearchTop";
import MainNav from "./MainNav";
import { Collapse, Menu } from "antd";
import { Link } from "react-router-dom";
import { userActions } from "app/userSlice";
import { Tabs } from "components/Common";
import { productsActions } from "app/productsSlice";
import { capitalizeText } from "utils";
import { userDetail } from "app/userThunk";

const { Panel } = Collapse;

const Header = ({ hidden }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const firstRender = useRef(true);
  let timerIdRef = useRef();
  const [isShownCartNotification, setIsShownCartNotification] = useState(false);
  const { user, token } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart);
  const messageAction = useSelector((state) => state.cart.messageAction);
  const categoryList = useSelector((state) => state.category.categoryList);
  const brandList = useSelector((state) => state.brand.brandList);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [visibleSearchTop, setVisibleSearchTop] = useState(false);

  const cartQuantity = cart.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  useEffect(() => {
    if (token && !user) {
      dispatch(userDetail());
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (messageAction === "change" || messageAction === "remove") {
      return;
    }

    setIsShownCartNotification(true);
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }
    timerIdRef.current = setTimeout(() => {
      setIsShownCartNotification(false);
    }, 3000);
  }, [cart, messageAction]);

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  const onCloseSearchTop = () => {
    setVisibleSearchTop(false);
  };

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const showSearchTop = () => {
    setVisibleSearchTop(true);
  };

  console.log(categoryList);

  const menu = (
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

  const profileMenu = (
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

  return (
    <header
      className={`fixed z-1000 left-0 right-0 bg-black text-white flex items-center justify-between px-5 md:px-7 h-20 md:h-24 transition-all duration-700 ${
        hidden ? "-top-24" : "top-0"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center h-full">
        <ViewListIcon onClick={showDrawer} className="w-6 h-6 mr-3 cursor-pointer md:hidden" />
        <span
          className="text-xl inline-block sm:text-2xl md:text-3xl font-semibold cursor-pointer tracking-wider mr-5"
          onClick={() => history.push("/")}
        >
          MCSHOP
        </span>
        <MainNav />
      </div>
      {/* Login and Cart */}
      <div className="flex items-center space-x-3 self-stretch">
        {user && (
          <Dropdown overlay={profileMenu} placement="bottomCenter" arrow>
            <div className="hidden self-stretch md:flex items-center space-x-1 cursor-pointer">
              <img className="w-11 p-1 rounded-full" src="/images/avatar.png" alt="Avatar" />
              <span className="text-xs">{user.name}</span>
            </div>
          </Dropdown>
        )}

        {!user && (
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <div className="hidden md:block">
              <UserIcon className="h-11 p-2 bg-white rounded-full text-black cursor-pointer" />
            </div>
          </Dropdown>
        )}
        <div>
          <SearchIcon
            onClick={showSearchTop}
            className="bg-white rounded-full text-black cursor-pointer p-2 h-10"
          />
        </div>

        <div className="relative flex items-center p-1 h-full">
          <ShoppingCartIcon
            className={`h-10 rounded-full bg-white text-black cursor-pointer p-2 transition transform ${
              isShownCartNotification && "animate-scaleUp"
            }`}
            onClick={() => history.push("/cart")}
          />

          {/** Cart items quantity */}
          <span className="absolute right-0 top-4 md:top-6 flex items-center justify-center text-black text-xs font-semibold w-5 h-5 rounded-full bg-yellow-400">
            {cartQuantity}
          </span>

          {/**  Show Add to Cart Message */}
          {messageAction === "add" && (
            <div
              className={`absolute top-full right-0 w-72 space-y-2 bg-white shadow-md p-3 text-black transition transform ${
                isShownCartNotification ? "translate-x-0" : "translate-x-96"
              }`}
            >
              <div className="flex items-center gap-x-2">
                <CheckIcon className="h-6 w-6 p-1 rounded-full bg-yellow-300 text-white" />
                <div className="text-sm">Thêm vào giỏ hàng thành công</div>
                <XIcon
                  className="h-4 self-start cursor-pointer"
                  onClick={() => setIsShownCartNotification(false)}
                />
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
        </div>
      </div>
      <Drawer
        title={<h2 className="text-center uppercase">MCShop</h2>}
        placement="left"
        bodyStyle={{
          padding: 0,
        }}
        contentWrapperStyle={{
          fontFamily: "'Montserrat', sans-serif",
          width: "100%",
        }}
        onClose={onCloseDrawer}
        visible={visibleDrawer}
      >
        <Collapse
          accordion
          // ghost={true}
          bordered={false}
          style={{ backgroundColor: "#fff" }}
          expandIconPosition="right"
        >
          <Panel header={<h3 className="uppercase font-semibold">Thông tin tài khoản</h3>}>
            <Tabs onChange={onCloseDrawer} isAdmin={user?.isAdmin} mbScreen />
          </Panel>
          <Panel header={<h3 className="uppercase font-semibold">Sản phẩm</h3>} key="1">
            <ul>
              {categoryList.map((category) => (
                <li key={category._id}>
                  <Link
                    onClick={() => {
                      dispatch(
                        productsActions.setCategoryFilter({
                          category: category._id,
                        })
                      );
                      onCloseDrawer();
                    }}
                    to={`/products?category=${category._id}`}
                    className="flex items-center text-md font-normal py-2 text-black"
                  >
                    <img className="w-8" src={category.image} alt={category.name} />{" "}
                    <span className="ml-2">{capitalizeText(category.name)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel header={<h3 className="uppercase font-semibold">Thương hiệu</h3>} key="2">
            <ul>
              {brandList.map((brand) => (
                <li key={brand._id}>
                  <Link
                    onClick={() => {
                      dispatch(
                        productsActions.setBrandFilter({
                          brand: brand._id,
                        })
                      );
                      onCloseDrawer();
                    }}
                    to={`products?brand=${brand._id}`}
                    className="flex items-center text-md font-normal py-2 px-2 text-black"
                  >
                    <img className="w-7" src={brand.image} alt={brand.name} />{" "}
                    <span className="ml-2">{capitalizeText(brand.name)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        </Collapse>
      </Drawer>

      <SearchTop onClose={onCloseSearchTop} visible={visibleSearchTop} />
    </header>
  );
};

export default Header;
