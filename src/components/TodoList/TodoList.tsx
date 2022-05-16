import React from 'react';
import ButtonElement from '../Button/Button';
import TaskList from '../TaskList/TaskList';
import {TaskType, FilterValuesType} from '../../App';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';

type TodoListPropsType = {
    title: string
    todoListID: string
    filter: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    addTask: (todoListID: string, title: string) => void
    changeFilter: (todoListId: string, filter: FilterValuesType) => void
    changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todoListId: string) => void
    updateTask: (todoListId: string, taskId: string, newTitle: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = React.useState('');
    const [error, setError] = React.useState(false);
    
    const addTask = () => {
        const trimmedTitle = title.trim();
        if(trimmedTitle) {
            props.addTask(props.todoListID, trimmedTitle);
            setError(false);
            setTitle('');
        } else {
            setError(true)
        }
    }

    function removeTodoList() {
        props.removeTodoList(props.todoListID)
    }

    return (
        <Grid item md={4}>
            <Paper className="taskBox" elevation={3}>
                <p className="taskBox__title">{props.title}</p>
                <ButtonElement 
                    title='' 
                    variant='contained'
                    color="error"
                    callBack={removeTodoList} 
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
                    tasks={props.tasks} 
                    todoListID={props.todoListID} 
                    removeTask={props.removeTask} 
                    addTask={props.addTask} 
                    changeStatus={props.changeStatus}
                    updateTask = {props.updateTask}
                />

                <div className="filterBox">
                    <ButtonElement 
                        title='All' 
                        variant='contained'
                        callBack={() => props.changeFilter(props.todoListID, 'all')} 
                        disabled={props.filter === 'all' ? true : false}
                        btnClass='filterBox__btn'
                    />

                    <ButtonElement
                        title='Active' 
                        variant='contained'
                        callBack={() => props.changeFilter(props.todoListID, 'active')} 
                        disabled={props.filter === 'active' ? true : false}
                        btnClass='filterBox__btn'
                    />

                    <ButtonElement
                        title='Completed' 
                        variant='contained'
                        callBack={() => props.changeFilter(props.todoListID, 'completed')} 
                        disabled={props.filter === 'completed' ? true : false}
                        btnClass='filterBox__btn'
                    />
                </div>
            </Paper>
        </Grid>
    )
}

export default TodoList;