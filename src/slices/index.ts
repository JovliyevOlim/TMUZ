import { combineReducers } from 'redux';

// Login
import LoginReducer from './auth/reducer.ts';

// User
import UserReducer from './user/reducer.ts';

// Work
import WorkReducer from './work/reducer.ts';

const rootReducer = combineReducers({
  Login: LoginReducer,
  User: UserReducer,
  Work: WorkReducer
});

export default rootReducer;