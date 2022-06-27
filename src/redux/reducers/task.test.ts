import taskReducer from './task';
import {v1} from 'uuid';

import {addTaskAC, deleteTaskAC} from './task';

test('Correct task should be added', () => {
    const id1 = v1();
    const id2 = v1();
 
    const startState = {
         [id1]:[
             {id: v1(), title: "HTML&CSS", isDone: true},
             {id: v1(), title: "JS", isDone: true}
         ],
         [id2]:[
             {id: v1(), title: "Ryzen 7 5800X", isDone: true},
             {id: v1(), title: "MSI GTX 3060", isDone: true}
         ]
     }
 
    const endState = taskReducer(startState, addTaskAC(id1, 'New task'))
 
    console.log(endState)
 
    //expect(endState[id1].find(item => item.id === idTask)).toBe(true);
    expect(endState[id1].length).toBe(3)
    expect(endState[id2].length).toBe(2)
 });

test('Correct task should be deleted', () => {
   const id1 = v1();
   const id2 = v1();
   const idTask = v1();

   const startState = {
        [id1]:[
            {id: idTask, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [id2]:[
            {id: v1(), title: "Ryzen 7 5800X", isDone: true},
            {id: v1(), title: "MSI GTX 3060", isDone: true}
        ]
    }

   const endState = taskReducer(startState, deleteTaskAC(id1, idTask))

   expect(endState[id1].every(t => t.id !== idTask)).toBeTruthy();
   expect(endState[id1].length).toBe(1)
   expect(endState[id2].length).toBe(2)
  
});