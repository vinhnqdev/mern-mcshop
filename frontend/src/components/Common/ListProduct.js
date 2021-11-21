import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useRef } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/components/navigation/navigation.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import { Product } from "./Product";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);
export const ListProduct = ({
  products,
  loading,
  title,
  buyButton,
  headerStyle,
  containerStyle,
}) => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const breakpoints = {
    380: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle} className="text-xl sm:text-2xl px-1 font-bold uppercase">
        {title}
      </h2>
      {/* {loading && <Loading />} */}
      {/* {!loading && products && ( */}
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={breakpoints}
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
      >
        {loading &&
          Array(5)
            .fill()
            .map((x, ind) => (
              <SwiperSlide key={ind}>
                <Product isSkeleton={true} buyButton={true} />
              </SwiperSlide>
            ))}

        {!loading &&
          products &&
          products?.map(({ _id, images, name, discount, price, rating }) => (
            <SwiperSlide key={_id}>
              <Product
                key={_id}
                images={images}
                name={name}
                discount={discount}
                price={price}
                rating={rating}
                _id={_id}
                buyButton={buyButton}
              />
            </SwiperSlide>
          ))}

        <div className="flex justify-center items-center mt-3">
          <div className="p-2 cursor-pointer" ref={navigationPrevRef}>
            <ChevronLeftIcon className="h-7" />
          </div>
          <div className="p-2 cursor-pointer" ref={navigationNextRef}>
            <ChevronRightIcon className="h-7" />
          </div>
        </div>
      </Swiper>
      {/* )} */}
    </div>
  );
};
