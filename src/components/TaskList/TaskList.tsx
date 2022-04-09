import React, {FC} from 'react';
import {TaskType} from '../../App';
import TodoListButton from '../Button/Button';
import EditableInput from '../EditableInput/EditableInput'

type TaskListPropsType = {
    tasks: Array<TaskType>
    todoListID: string
    removeTask: (todoListID: string, id: string) => void
    addTask: (todoListId: string, title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    updateTask: (todoListId: string, taskId: string, newTitle: string) => void
}

const TaskList: FC<TaskListPropsType> = ({tasks, removeTask, changeStatus, todoListID, updateTask}) => {

    const updateTaskHandler = (taskId: string, newTitle: string) => {
        updateTask(todoListID, taskId, newTitle) 
    }

    const taskJSXElements = tasks.map(t => {
        return (
            <div key={t.id} className={t.isDone ? 'row p-2 bg-secondary mt-2': 'row bg-dark p-2 mt-2'}>
                <div className="col-md-1 d-flex flex-column justify-content-center">
                    <input type="checkbox" checked={t.isDone} onChange={(e) => changeStatus(t.id, e.currentTarget.checked)}/>    
                </div>
                
                <div className="col-md-4 d-flex flex-column justify-content-center">
                    <EditableInput title={t.title} callBack={(newTitle: string) => updateTaskHandler(t.id, newTitle)}/>
                </div>

                <div className="col-md-4">
                    <TodoListButton title='❌' callBack={() => removeTask(todoListID, t.id)} btnClass='btn btn-light'/>
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