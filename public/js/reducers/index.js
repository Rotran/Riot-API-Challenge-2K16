import { combineReducers } from 'redux';
import championReducer from './championReducer';
import statsReducer from './statsReducer';

const todoApp = combineReducers({
  statsReducer,
  championReducer,
});

export default todoApp;
