import React from 'react';
import TodoList from './TodoList';
import './App.css';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const tasks: Array<TaskType> = [
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS / ES6', isDone: true},
        {id: 1, title: 'React', isDone: false}
    ]

    return (
        <div className="App">
            <TodoList title='What to learn' tasks={tasks}/>
            <TodoList title='What to buy' tasks={tasks}/>
            <TodoList title='What to read' tasks={tasks}/>
        </div>
    )
}

export default App;