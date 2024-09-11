import PropTypes from 'prop-types';
import styles from './StaffLayout.module.scss';
import StaffHeader from '../components/Staff/StaffHeader/StaffHeader';

function StaffLayout({ children }) {
    return (
        <div className={styles.wrapper}>
            <StaffHeader />
            <div className={styles.container}>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    );
}

StaffLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StaffLayout;