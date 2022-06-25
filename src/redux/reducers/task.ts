import {v1} from 'uuid';

export const todoListID1 = v1();
export const todoListID2 = v1();

const initialState = [
    {id: todoListID1, title: 'What to learn:', filter: 'all'},
    {id: todoListID2, title: 'What to buy:', filter: 'all'},
]

const todoReducer = (state = initialState, action: any)   => {
    switch(action.type) {        
        default: {
            return state
        }
    }
}

export default todoReducer;