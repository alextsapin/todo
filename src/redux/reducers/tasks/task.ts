import {v1} from 'uuid';
import {Dispatch} from 'redux';
import {setTodosAC, todoListID1} from '../todos/todos';
import {addTodoListType, deleteTodoListType, setTodosType} from '../todos/types';
import {taskType, todoType} from '../../../api/api';
import {tasksAPI} from '../../../api/api';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type stateTaskType = {
    [key: string]: Array<taskType>
}

const initialState: stateTaskType = {}

type ACTypes = addTaskType | deleteTaskType | changeTaskStatusType | updateTaskSTitleType | addTodoListType | deleteTodoListType | setTodosType

const taskReducer = (state = initialState, action: ACTypes): stateTaskType   => {
    switch(action.type) {   

        case 'SET_TODOS': {
            const copy = {...state}
            action.data.forEach((item: todoType) => {
                copy[item.id] = []
            })
            return copy
        }

        case 'ADD_TASK': {
            return {
                ...state, [action.todoListID]: [...state[action.todoListID], {
                    id: v1(),
                    title: action.title,
                    completed: false
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
                ...state, [action.todoListID]: state[action.todoListID].map(item => item.id === action.taskID ? {...item, isDone: !item.completed}: item)
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

export const setTasksAC = (id: string, taskBox: taskType[]) => {
    return {
        type: 'SET_TASKS',
        id,
        taskBox
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

export const getTasksTC = (todoListID: string): any => {
    return async (dispatch: Dispatch) => {
        tasksAPI.getTasks(todoListID).then((response) => {
            dispatch(setTasksAC(todoListID, response))
        })
    }
}