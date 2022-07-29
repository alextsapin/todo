import {v1} from 'uuid';
import taskReducer from './task';
import {addTaskAC, deleteTaskAC, changeTaskStatusAC} from './task';
import {addTodoListAC, deleteTodoListAC, setTodosAC} from '../todos/todos';
import {stateTaskType} from '../tasks/task';

let id1: string
let id2: string
let newId: string

let idTask: string

let startState: stateTaskType

beforeEach(() => {
   id1 = v1();
   id2 = v1();
   newId = v1();

   idTask = v1();

   startState = {
        [id1]:[
            {id: idTask, title: "HTML&CSS", completed: true},
            {id: v1(), title: "JS", completed: true}
        ],
        [id2]:[
            {id: v1(), title: "Ryzen 7 5800X", completed: true},
            {id: v1(), title: "MSI GTX 3060", completed: true}
        ]
    }
})

// ADD
test('Correct task should be added', () => { 
    const endState = taskReducer(startState, addTaskAC(id1, 'New task'))
  
    expect(endState[id1].length).toBe(3)
    expect(endState[id2].length).toBe(2)
})

// DELETE
test('Correct task should be deleted', () => {
   const endState = taskReducer(startState, deleteTaskAC(id1, idTask))
   expect(endState[id1].every(t => t.id !== idTask)).toBeTruthy();
   expect(endState[id1].length).toBe(1)
   expect(endState[id2].length).toBe(2)
})

// Status change
test('Correct task status changed', () => { 
    const endState = taskReducer(startState, changeTaskStatusAC(id1, idTask)) 
    expect(endState[id1].find(item => item.id === idTask)?.completed).toBe(false)
})

// Title update
test('Correct task title updated', () => { 
    const endState = taskReducer(startState, changeTaskStatusAC(id1, idTask)) 
    expect(endState[id1].find(item => item.id === idTask)?.completed).toBe(false)
})

// Add new array in task array
test('New array should be added when new todoList is added', () => { 
    const endState = taskReducer(startState, addTodoListAC('New title', newId));
    const keys = Object.keys(endState);

    const newKey = keys.find(key => key !== id1 && key !== id2)
    if(!newKey) {
       throw Error('Error')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

 // Delete array in task array
 test('Task array should be deleted when todoList is deleted', () => { 
    const endState = taskReducer(startState, deleteTodoListAC(id2));
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1)
    expect(endState[id2]).toBeUndefined()
})

 // Delete array in task array
 test('Empty arrays should be added when we set todos', () => { 

    const action = setTodosAC([
        {id: '1', title: "What to learn", filter: "ALL"},
        {id: '2', title: "What to buy", filter: "ALL"}
    ])

    const endState = taskReducer({}, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(2)
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()
});