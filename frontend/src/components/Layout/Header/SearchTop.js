import { LoadingOutlined } from "@ant-design/icons";
import { XIcon } from "@heroicons/react/solid";
import { Drawer, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import productApi from "api/productApi";
import { Product } from "components/Common";

const loadingIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

function SearchTop({ onClose, visible }) {
  const [searchInput, setSearchInput] = useState("");
  const [productList, setProductList] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const timeoutId = useRef();
  const inputRef = useRef();

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearchInput(e.target.value);
    if (!search) {
      setProductList([]);
      return;
    }

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(() => {
      setSearchLoading(true);
      productApi
        .get({ search: search })
        .then((res) => {
          setSearchLoading(false);
          setProductList(res.data.products);
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

  useEffect(() => {
    if (visible) {
      inputRef.current.focus();
    }
  }, [visible]);

  return (
    <Drawer
      placement="top"
      contentWrapperStyle={{
        fontFamily: "'Montserrat', sans-serif",
        width: "100%",
        height: "72vh",
        // height: "auto",
        position: "unset",
      }}
      headerStyle={{
        display: "none",
      }}
      visible={visible}
    >
      <div className="max-w-xl mx-auto p-4 flex items-center space-x-10">
        <form className="relative flex-1">
          <input
            className="w-full font-mont outline-none text-gray-900  text-sm py-2 border-b border-gray-400"
            type="text"
            placeholder="Nh???p t??? kho??"
            value={searchInput}
            onChange={handleSearchChange}
            ref={inputRef}
          />
          {searchInput !== "" && (
            <XIcon className="w-5 h-5 absolute right-0 top-2" onClick={handleClearSearchProduct} />
          )}
        </form>
        <span onClick={handleCloseSearchInput} className="text-black underline cursor-pointer">
          ????NG
        </span>
      </div>

      {/** search Product List */}
      {searchLoading && (
        <Spin indicator={loadingIcon} style={{ width: "100%", marginTop: "30px" }} />
      )}
      {!searchLoading && productList && productList.length === 0 && (
        <p className="uppercase text-center mt-8">Kh??ng t??m th???y k???t qu???</p>
      )}
      {!searchLoading && productList && productList.length !== 0 && (
        <p className="uppercase text-center mt-8">{productList.length} k???t qu??? t??m ki???m</p>
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
            searchTerm={searchInput}
            onClick={onClose}
          />
        ))}
      </ul>
    </Drawer>
  );
}

export default SearchTop;
