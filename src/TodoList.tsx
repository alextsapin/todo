import React from 'react';
import {TaskType} from './App'
import TodoListHeader from './TodoListHeader';
import TodoListButton from './TodoListButton';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

const TodoList = (props: TodoListPropsType) => {
    return (
        <div>
            <TodoListHeader title={props.title}/>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox" checked={props.tasks[0].isDone}/> 
                    <span>{props.tasks[0].title}</span>    
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[1].isDone}/> 
                    <span>{props.tasks[1].title}</span> 
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[2].isDone}/> 
                    <span>{props.tasks[2].title}</span> 
                </li>
            </ul>
            <div>
                <TodoListButton title='All'/>
                <TodoListButton title='Active'/>
                <TodoListButton title='Completed'/>
            </div>
        </div>
    )
}

export default TodoList;