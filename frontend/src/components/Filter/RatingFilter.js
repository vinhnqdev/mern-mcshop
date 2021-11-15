import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import FilterContext from "../../contexts/filter-context";
import queryString from "query-string";
const ratingList = [
  { _id: "5to5", name: "5 sao" },
  { _id: "4to5", name: "4 đến 5 sao" },
  { _id: "3to4", name: "3 đến 4 sao" },
  { _id: "2to3", name: "2 đến 3 sao" },
  { _id: "1to2", name: "1 đến 2 sao" },
  { _id: "0to1", name: "Chưa đánh giá" },
];

const RatingFilter = () => {
  const history = useHistory();
  const { queryObj, onFilter } = useContext(FilterContext);
  const { rating_gte, rating_lte, rating } = queryObj;
  let ratingCheckbox = rating ? `${rating}to${rating}` : `${rating_gte}to${rating_lte}`;

  const handleRatingChange = (_id) => {
    const [rating_gte, rating_lte] = _id.split("to");

    const resetFilterRating = {
      rating: undefined,
      rating_gte: undefined,
      rating_lte: undefined,
    };

    let changedFilter;
    // Case "Chưa có đán giá" => rating=5
    if (rating_gte === "5" && rating_lte === "5") {
      changedFilter =
        ratingCheckbox === _id
          ? {
              ...queryObj,
              ...resetFilterRating,
            }
          : {
              ...queryObj,
              ...resetFilterRating,
              rating: rating_gte,
            };
    } else {
      changedFilter =
        ratingCheckbox === _id
          ? {
              ...queryObj,
              ...resetFilterRating,
            }
          : {
              ...queryObj,
              rating: undefined,
              rating_gte,
              rating_lte,
            };
    }

    const queries = queryString.stringify(changedFilter);
    history.push({
      pathname: "/products",
      search: queries,
    });
    onFilter(changedFilter);
  };
  return (
    <>
      {ratingList.map((rating) => (
        <div className="relative" key={rating._id}>
          {/** Custom Checkbox */}
          <div
            className={`w-7 h-7 md:w-5 md:h-5 absolute left-0 top-0 rounded-sm border border-black transition duration-500 ${
              ratingCheckbox === rating._id && "bg-black"
            } `}
          >
            {rating._id === ratingCheckbox && <CheckIcon className="text-white" />}
          </div>

          <input
            id={`filter-rating-${rating._id}`}
            type="checkbox"
            checked={rating._id === ratingCheckbox}
            onChange={() => handleRatingChange(rating._id)}
            className="w-7 h-7 md:w-5 md:h-5 absolute left-0 z-10 opacity-0 cursor-pointer"
          />
          <div className="text-left">
            <label
              htmlFor={`filter-rating-${rating._id}`}
              className="ml-10 md:ml-7 block py-1 text-sm md:text-xs cursor-pointer"
            >
              {rating.name}
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default RatingFilter;
