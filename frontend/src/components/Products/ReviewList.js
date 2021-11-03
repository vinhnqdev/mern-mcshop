import { Rate } from "antd";
import React from "react";
import Review from "./Review";

const Reviews = ({ reviewList = [], averageRating, totalReview }) => {
  console.log(reviewList);
  return (
    <div className="md:col-span-5">
      <h2 className="uppercase text-lg font-normal lg:font-medium lg:text-xl lg:mt-10">
        Review của khách hàng
      </h2>

      {reviewList.length === 0 && <p className="text-xs">Chưa có đánh giá</p>}
      {reviewList && reviewList.length !== 0 && (
        <div className="space-x-3 mb-7">
          <Rate defaultValue={averageRating} disabled allowHalf className="ant-custom-rating" />
          <span className="text-sm">Dựa trên {totalReview} reviews</span>
        </div>
      )}

      <ul className="space-y-7 md:space-y-0 grid grid-cols-1 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {reviewList.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
