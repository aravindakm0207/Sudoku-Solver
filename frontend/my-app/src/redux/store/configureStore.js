import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; 
import {sectionReducer} from '../reducers/sectionReducer';


const configureStore = () => {
  const store = createStore(combineReducers({
    profiles: profileReducer,
     
 }), applyMiddleware(thunk))
 return store 
}

export default configureStore;
