import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY || ''
    }
})

type todoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type todoResponse<D> = {
    resultCode: number
    messages: string[]
    data: D
}

type taskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type taskResponse = {
    error: string | null
    totalCount: number
    items: taskType[]
}

export const todosAPI = {
    getTodos() {
        return instance.get<any[]>(`todo-lists`).then((response) => {
            console.log(response.data)
            return response.data; 
        })
    },

    createTodo(title: string) {
        return instance.post<todoResponse<{item: todoType}>>(`todo-lists`, {title: title}).then((response) => {
            return response; 
        })
    },

    deleteTodo(id: string) {
        return instance.delete<todoResponse<{}>>(`todo-lists/${id}`,).then((response) => {
            return response; 
        })
    },

    updateTodo(id: string, title: string) {
        return instance.put<todoResponse<{}>>(`todo-lists/${id}`,{title: title}).then((response) => {
            return response; 
        })
    }
}

export const tasksAPI = {
    getTasks(todoListId: string) {
        return instance.get<taskResponse>(`todo-lists/${todoListId}/tasks`).then((response) => {
            return response.data; 
        })
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete(`todo-lists/${todoId}/tasks/${taskId}`)
    }
}