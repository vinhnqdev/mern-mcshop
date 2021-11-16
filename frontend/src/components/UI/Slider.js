import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

function Slider() {
  return (
    <div className="hidden sm:block">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img className="w-full object-cover" src="/images/slide1.jpeg" alt="slide1" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full object-cover" src="/images/slide2.jpeg" alt="slide2" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full object-cover" src="/images/slide3.jpeg" alt="slide3" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
