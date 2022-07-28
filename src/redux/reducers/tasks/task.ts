import {v1} from 'uuid';
import {Dispatch} from 'redux';
import {setTodosAC, todoListID1, todoListID2} from '../todos/todos';
import {addTodoListType, deleteTodoListType, setTodosType} from '../todos/types';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskBoxType = {
    [key: string]: Array<TaskType>
}

const initialState = {
    [todoListID1]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todoListID2]:[
        {id: v1(), title: "Ryzen 7 5800X", isDone: true},
        {id: v1(), title: "MSI GTX 3060", isDone: true},
        {id: v1(), title: "GINZZU", isDone: false},
        {id: v1(), title: "Black Fury 16GB", isDone: false},
        {id: v1(), title: "ASUS ROG STRIX B550-F", isDone: false}
    ]
}

type ACTypes = addTaskType | deleteTaskType | changeTaskStatusType | updateTaskSTitleType | addTodoListType | deleteTodoListType | setTodosType

const taskReducer = (state = initialState, action: ACTypes): TaskBoxType   => {
    switch(action.type) {   

        case 'SET_TODOS': {
            const copy = {...state}
            action.data.forEach((item: any) => {
                copy[item.id] = []
            })
            return copy
        }

        case 'ADD_TASK': {
            return {
                ...state, [action.todoListID]: [...state[action.todoListID], {
                    id: v1(),
                    title: action.title,
                    isDone: false
                }]
            }
        }

        case 'DELETE_TASK': {
            return {
                ...state, [action.todoListID]: state[action.todoListID].filter(item => item.id !== action.taskID)
            }
        }

        case 'CHANGE_TASK_STATUS': {
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(item => item.id === action.taskID ? {...item, isDone: !item.isDone}: item)
            }
        }

        case 'UPDATE_TASK_TITLE': {
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(item => item.id === action.taskID ? {...item, title: action.title}: item)
            }
        }

        case 'ADD_TODO_LIST': {
            return {
                ...state, [action.id]: []
            }
        }

        case 'DELETE_TODO_LIST': {
            const copy = {...state}
            delete copy[action.id]
            return copy
        }

        default: {
            return state
        }
    }
}

export default taskReducer;

type addTaskType = {
    type: 'ADD_TASK'
    todoListID: string
    title: string
}

export const addTaskAC = (todoListID: string, title: string) => {
    return {
        type: 'ADD_TASK' as const,
        todoListID,
        title
    }
}

type deleteTaskType = {
    type: 'DELETE_TASK'
    todoListID: string
    taskID: string
}

export const deleteTaskAC = (todoListID: string, taskID: string) => {
    return {
        type: 'DELETE_TASK' as const,
        todoListID,
        taskID
    }
}

type changeTaskStatusType = {
    type: 'CHANGE_TASK_STATUS'
    todoListID: string
    taskID: string
}

export const changeTaskStatusAC = (todoListID: string, taskID: string) => {
    return {
        type: 'CHANGE_TASK_STATUS' as const,
        todoListID,
        taskID
    }
}

type updateTaskSTitleType = {
    type: 'UPDATE_TASK_TITLE'
    todoListID: string
    taskID: string
    title: string
}

export const updateTaskTitleAC = (todoListID: string, taskID: string, title: string) => {
    return {
        type: 'UPDATE_TASK_TITLE' as const,
        todoListID,
        taskID,
        title
    }
}

// Thunk creators
export const addTaskTC = (todoListID: string, title: string): any => {
    return async (dispatch: Dispatch) => {
        dispatch(addTaskAC(todoListID, title))
    }
}

export const deleteTaskTC = (todoListID: string, taskID: string): any => {
    return async (dispatch: Dispatch) => {
        dispatch(deleteTaskAC(todoListID, taskID))
    }
}

export const changeTaskStatusTC = (todoListID: string, taskID: string): any => {
    return async (dispatch: Dispatch) => {
        dispatch(changeTaskStatusAC(todoListID, taskID))
    }
}

export const updateTaskTitleTC = (todoListID: string, taskID: string, title: string): any => {
    return async (dispatch: Dispatch) => {
        dispatch(updateTaskTitleAC(todoListID, taskID, title))
    }
}