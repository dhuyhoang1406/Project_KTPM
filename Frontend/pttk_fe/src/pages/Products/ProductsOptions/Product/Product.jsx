import React from "react";
import styles from "./Product.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPercent,
  faWineBottle,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button/Button";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageInfoWrapper}>
        <img src={product.anhMinhHoa} alt="ảnh" className={styles.image} />
        <div>
          <div className={styles.info}>
            <FontAwesomeIcon
              icon={faWineBottle}
              style={{ width: "2rem", height: "2rem" }}
              color="#9b8a66"
            />
            <p>{product.theTich}</p>
          </div>
          <div className={styles.info}>
            <FontAwesomeIcon
              icon={faPercent}
              style={{ width: "2rem", height: "2rem" }}
              color="#9b8a66"
            />
            <p>{product.nongDoCon}</p>
          </div>
          <div className={styles.info}>
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ width: "2rem", height: "2rem" }}
              color="#9b8a66"
            />
            <p>{product.xuatXu}</p>
          </div>
        </div>
      </div>
      <p className={styles.name}>{product.tenSP}</p>
      <div className={styles.order}>
        <p className={styles.price}>{product.gia}</p>
        <Button
          onClick={() => {
            navigate(`/product-details/${product.maSP}`)
          }}
          primary
          className={styles.orderButton}
        >
          Mua Ngay
        </Button>
      </div>
    </div>
  );
};
export default Product;
