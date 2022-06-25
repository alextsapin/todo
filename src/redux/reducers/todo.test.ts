import todoReducer from './todo';
import {v1} from 'uuid';

test('Correct todolist should be deleted', () => {
   const id1 = v1();
   const id2 = v1();

   const startState = [
       {id: id1, title: "What to learn", filter: "all"},
       {id: id2, title: "What to buy", filter: "all"}
   ]

   const endState = todoReducer(startState, {type: 'DELETE_TODO_LIST', id: id1})

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(id2);
});

test('Correct todolist should be added', () => {
    const id1 = v1();
    const id2 = v1();

    const title = 'Some text';


    const startState = [
        {id: id1, title: "What to learn", filter: "all"},
        {id: id2, title: "What to buy", filter: "all"}
    ]
 
    const endState = todoReducer(startState, {type: 'ADD_TODO_LIST', title: title})
 
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(title);
 });