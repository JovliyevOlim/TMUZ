import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';


// default
axios.defaults.baseURL = 'http://192.168.1.93:8080/api';
// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';

// content type
const authUser: any = sessionStorage.getItem('authUser');
const token = JSON.parse(authUser) ? JSON.parse(authUser).message : null;
console.log(JSON.parse(authUser));
console.log(token);
if (token)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

// intercepting to capture errors
axios.interceptors.response.use(
  function(response) {
    return response.data ? response.data : response;
  },
  function(error) {
    console.log(error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.response.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Invalid credentials';
        break;
      case 404:
        message = 'Sorry! the data you are looking for could not be found';
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
  const user = sessionStorage.getItem('authUser');
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };