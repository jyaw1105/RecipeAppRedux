import {combineReducers} from 'redux'
import * as recipesReducer from './recipes';
import * as navReduces from './navigation';

export default combineReducers(Object.assign(
  recipesReducer,
  navReduces
));
