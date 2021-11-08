import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList } from "../../app/categoryThunk";
import { Link } from "react-router-dom";
import { getBrandList } from "../../app/brandThunk";
import { useHistory } from "react-router-dom";
import { productsActions } from "../../app/productsSlice";

const MainNav = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.category.categoryList);
  const brandList = useSelector((state) => state.brand.brandList);
  const history = useHistory();

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getBrandList());
  }, [dispatch]);

  return (
    <ul className="hidden md:flex items-center m-0 space-x-3 h-full ">
      <li className="uppercase h-full flex items-center font-normal p-1 m-3 cursor-pointer relative group">
        Sản phẩm
        <div className="absolute left-0 top-16 w-full scale-x-0 transition origin-left transform h-0.5 bg-white group-hover:scale-x-100"></div>
        {/** Subnav */}
        <ul className="absolute -left-1 transform transition origin-top scale-y-0 group-hover:scale-y-100 top-full bg-white w-60 shadow-md py-3">
          {categoryList.map((category) => (
            <li key={category._id}>
              <Link
                to={`/products?category=${category._id}`}
                onClick={() =>
                  dispatch(
                    productsActions.setCategoryFilter({
                      category: category._id,
                    })
                  )
                }
                className="uppercase text-md font-semibold block py-3 px-5 text-black"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      <li className="uppercase h-full flex items-center font-normal p-1 m-3 cursor-pointer relative group">
        Thương hiệu
        <div className="absolute top-16 left-0 w-full scale-x-0 transition origin-left transform h-0.5 bg-white group-hover:scale-x-100"></div>
        {/** Subnav */}
        <ul className="absolute -left-1 transform transition origin-top scale-y-0 group-hover:scale-y-100 top-full bg-white w-60 shadow-md py-3">
          {brandList.map((brand) => (
            <li key={brand._id}>
              <Link
                to={`/products?brand=${brand._id}`}
                className="uppercase text-md font-semibold block py-3 px-5 text-black"
                onClick={() =>
                  dispatch(
                    productsActions.setBrandFilter({
                      brand: brand._id,
                    })
                  )
                }
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
