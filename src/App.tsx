import React from 'react';
import TodoList from './TodoList';
import {v1} from 'uuid';
import './main.scss';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = React.useState([
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS / ES6', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks([newTask, ...tasks])
    }

    const [filter, setFilter] = React.useState('');

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    let tasksForTodoList;

    switch(filter) {
        case 'active':
        tasksForTodoList = tasks.filter(t => t.isDone === false)
        break;

        case 'completed':
        tasksForTodoList = tasks.filter(t => t.isDone === true)
        break;

        default:
        tasksForTodoList = tasks
    }

    return (
        <div className="App">
            <TodoList title='What to learn' tasks={tasksForTodoList} removeTask={removeTask} addTask={addTask} changeFilter={changeFilter}/>
        </div>
    )
}

export default App;