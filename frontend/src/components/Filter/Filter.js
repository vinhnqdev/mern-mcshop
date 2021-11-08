import React from "react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import RatingFilter from "./RatingFilter";
import SortBy from "./SortBy";

const Filter = () => {
  // console.log(fixedMinPriceRange, fixedMaxPriceRange);

  // let defaultValues;
  // if (min_price && max_price) {
  //   console.log("USE QUERY STRING");
  //   defaultValues = [min_price, max_price];
  // } else {
  //   console.log("USE DEFAULT");
  //   defaultValues = [minPriceRange, maxPriceRange];
  // }
  // console.log(defaultValues);

  return (
    <div className="flex items-center justify-between">
      {/** Filter */}
      <div>
        <ul className="flex items-center space-x-4">
          <CategoryFilter />
          <BrandFilter />
          <PriceRangeFilter />
          <RatingFilter />
        </ul>
      </div>

      {/** Sort*/}
      <div>
        <ul>
          <SortBy />
        </ul>
      </div>
    </div>
  );
};

export default Filter;
