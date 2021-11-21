import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingPlaceHolder from "./LoadingPlaceHolder";

function Slider() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = () => {
    setLoaded(true);
  };

  return (
    <div className="hidden sm:block">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div style={{ width: "100%", aspectRatio: "4/1", overflow: "hidden" }}>
            {!loaded && <LoadingPlaceHolder extraStyles={{ width: "100%", height: "100%" }} />}
            <img
              className="w-full object-cover"
              onLoad={handleLoaded}
              src="/images/slide1.jpeg"
              alt="slide1"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ width: "100%", aspectRatio: "4/1", overflow: "hidden" }}>
            {!loaded && <LoadingPlaceHolder extraStyles={{ width: "100%", height: "100%" }} />}
            <img
              className="w-full object-cover"
              onLoad={handleLoaded}
              src="/images/slide2.jpeg"
              alt="slide2"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ width: "100%", aspectRatio: "4/1", overflow: "hidden" }}>
            {!loaded && <LoadingPlaceHolder extraStyles={{ width: "100%", height: "100%" }} />}
            <img
              className="w-full object-cover"
              onLoad={handleLoaded}
              src="/images/slide3.jpeg"
              alt="slide3"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
