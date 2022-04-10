import React from 'react';
import Button from '../Button/Button';
import TaskList from '../TaskList/TaskList';
import {TaskType, FilterValuesType} from '../../App';

type TodoListPropsType = {
    todoListID: string
    filter: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    addTask: (todoListID: string, title: string) => void
    changeFilter: (todoListId: string, filter: FilterValuesType) => void
    changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todoListId: string) => void
    updateTask: (todoListId: string, taskId: string, newTitle: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = React.useState('');
    const [error, setError] = React.useState('');
    
    const addTask = () => {
        const trimmedTitle = title.trim();
        if(trimmedTitle) {
            props.addTask(props.todoListID, trimmedTitle);
            setError('');
            setTitle('');
        } else {
            setError('error')
        }
    }

    const inputClass = error === '' ? 'form-control' : 'form-control is-invalid';

    const removeTodoList = () => {}

    return (
        <div className="col-md-4">
            <div className="container">
                <div className="row">
                    <h1>What to learn</h1>
                    <div className="col-md-8">
                        <input className={inputClass} value={title} onChange={e => setTitle(e.currentTarget.value)}
                            onKeyPress={(e) => {
                                if(e.key === 'Enter') {
                                    addTask()
                                }
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <Button title='+' callBack={addTask} btnClass='btn btn-primary'/>
                    </div>

                    <div className="col-md-2">
                        <Button 
                            title='❌' 
                            callBack={removeTodoList} 
                            filterClass={'btn btn-light'}
                        />
                    </div>
                </div>
            </div>

            <TaskList 
                tasks={props.tasks} 
                todoListID={props.todoListID} 
                removeTask={props.removeTask} 
                addTask={props.addTask} 
                changeStatus={props.changeStatus}
                updateTask = {props.updateTask}
            />

            <div className="container">
                <Button 
                    title='All' 
                    callBack={() => props.changeFilter(props.todoListID, 'all')} 
                    filterClass={props.filter === 'all' ? 'btn btn-danger me-2' : 'btn btn-primary me-2'}
                />

                <Button 
                    title='Active' 
                    callBack={() => props.changeFilter(props.todoListID, 'active')} 
                    filterClass={props.filter === 'active' ? 'btn btn-danger me-2' : 'btn btn-primary me-2'}
                />

                <Button 
                    title='Completed' 
                    callBack={() => props.changeFilter(props.todoListID, 'completed')} 
                    filterClass={props.filter === 'completed' ? 'btn btn-danger me-2' : 'btn btn-primary me-2'}
                />
            </div>
        </div>
    )
}

export default TodoList;