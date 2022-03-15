import React from 'react';
import {TaskType, FilterValuesType} from './App'

type TodoListButtonPropsType = {
    title: string
    changeFilter: () => void
}

const TodoListButton = (props: TodoListButtonPropsType) => {
    return <button onClick={props.changeFilter}>{props.title}</button>
}

export default TodoListButton;