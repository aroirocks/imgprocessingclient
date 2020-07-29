import { createStore } from 'redux';
import rootReducer from './components/Reducers/Index';

const store = createStore(rootReducer);

export default store;
