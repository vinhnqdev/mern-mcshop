import { Slider } from "antd";
import React, { useContext, useEffect, useState } from "react";
import FilterContext from "contexts/filter-context";
import { formatCurrency } from "utils";
import { useHistory } from "react-router";
import queryString from "query-string";
const PriceRangeFilter = () => {
  const history = useHistory();

  const {
    minPriceRange,
    maxPriceRange,
    fixedMinPriceRange,
    fixedMaxPriceRange,
    queryObj,
    onFilter,
  } = useContext(FilterContext);

  const [[minPrice, maxPrice], setPriceRange] = useState([minPriceRange, maxPriceRange]);

  useEffect(() => {
    if (!fixedMinPriceRange && !fixedMaxPriceRange) {
      setPriceRange([minPriceRange, maxPriceRange]);
    }
  }, [minPriceRange, maxPriceRange, fixedMinPriceRange, fixedMaxPriceRange]);

  const handleAfterChangePrice = ([price_gte, price_lte]) => {
    const changedFilter = {
      ...queryObj,
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
    <>
      <div className="text-center">
        {`${formatCurrency(minPrice, "vi-VN", "VND")} - ${formatCurrency(
          maxPrice,
          "vi-VN",
          "VND"
        )}`}
      </div>
      <Slider
        range
        onChange={(prices) => setPriceRange(prices)}
        value={[minPrice, maxPrice]}
        onAfterChange={handleAfterChangePrice}
        min={fixedMinPriceRange || minPriceRange}
        max={fixedMaxPriceRange || maxPriceRange}
        step={1}
        tooltipVisible={false}
      />
    </>
  );
};

export default PriceRangeFilter;
