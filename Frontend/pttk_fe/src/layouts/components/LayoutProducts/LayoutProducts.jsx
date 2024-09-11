import React from 'react'
import styles from './LayoutProducts.module.scss'
import PropTypes from 'prop-types';
import Footer from '../Footer'
import HeaderProduct from '../HeaderProduct';

const LayoutProducts = ({children}) => {
  return (
    <div className={styles.wrapper}>
            <HeaderProduct />
            <div className={styles.container}>
                <div className={styles.content}>{children}</div>
            </div>
            <Footer />
        </div>
  )
}

LayoutProducts.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LayoutProducts