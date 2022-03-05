import React from 'react';

type TodoListButtonPropsType = {
    title: string
}

const TodoListButton = (props: TodoListButtonPropsType) => {
    return <button>{props.title}</button>
}

export default TodoListButton;