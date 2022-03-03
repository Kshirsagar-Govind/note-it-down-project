

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import noteReducer from './notesReducer';
import { passwordReducer } from './passwordReducer';
import { CategoryReducer, ExpenseReducer } from './expenseReducer';
import { tasksReducer } from './tasksReducer';


export const rootReducer = combineReducers({
    authReducer, noteReducer, passwordReducer, CategoryReducer, ExpenseReducer, tasksReducer
});