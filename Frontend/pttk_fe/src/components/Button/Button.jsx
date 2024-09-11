import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

function Button({
    to,
    href,
    disabled = false,
    primary = false,
    small = false,
    large = false,
    children,
    className,
    onClick,
    style,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    // Loại bỏ event listener khi nút bị vô hiệu hóa
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = [
        styles.wrapper,
        className,
        small && styles.small,
        primary && styles.primary,
        large && styles.large,
    ].filter(Boolean).join(' ');

    return (
        <Comp style={style} className={classes} {...props}>
            <span className={styles.title}>{children}</span>
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    primary: PropTypes.bool,
    large: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;