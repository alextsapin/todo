import {v1} from 'uuid';

import {todoListID1, todoListID2} from './todo';

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

type ACTypes = addTaskType | deleteTaskType

const taskReducer = (state = initialState, action: ACTypes)   => {
    switch(action.type) {   
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

        default: {
            return state
        }
    }
}

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

export default taskReducer;