import {v1} from 'uuid';
import {Dispatch} from 'redux';
import {todosAPI} from '../../../api/api';
import {filterType, todoDomainType, deleteTodoListType, addTodoListType, changeTodoListTitleType, changeTodoListFilterType, setTodosType} from './types'

export const todoListID1 = v1();

const initialState: any = []

type ACType = deleteTodoListType | addTodoListType | changeTodoListTitleType | changeTodoListFilterType | setTodosType;

const todoReducer = (state = initialState, action: ACType): Array<todoDomainType>   => {
    switch(action.type) {

        case 'SET_TODOS': {
            return action.data.map((item: any)  => {
                return {
                    ...item, filter: 'ALL'
                }
            })
        }

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

export default todoReducer;


export const deleteTodoListAC = (id: string) => {
    return {
        type: 'DELETE_TODO_LIST' as const,
        id
    }
}

export const addTodoListAC = (title: string, id: string) => {
    return {
        type: 'ADD_TODO_LIST' as const,
        id,
        title
    }
}

export const changeTodoListTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE_TODO_LIST_TITLE' as const,
        id,
        title
    }
}

export const changeTodoListFilterAC = (id: string, filter: filterType) => {
    return {
        type: 'CHANGE_TODO_LIST_FILTER' as const,
        id,
        filter
    }
}

export const setTodosAC = (data: Array<todoDomainType>) => {
    return {
        type: 'SET_TODOS' as const,
        data
    }
}

// Thunk creators
export const addTodoListTC = (title: string): any => {
    return async (dispatch: Dispatch) => {
        todosAPI.createTodo(title).then((response) => {
            console.log(response)
            dispatch(addTodoListAC(title, response.data.data.item.id))
        })
    }
}

export const deleteTodoListTC = (id: string): any => {
    return async (dispatch: Dispatch) => {
        todosAPI.deleteTodo(id).then(() =>{
            dispatch(deleteTodoListAC(id))
        })
    }
}

export const changeTodoListTitleTC = (id: string, title: string): any => {
    return async (dispatch: Dispatch) => {
        dispatch(changeTodoListTitleAC(id, title))
    }
}

export const changeTodoListFilterTC = (id: string, filter: filterType): any => {
    return async (dispatch: Dispatch) => {
        dispatch(changeTodoListFilterAC(id, filter))
    }
}

export const getTodosTC = (): any => {
    return async (dispatch: Dispatch) => {
        todosAPI.getTodos().then((response) => {
            dispatch(setTodosAC(response))
        })
    }
}