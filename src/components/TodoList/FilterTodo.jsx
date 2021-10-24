import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

FilterTodo.propTypes = {
    handleFilterTodo: PropTypes.func,
};

FilterTodo.defaulProps = {
    handleFilterTodo: null
}

function FilterTodo(props) {
    const { handleFilterTodo } = props;
    const [valueFilter, setValueFilter] = useState('');
    const valueRef = useRef(null);

    const handleFilter = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setValueFilter(value);
        if (!handleFilterTodo) {
            return;
        }

        if (valueRef.current) {
            clearTimeout(valueRef.current);
        }

        valueRef.current = setTimeout(() => {
            const valueForm = {
                valueFilter: value
            }
            handleFilterTodo(valueForm);
        }, 500)  
    }

    return (
        <form 
            className="filter__form"
            onSubmit={e => e.preventDefault()}
        > 
            <input 
                type="text" 
                value={valueFilter}
                onChange={handleFilter}
                className="filter__form--input"
                placeholder="search todo..."
            />
        </form>
    );
}

export default FilterTodo;