import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useSelector, useDispatch} from 'react-redux';
import TodoList from './components/TodoList/TodoList';
import {AppStateType} from './redux/store';
import {changeTodoListFilterTC, changeTodoListTitleTC, getTodosTC} from './redux/reducers/todos/todos';
import {todoDomainType, filterType} from './redux/reducers/todos/types';
import {changeTaskStatusTC, deleteTaskTC, updateTaskTitleTC} from './redux/reducers/tasks/task';
import {stateTaskType} from './redux/reducers/tasks/task';
import AddItemForm from './components/AddItemForm/AddItemForm';
import './main.scss';

const App = React.memo(() => {
    const dispatch = useDispatch();

    const todoListBox = useSelector<AppStateType, Array<todoDomainType>>(state => state.todo)
    const taskBox = useSelector<AppStateType, stateTaskType>(state => state.task)

    React.useEffect(() => {
        dispatch(getTodosTC())
    }, [])

    // Todos
    const editTitleTodoList = React.useCallback((id: string, newTitle: string) => {
        dispatch(changeTodoListTitleTC(id, newTitle))
    }, [])

    const changeFilter = React.useCallback((todoListID: string, filter: filterType) => {
        dispatch(changeTodoListFilterTC(todoListID, filter))
    }, [])

    // Tasks
    const removeTask = React.useCallback((todolistID: string, taskID: string) => {
        dispatch(deleteTaskTC(todolistID, taskID));
    }, [])

    const changeStatus = React.useCallback((todoListId: string, taskId: string) => {
        dispatch(changeTaskStatusTC(todoListId, taskId))
    }, [])

    const updateTaskTitle = React.useCallback((todoListId: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskTitleTC(todoListId, taskId, newTitle))
    }, [])

    const todoListJSX = todoListBox.map(item => {
        return (
            <TodoList 
                key = {item.id}
                title = {item.title}
                todoListID = {item.id}
                filter = {item.filter} 
                tasks = {taskBox[item.id]} 
                removeTask = {removeTask} 
                changeFilter = {changeFilter} 
                changeStatus = {changeStatus}
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
})

export default App