import React, {FC} from 'react';
import {TaskType} from '../../redux/reducers/tasks/task';
import ButtonElement from '../Button/Button';
import EditableInput from '../EditableInput/EditableInput';
import Checkbox from '@mui/material/Checkbox';

type TaskListPropsType = {
    tasks: Array<TaskType>
    todoListID: string
    removeTask: (todoListID: string, id: string) => void
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
            <div key={t.id} className={t.isDone ? 'task task_completed': 'task'}>
                <Checkbox checked={t.isDone} onChange={(e) => changeStatusHandler(t.id, e.currentTarget.checked)}/>    
                <EditableInput title={t.title} callBack={(newTitle: string) => updateTaskHandler(t.id, newTitle)}/>
                <ButtonElement title='❌' variant='text' callBack={() => removeTask(todoListID, t.id)} btnClass='righted'/>
            </div>
        )
    })
    
    return <div>{taskJSXElements}</div>
}

export default TaskList;