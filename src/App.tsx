import React from 'react';
import TodoList from './components/TodoList/TodoList';
import {v1} from 'uuid';
import ButtonElement from './components/Button/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import {useSelector} from 'react-redux';
import './main.scss';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListsType = {
    id: string
    title: string
    filter: string
}

export type FilterValuesType = 'all' | 'active' | 'completed';

const App = () => {

    const data = useSelector<any, any>(state => state.main)

    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todoListTitle, setTodoListTitle] = React.useState('');

    const [error, setError] = React.useState(false);

    let [todoListBox, setTodoListBox] = React.useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn:', filter: 'all'},
        {id: todolistID2, title: 'What to buy:', filter: 'all'},
    ])

    const [tasks, setTasks] = React.useState({
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

    // Обновим название todoList
    function editTitleTodoList(id: string, newTitle: string) {
        setTodoListBox([...todoListBox.map(item => item.id === id ? {...item, title: newTitle} : item)])
    }

    // Добавим todoList
    function addTodoList() {
        const id = v1();
        
        const newTodoList = {
            id: id, 
            title: todoListTitle, 
            filter: 'all'
        }

        const trimmedTitle = todoListTitle.trim();
        if(trimmedTitle) {
            setTodoListBox([...todoListBox, newTodoList])
            setTasks({...tasks, [id]: []})
            setTodoListTitle('')
            setError(false)
        } else {
            setError(true)
        }
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
                title = {item.title}
                todoListID = {item.id}
                filter = {item.filter} 
                tasks = {tasksForTodoList} 
                removeTask = {removeTask} 
                addTask = {addTask} 
                changeFilter = {changeFilter} 
                changeStatus = {changeStatus}
                removeTodoList = {removeTodoList}
                updateTask = {updateTask}
                editTitleTodoList = {editTitleTodoList}
            />
        )
    })

    return (
        <Container fixed>
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <Paper className="taskBox" elevation={3}>
                            <p className="taskBox__title">Add new todolist</p>

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