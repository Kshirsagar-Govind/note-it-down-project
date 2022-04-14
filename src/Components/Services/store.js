import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";
import { rootReducer } from './Reducers';
const persistConfig = {
    key: 'root',
    storage,
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, rootReducer);


// export default () => {
//     let store = createStore(
//         rootReducer,
//         persistedReducer,
//         composeEnhancers(applyMiddleware(thunk))

//     );
//     let persistor = persistStore(store)
//     return { store, persistor }
// }



const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);

let persistor = persistStore(store);
export { persistor };
export default store;
