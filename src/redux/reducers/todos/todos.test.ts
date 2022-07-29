import {v1} from 'uuid';
import todoReducer from './todos';
import {deleteTodoListAC, addTodoListAC, changeTodoListTitleAC, changeTodoListFilterAC} from './todos';
import {filterType} from './types';

let id1: string
let id2: string
let newId: string
let title: string

let startState: Array<{
    id: string
    title: string
    filter: filterType
}>

beforeEach(() => {
    id1 = v1();
    id2 = v1();
    newId = v1();
    title = 'New title';

    startState = [
        {id: id1, title: "What to learn", filter: "ALL"},
        {id: id2, title: "What to buy", filter: "ALL"}
    ]
});

test('Correct todolist should be deleted', () => {
   const endState = todoReducer(startState, deleteTodoListAC(id1))
   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(id2);
});

test('Correct todolist should be added', () => { 
    const endState = todoReducer(startState, addTodoListAC(title, newId))
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(title);
});

test('todoList title should be changed', () => { 
    const endState = todoReducer(startState, changeTodoListTitleAC(id1, title))
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(title);
});

test('todoList filter should be changed', () => { 
    const endState = todoReducer(startState, changeTodoListFilterAC(id1, 'ALL'))
    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe('ALL');
});