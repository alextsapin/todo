import React from 'react';
import TodoList from './components/TodoList/TodoList';
import {v1} from 'uuid';
import ButtonElement from './components/Button/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './main.scss';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListsType = {
    id: string
    title: string
    filter: string
}

export type FilterValuesType = 'all' | 'active' | 'completed';

const App = () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    let [todoListTitle, setTodoListTitle] = React.useState('');

    let [todoListBox, setTodoListBox] = React.useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn:', filter: 'all'},
        {id: todolistID2, title: 'What to buy:', filter: 'all'},
    ])

    let [tasks, setTasks] = React.useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "Ryzen 7 5800X", isDone: true},
            {id: v1(), title: "MSI GTX 3060", isDone: true},
            {id: v1(), title: "GINZZU", isDone: false},
            {id: v1(), title: "Black Fury 16GB", isDone: false},
            {id: v1(), title: "ASUS ROG STRIX B550-F", isDone: false}
        ]
    });

    // Удалим задачу
    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(item => item.id !== id)})
    }

    // Добавим задачу
    function addTask(todolistID: string, title: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]})
    }

    // Изменим статус задачи
    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListId]: [...tasks[todoListId]].map(item => item.id === taskId ? {...item, isDone: isDone} : item)})
    }

    // Изменим фильтр
    function changeFilter (todoListID: string, filter: FilterValuesType) {
        setTodoListBox(todoListBox.map(item => item.id === todoListID ? {...item, filter: filter} : item))
    }

    // Удалим todoList
    function removeTodoList (id: string) {
        setTodoListBox([...todoListBox.filter(item => item.id !== id)])
    }

    // Добавим todoList
    function addTodoList() {
        const id = v1();
        
        const newTodoList = {
            id: id, 
            title: todoListTitle, 
            filter: 'all'
        }

        setTodoListBox([...todoListBox, newTodoList])

        setTasks({...tasks, [id]: []})
    }

    // Обновим задачу
    function updateTask(todoListId: string, taskId: string, newTitle: string) {
        setTasks({...tasks, [todoListId]: [...tasks[todoListId].map(item => item.id === taskId ? {...item, title: newTitle} : item)]})
    }

    const todoListJSX = todoListBox.map(item => {

        let tasksForTodoList = tasks[item.id];

        switch(item.filter) {
            case 'active':
            tasksForTodoList = tasks[item.id].filter(t => t.isDone === false)
            break;
    
            case 'completed':
            tasksForTodoList = tasks[item.id].filter(t => t.isDone === true)
            break;
    
            default:
            tasksForTodoList = tasks[item.id]
        }
        
        return (
            <TodoList 
                key = {item.id}
                title={item.title}
                todoListID = {item.id}
                filter = {item.filter} 
                tasks = {tasksForTodoList} 
                removeTask = {removeTask} 
                addTask = {addTask} 
                changeFilter = {changeFilter} 
                changeStatus = {changeStatus}
                removeTodoList = {removeTodoList}
                updateTask = {updateTask}
            />
        )
    })

    return (
        <Container fixed>
                <Grid container spacing={2}>
                    <Grid className="mb-4" item md={4}>
                        <Paper elevation={3} className="p-3">
                            <p className="taskBox__title">Add new todolist</p>
                            <input value={todoListTitle} onChange={e => setTodoListTitle(e.currentTarget.value)}/>
                            <ButtonElement 
                                title='ADD' 
                                variant='contained' 
                                callBack={addTodoList}
                                startIcon={<AddCircleIcon/>}
                            />
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