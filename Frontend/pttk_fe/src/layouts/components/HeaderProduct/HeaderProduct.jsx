import React from "react";
import styles from "./HeaderProduct.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "../../../components/Menu/Menu";
import { useNavigate } from "react-router-dom";

const HeaderProduct = () => {

  const navigate = useNavigate();
  const handleNavigateBuyProduct = () => {
    navigate('/product')
  }
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleNavigateCart = () => {
    navigate('/order')
  }


  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        {/* Menu */}
        <div className={styles.wrapperMenuAndContact}>
          <Menu />
          <span className={styles.contact}>+0242348454</span>
        </div>
        {/* logo */}
        <a href="/" className={styles.logo}>
          <img
            className={styles.logoTori}
            src="https://png.pngtree.com/png-clipart/20220713/ourmid/pngtree-torii-gate-png-image_5939481.png"
            alt="Logo ruou"
          />
          <span className={styles.textLogoTori}>dekanta</span>
        </a>
        {/* Social Network, cart, favourite and Login */}
        <div className={styles.actions}>
          <a href="/product">
            <FontAwesomeIcon icon={faShoppingCart} onClick={handleNavigateBuyProduct} />
          </a>
          <FontAwesomeIcon icon={faBagShopping} onClick={handleNavigateCart} />
          <FontAwesomeIcon icon={faUser} onClick={handleNavigateLogin}  />
        </div>
      </div>
    </header>
  );
};

export default HeaderProduct;
