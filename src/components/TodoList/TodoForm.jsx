import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TodoForm.scss';

TodoForm.propTypes = {
    addTodo: PropTypes.func,
    formatDueDate: PropTypes.func,
    formatCurrentDate: PropTypes.func,
};
TodoForm.defaultProps = {
    addTodo: null,
    formatDueDate: null,
    formatCurrentDate: null,
}
const getCurrentDate  = () => {
    let currentDate = new Date();
    let dateString = '';
    const dateObject = {
        date: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getUTCFullYear()
    }
    dateString = `${dateObject.year}-${dateObject.month}-${dateObject.date}`;
    return dateString;
}

function TodoForm(props) {
    const {
        addTodo,
        formatDueDate,
        formatCurrentDate
    } = props;
    const [nameTodo, setNameTodo] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(getCurrentDate);
    const [priority, setPriority] = useState('normal');
    const [errorMessage, setErrorMessage] = useState(null);
    const [focusInputName, setFocusInputName] = useState(false);

    const handleInputFocus = () => {
        setFocusInputName(true);
        setErrorMessage('');
    };
    
    const handleInputBlur = () => {
        setFocusInputName(false);
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const inputDueDate = formatDueDate(dueDate);
        const currentDate = formatCurrentDate();

        if (currentDate > inputDueDate) {
            setErrorMessage('You can not enter the past date!');
            return;
        }

        if (!nameTodo) {
            setErrorMessage('name todo is required!');
            return;
        } else if (nameTodo.length > 35) {
            setErrorMessage('name cannot be longer than 35 characters');
            return;
        }
        const valueForm = {
            title: nameTodo,
            description: description,
            dueDate: dueDate,
            priority: priority
        }
        addTodo(valueForm);
        setNameTodo('');
        setDescription('');
    }
    
    return (
        <form onSubmit={handleSubmitForm} className="form">
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
                onChange={e => setNameTodo(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="Add new task..."
            />
            <div className="form__des">
                <label htmlFor="description">Description</label>
                <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
            </div>

            <div className="form__chose">
                <div className="col-md-6 form__chose--date">
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
                <div className="col-md-6 form__chose--plority">
                    <label>Priority</label>
                    <div >
                        <select 
                            name="priority" 
                            value={priority}
                            onChange={e => setPriority(e.target.value)}
                        >
                            <option value="normal">Normal</option>
                            <option value="low">low</option>
                            <option value="hight">Hight</option>
                        </select>
                    </div>
                </div>
            </div>
            <button className="form__submit">Add</button>
        </form>
    );
}

export default TodoForm;