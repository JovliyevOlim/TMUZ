import { combineReducers } from 'redux';

// Login
import LoginReducer from './auth/reducer.ts';

// User
import UserReducer from './user/reducer.ts';

const rootReducer = combineReducers({
  Login: LoginReducer,
  User: UserReducer
});

export default rootReducer;