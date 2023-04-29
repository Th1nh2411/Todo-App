import styles from './Task.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import * as todoService from '../../services/todoService';
import { useState } from 'react';
import { BsCheckCircleFill, BsDashCircleFill } from 'react-icons/bs';
const cx = classNames.bind(styles);
function Task({ data = {}, onClickDone = () => {}, done = false }) {
    const [loading, setLoading] = useState(false);
    const updateTaskCompleted = async () => {
        setLoading(true);
        await todoService.markDone(data.id);
        onClickDone(data.id);
        setLoading(false);
    };
    return (
        <div className={cx('task-item')}>
            <div className={cx('task-title')}>
                {done ? (
                    <BsCheckCircleFill className={cx('task-icon')} />
                ) : (
                    <BsDashCircleFill className={cx('task-icon', 'not-done')} />
                )}
                {data.title}
            </div>
            {!done && (
                <div onClick={updateTaskCompleted} className={cx('done-btn', { loading })}>
                    {loading && <AiOutlineLoading3Quarters className={cx('loader')} />}
                    Mark done
                </div>
            )}
        </div>
    );
}

export default Task;
