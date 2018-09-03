import axios from 'axios';

axios.defaults.headers.common = {
  'Accept': 'application/json'
};

const timeout = process.env.ERGO_EXPLORER_TIMEOUT;

axios.defaults.timeout = timeout ? parseInt(timeout, 10) : 60000;

axios.interceptors.response.use((request: any) => {
  return request;
},  (error) => {
  if (error.code === 'ECONNABORTED') {
    console.error(`[ERROR] Request Timeout ${error.config.url}`);
    
    return false;
  }
  
  return Promise.reject(error);
});
