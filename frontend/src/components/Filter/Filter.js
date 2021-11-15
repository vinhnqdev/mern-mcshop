import React, { useContext } from "react";
import CategoryFilter from "./CategoryFilter";
import BrandFilter from "./BrandFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import RatingFilter from "./RatingFilter";
import SortBy from "./SortBy";
import FilterContext from "../../contexts/filter-context";
import FilterItem from "./FilterItem";

// const filterItems = [
//   {
//     id: "category",
//     title: "Sản phẩm",
//   },
//   {
//     id: "brand",
//     title: "Thương hiệu",
//   },
//   {
//     id: "priceRange",
//     title: "Giá",
//   },
//   {
//     id: "rating",
//     title: "Đánh giá",
//   },
//   {
//     id: "sortBy",
//     title: "Sắp xếp theo",
//   },
// ];

const Filter = () => {
  const { minPriceRange, maxPriceRange } = useContext(FilterContext);

  // const filterRef = useRef();
  // const [sticky, setSticky] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > filterRef.current.offsetTop - 20) {
  //       setSticky(true);
  //     } else {
  //       setSticky(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div
      className={`hidden md:flex bg-white w-full items-center justify-between mb-3 border-t border-b`}
    >
      <div>
        <ul className="flex items-center mb-0">
          <FilterItem title="Sản phẩm">
            <CategoryFilter />
          </FilterItem>
          <FilterItem title="Thương hiệu">
            <BrandFilter />
          </FilterItem>
          {((minPriceRange && maxPriceRange) || minPriceRange !== maxPriceRange) && (
            <FilterItem title="Giá">
              <PriceRangeFilter />
            </FilterItem>
          )}
          <FilterItem title="Đánh giá">
            <RatingFilter />
          </FilterItem>
        </ul>
      </div>
      <div>
        <ul className="mb-0">
          <FilterItem title="Sắp xếp theo" rtl>
            <SortBy />
          </FilterItem>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
