import styles from './Task.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import * as todoService from '../../services/todoService';
import { useState } from 'react';
const cx = classNames.bind(styles);
function Task({ data = {}, onClickDone = () => {}, done = false }) {
    const [loading, setLoading] = useState(false);
    const updateTaskCompleted = async () => {
        setLoading(true);
        const results = await todoService.markDone(data.id);
        onClickDone(data.id);
        setLoading(false);
    };
    return (
        <div className={cx('task-item')}>
            <div className={cx('task-title')}>{data.title}</div>
            {!done && (
                <div onClick={updateTaskCompleted} className={cx('done-btn')}>
                    {loading && <AiOutlineLoading3Quarters className={cx('loading')} />}
                    Mark done
                </div>
            )}
        </div>
    );
}

export default Task;
