import { Alert, Drawer, Rate } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Review from "./Review";
import Button from "components/UI/Button";

const ReviewList = ({ reviewList = [], averageRating, totalReview }) => {
  const { product } = useSelector((state) => state.productDetails);
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  );

  // Get current Window width
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };
  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  return (
    <div className="mt-8">
      <div className="block mb-5 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <h2 className="uppercase text-lg font-bold lg:font-medium lg:text-xl mb-0">
          Đánh giá của khách hàng
        </h2>
        {product.reviews.length !== 0 && (
          <Button
            className="mc_button mc_button--secondary mc_button--pos-tl mc_button--round-md px-3 py-2 font-medium"
            onClick={showDrawer}
          >
            Xem tất cả bình luận
          </Button>
        )}
      </div>

      {reviewList.length === 0 && <Alert message="Chưa có đánh giá nào" type="warning" showIcon />}
      {reviewList && reviewList.length !== 0 && (
        <div className="space-x-3 mb-5">
          <Rate defaultValue={averageRating} disabled allowHalf className="ant-custom-rating" />
          <span className="text-sm">Dựa trên {totalReview} reviews</span>
        </div>
      )}

      <ul className="space-y-7 md:space-y-0 grid grid-cols-1 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {reviewList.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </ul>

      <Drawer
        title="Reviews"
        placement="right"
        // className="drawer-width"
        contentWrapperStyle={{
          fontFamily: "'Montserrat', sans-serif",
          width: screenWidth > 768 ? 768 : "100%",
        }}
        onClose={onCloseDrawer}
        visible={visibleDrawer}
      >
        <ul className="space-y-7">
          {product.reviews.map((review) => (
            <Review review={review} key={review._id} />
          ))}
        </ul>
      </Drawer>
    </div>
  );
};

export default ReviewList;
