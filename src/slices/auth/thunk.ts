//Include Both Helper File with needed methods


import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';
import { postLogin } from '../../helpers/backend_helpers.ts';
import { toast } from 'react-toastify';

export const loginUser = (user: any, navigate: any) => async (dispatch: any) => {
  try {
    let response;
    response = postLogin({
      username: user.username,
      password: user.password
    });
    var data: any = await response;
    if (data) {
      localStorage.setItem('authUser', JSON.stringify(data.data));
      if (data.success) {
        dispatch(loginSuccess(data.data));
        if (document.referrer == '/singIn') {
          if (window.location.pathname == '/singIn') {
            window.history.back();
          }
        } else {
          navigate('/dashboard');
        }
      } else {
        dispatch(apiError(data.data));
      }
    }
  } catch (error) {
    dispatch(apiError(error));
    toast.error(error, { autoClose: 3000 });
  }
};

export const loginUserOther = (user: any) => async (dispatch: any) => {
  try {
    let response;
    response = postLogin({
      username: user.username,
      password: user.password
    });
    var data: any = await response;
    if (data) {
      localStorage.setItem('authUser', JSON.stringify(data.data));
      if (data.success) {
        dispatch(loginSuccess(data.data));
      } else {
        dispatch(apiError(data.data));
      }
    }
  } catch (error) {
    dispatch(apiError(error));
    toast.error(error, { autoClose: 3000 });
  }
};

export const logoutUser = () => async (dispatch: any) => {
  try {
    localStorage.removeItem('authUser');
    dispatch(logoutUserSuccess(true));

  } catch (error) {
    dispatch(apiError(error));
  }
};


export const resetLoginFlag = () => async (dispatch: any) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};