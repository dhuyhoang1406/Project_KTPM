import PropTypes from 'prop-types';
import styles from './MenuItemSidebar.module.scss';
import { NavLink, useParams } from 'react-router-dom';

function MenuItem({ title, isActive, onClick, to }) {
    const { feature } = useParams()
    // Use styles.menuItem for the 'menu-item' class and styles.active for the 'active' class
    const menuItemClass = `${styles.menuItem} ${isActive === feature ? styles.active : ''}`;

    return (
        <NavLink className={menuItemClass} onClick={onClick} to={to}>
            <span className={styles.title}>{title}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired, // Add propType for isActive
};

export default MenuItem;
