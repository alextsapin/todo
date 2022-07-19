import React, {FC} from 'react';
import {TaskType} from '../../redux/reducers/task';
import ButtonElement from '../Button/Button';
import EditableInput from '../EditableInput/EditableInput';
import Checkbox from '@mui/material/Checkbox';

type TaskListPropsType = {
    tasks: Array<TaskType>
    todoListID: string
    removeTask: (todoListID: string, id: string) => void
    changeStatus: (todoListId: string, taskId: string) => void
    updateTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
}

const TaskList: FC<TaskListPropsType> = React.memo(({tasks, removeTask, changeStatus, todoListID, updateTaskTitle}) => {

    const updateTaskTitleHandler = React.useCallback((taskId: string, newTitle: string) => {
        updateTaskTitle(todoListID, taskId, newTitle) 
    }, [])

    const changeStatusHandler = React.useCallback((taskId: string) => {
        changeStatus(todoListID, taskId); 
    }, [])

    const taskJSXElements = tasks.map(t => {
        // Значение чекбокса onChange={(e) => changeStatusHandler(t.id, e.currentTarget.checked)}
        return (
            <div key={t.id} className={t.isDone ? 'task task_completed': 'task'}>
                <Checkbox checked={t.isDone} onChange={(e) => changeStatusHandler(t.id)}/>    
                <EditableInput title={t.title} callBack={(newTitle: string) => updateTaskTitleHandler(t.id, newTitle)}/>
                <ButtonElement title='❌' variant='text' callBack={() => removeTask(todoListID, t.id)} btnClass='righted'/>
            </div>
        )
    })
    
    return <div>{taskJSXElements}</div>
})

export default TaskList;