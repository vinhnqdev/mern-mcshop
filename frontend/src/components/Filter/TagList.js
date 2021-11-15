import { Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import { useHistory } from "react-router";
import { useContext } from "react";
import FilterContext from "../../contexts/filter-context";
import { productsActions } from "../../app/productsSlice";
const getCategoryName = (id, categoryList) => {
  const category = categoryList.find((category) => category._id === id);
  if (category) return category.name;
};

const getBrandName = (id, brandList) => {
  const brand = brandList.find((brand) => brand._id === id);
  if (brand) return brand.name;
};

const convertTagList = (tagList, categoryList, brandList) => {
  if (tagList && categoryList.length !== 0 && brandList.length !== 0) {
    return tagList.map((tag) => {
      if (tag.type === "category") {
        return {
          ...tag,
          title: getCategoryName(tag.title, categoryList),
        };
      }
      if (tag.type === "brand") {
        return {
          ...tag,
          title: getBrandName(tag.title, brandList),
        };
      }
      return tag;
    });
  }
};

const TagList = ({ tagList }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const categoryList = useSelector((state) => state.category.categoryList);
  const brandList = useSelector((state) => state.brand.brandList);
  const newTagList = convertTagList(tagList, categoryList, brandList);
  const { queryObj, onFilter, onResetPriceRange } = useContext(FilterContext);

  const handleCloseTag = (tag) => {
    const newFilter = { ...queryObj };

    if (tag.type === "price") {
      newFilter.price_gte = undefined;
      newFilter.price_lte = undefined;
      onResetPriceRange();
    } else if (tag.type === "rating") {
      newFilter.rating_gte = undefined;
      newFilter.rating_lte = undefined;
      newFilter.rating = undefined;
    } else {
      newFilter[tag.type] = undefined;
    }

    const queries = queryString.stringify({ ...newFilter });
    history.push({
      pathname: "/products",
      search: queries,
    });
    onFilter(newFilter);
  };

  const handleClearAllTag = () => {
    history.push({
      pathname: "/products",
      search: queryString.stringify({}),
    });
    onResetPriceRange();
    dispatch(productsActions.resetFilter());
  };

  return (
    <ul className="flex flex-wrap items-center">
      {newTagList?.map((tag, index) => (
        <li key={index} className="mb-2">
          <Tag closable={tag.type !== "all"} visible={true} onClose={() => handleCloseTag(tag)}>
            {tag.title.toUpperCase()}
          </Tag>
        </li>
      ))}

      {newTagList?.length !== 0 && (
        <li className="ml-3 mb-2">
          <span
            onClick={handleClearAllTag}
            className="text-sm cursor-pointer underline hover:text-white hover:bg-black"
          >
            Clear All
          </span>
        </li>
      )}
    </ul>
  );
};

export default TagList;
