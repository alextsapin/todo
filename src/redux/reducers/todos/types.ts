export type filterType = 'ALL' | 'ACTIVE' | 'COMPLETED';

export type TodoListType = {
    id: string
    title: string
    filter: filterType
}

export type deleteTodoListType = {
    type: 'DELETE_TODO_LIST'
    id: string
}

export type addTodoListType = {
    type: 'ADD_TODO_LIST'
    id: string
    title: string
}


export type changeTodoListTitleType = {
    type: 'CHANGE_TODO_LIST_TITLE'
    id: string
    title: string
}

export type changeTodoListFilterType = {
    type: 'CHANGE_TODO_LIST_FILTER'
    id: string
    filter: filterType
}

export type setTodosType = {
    type: 'SET_TODOS'
    data: any
}