import axios from "axios";

const defaultSettings = {
  withCredentials: false,
  timeout: 60000
};

const AxiosClient = ({
  settings = defaultSettings,
  successHandler = response => Promise.resolve(response),
  errorHandler = error => Promise.reject(error),
  customHeaders = {}
}) => {
  const instance = axios.create({ ...settings });

  instance.interceptors.request.use(
    config => {
      /* Add logic to add/update request headers */
      return {
        ...config,
        headers: {
          ...config.headers,
          ...customHeaders
        }
      };
    },
    error => Promise.reject(error)
  );

  instance.interceptors.response.use(
    response => {
      /* Add logic to play with response */
      return successHandler(response.data);
    },
    error => errorHandler(error)
  );

  const get = params => {
    const config = {
      url: "/todos",
      method: "get",
      baseURL: "https://jsonplaceholder.typicode.com"
      // proxy: {
      //   host: "https://jsonplaceholder.typicode.com"
      // }
    };
    console.log("GET ", config);
    return instance.get(params);
    //return instance.request(config);

    // return axios({
    //   method: "get",
    //   url: `https://jsonplaceholder.typicode.com${params}`,
    //   responseType: "json"
    // });
  };

  return {
    get
  };
};

export default AxiosClient;
