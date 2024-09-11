import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Menu from "../../../components/Menu/Menu";
import Search from "../../../components/Search/Search";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

  const user = useSelector((state) => state.user)
  const [userName, setUserName] = useState('')

  useEffect(()=> {
    setUserName(user?.hoTen)
  },[user?.hoTen])


  const navigate = useNavigate();
  const handleNavigateBuyProduct = () => {
    navigate('/product')
  }
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleNavigateCart = () => {
    if(user?.maTK){
      navigate('/order')
    }else {
      navigate('/sign-in')
    } 
  }

  const product = useSelector((state) => state?.product?.products);

  const ArraySplitName = userName.split(" ")
  const Name = ArraySplitName[ArraySplitName.length-1]

  const handleCheckSignIn = () => {
    handleNavigateCart();
  }

  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        {/* Menu */}
        <div className={styles.wrapperMenuAndContact}>
          <Menu />
          <span className={styles.contact}>{user&&user.soDienThoai}</span>
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
          <Search productList={product} />
          <FontAwesomeIcon icon={faShoppingCart} onClick={handleNavigateBuyProduct} />
          <FontAwesomeIcon icon={faBagShopping} onClick={handleCheckSignIn} />
          {Name ? (<span onClick={()=> {navigate('/profile-user/1')}}>Hi {Name} !</span>) : (<FontAwesomeIcon icon={faUser} onClick={handleNavigateLogin} />)}
        </div>
      </div>
    </header>
  );
};

export default Header;