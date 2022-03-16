import React from 'react';

type TodoListButtonPropsType = {
    title: string
    callBack: () => void
}

const TodoListButton = (props: TodoListButtonPropsType) => {

    const onClickHandler = () => {
        props.callBack()
    }
    
    return (
        <button onClick={onClickHandler}>{props.title}</button>
    )
}

export default TodoListButton;