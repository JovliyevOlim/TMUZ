import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';


// export const localUrl = 'http://192.168.1.100:5173';
export const localUrl = 'https://tmuz-git-master-jovliyevolims-projects.vercel.app';
// export const localUrl = 'https://tmuz.netlify.app';
// export const baseUrl = 'http://192.168.1.50:8080/api';
export const baseUrl = 'https://railway-3187acae3c60.herokuapp.com/api';
// export const baseUrl = 'http://192.168.1.50:8080/api';
// default
axios.defaults.baseURL = baseUrl;
// content type
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// content type
const authUser: any = localStorage.getItem('authUser');
const token = JSON.parse(authUser) ? JSON.parse(authUser).token : null;
console.log(JSON.parse(authUser));
console.log(token);
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

// intercepting to capture errors
axios.interceptors.response.use(
  function(response) {
    return response.data ? response.data : response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.response.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        window.location.href = '/signIn';
        message = 'Invalid credentials';
        break;
      // case 403:
      //   window.location.href = '/signIn';
      //   message = 'Login qilish kerak';
      //   break;
      case 404:
        message = error.response.data.message;
        break;
      case 409:
        message = error.response.data.message;
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: string) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

class APIClient {
  /**
   * Fetches data from the given URL
   */
  get = (url: string, params?: any): Promise<AxiosResponse> => {
    let response: Promise<AxiosResponse>;

    let paramKeys: string[] = [];
    if (params) {
      Object.entries(params).map(([key, value]) => {
        if (value != null) {
          paramKeys.push(key + '=' + params[key]);
          return paramKeys;
        }
      });
      const queryString = paramKeys && paramKeys.length ? paramKeys.join('&') : '';
      response = axios.get(`${url}?${queryString}`);
    } else {
      response = axios.get(`${url}`);
    }
    return response;
  };

  /**
   * Posts the given data to the URL
   */
  create = (url: string, data: any): Promise<AxiosResponse> => {
    console.log(token);
    return axios.post(url, data);
  };


  /**
   * Updates data
   */
  update = (url: string, data: any): Promise<AxiosResponse> => {
    return axios.patch(url, data);
  };


  put = (url: string, data: any): Promise<AxiosResponse> => {
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios.delete(url, { ...config });
  };
}

const getLoggedinUser = () => {
  const user = localStorage.getItem('authUser');
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };