import React from 'react'
import styles from "./Products.module.scss"
import ProductsCategory from './ProductsCategory/ProductsCategory'
import ProductsOptions from './ProductsOptions/ProductsOptions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
const Products = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.wallpaper}/>
      <div className={styles.nav}>
        <p onClick={()=>navigate("/")} className={styles.navText}>Trang Chủ</p>
        <FontAwesomeIcon className={styles.navLink} icon={faChevronRight}/>
        <p  className={styles.navLink}>Sản Phẩm</p>
      </div>
      <div className={styles.mainPlace}>
        <ProductsCategory/>
        <ProductsOptions/>
      </div>
    </div>
  )
}

export default Products