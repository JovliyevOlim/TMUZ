import { combineReducers } from 'redux';

// Login
import LoginReducer from './auth/reducer.ts';

const rootReducer = combineReducers({
  Login: LoginReducer
});

export default rootReducer;