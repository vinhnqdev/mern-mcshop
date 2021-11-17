import { Alert } from "antd";
import { useContext } from "react";
import FilterContext from "contexts/filter-context";
import { Product } from "components/Common";

const FilterListProduct = () => {
  const { products } = useContext(FilterContext);

  if (products.length === 0) {
    return (
      <Alert
        type="warning"
        showIcon
        message="Tiếc quá, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn"
      />
    );
  }

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid:cols-4 lg:grid-cols-5">
      {products.map(({ _id, images, name, price, discount, rating, searchView }) => (
        <Product
          key={_id}
          _id={_id}
          images={images}
          name={name}
          price={price}
          discount={discount}
          rating={rating}
        />
      ))}
    </ul>
  );
};

export default FilterListProduct;
