import { Link } from 'react-router-dom';
import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <Link className={cx('todo-nav')} to="/todo">
                Todo Page
            </Link>
        </div>
    );
}

export default Home;
