import React, { useState } from "react";
import styles from "./Category.module.scss";
import { useSelector } from "react-redux";

const Category = ({ category, onSelect }) => {
  const { brandSelected, capacitySelected, concentrationSelected, PriceSelected } = useSelector((state) => state.sort);

  const [activeValue, setActiveValue] = useState(null);

  const handleClick = (value) => {
    setActiveValue(value);
    onSelect(value);
  };

  return (
    <div className={styles.dropdownBox}>
      <div className={styles.brand}>{category.name}</div>
      <div className={styles.options}>
        {category.values.map((value, index) => {
          let isActive =
            brandSelected === value ||
            capacitySelected === value ||
            concentrationSelected === value ||
            PriceSelected === value
          return (
            <p
              key={index}
              className={`${styles.option} ${isActive ? styles.active : ""}`}
              onClick={() => handleClick(value)}
            >
              {value}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
