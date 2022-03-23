import React, {FC} from 'react';
import {TaskType} from '../../App';
import TodoListButton from '../Button/Button';

type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

const TaskList: FC<TaskListPropsType> = ({tasks, removeTask, changeStatus}) => {

    const taskJSXElements = tasks.map(t => {
        return (
            <div key={t.id} className={t.isDone ? 'row p-2 bg-secondary mt-2': 'row bg-dark p-2 mt-2'}>
                <div className="col-md-1 d-flex flex-column justify-content-center">
                    <input type="checkbox" checked={t.isDone} onChange={(e) => changeStatus(t.id, e.currentTarget.checked)}/>    
                </div>
                
                <div className="col-md-4 d-flex flex-column justify-content-center">
                    <span>{t.title}</span>    
                </div>

                <div className="col-md-4">
                    <TodoListButton title='❌' callBack={() => removeTask(t.id)} btnClass='btn btn-light'/>
                </div>
            </div>
        )
    })
    
    return (
        <div className="container mt-5 mb-3">
            {taskJSXElements}
        </div>
    )
}

export default TaskList;