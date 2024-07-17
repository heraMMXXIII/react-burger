import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { tabReducer } from './reducers/tab-info';


export default configureStore({
    reducer: rootReducer
});
