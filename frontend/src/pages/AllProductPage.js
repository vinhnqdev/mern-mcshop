import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { getProducts } from "../app/productThunk";
import Filter from "../components/Filter/Filter";
import queryString from "query-string";
import { getCategoryList } from "../app/categoryThunk";
import { getBrandList } from "../app/brandThunk";
import { productsActions } from "../app/productsSlice";
import FilterListProduct from "../components/Filter/FilterListProduct";
import TagList from "../components/Filter/TagList";
import { formatCurrency } from "../helpers";
import { Pagination } from "antd";
import { FilterProvider } from "../contexts/filter-context";

const getTagList = (queryObj) => {
  const queryObjKeys = Object.keys(queryObj);
  const queryObjValues = Object.values(queryObj);

  // Case create a tag "Tất cả sản phẩm"
  if (queryObjKeys.length === 0) {
    return [
      {
        type: "all",
        title: " Tất cả sản phẩm",
      },
    ];
  }
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
              ? "Chưa có đánh giá"
              : `Từ ${queryObjValues[ratingGteIndex]} sao đến ${queryObjValues[ratingLteIndex]} sao`,
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

const AllProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const total = useSelector((state) => state.products.total);
  const filter = useSelector((state) => state.products.filter);
  const categoryList = useSelector((state) => state.category.categoryList);
  const brandList = useSelector((state) => state.brand.brandList);

  const { search } = useLocation();
  const queryObj = queryString.parse(search);
  const newQueryObj = removeObjectKeys(queryObj, "sort", "order");
  const tagList = getTagList(newQueryObj);

  useEffect(() => {
    if (!categoryList || !brandList) {
      dispatch(getCategoryList());
      dispatch(getBrandList());
    }
  }, [dispatch, categoryList, brandList]);

  // Fetch Product

  useEffect(() => {
    dispatch(getProducts({ ...filter, ...queryObj }));
  }, [dispatch, filter]);

  const clearFilter = () => {
    dispatch(productsActions.resetFilter());
  };

  const handlePagination = (page) => {
    dispatch(productsActions.setFilter({ ...filter, page }));
  };

  return (
    <section>
      <FilterProvider>
        <Filter filter={queryObj} />

        <TagList
          tagList={tagList}
          filter={queryObj}
          // onFilter={handleFilterProduct}
          onClearAllTag={clearFilter}
        />
      </FilterProvider>

      <FilterListProduct products={products} />

      {products.length !== 0 && (
        <Pagination
          style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
          defaultCurrent={1}
          current={filter.page}
          pageSize={filter.limit}
          total={total}
          onChange={handlePagination}
        />
      )}
    </section>
  );
};

export default AllProductPage;
