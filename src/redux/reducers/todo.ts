import {v1} from 'uuid';

export const todoListID1 = v1();
export const todoListID2 = v1();

//type stateType2 = ReturnType<typeof initialState>
type todoListType = {
    id: string
    title: string
    filter: string
}

export type stateType = Array<todoListType>

const initialState = [
    {id: todoListID1, title: 'What to learn:', filter: 'all'},
    {id: todoListID2, title: 'What to buy:', filter: 'all'},
]

const todoReducer = (state = initialState, action: ACType)   => {
    switch(action.type) {
        case 'ADD_TODO_LIST': {
            return [...state, 
                {
                    id: v1(),
                    title: action.title,
                    filter: 'all'
                }
            ]
        }
        
        case 'DELETE_TODO_LIST': {
            return [...state].filter(item => item.id !== action.id)
        }
        
        default: {
            return state
        }
    }
}

type deleteTodoListType = {
    type: 'DELETE_TODO_LIST',
    id: string
}

const deleteTodoListAC = (id: string) => {
    return {
        type: 'DELETE_TODO_LIST',
        id
    }
}

type addTodoListType = {
    type: 'ADD_TODO_LIST',
    title: string
}

type ACType = deleteTodoListType | addTodoListType

const addTodoListAC = (title: string) => {
    return {
        type: 'ADD_TODO_LIST',
        title
    }
}

export default todoReducer;