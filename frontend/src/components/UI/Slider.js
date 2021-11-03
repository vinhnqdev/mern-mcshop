import React from "react";
import { Carousel } from "antd";

function Slider() {
  return (
    <Carousel style={{ marginBottom: "50px" }} autoplay autoplaySpeed={3000}>
      <div>
        <img className="w-full object-cover" src="/images/slide1.jpeg" alt="slide1" />
      </div>
      <div>
        <img className="w-full object-cover" src="/images/slide2.jpeg" alt="slide2" />
      </div>
      <div>
        <img className="w-full object-cover" src="/images/slide3.jpeg" alt="slide3" />
      </div>
    </Carousel>
  );
}

export default Slider;
