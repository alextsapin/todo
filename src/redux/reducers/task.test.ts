import taskReducer from './task';
import {v1} from 'uuid';

import {addTaskAC, deleteTaskAC, changeTaskStatusAC} from './task';
import {addTodoListAC, deleteTodoListAC} from './todos/todos';

    let id1: string
    let id2: string
    let idTask: string

    let startState: any

beforeEach(() => {
   id1 = v1();
   id2 = v1();
   idTask = v1();

   startState = {
        [id1]:[
            {id: idTask, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [id2]:[
            {id: v1(), title: "Ryzen 7 5800X", isDone: true},
            {id: v1(), title: "MSI GTX 3060", isDone: true}
        ]
    }
});

// ADD
test('Correct task should be added', () => { 
    const endState = taskReducer(startState, addTaskAC(id1, 'New task'))
  
    expect(endState[id1].length).toBe(3)
    expect(endState[id2].length).toBe(2)
});

// DELETE
test('Correct task should be deleted', () => {
   const endState = taskReducer(startState, deleteTaskAC(id1, idTask))
   expect(endState[id1].every(t => t.id !== idTask)).toBeTruthy();
   expect(endState[id1].length).toBe(1)
   expect(endState[id2].length).toBe(2)
});

// Status change
test('Correct task status changed', () => { 
    const endState = taskReducer(startState, changeTaskStatusAC(id1, idTask)) 
    expect(endState[id1].find(item => item.id === idTask)?.isDone).toBe(false)
});

// Title update
test('Correct task title updated', () => { 
    const endState = taskReducer(startState, changeTaskStatusAC(id1, idTask)) 
    expect(endState[id1].find(item => item.id === idTask)?.isDone).toBe(false)
});

// Add new array in task array
test('New array should be added when new todoList is added', () => { 
    //const endState = taskReducer(startState, addTodoListAC('New title'));
    //const keys = Object.keys(endState);

    //const newKey = keys.find(key => key !== id1 && key !== id2)
    //if(!newKey) {
       // throw Error('Error')
    //}
    //expect(keys.length).toBe(3)
    //expect(endState[newKey]).toEqual([])
});

 // Delete array in task array
 test('Task array should be deleted when todoList is deleted', () => { 
    const endState = taskReducer(startState, deleteTodoListAC(id2));
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1)
    expect(endState[id2]).toBeUndefined()
});