import React, { useEffect, useRef, useState, useCallback } from "react";
import productApi from "api/productApi";
import { Product } from "components/Common";
import Loading from "components/UI/Loading";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1);
          }
        },
        {
          threshold: 1,
        }
      );
      if (node) {
        observer.current.observe(node);
      }
      console.log(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);
    productApi
      .get({
        page,
        limit: 2,
        category: "61762482f924b4fbf5493f56",
      })
      .then(({ data }) => {
        const {
          products,
          pagination: { page, total, limit },
        } = data;
        const pageSize = Math.ceil(total / limit);

        setProducts((prevState) => {
          return [...prevState, ...products];
        });
        setHasMore(page < pageSize);
        setLoading(false);
      });
  }, [page]);

  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map(({ _id, images, name, price, discount, rating }, index) => {
          if (products.length === index + 1) {
            return (
              <Product
                ref={lastProductElementRef}
                key={_id}
                _id={_id}
                images={images}
                name={name}
                price={price}
                discount={discount}
                rating={rating}
              />
            );
          } else {
            return (
              <Product
                key={_id}
                _id={_id}
                images={images}
                name={name}
                price={price}
                discount={discount}
                rating={rating}
              />
            );
          }
        })}
      </ul>
      {loading && <Loading />}
    </>
  );
};

export default CategoryPage;
