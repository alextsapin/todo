import React, {FC} from 'react';
import {TaskType} from '../../App';
import Button from '../Button/Button';
import EditableInput from '../EditableInput/EditableInput';

type TaskListPropsType = {
    tasks: Array<TaskType>
    todoListID: string
    removeTask: (todoListID: string, id: string) => void
    addTask: (todoListId: string, title: string) => void
    changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    updateTask: (todoListId: string, taskId: string, newTitle: string) => void
}

const TaskList: FC<TaskListPropsType> = ({tasks, removeTask, changeStatus, todoListID, updateTask}) => {

    const updateTaskHandler = (taskId: string, newTitle: string) => {
        updateTask(todoListID, taskId, newTitle) 
    }

    const changeStatusHandler = (taskId: string, isDone: boolean) => {
        changeStatus(todoListID, taskId, isDone); 
    }

    const taskJSXElements = tasks.map(t => {
        return (
            <div key={t.id} className={t.isDone ? 'row bg-secondary py-2 mt-2': 'row bg-dark py-2 mt-2'}>
                <div className="col-md-1 d-flex flex-column justify-content-center">
                    <input type="checkbox" checked={t.isDone} onChange={(e) => changeStatusHandler(t.id, e.currentTarget.checked)}/>    
                </div>
                
                <div className="col-md-9 d-flex flex-column justify-content-center">
                    <EditableInput title={t.title} callBack={(newTitle: string) => updateTaskHandler(t.id, newTitle)}/>
                </div>

                <div className="col-md-2">
                    <Button title='❌' callBack={() => removeTask(todoListID, t.id)} btnClass='btn btn-light'/>
                </div>
            </div>
        )
    })
    
    return (
        <div className="container mt-3 mb-3">
            {taskJSXElements}
        </div>
    )
}

export default TaskList;