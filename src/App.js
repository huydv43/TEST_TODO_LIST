import React, { useState } from 'react';
import './App.scss';
import './assets/css/grid.css'
import ListTodo from "./components/TodoList/ListTodo";
import TodoForm from "./components/TodoList/TodoForm";


function App() {
    const [todoList, setTodoList] = useState(() => {
        const initListTodo = JSON.parse(localStorage.getItem('list-todo')) || '';
        return initListTodo;
    });
    const [updateTodoId, setUpdateTodoId] = useState('');
    const [resultFilter, setResultFilter] = useState([]);
    const [fitterStatus, setFilterStatus] = useState(false);
    const [listBulkAction, setListBulkAction] = useState([]);


    //get list id todo checked and unchecked
    const handleBulkAction = (todo, checkedStatus) => {
        const newListBulkAction = [...listBulkAction];
        const result = todoList.find(item => item.id === todo.id);
        const listCkecked = newListBulkAction.find(item => item.id === todo.id);
        if (checkedStatus && result && !listCkecked) {
            newListBulkAction.push(result.id);
            setListBulkAction(newListBulkAction)
        } else {
            for (let i = 0; i < newListBulkAction.length; i++) {
                if (todo.id === newListBulkAction[i]) {
                    newListBulkAction.splice(i,1);
                    setListBulkAction(newListBulkAction)
                }
            }
        }  
    }

    //
    const bulkActionDelete = () => {
        const newTodoList = [...todoList];
        const newListBulkAction = [...listBulkAction];
        for (let i = newTodoList.length - 1; i >= 0; i--) {
            let todo = newTodoList[i];
            for (let j = newListBulkAction.length - 1; j >= 0 ; j--) {
                if (todo.id === newListBulkAction[j]) {
                    newTodoList.splice(i,1);
                    newListBulkAction.splice(j,1);
                }
            }
        }
        sortTodo(newTodoList);
        setTodoList(newTodoList);
        setListBulkAction(newListBulkAction);
        setTimeout(() => {
            alert(`successfully deleted ${listBulkAction.length} records!`);
        }, 500);
        localStorage.setItem('list-todo', JSON.stringify(newTodoList));
    }

    const bulkActionDone = () => {
        console.log("Temporarily ignore the Done method.")
    }

    const deleteTodo = (todo) => {
        const newTodoList = [...todoList];
        const index = newTodoList.findIndex(x => x.id === todo.id);
        if (index < 0) {
            return;
        }
        newTodoList.splice(index, 1);
        setTodoList(newTodoList);
        setTimeout(() => {
            alert('delete todo successfully!');
        }, 500);
        localStorage.setItem('list-todo', JSON.stringify(newTodoList));
    }

    const handleFilterTodo = (value) => {
        const listTodoFilter = [...todoList];
        if (value.valueFilter) {
            setFilterStatus(true);
        } else {
            setFilterStatus(false);
        }
        const result = listTodoFilter.filter(todo => !todo.title.indexOf(value.valueFilter, 0) === true);
        setResultFilter(result);
    }

    const addTodo = (valueForm) => {
        const todo = {
            id : Math.floor(Math.random() * 10000),
            ...valueForm
        }
        const newTodoList = [...todoList];
        newTodoList.push(todo);
        sortTodo(newTodoList);
        setTodoList(newTodoList);
        setTimeout(() => {
            alert('create todo successfully!');
        }, 500);
        localStorage.setItem('list-todo', JSON.stringify(newTodoList));
    }

    const getTodoUpdateId = (id) => {
        setUpdateTodoId(id)
    }

    const updateTodo = (todoEdit) => {
        const newTodoList = [...todoList];
        const newListEdited = newTodoList.map(item => updateTodoId === item.id? Object.assign(item, todoEdit) : item)
        sortTodo(newListEdited);
        setTodoList(newListEdited);
        setTimeout(() => {
            alert('update todo successfully!');
        }, 500);
        localStorage.setItem('list-todo', JSON.stringify(newListEdited));
    }
    //sorted by Due date from the near future to far future
    // Task with the same due date then default sorted
    const sortTodo = (newTodoList) => {
        newTodoList.sort(function(a, b) {
            const timeA = Date.parse(a.dueDate);
            const timeB = Date.parse(b.dueDate);
            if (timeA < timeB) {
              return -1;
            }
            if (timeA > timeB) {
              return 1;
            }
            return 0;
        });
    }

    const formatCurrentDate = () => {
        const currentDate = new Date();
        const currentDateObject = {
            year: currentDate.getFullYear(),
            date: currentDate.getDate(),
            month: currentDate.getMonth() + 1
        }
        const dateNow = new Date(currentDateObject.year, currentDateObject.month, currentDateObject.date);
        return dateNow;
    }

    const formatDueDate = (dueDate) => {
        const inputDueDate = Date.parse(dueDate);
        const dueDateof = new Date(inputDueDate);
        const due = {
            y: dueDateof.getFullYear(),
            m: dueDateof.getMonth() + 1,
            d: dueDateof.getDate()
        }
        const formatDueDate = new Date(due.y, due.m, due.d);
        return formatDueDate;
    }

    return (
        <div className="app">
            <div className="grid wide">
                <div className="row wrapper">
                    <div className="col l-5 m-6 c-12 todo-form">
                        <h2 className="heading-form">New Task</h2>
                        <TodoForm 
                            addTodo={addTodo} 
                            formatCurrentDate={formatCurrentDate}
                            formatDueDate={formatDueDate}
                        />
                    </div>
                    <div className="col l-7 m-6 c-12 todo-content">
                        <h2 className="heading-content">To Do List</h2>
                        <ListTodo 
                            todos={todoList} 
                            fitterStatus={fitterStatus}
                            resultFilter={resultFilter}
                            onClickTodo={deleteTodo} 
                            updateTodo={updateTodo} 
                            getTodoUpdateId={getTodoUpdateId} 
                            handleFilterTodo={handleFilterTodo}
                            handleBulkAction={handleBulkAction}
                            bulkActionDelete={bulkActionDelete}
                            bulkActionDone={bulkActionDone}
                            formatCurrentDate={formatCurrentDate}
                            formatDueDate={formatDueDate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

