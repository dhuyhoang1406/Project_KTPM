import PropTypes from 'prop-types';
import Header from '../../layouts/components/Header';
import styles from './DefaultLayout.module.scss';
import Footer from '../components/Footer';

function DefaultLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <div className={styles.content}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;