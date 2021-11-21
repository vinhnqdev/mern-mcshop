import { SearchIcon, ShoppingCartIcon, ViewListIcon } from "@heroicons/react/solid";
import { userDetail } from "app/userThunk";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import AddToCartMessage from "./AddToCartMessage";
import LeftHeader from "./LeftHeader";
import Logo from "./Logo";
import MainNav from "./MainNav";
import MenuMobile from "./MenuMobile";
import ProfileDropDown from "./ProfileDropdown";
import RightHeader from "./RightHeader";
import SearchTop from "./SearchTop";

const Header = () => {
  const [isShownCartNotification, setIsShownCartNotification] = useState(false);
  const [cartIsHightlighted, setCartIsHightLighted] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleSearchTop, setVisibleSearchTop] = useState(false);
  let timerIdRef = useRef();
  const firstMessageRender = useRef(true);
  const firstHighlightedCartRender = useRef(true);

  const history = useHistory();

  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  const { cart, messageAction } = useSelector((state) => state.cart);

  const cartQuantity = cart.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  // Fetch user Detail
  useEffect(() => {
    if (token && !user) {
      dispatch(userDetail());
    }
  }, [dispatch, token, user]);

  // Show message addToCart
  useEffect(() => {
    if (firstMessageRender.current) {
      firstMessageRender.current = false;
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
    }, 2000);
  }, [cart, messageAction]);

  // SHow highlighted Cart Icon
  useEffect(() => {
    if (firstHighlightedCartRender.current) {
      firstHighlightedCartRender.current = false;
      return;
    }
    if (cart.length === 0) return;
    setCartIsHightLighted(true);
    const timer = setTimeout(() => {
      setCartIsHightLighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cart]);

  const handleCloseMenu = () => {
    setVisibleMenu(false);
  };
  const showMenu = () => {
    setVisibleMenu(true);
  };
  const handleCloseSearchTop = () => {
    setVisibleSearchTop(false);
  };
  const showSearchTop = () => {
    setVisibleSearchTop(true);
  };

  return (
    <header className="header">
      <LeftHeader>
        <ViewListIcon onClick={showMenu} className="w-6 h-6 mr-3 cursor-pointer md:hidden" />
        <Logo />
        <MainNav />
      </LeftHeader>
      {/* Login and Cart */}
      <RightHeader>
        <ProfileDropDown user={user} />
        <SearchIcon onClick={showSearchTop} className="rounded-icon" />
        <div className="relative flex items-center h-full">
          <ShoppingCartIcon
            className={clsx("rounded-icon transition transform", {
              "animate-scaleUp": cartIsHightlighted,
            })}
            onClick={() => history.push("/cart")}
          />

          {/** Cart items quantity */}
          <span className="absolute -right-1 top-4 md:top-6 flex items-center justify-center text-black text-xs font-semibold w-5 h-5 rounded-full bg-yellow-400">
            {cartQuantity}
          </span>

          <AddToCartMessage isShown={isShownCartNotification} onShow={setIsShownCartNotification} />
        </div>
      </RightHeader>

      <MenuMobile visibleDrawer={visibleMenu} onCloseDrawer={handleCloseMenu} />
      <SearchTop onClose={handleCloseSearchTop} visible={visibleSearchTop} />
    </header>
  );
};

export default Header;
