import { Navigate } from 'react-router-dom';
import Calendar from '../pages/Calendar.tsx';
import FormElements from '../pages/Form/FormElements.tsx';
import FormLayout from '../pages/Form/FormLayout.tsx';
import Tables from '../pages/Tables.tsx';
import Settings from '../pages/Settings.tsx';
import Alerts from '../pages/UiElements/Alerts.tsx';
import Buttons from '../pages/UiElements/Buttons.tsx';
import SignIn from '../pages/Authentication/SignIn.tsx';
import SignUp from '../pages/Authentication/SignUp.tsx';
import ECommerce from '../pages/Dashboard/ECommerce.tsx';
import Users from '../pages/Users/Users.tsx';
import Works from '../pages/Works/Works.tsx';
import MapOne from '../components/Maps/MapOne';
import Stations from '../pages/Station/Station.tsx';
import Device from '../pages/Device/Device.tsx';
import DeviceInfo from '../pages/Device/DeviceInfo.tsx';
import ReloadSignIn from '../pages/Authentication/ReloadSignIn.tsx';
import Actions from '../pages/Device/Actions.tsx';
import MTU from '../pages/MTU/MTU.tsx';
import Enterprise from '../pages/Enterprise/Enterprise.tsx';
import Plot from '../pages/Plot/Plot.tsx';
import LevelCrossing from '../pages/LevelCrossing/LevelCrossing.tsx';


const authProtectedRoutes = [
  // Dashboard
  { path: '/dashboard', component: <ECommerce /> },

  // Calendar
  { path: '/calendar', component: <Calendar /> },

  // Users
  { path: '/users', component: <Users /> },

  // Work
  { path: '/work', component: <Works /> },

  //Stations
  { path: '/stations', component: <Stations /> },

  //Mtu
  { path: '/mtu', component: <MTU /> },

  //EnterPrise
  { path: '/enterprise', component: <Enterprise /> },

  //Plot
  { path: '/plot', component: <Plot /> },

  //Level Crossing
  { path: '/levelCrossing', component: <LevelCrossing /> },

  //Action
  { path: '/action', component: <Actions /> },

  //LevelCrossing
  { path: '/device', component: <Device /> },

  //Profile
  { path: '/profile', component: <MapOne /> },

  // Forms
  { path: '/forms/form-elements', component: <FormElements /> },
  { path: '/forms/form-layout', component: <FormLayout /> },

  // Tables
  { path: '/tables', component: <Tables /> },

  // Settings
  { path: '/settings', component: <Settings /> },

  // Ui
  { path: '/ui/alerts', component: <Alerts /> },
  { path: '/ui/buttons', component: <Buttons /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: '/',
    exact: true,
    component: <Navigate to="/dashboard" />
  },
  { path: '*', component: <Navigate to="/dashboard" /> }
];

const publicRoutes = [
  // Authentication Page
  { path: '/login', component: <SignIn /> },
  { path: '/signIn', component: <ReloadSignIn /> },
  { path: '/register', component: <SignUp /> },
  //LevelCrossing
  { path: '/deviceInfo/:id', component: <DeviceInfo /> }
];

export { authProtectedRoutes, publicRoutes };