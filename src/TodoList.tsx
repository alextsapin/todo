import React from 'react';
import {TaskType} from './App'
import TodoListHeader from './TodoListHeader';
import TodoListButton from './TodoListButton';
import TaskList from './TaskList';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <TodoListHeader title={props.title}/>
            <div>
                <input/>
                <button>+</button>
            </div>
            <TaskList tasks={props.tasks} removeTask={props.removeTask}/>
            <div>
                <TodoListButton title='All'/>
                <TodoListButton title='Active'/>
                <TodoListButton title='Completed'/>
            </div>
        </div>
    )
}

export default TodoList;