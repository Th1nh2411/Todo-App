import { useEffect, useRef, useState } from 'react';
import styles from './TodoPage.module.scss';
import classNames from 'classnames/bind';
import { BsCaretDown } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import * as todoService from '../../services/todoService';
import Task from '../../components/Task';
const cx = classNames.bind(styles);

function TodoPage() {
    const [searchValue, setSearchValue] = useState('');
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const boxRef = useRef();
    const getUsersData = async () => {
        const results = await todoService.getUsers();
        setUsers(results);
    };
    useEffect(() => {
        getUsersData();
    }, []);
    const getTasksData = async (id) => {
        const results = await todoService.getTasks(id);
        setTasks(results);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideBox);
        return () => {
            document.removeEventListener('click', handleClickOutsideBox);
        };
    }, []);
    console.log(tasks);
    const handleChangeInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    const handleClickOutsideBox = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
            setSearchValue('');
            setShowUsers(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>User</div>
            <div onFocus={() => setShowUsers(true)} className={cx('user-selectBox')} ref={boxRef}>
                <input onChange={handleChangeInput} value={searchValue} placeholder="Select user" />
                <div
                    onClick={() => {
                        setSearchValue('');
                    }}
                    className={cx('dropdown-icon')}
                >
                    <BsCaretDown />
                </div>

                <div className={cx('search-icon')} onMouseDown={(e) => e.preventDefault()}>
                    <IoSearch />
                </div>
                {showUsers && (
                    <div className={cx('users-results')}>
                        {users.map((user, index) => (
                            <div
                                onClick={() => {
                                    setSearchValue(user.name);
                                    getTasksData(user.id);
                                    // setShowUsers(false);
                                }}
                                key={index}
                                className={cx('user-item')}
                            >
                                {user.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={cx('title')}>Tasks</div>
            <div className={cx('tasks-wrapper')}>
                {tasks.length !== 0 ? (
                    <>
                        {tasks.map(
                            (task, index) =>
                                !task.completed && (
                                    <Task
                                        key={index}
                                        data={task}
                                        onClickDone={(id) => {
                                            const newTasks = tasks.map((task) =>
                                                task.id === id ? { ...task, completed: true } : task,
                                            );
                                            setTasks(newTasks);
                                        }}
                                        done={task.completed}
                                        // loading={loading}
                                    />
                                ),
                        )}
                        {tasks.map(
                            (task, index) => task.completed && <Task key={index} data={task} done={task.completed} />,
                        )}
                    </>
                ) : (
                    <div className={cx('no-data')}>No Data</div>
                )}
            </div>
        </div>
    );
}

export default TodoPage;
