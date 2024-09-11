import React, { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import {
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";
import MenuItem from "./MenuItem/MenuItem";
import { useSelector } from "react-redux";
// import * as ProductService from '../../services/ProductService'

const Menu = () => {
  const user = useSelector(state => state.user)

  console.log(user.id)
//  const [menuData, setmenuData] = useState([])

//  const fetchApi = async () => {
//   const res = await ProductService.getProductType()
//   if(res?.data?.content){
//     setmenuData(res?.data?.content)
//   }
//  }

//  useEffect(()=> {
//   fetchApi()
//  },[])

const menuData = [
  {
    title:'Home',
    path:'/'
  },
  {
    title:'Products',
    path:'/product'
  },
  {
    title: 'Profile',
    path: user && user.maTK ? '/profile-user/1' : '/sign-in'
}
]

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = isOpen ? "hidden" : "visible";
  }, [isOpen]);

  const handleMenuClick = () => {
    setIsOpen(true);
  };

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const handleWrapperIconCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div
        className={`${styles.iconMenu} ${isOpen ? styles.open : ""}`}
        onClick={handleMenuClick}
      >
        <FontAwesomeIcon icon={faBars} />
        <span className={styles.textMenuIcon}>MENU</span>
      </div>

      {isOpen && (
        <div className={styles.overlayMenu} onClick={handleOverlayClick}></div>
      )}

      <div className={`${styles.mainMenu} ${isOpen ? styles.open : ""}`}>
        <div
          className={styles.wrapperIconClose}
          onClick={handleWrapperIconCloseClick}
        >
          <FontAwesomeIcon icon={faTimes} className={styles.iconClose}  />
        </div>
        <ul className={styles.overlayMenuList}>
          {menuData.map((item) => (
            // <li key={index} className={styles.overlayMenuItem}>
            //   <Link to={item.to} className={styles.overlayMenuLink}>
            //     <span className={styles.textTypeMenu}>{item.title}</span>
            //     <FontAwesomeIcon
            //       icon={item.icon}
            //       className={styles.iconRight}
            //     />
            //   </Link>
            // </li>
            <MenuItem key={item.title} to={item.path} title={item.title}  />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
