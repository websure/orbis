import AxiosClient from "./AxiosClient";

const defaultSettings = {
  withCredentials: false,
  timeout: 60000,
  baseURL: "."
};

const successHandler = response => {
  /* Add logic to log last time stamp of API, update authToken etc.. */
  return response;
};

const errorHandler = error => {
  /* Add logic to edit error messages specific to UI, logs etc */
  return Promise.reject(error ? error.response.data : '');
};

const Api = AxiosClient({
  settings: defaultSettings,
  successHandler: response => successHandler(response),
  errorHandler: error => errorHandler(error),
  // customHeaders:{
  //   authorization: 'OAuth c08d16a783d9d787f86f0a21d80e80dd58d73fe5'
  // }
});

export default Api;
