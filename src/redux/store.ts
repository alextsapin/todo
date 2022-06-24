// Redux
import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

// Reducers
import reducer from './reducer';

// Объединим редьюсеры
let rootReducer = combineReducers({
    main: reducer
});

type rootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<rootReducerType>;

// Создадим store c помощью redux
let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;