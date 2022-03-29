import React from 'react';
import TodoList from './components/TodoList/TodoList';
import {v1} from 'uuid';
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

function App() {

    /*let[todolists, setTodolists] = React.useState<Array<todolistsType>>([
        {id:v1(), title:'What to learn', filter:'all'},
        {id:v1(), title:'What to buy', filter:'all'},
    ])
    
    const [tasks, setTasks] = React.useState([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS / ES6', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])*/

    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = React.useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
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
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const [filter, setFilter] = React.useState('all');

    const removeTask = (todolistID: string, id: string) => {

        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(item => item.id !== id)})

        //const filteredTasks = tasks.filter(t => t.id !== id)
        //setTasks(filteredTasks);
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        //setTasks([newTask, ...tasks])
    }

    const changeStatus = (id: string, isDone: boolean) => {
        //const updateTasks = tasks.map(t => t.id === id ? {...t, isDone: isDone} : t);
        //setTasks(updateTasks);
    }

    const changeFilter = (todoListID: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(item => item.id === todoListID ? {...item, filter: filter} : item))
        //setFilter(filter);
    }

    const todoListJSX = todolists.map(item => {

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
                todoListID = {item.id}
                filter = {item.filter} 
                tasks = {tasksForTodoList} 
                removeTask = {removeTask} 
                addTask = {addTask} 
                changeFilter = {changeFilter} 
                changeStatus = {changeStatus}
            />)
    })

    return (
        <div className="container">
            <div className="row">
                {todoListJSX}
            </div>
        </div>
    )
}

export default App;