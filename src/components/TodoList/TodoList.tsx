import React from 'react';
import ButtonElement from '../Button/Button';
import TaskList from '../TaskList/TaskList';
import {TaskType, FilterValuesType} from '../../App';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';

type TodoListPropsType = {
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
    const [error, setError] = React.useState('');
    
    const addTask = () => {
        const trimmedTitle = title.trim();
        if(trimmedTitle) {
            props.addTask(props.todoListID, trimmedTitle);
            setError('');
            setTitle('');
        } else {
            setError('error')
        }
    }

    const inputClass = error === '' ? 'form-control' : 'form-control is-invalid';

    const removeTodoList = () => {}

    return (
        <Grid item md={4}>
            <Paper className="taskBox" elevation={3}>
            <div className="container">
                <div className="row">
                    <h1>What to learn</h1>
                    <div className="col-md-8">
                        <input className={inputClass} value={title} onChange={e => setTitle(e.currentTarget.value)}
                            onKeyPress={(e) => {
                                if(e.key === 'Enter') {
                                    addTask()
                                }
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <ButtonElement title='+' variant='contained' callBack={addTask}/>
                        <DeleteIcon/>
                    </div>

                    <div className="col-md-2">
                        <ButtonElement 
                            title='888' 
                            variant='outlined'
                            callBack={removeTodoList} 
                            filterClass={'btn btn-light'}
                            startIcon={<DeleteIcon/>}
                        />
                    </div>
                </div>
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