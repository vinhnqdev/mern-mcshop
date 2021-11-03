import { Drawer } from "antd";
import React, { useRef, useState } from "react";
import productApi from "../../api/productApi";
import Product from "../Products/Product";
import { XIcon } from "@heroicons/react/solid";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

function SearchTop({ onClose, visible }) {
  const [searchInput, setSearchInput] = useState("");
  const [productList, setProductList] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const timeoutId = useRef();
  const inputRef = useRef();

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchInput(e.target.value);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setSearchLoading(true);
      productApi
        .get({ search })
        .then((res) => {
          setSearchLoading(false);
          setProductList(res.data);
        })
        .catch((err) => {
          setSearchLoading(false);
          console.log(err.message);
        });
    }, 450);
  };

  const handleClearSearchProduct = () => {
    setSearchInput("");
    setProductList(null);
    inputRef.current.focus();
  };

  const handleCloseSearchInput = () => {
    onClose();
    handleClearSearchProduct();
  };

  return (
    <Drawer
      title="Reviews"
      placement="top"
      contentWrapperStyle={{
        fontFamily: "'Montserrat', sans-serif",
        width: "100%",
        height: "70vh",
        // height: "auto",
        position: "unset",
      }}
      headerStyle={{
        display: "none",
      }}
      visible={visible}
    >
      <div className="max-w-xl mx-auto px-4 py-4 flex items-center space-x-10">
        <form className="relative flex-1">
          <input
            className="w-full font-mont outline-none text-gray-900  text-sm py-2 border-b border-gray-400"
            type="text"
            placeholder="Nhập từ khoá"
            value={searchInput}
            onChange={handleSearchChange}
            ref={inputRef}
          />
          {searchInput !== "" && (
            <XIcon className="w-5 h-5 absolute right-0 top-2" onClick={handleClearSearchProduct} />
          )}
        </form>
        <span onClick={handleCloseSearchInput} className="text-black underline cursor-pointer">
          ĐÓNG
        </span>
      </div>

      {/** search Product List */}
      {searchLoading && <Spin indicator={antIcon} style={{ width: "100%", marginTop: "30px" }} />}
      {!searchLoading && productList && productList.length === 0 && (
        <p className="uppercase text-center mt-8">Không tìm thấy kết quả</p>
      )}
      {!searchLoading && productList && productList.length !== 0 && (
        <p className="uppercase text-center mt-8">{productList.length} kết quả tìm kiếm</p>
      )}
      <ul className="max-w-xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4">
        {productList?.map(({ _id, images, name, price, discount, rating }) => (
          <Product
            key={_id}
            _id={_id}
            images={images}
            name={name}
            price={price}
            discount={discount}
            rating={rating}
            searchView
          />
        ))}
      </ul>
    </Drawer>
  );
}

export default SearchTop;
