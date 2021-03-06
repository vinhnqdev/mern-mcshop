import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import queryString from "query-string";
import { getCategoryList } from "app/categoryThunk";
import { getBrandList } from "app/brandThunk";

import { formatCurrency } from "utils";
import { AutoComplete, Collapse, Drawer, Pagination } from "antd";
import FilterContext from "contexts/filter-context";
import { productsActions } from "app/productsSlice";
import { AdjustmentsIcon, ArrowNarrowRightIcon } from "@heroicons/react/solid";

import FilterListProduct from "./components/FilterListProduct";
import TagList from "./components/TagList";
import SortBy from "./components/SortBy";
import Filter from "./components/Filter";
import CategoryFilter from "./components/CategoryFilter";
import BrandFilter from "./components/BrandFilter";
import PriceRangeFilter from "./components/PriceRangeFilter";
import RatingFilter from "./components/RatingFilter";

const getTagList = (queryObj) => {
  const queryObjKeys = Object.keys(queryObj);
  const queryObjValues = Object.values(queryObj);

  const allowedKeyArray = [
    "brand",
    "category",
    "price_gte",
    "price_lte",
    "rating",
    "rating_gte",
    "rating_lte",
  ];
  const isAllow = queryObjKeys.every((query) => allowedKeyArray.includes(query));
  if (!isAllow) return [];

  if (
    !queryObjKeys.includes("price_gte") &&
    !queryObjKeys.includes("price_lte") &&
    !queryObjKeys.includes("rating_gte") &&
    !queryObjKeys.includes("rating_lte")
  ) {
    return queryObjKeys.map((key, index) => ({
      type: key,
      title: key === "rating" ? `${queryObjValues[index]} sao` : queryObjValues[index],
    }));
  }

  const tagList = queryObjKeys
    .map((key, index) => ({
      type: key,
      title: key === "rating" ? `${queryObjValues[index]} sao` : queryObjValues[index],
    }))
    .filter(
      (tag) =>
        tag.type !== "price_gte" &&
        tag.type !== "price_lte" &&
        tag.type !== "rating_gte" &&
        tag.type !== "rating_lte"
    );

  const priceGteIndex = queryObjKeys.findIndex((queryKey) => queryKey === "price_gte");
  const priceLteIndex = queryObjKeys.findIndex((queryKey) => queryKey === "price_lte");
  const ratingLteIndex = queryObjKeys.findIndex((queryKey) => queryKey === "rating_lte");
  const ratingGteIndex = queryObjKeys.findIndex((queryKey) => queryKey === "rating_gte");

  const ratingTagObj =
    ratingLteIndex !== -1 && ratingGteIndex !== -1
      ? {
          type: "rating",
          title:
            queryObjValues[ratingGteIndex] === "0" && queryObjValues[ratingLteIndex] === "1"
              ? "Ch??a c?? ????nh gi??"
              : `T??? ${queryObjValues[ratingGteIndex]} sao ?????n ${queryObjValues[ratingLteIndex]} sao`,
        }
      : undefined;

  const priceTagObj =
    priceGteIndex !== -1 && priceLteIndex !== -1
      ? {
          type: "price",
          title: `${formatCurrency(
            Number(queryObjValues[priceGteIndex]),
            "vi-VN",
            "VND"
          )} - ${formatCurrency(Number(queryObjValues[priceLteIndex]), "vi-VN", "VND")}`,
        }
      : undefined;

  if (!priceTagObj && ratingTagObj) {
    return [...tagList, ratingTagObj];
  }

  if (!ratingTagObj && priceTagObj) {
    return [...tagList, priceTagObj];
  }

  return [...tagList, priceTagObj, ratingTagObj];
};

const removeObjectKeys = (obj, ...keys) => {
  const newObj = { ...obj };
  const checkIsInVaidKeys = keys.every((key) => obj[key] === undefined);
  if (checkIsInVaidKeys) return newObj;

  keys.forEach((key) => {
    delete newObj[key];
  });

  return newObj;
};

const getTitleList = (obj, categories, brands, products, firstRender) => {
  if (products.length === 0 && !firstRender) {
    return [{ id: "notFound", title: "Not Found" }];
  }
  const objKeys = Object.keys(obj);

  const newObjKeys = objKeys.filter((objKey) => objKey === "brand" || objKey === "category");
  if (newObjKeys.length === 0) {
    return [{ id: "all", title: "T???t c??? s???n ph???m" }];
  }
  const objValues = newObjKeys.map((key) => obj[key]);

  return newObjKeys.map((key, index) => ({
    id: objValues[index],
    title:
      key === "category"
        ? categories.find((category) => category._id === objValues[index])?.name
        : brands.find((brand) => brand._id === objValues[index])?.name,
  }));
};

const AllProductPage = () => {
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.products.filter);
  const { page, limit } = filter;
  const {
    products,
    total,
    firstRender,
    searchSuggestions,
    onSearch,
    onSelect,
    minPriceRange,
    maxPriceRange,
  } = useContext(FilterContext);
  const categoryList = useSelector((state) => state.category.categoryList);
  const brandList = useSelector((state) => state.brand.brandList);

  const [visibleFilterDrawer, setVisibleFilterDrawer] = useState(false);
  const { search } = useLocation();

  const order = ["category", "brand"];
  const queryObj = queryString.parse(search, {
    sort: (a, b) => order.indexOf(a) - order.indexOf(b),
  });

  const newQueryObj = removeObjectKeys(queryObj, "sort", "order");
  const tagList = getTagList(newQueryObj);
  const titleList = getTitleList(queryObj, categoryList, brandList, products, firstRender);

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getBrandList());
  }, [dispatch]);

  const handlePagination = (page) => {
    dispatch(productsActions.setFilter({ ...filter, page }));
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between mb-5">
        <ul className="flex flex-wrap items-center justify-center mb-2">
          {titleList.map((title, index) => (
            <li className="flex items-center" key={title.id}>
              <p className="uppercase bg-yellow-300 text-xl font-medium md:text-3xl md:font-semibold m-0">
                {title.title}
              </p>

              {index !== titleList.length - 1 && <span className="w-2 h-2 mx-2 bg-black rounded" />}
            </li>
          ))}
          <span className="ml-3 text-gray-600 self-end">{`[${total}]`}</span>
        </ul>

        <AdjustmentsIcon
          className="w-8 h-8 self-start md:hidden"
          onClick={() => setVisibleFilterDrawer(true)}
        />

        <div className="hidden md:block">
          <AutoComplete
            autoFocus
            dropdownClassName="autocomplete-dropdown"
            style={{ width: 250 }}
            notFoundContent="Kh??ng t??m th???y k???t qu???"
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder=" T??m ki???m s???n ph???m"
          >
            {searchSuggestions.map((product) => (
              <AutoComplete.Option key={product._id} value={product._id}>
                <div className="space-x-3">
                  <div className="w-10 h-10 inline-block">
                    <img
                      className="w-full h-full object-cover"
                      src={product.images[0]}
                      alt={product.name}
                    />
                  </div>
                  <div className="inline-block">
                    <p className="mb-0">{product.name}</p>
                    <p className="mb-0">{formatCurrency(product.price, "vi-VN", "VND")}</p>
                  </div>
                </div>
              </AutoComplete.Option>
            ))}
          </AutoComplete>
        </div>
      </div>

      <Filter />

      <TagList tagList={tagList} />

      <FilterListProduct />

      {products.length !== 0 && (
        <Pagination
          style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
          defaultCurrent={1}
          current={page}
          pageSize={limit}
          total={[total]}
          onChange={handlePagination}
        />
      )}

      <Drawer
        title={
          <h2 className="uppercase text-2xl flex items-center">
            L???c theo <AdjustmentsIcon className="h-7 ml-2" />{" "}
          </h2>
        }
        placement="right"
        headerStyle={{
          padding: "16px 16px",
        }}
        bodyStyle={{
          padding: 0,
        }}
        contentWrapperStyle={{
          fontFamily: "'Montserrat', sans-serif",
          width: "100%",
        }}
        onClose={() => setVisibleFilterDrawer(false)}
        visible={visibleFilterDrawer}
      >
        <Collapse
          style={{ backgroundColor: "#fff" }}
          accordion
          expandIconPosition="right"
          bordered={false}
        >
          <Collapse.Panel header={<h2 className="uppercase font-semibold">S???n ph???m</h2>}>
            <div className="space-y-2">
              <CategoryFilter />
            </div>
          </Collapse.Panel>
          <Collapse.Panel header={<h2 className="uppercase font-semibold">Th????ng hi???u</h2>}>
            <div className="space-y-2">
              <BrandFilter />
            </div>
          </Collapse.Panel>
          {((minPriceRange && maxPriceRange) || minPriceRange !== maxPriceRange) && (
            <Collapse.Panel header={<h2 className="uppercase font-semibold">Gi??</h2>}>
              <div className="max-w-sm mx-auto">
                <PriceRangeFilter />
              </div>
            </Collapse.Panel>
          )}

          <Collapse.Panel header={<h2 className="uppercase font-semibold">????nh gi??</h2>}>
            <div className="space-y-2">
              <RatingFilter />
            </div>
          </Collapse.Panel>
          <Collapse.Panel header={<h2 className="uppercase font-semibold">S???p x???p theo</h2>}>
            <div className="space-y-2">
              <SortBy />
            </div>
          </Collapse.Panel>
        </Collapse>

        <div
          onClick={() => setVisibleFilterDrawer(false)}
          className="fixed left-0 px-4 right-0 bottom-5 bg-black flex items-center justify-between"
        >
          <button className="text-white py-4 uppercase font-semibold">{`??p d???ng (${total})`}</button>
          <ArrowNarrowRightIcon className="h-6 text-white" />
        </div>
      </Drawer>
    </section>
  );
};

export default AllProductPage;
