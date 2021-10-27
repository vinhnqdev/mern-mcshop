import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../app/productThunk";
import Loading from "../UI/Loading";
import Product from "./Product";
const ListProduct = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  console.log(products);

  useEffect(() => {
    // dispatch async action to Thunk
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section>
      <h2 className="text-2xl font-bold uppercase">BEST SALLER</h2>
      {loading && <Loading />}
      {!loading && products && (
        <ul className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
        </ul>
      )}
    </section>
  );
};

export default ListProduct;
