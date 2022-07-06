import React from 'react';
import TodoList from './components/TodoList/TodoList';
import ButtonElement from './components/Button/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import {useSelector, useDispatch} from 'react-redux';
import {AppStateType} from './redux/store';
import {addTodoListTC, changeTodoListFilterTC, changeTodoListTitleTC, deleteTodoListTC} from './redux/reducers/todo';
import {TodoListType, filterType} from './redux/reducers/todo';
import {addTaskTC, changeTaskStatusTC, deleteTaskTC, updateTaskTitleTC} from './redux/reducers/task';
import {TaskBoxType} from './redux/reducers/task';
import './main.scss';
import AddItemForm from './components/AddItemForm/AddItemForm';

const App = () => {

    const dispatch = useDispatch();

    const todoListBox = useSelector<AppStateType, Array<TodoListType>>(state => state.todo)
    const taskBox = useSelector<AppStateType, TaskBoxType>(state => state.task)

    // Todos
    const removeTodoList = React.useCallback((id: string) => {
        dispatch(deleteTodoListTC(id))
    }, [])

    function editTitleTodoList(id: string, newTitle: string) {
        dispatch(changeTodoListTitleTC(id, newTitle));
    }

    function changeFilter (todoListID: string, filter: filterType) {
        dispatch(changeTodoListFilterTC(todoListID, filter));
    }

    // Tasks
    function addTask(todolistID: string, title: string) {
        dispatch(addTaskTC(todolistID, title))
    }

    function removeTask(todolistID: string, taskID: string) {
        dispatch(deleteTaskTC(todolistID, taskID));
    }

    function changeStatus(todoListId: string, taskId: string) {
        dispatch(changeTaskStatusTC(todoListId, taskId))
    }

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
                <AddItemForm/>

                <Grid container spacing={2}>
                    {todoListJSX}
                </Grid>
        </Container>
    )
}

export default App