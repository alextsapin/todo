import React from 'react';
import TodoList from './TodoList';
import './App.css';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const [tasks, setTasks] = React.useState([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS / ES6', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ])

    const removeTask = (id: number) => {
        const filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

    return (
        <div className="App">
            <TodoList title='What to learn' tasks={tasks} removeTask={removeTask}/>
        </div>
    )
}

export default App;