// Redux
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

// Reducers
import todoReducer from './reducers/todo';

// Объединим редьюсеры
let rootReducer = combineReducers({
    todo: todoReducer
});

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>;

// Создадим store c помощью redux
let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;