import React, {FC} from 'react';
import {TaskType, FilterValuesType} from './App'
import TodoListButton from './TodoListButton';

type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
}

const TaskList: FC<TaskListPropsType> = ({tasks, removeTask}) => {

    const taskJSXElements = tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/> 
                <span>{t.title}</span>    
                <TodoListButton title='x' callBack={() => removeTask(t.id)}/>

            </li>
        )
    })
    
    return (
        <ul>
            {taskJSXElements}
        </ul>
    )
}

export default TaskList;