import { combineReducers } from 'redux';

// Login
import LoginReducer from './auth/reducer.ts';

// User
import UserReducer from './user/reducer.ts';

// Work
import WorkReducer from './work/reducer.ts';

//Station
import StationReducer from './station/reducer.ts';

//LevelCrossingDevice
import DeviceReducer from './device/reducer.ts';

//Action
import ActionReducer from './action/reducer.ts';

//Plot
import MtuReducer from './mtu/reducer.ts';

//EnterPrise
import EnterPriseReducer from './enterprise/reducer.ts';

//Plot
import PlotReducer from './plot/reducer.ts';

//LevelCrossingDevice
import LevelCrossingReducer from './levelCrossing/reducer.ts';

//Category
import CategoryReducer from './category/reducer.ts';

const rootReducer = combineReducers({
  Category: CategoryReducer,
  LevelCrossing: LevelCrossingReducer,
  Plot: PlotReducer,
  EnterPrise: EnterPriseReducer,
  Mtu: MtuReducer,
  Login: LoginReducer,
  User: UserReducer,
  Work: WorkReducer,
  Station: StationReducer,
  Device: DeviceReducer,
  Action: ActionReducer
});

export default rootReducer;