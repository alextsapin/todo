import React from 'react';
import {TaskType, FilterValuesType} from './App'

import TodoListHeader from './TodoListHeader';
import TodoListButton from './TodoListButton';
import TaskList from './TaskList';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = React.useState('');
    
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    return (
        <div>
            <TodoListHeader title={props.title}/>
            <div>
                <input value={title} onChange={e => setTitle(e.currentTarget.value)}
                    onKeyPress={(e) => {
                        if(e.key === 'Enter') {
                            addTask()
                        }
                    }}
                />
                <TodoListButton title='+' callBack={addTask}/>
            </div>
            <TaskList tasks={props.tasks} removeTask={props.removeTask} addTask={props.addTask}/>
            <div>
                <TodoListButton title='All' callBack={() => props.changeFilter('all')}/>
                <TodoListButton title='Active' callBack={() => props.changeFilter('active')}/>
                <TodoListButton title='Completed' callBack={() => props.changeFilter('completed')}/>
            </div>
        </div>
    )
}

export default TodoList;