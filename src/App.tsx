import React from 'react';
import TodoList from './components/TodoList/TodoList';
import {v1} from 'uuid';
import Button from './components/Button/Button'
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

    let [todoList, setTodoList] = React.useState('');

    let [todoListBox, setTodoListBox] = React.useState<Array<TodoListsType>>([
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
            {id: v1(), title: "Ryzen 7 5800X", isDone: true},
            {id: v1(), title: "MSI GTX 3060", isDone: true},
            {id: v1(), title: "GINZZU", isDone: false},
            {id: v1(), title: "Black Fury 16GB", isDone: false},
            {id: v1(), title: "ASUS ROG STRIX B550-F", isDone: false}
        ]
    });

    const [filter, setFilter] = React.useState('all');

    const removeTask = (todolistID: string, id: string) => {

        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(item => item.id !== id)})

        //const filteredTasks = tasks.filter(t => t.id !== id)
        //setTasks(filteredTasks);
    }

    const addTask = (todolistID: string, title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]})
    }

    const changeStatus = (id: string, isDone: boolean) => {
        //const updateTasks = tasks.map(t => t.id === id ? {...t, isDone: isDone} : t);
        //setTasks(updateTasks);
    }

    const changeFilter = (todoListID: string, filter: FilterValuesType) => {
        setTodoListBox(todoListBox.map(item => item.id === todoListID ? {...item, filter: filter} : item))
        //setFilter(filter);
    }

    const removeTodoList = () => {

    }

    function addTodoList() {
        const id = v1();
        const newTodoList = {id: id,title: 'Wht reat', filter: 'all'}

        setTodoListBox([...todoListBox, newTodoList])

        setTasks({...tasks, [id]: [
            {id: v1(), title: "Ryzen 7 5800X", isDone: true},
            {id: v1(), title: "MSI GTX 3060", isDone: true},
            {id: v1(), title: "GINZZU", isDone: false},
            {id: v1(), title: "Black Fury 16 GB", isDone: false},
            {id: v1(), title: "ASUS ROG STRIX B550-F", isDone: false}
        ]})
    }

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
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <h1>Add new todolist</h1>

                    <div className="row g-3">
                        <div className="col-md-4">
                            <input value={todoList} onChange={e => setTodoList(e.currentTarget.value)}/>
                        </div>
                        <div className="col">
                            <Button title='+' callBack={addTodoList} btnClass='btn btn-primary'/>
                        </div>
                    </div>
                </div>

                <hr/>
            
                {todoListJSX}
            </div>
        </div>
    )
}

export default App;