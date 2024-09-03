import { Navigate } from 'react-router-dom';
import Calendar from '../pages/Calendar.tsx';
import Profile from '../pages/Profile.tsx';
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


const authProtectedRoutes = [
  // Dashboard
  { path: '/dashboard', component: <ECommerce /> },

  // Calendar
  { path: '/calendar', component: <Calendar /> },

  // Users
  { path: '/users', component: <Users /> },

  // Work
  { path: '/work', component: <Works /> },

  //Profile
  { path: '/profile', component: <Profile /> },

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
  { path: '/register', component: <SignUp /> }
];

export { authProtectedRoutes, publicRoutes };