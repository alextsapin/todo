import React from 'react';
import {TaskType, FilterValuesType} from './App';

import TodoListHeader from './TodoListHeader';
import Button from './components/Button/Button';
import TaskList from './components/TaskList/TaskList';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: string
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = React.useState('');
    const [error, setError] = React.useState('');
    
    const addTask = () => {
        const trimmedTitle = title.trim();
        if(trimmedTitle) {
            props.addTask(trimmedTitle);
            setError('');
            setTitle('');
        } else {
            setError('error')
        }
    }

    const inputClass = error === '' ? 'form-control' : 'form-control is-invalid';

    console.log(props)

    return (
        <div>
            <TodoListHeader title={props.title}/>
            <div>
                <input className={inputClass} value={title} onChange={e => setTitle(e.currentTarget.value)}
                    onKeyPress={(e) => {
                        if(e.key === 'Enter') {
                            addTask()
                        }
                    }}
                />
                <Button title='+' callBack={addTask}/>
            </div>

            <TaskList tasks={props.tasks} removeTask={props.removeTask} addTask={props.addTask} changeStatus={props.changeStatus}/>

            <div>
                <Button 
                    title='All' 
                    callBack={() => props.changeFilter('all')} 
                    filterClass={props.filter === 'all' ? 'btn btn-danger me-2' : 'btn btn-primary me-2'}
                />

                <Button 
                    title='Active' 
                    callBack={() => props.changeFilter('active')} 
                    filterClass={props.filter === 'active' ? 'btn btn-danger me-2' : 'btn btn-primary me-2'}
                />

                <Button 
                    title='Completed' 
                    callBack={() => props.changeFilter('completed')} 
                    filterClass={props.filter === 'completed' ? 'btn btn-danger me-2' : 'btn btn-primary me-2'}
                />
            </div>
        </div>
    )
}

export default TodoList;