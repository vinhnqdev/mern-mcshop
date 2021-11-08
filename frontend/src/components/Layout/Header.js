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
import { useSelector } from "react-redux";
import { Button, Drawer } from "antd";
import SearchTop from "./SearchTop";
import MainNav from "./MainNav";
import { Collapse } from "antd";

const { Panel } = Collapse;

const Header = () => {
  const history = useHistory();
  const firstRender = useRef(true);
  let timerIdRef = useRef();
  const [isShownCartNotification, setIsShownCartNotification] = useState(false);
  const { user } = useSelector((state) => state.user.current);
  const cart = useSelector((state) => state.cart.cart);
  const messageAction = useSelector((state) => state.cart.messageAction);

  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [visibleSearchTop, setVisibleSearchTop] = useState(false);

  const cartQuantity = cart.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

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

  return (
    <header className="fixed z-50 top-0 left-0 right-0 bg-black text-white flex items-center justify-between px-7 h-20 md:h-24">
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
          <span
            className="cursor-pointer hover:underline hidden md:inline-block"
            onClick={() => history.push("/profile/edit")}
          >
            Hello {user.name}
          </span>
        )}
        {!user && (
          <div className="hidden md:block">
            <UserIcon
              className="h-11 p-2 bg-white rounded-full text-black cursor-pointer"
              onClick={() => history.push("/login")}
            />
          </div>
        )}

        <div>
          <SearchIcon
            onClick={showSearchTop}
            className="bg-white rounded-full text-black cursor-pointer p-2 h-11"
          />
        </div>

        <div className="relative flex items-center p-1 h-full">
          <ShoppingCartIcon
            className={`h-11 rounded-full bg-white text-black cursor-pointer p-2 transition transform ${
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
        title={
          !user ? (
            <Button
              type="primary"
              onClick={() => {
                history.push("/login");
                onCloseDrawer();
              }}
            >
              Đăng nhập
            </Button>
          ) : (
            <div>
              <p>Xin chào {user.name}</p>
              <Button
                onClick={() => {
                  history.push("/profile/edit");
                  onCloseDrawer();
                }}
                type="primary"
              >
                Go to profile
              </Button>
            </div>
          )
        }
        placement="left"
        contentWrapperStyle={{
          fontFamily: "'Montserrat', sans-serif",
          width: "100%",
        }}
        onClose={onCloseDrawer}
        visible={visibleDrawer}
      >
        <Collapse
          accordion
          ghost={true}
          bordered={false}
          style={{ backgroundColor: "#fff" }}
          expandIconPosition="right"
        >
          <Panel header={<h3 className="m-0 uppercase font-semibold text-lg">Sản phẩm</h3>} key="1">
            <ul className="">
              <li>
                <a className="uppercase text-md font-semibold block py-3 px-5 text-black" href="">
                  Điện thoại
                </a>
              </li>
              <li>
                <a className="uppercase text-md font-semibold block py-3 px-5 text-black" href="">
                  Máy tính
                </a>
              </li>
              <li>
                <a className="uppercase text-md font-semibold block py-3 px-5 text-black" href="">
                  Headphone
                </a>
              </li>
              <li>
                <a className="uppercase text-md font-semibold block py-3 px-5 text-black" href="">
                  Đồng hồ
                </a>
              </li>
            </ul>
          </Panel>

          <Panel
            header={<h3 className="m-0 uppercase font-semibold text-lg">Thương hiệu</h3>}
            key="2"
          >
            <ul className="">
              <li>
                <a className="uppercase text-md font-semibold block py-3 px-5 text-black" href="">
                  Apple
                </a>
              </li>
              <li>
                <a className="uppercase text-md font-semibold block py-3 px-5 text-black" href="">
                  SENNHEISER
                </a>
              </li>
              <li>
                <a className="uppercase text-md font-semibold block py-3 px-5 text-black" href="">
                  Sony
                </a>
              </li>
              <li>
                <a className="uppercase text-md font-semibold block py-3 px-5 text-black" href="">
                  Samsung
                </a>
              </li>
              <li>
                <a className="uppercase text-md font-semibold block py-3 px-5 text-black" href="">
                  XIAOMI
                </a>
              </li>
            </ul>
          </Panel>
        </Collapse>
      </Drawer>

      <SearchTop onClose={onCloseSearchTop} visible={visibleSearchTop} />
    </header>
  );
};

export default Header;
