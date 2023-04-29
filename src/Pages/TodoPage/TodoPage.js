import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './TodoPage.module.scss';
import classNames from 'classnames/bind';
import { BsCaretDown } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import { GiCardboardBox } from 'react-icons/gi';
import * as todoService from '../../services/todoService';
import Task from '../../components/Task';
const cx = classNames.bind(styles);

function TodoPage() {
    const [filterValue, setFilterValue] = useState('');
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const [chosenUser, setChosenUser] = useState('');
    const [filterUser, setFilterUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const boxRef = useRef();
    const doneTasks = useMemo(() => tasks.filter((task) => task.completed), [tasks]);
    const notDoneTasks = useMemo(() => tasks.filter((task) => !task.completed), [tasks]);
    const numDoneTask = useMemo(() => doneTasks.length, [doneTasks]);
    const getUsersData = async () => {
        const results = await todoService.getUsers();
        setUsers(results);
        setFilterUsers(results);
    };
    useEffect(() => {
        getUsersData();
    }, []);
    const getTasksData = async (id) => {
        setLoading(true);
        const results = await todoService.getTasks(id);
        setTasks(results);
        setLoading(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideBox);
        return () => {
            document.removeEventListener('click', handleClickOutsideBox);
        };
    }, []);
    useEffect(() => {
        const filterUsers = users.filter((user) => user.name.toLowerCase().includes(filterValue.toLowerCase()));
        setFilterUsers(filterUsers);
    }, [filterValue, users]);
    const handleChangeInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setFilterValue(searchValue);
        }
    };
    const handleClickOutsideBox = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
            setFilterValue('');
            setShowUsers(false);
        }
    };
    const handleClickDone = useCallback(
        (id) => {
            const newTasks = tasks.map((task) => (task.id === id ? { ...task, completed: true } : task));
            setTasks(newTasks);
        },
        [tasks],
    );
    return (
        <div className={cx('wrapper')}>
            {/* Render Users Dropdown Select */}
            <div className={cx('title')}>User</div>
            <div onClick={() => setShowUsers(true)} className={cx('user-selectBox')} ref={boxRef}>
                <input onChange={handleChangeInput} value={filterValue} />
                {filterValue === '' && (
                    <span className={cx('placeholder', { chosenUser })}>{chosenUser || 'Select user'}</span>
                )}
                <div
                    onClick={() => {
                        setFilterValue('');
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
                        {filterUser.length !== 0 ? (
                            filterUser.map((user, index) => (
                                <div
                                    onClick={(event) => {
                                        setShowUsers(false);
                                        setChosenUser(user.name);
                                        setFilterValue('');
                                        getTasksData(user.id);
                                        event.stopPropagation();
                                    }}
                                    key={index}
                                    className={cx('user-item')}
                                >
                                    {user.name}
                                </div>
                            ))
                        ) : (
                            <div className={cx('empty-wrapper')}>
                                <GiCardboardBox className={cx('empty-icon')} />
                                No Data
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* Render Tasks */}
            <div className={cx('title')}>
                Tasks{' '}
                <div className={cx('total-done')}>
                    Done <span className={cx('num-done')}>{numDoneTask}</span>/{tasks.length} tasks
                </div>
            </div>
            <div className={cx('tasks-wrapper')}>
                {loading ? (
                    <div className={cx('loader')}>
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                ) : tasks.length !== 0 ? (
                    <>
                        {notDoneTasks.map((task, index) => (
                            <Task
                                key={index}
                                data={task}
                                onClickDone={(id) => handleClickDone(id)}
                                done={task.completed}
                            />
                        ))}
                        {doneTasks.map((task, index) => (
                            <Task key={index} data={task} done={task.completed} />
                        ))}
                    </>
                ) : (
                    <div className={cx('no-data')}>No Data</div>
                )}
            </div>
        </div>
    );
}

export default TodoPage;
