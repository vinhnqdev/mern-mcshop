import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";
import FilterContext from "../../contexts/filter-context";
import { useHistory } from "react-router";
const CategoryFilter = () => {
  const history = useHistory();
  const categoryList = useSelector((state) => state.category.categoryList);

  const { onFilter, filter } = useContext(FilterContext);
  const { category } = filter;

  let categoryCheckbox = category || undefined;

  const handleFilterCategory = (_id) => {
    const changedfilter =
      _id === categoryCheckbox
        ? {
            ...filter,
            category: undefined,
          }
        : {
            ...filter,
            category: _id,
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
      Sản phẩm
      <ChevronDownIcon className="h-4" />
      <div className="absolute left-0 top-full border border-black bg-white w-56 px-3 py-4 space-y-3 transform transition scale-y-0 origin-top group-hover:scale-y-100">
        {categoryList.map((category) => (
          <div className="relative" key={category._id}>
            <div
              className={`absolute left-0 top-0 w-5 h-5 rounded-sm border border-black transition duration-500 ${
                categoryCheckbox === category._id && "bg-black"
              } `}
            >
              {category._id === categoryCheckbox && <CheckIcon className="text-white" />}
            </div>
            <input
              type="checkbox"
              id={`filter-category-${category._id}`}
              checked={category._id === categoryCheckbox}
              onChange={() => handleFilterCategory(category._id)}
              className="absolute z-10 w-5 h-5 opacity-0 cursor-pointer"
            />
            <label
              htmlFor={`filter-category-${category._id}`}
              className="ml-6 text-xs cursor-pointer"
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </li>
  );
};

export default CategoryFilter;
