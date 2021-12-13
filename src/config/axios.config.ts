import axios from 'axios';

axios.defaults.headers.common = {
  Accept: 'application/json',
};

const timeout = process.env.ERGO_EXPLORER_TIMEOUT;

axios.defaults.timeout = timeout ? parseInt(timeout, 10) : 60000;

axios.interceptors.response.use(
  (request: any) => {
    return request;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error(`Request Aborted (timeout): ${error.config?.url}`);

      return Promise.reject(error);
    }

    console.error(`Request Error ${error.config?.url}`);

    return Promise.reject(error);
  }
);
