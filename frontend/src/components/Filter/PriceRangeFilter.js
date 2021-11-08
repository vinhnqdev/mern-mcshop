import { Slider } from "antd";
import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import FilterContext from "../../contexts/filter-context";
import { formatCurrency } from "../../helpers";
import { useHistory } from "react-router";
import queryString from "query-string";
const PriceRangeFilter = () => {
  const history = useHistory();
  const { minPriceRange, maxPriceRange, fixedMinPriceRange, fixedMaxPriceRange, filter, onFilter } =
    useContext(FilterContext);
  const { price_gte, price_lte } = filter;
  const max_price = Number(price_lte);
  const min_price = Number(price_gte);

  const handlePriceRange = ([price_gte, price_lte]) => {
    const changedFilter = {
      ...filter,
      price_gte,
      price_lte,
    };
    history.push({
      pathname: "/products",
      search: queryString.stringify(changedFilter),
    });
    onFilter(changedFilter);
  };
  return (
    <li className="relative z-30 uppercase text-sm py-3 flex items-center cursor-pointer group">
      Giá
      <ChevronDownIcon className="h-4" />
      <div className="absolute left-0 top-full border border-black bg-white w-60 px-3 py-4 space-y-3 transform transition scale-y-0 origin-top group-hover:scale-y-100">
        <div className="text-center">
          {min_price && max_price
            ? `${formatCurrency(min_price, "vi-VN", "VND")} - ${formatCurrency(
                max_price,
                "vi-VN",
                "VND"
              )}`
            : `${formatCurrency(minPriceRange, "vi-VN", "VND")} - ${formatCurrency(
                maxPriceRange,
                "vi-VN",
                "VND"
              )}`}
        </div>
        <Slider
          range
          defaultValue={
            min_price && max_price ? [min_price, max_price] : [minPriceRange, maxPriceRange]
          }
          onAfterChange={handlePriceRange}
          min={fixedMinPriceRange || minPriceRange}
          max={fixedMaxPriceRange || maxPriceRange}
          step={10000}
          tooltipVisible={false}
        />
      </div>
    </li>
  );
};

export default PriceRangeFilter;
