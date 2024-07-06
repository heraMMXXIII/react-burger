import { createStore, combineReducers } from 'redux';
import { tabReducer } from './reducers/tab-info';

const rootReducer = combineReducers({
  tabInfo: tabReducer,
});

const store = createStore(rootReducer);

export default store;
