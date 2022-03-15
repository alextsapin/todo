import React, {FC} from 'react';
import {TaskType, FilterValuesType} from './App'

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
                <button onClick={() => removeTask(t.id)}>x</button>
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