import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import FilterTodo from './FilterTodo';
import './ListTodo.scss';

ListTodo.propTypes = {
    todos: PropTypes.array,
    fitterStatus: PropTypes.bool,
    resultFilter: PropTypes.array,
    onClickTodo: PropTypes.func,
    updateTodo: PropTypes.func,
    getTodoUpdateId: PropTypes.func,
    handleFilterTodo: PropTypes.func,
    handleBulkAction: PropTypes.func,
    bulkActionDelete: PropTypes.func,
    bulkActionDone: PropTypes.func,
    formatCurrentDate: PropTypes.func,
    formatDueDate: PropTypes.func,
};
ListTodo.defaulProps = {
    todos: [],
    fitterStatus: null,
    resultFilter: null,
    onClickTodo:null,
    updateTodo:null,
    getTodoUpdateId:null,
    handleFilterTodo:null,
    handleBulkAction:null,
    bulkActionDelete:null,
    bulkActionDone:null,
    formatCurrentDate:null,
    formatDueDate:null,
}


function ListTodo(props) {
    const {
        todos, 
        onClickTodo, 
        updateTodo, 
        getTodoUpdateId, 
        handleFilterTodo, 
        fitterStatus, 
        resultFilter, 
        handleBulkAction,
        bulkActionDelete,
        bulkActionDone,
        formatCurrentDate,
        formatDueDate
    } = props;

    const [activeId, setActiveId] = useState('');
    const [active, setActive] = useState(false);
    const [todoList, setTodoList] = useState(todos);

    const handleClickTodo = (todo) => {
        if (!onClickTodo) {
            return;
        }
        onClickTodo(todo);
    }
    
    useEffect(() => {
        if (fitterStatus) {
            setTodoList(resultFilter);
        } else {
            setTodoList(todos);
        }
    },[fitterStatus,resultFilter, todos, todoList])

    const handleToggleDetail = (todo) => {
        getTodoUpdateId(todo.id)
        if (active && activeId !== todo.id) {
            setActiveId(todo.id);
        } else {
            setActiveId(todo.id);
            setActive(!active);
        }
    }

    const renderTodoList = () => {
        if (todoList.length === 0) {
            return(
                <p className="no-task">No task added!</p>
            );
        } else {
            return(
                <ul className="list-todo">
                    {
                        todoList.map(todo => (
                            <li className="item" key={todo.id}>
                                <Todo
                                    todo={todo}
                                    active={active}
                                    activeId={activeId}
                                    handleClickTodo={handleClickTodo}
                                    handleToggleDetail={handleToggleDetail}
                                    updateTodo={updateTodo}
                                    handleBulkAction={handleBulkAction}
                                    formatCurrentDate={formatCurrentDate}
                                    formatDueDate={formatDueDate}
                                />
                            </li>
                        ))
                    }
                </ul>
            );
        }
    }
    return (
        <div className="wrapper-todos">
            <div className="filter">
                <FilterTodo
                    handleFilterTodo={handleFilterTodo}
                />
            </div>
            <div className="bulk-action">
                <span>Bulk Action</span>

                <button 
                    onClick={bulkActionDelete} 
                    className="action__remove"
                >
                    Remove
                </button>

                <button 
                    onClick={bulkActionDone} 
                    className="action__detail"
                >
                    Done
                </button>
            </div>
            {
                renderTodoList()
            }
        </div>
    );
}

export default ListTodo;