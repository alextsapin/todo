import {v1} from 'uuid';

export const todoListID1 = v1();
export const todoListID2 = v1();

//type stateType2 = ReturnType<typeof initialState>
type todoListType = {
    id: string
    title: string
    filter: string
}

export type filterType = 'ALL' | 'ACTIVE' | 'COMPLETED';

export type stateType = Array<todoListType>

const initialState = [
    {id: todoListID1, title: 'What to learn:', filter: 'all'},
    {id: todoListID2, title: 'What to buy:', filter: 'all'},
]

type ACType = deleteTodoListType | addTodoListType | changeTodoListTitleType | changeTodoListFilterType;

const todoReducer = (state = initialState, action: ACType)   => {
    switch(action.type) {
        case 'ADD_TODO_LIST': {
            return [...state, 
                {
                    id: action.id,
                    title: action.title,
                    filter: 'all'
                }
            ]
        }
        
        case 'DELETE_TODO_LIST': {
            return [...state].filter(item => item.id !== action.id)
        }

        case 'CHANGE_TODO_LIST_TITLE': {
            return [...state].map(item => item.id === action.id ? {...item, title: action.title} : item)
        }

        case 'CHANGE_TODO_LIST_FILTER': {
            return [...state].map(item => item.id === action.id ? {...item, filter: action.filter} : item)
        }
        
        default: {
            return state
        }
    }
}

export type deleteTodoListType = {
    type: 'DELETE_TODO_LIST'
    id: string
}

export const deleteTodoListAC = (id: string) => {
    return {
        type: 'DELETE_TODO_LIST' as const,
        id
    }
}

export type addTodoListType = {
    type: 'ADD_TODO_LIST'
    id: string
    title: string
}

export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD_TODO_LIST' as const,
        id: v1(),
        title
    }
}

type changeTodoListTitleType = {
    type: 'CHANGE_TODO_LIST_TITLE'
    id: string
    title: string
}

export const changeTodoListTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE_TODO_LIST_TITLE' as const,
        id,
        title
    }
}

type changeTodoListFilterType = {
    type: 'CHANGE_TODO_LIST_FILTER'
    id: string
    filter: filterType
}

export const changeTodoListFilterAC = (id: string, filter: filterType) => {
    return {
        type: 'CHANGE_TODO_LIST_FILTER' as const,
        id,
        filter
    }
}

export default todoReducer;