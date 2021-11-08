import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import FilterContext from "../../contexts/filter-context";
import queryString from "query-string";
import { useHistory } from "react-router";
const BrandFilter = () => {
  const history = useHistory();
  const brandList = useSelector((state) => state.brand.brandList);
  const { onFilter, filter } = useContext(FilterContext);
  const { brand } = filter;

  let brandCheckbox = brand || undefined;

  const handleFilterBrand = (_id) => {
    const changedfilter =
      _id === brandCheckbox
        ? {
            ...filter,
            brand: undefined,
          }
        : {
            ...filter,
            brand: _id,
          };

    const queries = queryString.stringify(changedfilter);

    history.push({
      pathname: "/products",
      search: queries,
    });
    onFilter(changedfilter);
  };
  return (
    <li className="relative z-30 uppercase text-sm py-3 flex items-center cursor-pointer group">
      Thương hiệu
      <ChevronDownIcon className="h-4" />
      <div className="absolute left-0 top-full border border-black bg-white w-56 px-3 py-4 space-y-3 transform transition scale-y-0 origin-top group-hover:scale-y-100">
        {brandList.map((brand) => (
          <div className="relative" key={brand._id}>
            <div
              className={`absolute left-0 top-0 w-5 h-5 rounded-sm border border-black transition duration-500 ${
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
              className="absolute z-10 w-5 h-5 opacity-0 cursor-pointer"
            />
            <label htmlFor={`filter-brand-${brand._id}`} className="ml-6 text-xs cursor-pointer">
              {brand.name}
            </label>
          </div>
        ))}
      </div>
    </li>
  );
};

export default BrandFilter;
