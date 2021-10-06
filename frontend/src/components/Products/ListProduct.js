import React from "react";
import productsData from "../../assets/data/products";
import Product from "./Product";

const ListProduct = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold uppercase">BEST SALLER</h2>
      <ul className="grid grid-cols-2 gap-x-2 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {productsData.map((product) => (
          <Product
            key={product._id}
            image={product.image}
            name={product.name}
            discount={product.discount}
            price={product.price}
            rating={product.rating}
          />
        ))}
      </ul>
    </section>
  );
};

export default ListProduct;
