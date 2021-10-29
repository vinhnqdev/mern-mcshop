import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../app/productThunk";
import Loading from "../UI/Loading";
import Product from "./Product";
import Carousel from "nuka-carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
const ListProduct = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [widthScreen, setWidthScreen] = useState(
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  );

  let slidesToShow = 2;
  if (widthScreen > 640) {
    slidesToShow = 3;
  }
  if (widthScreen > 768) {
    slidesToShow = 4;
  }
  if (widthScreen > 1024) {
    slidesToShow = 5;
  }

  useEffect(() => {
    const handleResize = () => {
      setWidthScreen(
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // dispatch async action to Thunk
    dispatch(getProducts());
  }, [dispatch]);

  const getControlsContainerStyles = (key) => {
    switch (key) {
      case "BottomCenter":
        return {
          bottom: -60,
        };
      default:
        return {
          backgroundColor: "blue",
        };
    }
  };

  const renderBottomCenterControls = ({ previousSlide, nextSlide }) => {
    return (
      <div className="flex items-center">
        <div className="p-2" onClick={previousSlide}>
          <ChevronLeftIcon className="h-7" />
        </div>
        <div className="p-2" onClick={nextSlide}>
          <ChevronRightIcon className="h-7" />
        </div>
      </div>
    );
  };

  return (
    <section>
      <h2 className="text-2xl font-bold uppercase">BEST SALLER</h2>
      {loading && <Loading />}
      {!loading && products && (
        <Carousel
          autoplay
          autoplayInterval={2000}
          wrapAround
          cellSpacing={20}
          slidesToShow={slidesToShow}
          renderCenterLeftControls={({ previousSlide }) => null}
          renderCenterRightControls={({ nextSlide }) => null}
          getControlsContainerStyles={getControlsContainerStyles}
          renderBottomCenterControls={renderBottomCenterControls}
          speed={100}
        >
          {products?.map(({ _id, images, name, discount, price, rating }) => (
            <Product
              key={_id}
              images={images}
              name={name}
              discount={discount}
              price={price}
              rating={rating}
              _id={_id}
            />
          ))}
        </Carousel>
      )}
    </section>
  );
};

export default ListProduct;
