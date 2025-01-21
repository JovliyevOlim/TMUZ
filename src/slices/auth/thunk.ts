//Include Both Helper File with needed methods


import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';
import { postLogin } from '../../helpers/backend_helpers.ts';
import { toast } from 'react-toastify';
import { checkPermission } from '../../helpers/utils.tsx';

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
        const isCheck = checkPermission(data.data?.userEmployeeDto.user.role?.permissions, ['GET_DEVICE']);
        if (isCheck) {
          navigate('/dashboard');
        } else {
          navigate('/works');
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
      const today = new Date();
      localStorage.setItem('authUser', JSON.stringify(data.data));
      localStorage.setItem('savedDate', today.toISOString());
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