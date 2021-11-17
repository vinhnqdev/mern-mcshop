import { CheckIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import FilterContext from "contexts/filter-context";
import queryString from "query-string";
import { useHistory } from "react-router";
const BrandFilter = () => {
  const history = useHistory();
  const brandList = useSelector((state) => state.brand.brandList);
  const { onFilter, queryObj } = useContext(FilterContext);
  const { brand } = queryObj;

  let brandCheckbox = brand || undefined;

  const handleFilterBrand = (_id) => {
    const changedfilter =
      _id === brandCheckbox
        ? {
            ...queryObj,
            brand: undefined,
          }
        : {
            ...queryObj,
            brand: _id,
          };

    const queries = queryString.stringify(changedfilter, { sort: false });

    history.push({
      pathname: "/products",
      search: queries,
    });
    onFilter(changedfilter);
  };
  return (
    <>
      {brandList.map((brand) => (
        <div className="relative" key={brand._id}>
          <div
            className={`w-7 h-7 md:w-5 md:h-5 absolute left-0 top-0 rounded-sm border border-black transition duration-500 ${
              brandCheckbox === brand._id && "bg-black"
            } `}
          >
            {brand._id === brandCheckbox && <CheckIcon className="text-white" />}
          </div>
          <input
            type="checkbox"
            id={`filter-brand-${brand._id}`}
            checked={brand._id === brandCheckbox}
            onChange={() => handleFilterBrand(brand._id)}
            className="w-7 h-7 md:w-5 md:h-5 absolute left-0 z-10 opacity-0 cursor-pointer"
          />
          <div className="text-left">
            <label
              htmlFor={`filter-brand-${brand._id}`}
              className="ml-10 md:ml-7 block py-1 text-sm md:text-xs cursor-pointer"
            >
              {brand.name}
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default BrandFilter;
