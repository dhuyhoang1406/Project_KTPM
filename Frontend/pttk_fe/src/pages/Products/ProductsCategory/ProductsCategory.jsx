import React, { useEffect, useState } from "react";
import styles from "./ProductsCategory.module.scss";
import Category from "./Category/Category";
import * as ProductSerVice from "../../../services/ProductService";
import { useDispatch } from "react-redux";
import {
  setBrandSelected,
  setCapacitySelected,
  setConcentrationSelected,
  setPriceSelected,
} from "../../../redux/slides/sortSlide";
// import { setBrandVar, setCapacityVar, setConcentrationVar } from '../constants/constants';

const ProductsCategory = () => {
  const [listTypeProduct, setListTypeProduct] = useState([]);
  const dispatch = useDispatch();

  const fetchAPIcategory = async () => {
    try {
      const res = await ProductSerVice.getProductType();
      if (res?.data?.content) {
        const arrayAfterFetchAPI = res.data.content.map(
          (element) => element.tenLoaiSanPham
        );
        setListTypeProduct(arrayAfterFetchAPI);
      }
    } catch (error) {
      console.log("Error fetching product type:", error);
    }
  };

  useEffect(() => {
    fetchAPIcategory();
  }, []);

  const handleBrandSelected = (value) => {
    dispatch(setBrandSelected(value));
  };

  const handleCapacitySelected = (value) => {
    dispatch(setCapacitySelected(value));
  };

  const handleConcentrationSelected = (value) => {
    dispatch(setConcentrationSelected(value));
  };

  const handlePrice = (value) => {
    dispatch(setPriceSelected(value));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.category}>
        <div className={styles.boxcategory}>
          <Category
            category={{ name: "Loại sản phẩm", values: listTypeProduct }}
            onSelect={handleBrandSelected}
          />
        </div>
        <div className={styles.boxcategory}>
          <Category
            category={{
              name: "Giá",
              values: ["Dưới 500.000đ", "500.000đ - 1.000.000đ", "1.000.000đ - 3.000.000đ", "Trên 3.000.000đ"],
            }}
            onSelect={handlePrice}
          />
        </div>
        <div className={styles.boxcategory}>
          <Category
            category={{
              name: "Thể Tích",
              values: [
                "500ML - 700ML",
                "700ML - 1000ML",
                "1000ML - 2000ML",
                "Trên 2000ML",
              ],
            }}
            onSelect={handleCapacitySelected}
          />
        </div>
        <div className={styles.boxcategory}>
          <Category
            category={{
              name: "Nồng Độ",
              values: ["Dưới 20", "20 - 40", "40 - 60", "Trên 60"],
            }}
            onSelect={handleConcentrationSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsCategory;
