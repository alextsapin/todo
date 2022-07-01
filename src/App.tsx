import React from 'react';
import TodoList from './components/TodoList/TodoList';
import {v1} from 'uuid';
import ButtonElement from './components/Button/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import {useSelector, useDispatch} from 'react-redux';
import {AppStateType} from './redux/store';
import './main.scss';
import {addTodoListTC, changeTodoListFilterTC, changeTodoListTitleTC, deleteTodoListTC} from './redux/reducers/todo';
import {filterType} from './redux/reducers/todo';
import {addTaskTC, changeTaskStatusTC, deleteTaskTC, updateTaskTitleTC} from './redux/reducers/task';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskBoxType = {
    [key: string]: Array<TaskType>
}

export type TodoListType = {
    id: string
    title: string
    filter: string
}

const App = () => {

    const dispatch = useDispatch();

    const todoListBox = useSelector<AppStateType, Array<TodoListType>>(state => state.todo)
    const taskBox = useSelector<AppStateType, TaskBoxType>(state => state.task)

    const [todoListTitle, setTodoListTitle] = React.useState('');

    const [error, setError] = React.useState(false);

    // Todo листы
    function addTodoList() {
        const trimmedTitle = todoListTitle.trim();
        if(trimmedTitle) {
            dispatch(addTodoListTC(trimmedTitle))
            setTodoListTitle('')
            setError(false)
        } else {
            setError(true)
        }
    }

    function removeTodoList (id: string) {
        dispatch(deleteTodoListTC(id))
    }

    function editTitleTodoList(id: string, newTitle: string) {
        dispatch(changeTodoListTitleTC(id, newTitle));
    }

    function changeFilter (todoListID: string, filter: filterType) {
        //setTodoListBox(todoListBox.map(item => item.id === todoListID ? {...item, filter: filter} : item))
        dispatch(changeTodoListFilterTC(todoListID, filter));

    }

    // Tasks
    function addTask(todolistID: string, title: string) {
        dispatch(addTaskTC(todolistID, title))
    }

    function removeTask(todolistID: string, taskID: string) {
        dispatch(deleteTaskTC(todolistID, taskID));
    }

    // Изменим статус задачи
    function changeStatus(todoListId: string, taskId: string) {
        dispatch(changeTaskStatusTC(todoListId, taskId))
    }

    // Обновим задачу
    function updateTaskTitle(todoListId: string, taskId: string, newTitle: string) {
        dispatch(updateTaskTitleTC(todoListId, taskId, newTitle))
    }

    const todoListJSX = todoListBox.map(item => {

        let tasksForTodoList = taskBox[item.id];

        switch(item.filter) {
            case 'ACTIVE':
            tasksForTodoList = taskBox[item.id].filter(t => t.isDone === false)
            break;
    
            case 'COMPLETED':
            tasksForTodoList = taskBox[item.id].filter(t => t.isDone === true)
            break;
    
            default:
            tasksForTodoList = taskBox[item.id]
        }
        
        return (
            <TodoList 
                key = {item.id}
                title = {item.title}
                todoListID = {item.id}
                filter = {item.filter} 
                tasks = {tasksForTodoList} 
                removeTask = {removeTask} 
                addTask = {addTask} 
                changeFilter = {changeFilter} 
                changeStatus = {changeStatus}
                removeTodoList = {removeTodoList}
                updateTaskTitle = {updateTaskTitle}
                editTitleTodoList = {editTitleTodoList}
            />
        )
    })

    return (
        <Container fixed>
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <Paper className="taskBox" elevation={3}>
                            <p className="taskBox__title">Add new todoList</p>

                            <div className="formBox">
                                <TextField 
                                    value={todoListTitle} 
                                    onChange={e => setTodoListTitle(e.currentTarget.value)}
                                    size="small"
                                    label="Add new todoList" 
                                    error={error}
                                />

                                <ButtonElement 
                                    title='ADD' 
                                    variant='contained' 
                                    callBack={addTodoList}
                                    startIcon={<AddCircleIcon/>}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    {todoListJSX}
                </Grid>
        </Container>
    )
}

export default App;