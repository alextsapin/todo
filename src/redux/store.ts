// Redux
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

// Reducers
import todoReducer from './reducers/todo';
import taskReducer from './reducers/task';

// Объединим редьюсеры
const rootReducer = combineReducers({
    todo: todoReducer,
    task: taskReducer
});

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>;

// Создадим store c помощью redux
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;