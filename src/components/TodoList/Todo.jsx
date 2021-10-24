import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
import './Todo.scss';


Todo.propTypes = {
    todo: PropTypes.object,
    active: PropTypes.bool,
    handleClickTodo: PropTypes.func,
    handleToggleDetail: PropTypes.func,
    updateTodo: PropTypes.func,
    handleBulkAction: PropTypes.func,
    formatDueDate: PropTypes.func,
    formatCurrentDate: PropTypes.func,

};
Todo.defaulProps = {
    todos: {},
    active: null,
    handleClickTodo: null,
    handleToggleDetail: null,
    updateTodo: null,
    handleBulkAction: null,
    formatDueDate: null,
    formatCurrentDate: null,
}
function Todo(props) {
    const {
        todo,
        handleClickTodo, 
        handleToggleDetail, 
        active, 
        activeId, 
        updateTodo, 
        handleBulkAction,
        formatDueDate,
        formatCurrentDate
    } = props;
    const [nameTodo, setNameTodo] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [dueDate, setDueDate] = useState(todo.dueDate);
    const [priority, setPriority] = useState(todo.priority);
    const [errorMessage, setErrorMessage] = useState('');
    const actionRef = useRef(null)
    const [focusInputName, setFocusInputName] = useState(false);

    const handleInputFocus = () => {
        setFocusInputName(true);
    };
    
    const handleInputBlur = () => {
        setFocusInputName(false);
    };

    const handleUpdateTodo = (e) => {
        e.preventDefault();
        const inputDueDate = formatDueDate(dueDate);
        const currentDate = formatCurrentDate();

        if (inputDueDate < currentDate) {
            setErrorMessage('You can not enter the past date!');
            return;
        }
        if (!nameTodo) {
            setErrorMessage('name todo is required!');
            return;
        } 
        const valueForm = {
            title: nameTodo,
            description: description,
            dueDate: dueDate,
            priority: priority
        }
        setErrorMessage('');
        updateTodo(valueForm);
    }

    const getcheckBox = (todo) => {
        let checkedStatus;
        if (actionRef.current.checked) {
            checkedStatus = true;
            handleBulkAction(todo, checkedStatus)
        } else {
            checkedStatus = false;
            handleBulkAction(todo, checkedStatus)
        }
    }
    return (
        <>
            <div 
                className=
                {active && activeId === todo.id?
                'item__title line' : 'item__title'}
            > 
                <div className="item__heading">
                    <input 
                        className="item__title--check" 
                        type="checkbox" 
                        ref={actionRef} 
                        onClick={() => {getcheckBox(todo)}}  
                    />
                
                    <span>{todo.title}</span>
                </div>
                <div className="item-action">
                    <button 
                        onClick={() => {handleClickTodo(todo)}} 
                        className="action__remove"
                    >
                        Remove
                    </button>
                    <button 
                        onClick={() => {handleToggleDetail(todo)}} 
                        className="action__detail"
                    >
                        {active && activeId === todo.id? 'Hidden' : 'Detail'}
                    </button>
                </div>
            </div>

            <div 
                className=
                {active && activeId === todo.id?
                'item__detail--show' : 'item__detail--hidden'}
            >
                <form 
                    className="form" 
                    onSubmit={handleUpdateTodo}
                >
                    <p 
                        className=
                        {errorMessage && !focusInputName?
                        'show-error' : 'hidden-error'}
                    >
                        {errorMessage? errorMessage : ''}
                    </p>
                    <input 
                        className="form__title"
                        type="text" 
                        value={nameTodo}
                        placeholder="Add new task..."
                        onChange={e => setNameTodo(e.target.value)}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    <div className="form__des">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form__chose">
                        <div className="form__chose--date">
                            <label>Due date</label>
                            <div className="input-date">
                                <input 
                                    className="chose-date"
                                    name="dueDate"
                                    placeholder="dd-mm-yyyy"
                                    type="date" 
                                    value={dueDate}
                                    onChange={e => setDueDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form__chose--plority">
                            <label>Priority</label>
                            <div >
                                <select 
                                    name="priority" 
                                    value={priority}
                                    onChange={e => setPriority(e.target.value)}
                                >
                                    <option value="low">low</option>
                                    <option value="normal">Normal</option>
                                    <option value="hight">Hight</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className="form__submit">Update</button>
                </form> 
            </div>
        </>
    );
}

export default Todo;