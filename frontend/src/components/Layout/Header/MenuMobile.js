import { Collapse, Drawer } from "antd";
import { productsActions } from "app/productsSlice";
import React from "react";
import { Tabs } from "components/Common";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { capitalizeText } from "utils";

const MenuMobile = ({ visibleDrawer, onCloseDrawer }) => {
  const { Panel } = Collapse;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const categoryList = useSelector((state) => state.category.categoryList);
  const brandList = useSelector((state) => state.brand.brandList);

  return (
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
  );
};

export default MenuMobile;
