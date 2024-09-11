import React from 'react'
import styles from './HeaderOnly.module.scss'
import Header from '../Header';
import PropTypes from 'prop-types';

const HeaderOnly = ({children}) => {
  return (
    <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
  )
}

HeaderOnly.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderOnly