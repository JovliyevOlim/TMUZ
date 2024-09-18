import { combineReducers } from 'redux';

// Login
import LoginReducer from './auth/reducer.ts';

// User
import UserReducer from './user/reducer.ts';

// Work
import WorkReducer from './work/reducer.ts';

//Station
import StationReducer from './station/reducer.ts';

//Device
import DeviceReducer from './device/reducer.ts';

const rootReducer = combineReducers({
  Login: LoginReducer,
  User: UserReducer,
  Work: WorkReducer,
  Station: StationReducer,
  Device: DeviceReducer
});

export default rootReducer;