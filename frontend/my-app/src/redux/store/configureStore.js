import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; 
import profileReducer from '../reducers/profileReducer';


const configureStore = () => {
  const store = createStore(combineReducers({
    profile: profileReducer,
     
 }), applyMiddleware(thunk))
 return store 
}

export default configureStore;
