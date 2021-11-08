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
  const { filter, onFilter } = useContext(FilterContext);
  const { sort, order } = filter;

  let sortCheckbox = `${sort}.${order}`;

  const handleSort = (_id) => {
    const [sort, order] = _id.split(".");
    const changedfilter =
      _id === sortCheckbox
        ? {
            ...filter,
            sort: undefined,
            order: undefined,
          }
        : {
            ...filter,
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
    <li className="relative z-30 uppercase text-sm py-3 flex items-center cursor-pointer group">
      {getSortTitle(sortList, sortCheckbox)}
      <ChevronDownIcon className="h-4" />
      <div className="absolute right-0 top-full border border-black bg-white w-56 px-3 py-4 space-y-3 transform transition scale-y-0 origin-top group-hover:scale-y-100">
        {sortList.map((sort) => (
          <div className="relative" key={sort._id}>
            <div
              className={`absolute left-0 top-0 w-5 h-5 rounded-sm border border-black transition duration-500 ${
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
              className="absolute z-10 w-5 h-5 opacity-0 cursor-pointer"
            />
            <label htmlFor={`filter-sort-${sort._id}`} className="ml-6 text-xs cursor-pointer">
              {sort.name}
            </label>
          </div>
        ))}
      </div>
    </li>
  );
};

export default SortBy;
