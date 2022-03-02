

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import noteReducer from './notesReducer';
import { passwordReducer } from './passwordReducer';
import { CategoryReducer, ExpenseReducer } from './expenseReducer';


export const rootReducer = combineReducers({
    authReducer, noteReducer, passwordReducer, CategoryReducer, ExpenseReducer
});