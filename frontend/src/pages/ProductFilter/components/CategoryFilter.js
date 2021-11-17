import { CheckIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import queryString from "query-string";
import FilterContext from "contexts/filter-context";
import { useHistory } from "react-router";
const CategoryFilter = () => {
  const history = useHistory();
  const categoryList = useSelector((state) => state.category.categoryList);

  const { onFilter, queryObj } = useContext(FilterContext);
  const { category } = queryObj;

  let categoryCheckbox = category || undefined;

  const handleFilterCategory = (_id) => {
    const changedfilter =
      _id === categoryCheckbox
        ? {
            ...queryObj,
            category: undefined,
          }
        : {
            ...queryObj,
            category: _id,
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
      {categoryList.map((category) => (
        <div className="relative" key={category._id}>
          <div
            className={`w-7 h-7 md:w-5 md:h-5 absolute left-0 top-0 rounded-sm border border-black transition duration-500 ${
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
            className="w-7 h-7 md:w-5 md:h-5 absolute left-0 z-10 opacity-0 cursor-pointer"
          />
          <div className="text-left">
            <label
              htmlFor={`filter-category-${category._id}`}
              className="ml-10 md:ml-7 text-sm md:text-xs block py-1 cursor-pointer"
            >
              {category.name}
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryFilter;
