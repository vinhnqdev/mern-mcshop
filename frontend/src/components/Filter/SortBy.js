import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import queryString from "query-string";
import FilterContext from "../../contexts/filter-context";

const sortList = [
  { _id: "price.asc", name: "Giá (thấp đến cao)" },
  { _id: "price.desc", name: "Giá (cao đến thấp)" },
];

const getSortTitle = (sortList, _id) => {
  const sort = sortList.find((sort) => sort._id === _id);
  if (!sort) return "Sắp xếp theo";
  return sort.name;
};

const SortBy = () => {
  const history = useHistory();
  const { queryObj, onFilter } = useContext(FilterContext);
  const { sort, order } = queryObj;

  let sortCheckbox = `${sort}.${order}`;

  const handleSort = (_id) => {
    const [sort, order] = _id.split(".");
    const changedfilter =
      _id === sortCheckbox
        ? {
            ...queryObj,
            sort: undefined,
            order: undefined,
          }
        : {
            ...queryObj,
            sort,
            order,
          };

    const queries = queryString.stringify(changedfilter);
    history.push({
      pathname: "/products",
      search: queries,
    });
    onFilter(changedfilter);
  };
  return (
    <>
      {sortList.map((sort) => (
        <div className="relative" key={sort._id}>
          <div
            className={`w-7 h-7 md:w-5 md:h-5 absolute left-0 top-0 rounded-sm border border-black transition duration-500 ${
              sortCheckbox === sort._id && "bg-black"
            } `}
          >
            {sort._id === sortCheckbox && <CheckIcon className="text-white" />}
          </div>
          <input
            id={`filter-sort-${sort._id}`}
            type="checkbox"
            checked={sort._id === sortCheckbox}
            onChange={() => handleSort(sort._id)}
            className="w-7 h-7 md:w-5 md:h-5 absolute left-0 z-10 opacity-0 cursor-pointer"
          />
          <div className="text-left">
            <label
              htmlFor={`filter-sort-${sort._id}`}
              className="ml-10 md:ml-7 block py-1 text-sm md:text-xs cursor-pointer"
            >
              {sort.name}
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default SortBy;
