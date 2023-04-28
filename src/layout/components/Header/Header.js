import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
const cx = classNames.bind(styles);
function Header() {
    const [changeBg, setChangeBg] = useState(false);
    const scrollTrigger = 60;
    window.onscroll = () => {
        if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
            setChangeBg(true);
        } else {
            setChangeBg(false);
        }
    };
    return (
        <header className={cx('wrapper', { changeBg })}>
            <div className={cx('inner')}>
                <Link to="/">
                    <div className={cx('logo-wrapper')}>
                        <img src="https://geekup.vn/Icons/geekup-logo-general.svg" className={cx('logo')} alt="logo" />
                    </div>
                </Link>
                <div className={cx('nav-list')}>
                    <NavLink className={(nav) => cx('nav-item', { active: nav.isActive })} to="/todo">
                        Todo
                    </NavLink>
                </div>
                {/* Search */}
            </div>
        </header>
    );
}

export default Header;
