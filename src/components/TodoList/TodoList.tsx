import React from 'react';
import ButtonElement from '../Button/Button';
import TaskList from '../TaskList/TaskList';
import {taskType} from '../../api/api';
import {filterType} from '../../redux/reducers/todos/types';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import {changeTodoListFilterTC, changeTodoListTitleTC, deleteTodoListTC} from '../../redux/reducers/todos/todos';
import {addTaskTC, changeTaskStatusTC, deleteTaskTC, getTasksTC, updateTaskTitleTC} from '../../redux/reducers/tasks/task';
import EditableInput from '../EditableInput/EditableInput';
import {useDispatch} from 'react-redux';

type TodoListPropsType = {
    title: string
    todoListID: string
    filter: filterType
    tasks: Array<taskType>
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todoListId: string, filter: filterType) => void
    changeStatus: (todoListId: string, taskId: string) => void
    updateTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    editTitleTodoList: (todoListId: string, newTitle: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {
    
    const dispatch = useDispatch();

    const [title, setTitle] = React.useState('');
    const [error, setError] = React.useState(false);
    
    const addTask = React.useCallback(() => {
        let trimmedTitle = title.trim();
        if(trimmedTitle) {
            dispatch(addTaskTC(props.todoListID, trimmedTitle))
            setError(false);
            setTitle('');
        } else {
            setError(true)
        }
    }, [dispatch, props.todoListID, title])

    const editTitleTodoList = React.useCallback((newTitle: string) => {
        props.editTitleTodoList(props.todoListID, newTitle)
    }, [])

    let tasksForTodoList = props.tasks
    switch(props.filter) {
        case 'ACTIVE':
        tasksForTodoList = props.tasks.filter(t => t.completed === false)
        break;

        case 'COMPLETED':
        tasksForTodoList = props.tasks.filter(t => t.completed === true)
        break;

        default:
        tasksForTodoList = props.tasks
    }

    React.useEffect(() => {
        dispatch(getTasksTC(props.todoListID))
    }, [])

    return (
        <Grid item md={4}>
            <Paper className="taskBox" elevation={3}>
                <EditableInput title={props.title} css="taskBox__title" callBack={(newTitle) => editTitleTodoList(newTitle)}/>
                <ButtonElement 
                    title='' 
                    variant='contained'
                    color="error"
                    callBack={() => dispatch(deleteTodoListTC(props.todoListID))} 
                    btnClass="taskBox__del"
                    startIcon={<DeleteIcon/>}
                />
                
                <div className="formBox">
                    <TextField 
                        error={error}
                        value={title} 
                        size="small"
                        onChange={e => setTitle(e.currentTarget.value)}
                        label="Add new task" 
                        onKeyPress={(e) => {
                            if(e.key === 'Enter') {
                                addTask()
                            }
                        }}
                    />

                    <ButtonElement 
                        title='ADD' 
                        variant='contained' 
                        callBack={addTask}
                        startIcon={<AddCircleIcon/>}
                    />
                </div>
                
                <TaskList 
                    tasks={tasksForTodoList} 
                    todoListID={props.todoListID} 
                    removeTask={props.removeTask} 
                    changeStatus={props.changeStatus}
                    updateTask={props.updateTaskTitle}
                />

                <div className="filterBox">
                    <ButtonElement 
                        title='All' 
                        variant='contained'
                        callBack={() => props.changeFilter(props.todoListID, 'ALL')} 
                        disabled={props.filter === 'ALL' ? true : false}
                        btnClass='filterBox__btn'
                    />

                    <ButtonElement
                        title='Active' 
                        variant='contained'
                        callBack={() => props.changeFilter(props.todoListID, 'ACTIVE')} 
                        disabled={props.filter === 'ACTIVE' ? true : false}
                        btnClass='filterBox__btn'
                    />

                    <ButtonElement
                        title='DONE' 
                        variant='contained'
                        callBack={() => props.changeFilter(props.todoListID, 'COMPLETED')} 
                        disabled={props.filter === 'COMPLETED' ? true : false}
                        btnClass='filterBox__btn'
                    />
                </div>
            </Paper>
        </Grid>
    )
})

export default TodoList;