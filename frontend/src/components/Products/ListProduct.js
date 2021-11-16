import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useRef } from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/components/navigation/navigation.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import Loading from "../UI/Loading";
import Product from "./Product";

// install Swiper modules
SwiperCore.use([Navigation, Autoplay]);
const ListProduct = ({ products, loading, title, buyButton }) => {
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
    <section>
      <h2 className="text-xl sm:text-2xl px-1 font-bold uppercase">{title}</h2>
      {loading && <Loading />}
      {!loading && products && (
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
            delay: 30000000,
            disableOnInteraction: false,
          }}
        >
          {products?.map(({ _id, images, name, discount, price, rating }) => (
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
      )}
    </section>
  );
};

export default ListProduct;
