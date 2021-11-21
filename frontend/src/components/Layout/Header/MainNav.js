import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBrandList } from "app/brandThunk";
import { getCategoryList } from "app/categoryThunk";
import { productsActions } from "app/productsSlice";
import Linear from "components/UI/Linear";

const MainNav = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.categoryList);
  const brandList = useSelector((state) => state.brand.brandList);

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getBrandList());
  }, [dispatch]);

  return (
    <ul className="hidden md:flex md:items-center m-0 h-full">
      <li className="main-nav__item">
        Sản phẩm
        <Linear />
        {/** Subnav */}
        <ul className="absolute top-full left-0 w-60 bg-white shadow-md md:rounded-sm py-3 transition transform origin-top scale-y-0 group-hover:scale-y-100">
          {categoryList.map((category) => (
            <li key={category._id}>
              <Link
                to={`/products?category=${category._id}`}
                className="uppercase text-md font-semibold block py-3 px-5 text-black"
                onClick={() =>
                  dispatch(productsActions.setCategoryFilter({ category: category._id }))
                }
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      <li className="main-nav__item">
        Thương hiệu
        <Linear />
        <ul className="absolute top-full left-0 w-60 bg-white shadow-md md:rounded-sm py-3 transition transform origin-top scale-y-0 group-hover:scale-y-100">
          {brandList.map((brand) => (
            <li key={brand._id}>
              <Link
                to={`/products?brand=${brand._id}`}
                className="uppercase text-md font-semibold block py-3 px-5 text-black"
                onClick={() => dispatch(productsActions.setBrandFilter({ brand: brand._id }))}
              >
                {brand.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default MainNav;
