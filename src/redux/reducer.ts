import {v1} from 'uuid'
import {TodoListsType} from '../App'

type RemoveTodoListAT = {
    type: 'DELETE_TODO_LIST'
    id: string
}

type AddTodoListAT = {
    type: 'ADD_TODO_LIST'
    title: string
}

const initialState = {
    [v1()]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [v1()]:[
        {id: v1(), title: "Ryzen 7 5800X", isDone: true},
        {id: v1(), title: "MSI GTX 3060", isDone: true},
        {id: v1(), title: "GINZZU", isDone: false},
        {id: v1(), title: "Black Fury 16GB", isDone: false},
        {id: v1(), title: "ASUS ROG STRIX B550-F", isDone: false}
    ]
}

const reducer = (todoListBox: Array<TodoListsType>, action: RemoveTodoListAT | AddTodoListAT) => {
    switch(action.type) {
        case 'DELETE_TODO_LIST':
        return todoListBox.filter(item => item.id !== action.id)

        case 'ADD_TODO_LIST':
        return [...todoListBox, {
            id: v1(),
            title: action.title,
            filter: 'all'
        }]

        default:
        return todoListBox
    }
}

export default reducer;