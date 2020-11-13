import axios from "axios";
import Keys from "../Constants/helper";

let headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

if (localStorage.getItem(Keys.JWT_TOKEN))
  headers.Authorization = localStorage.getItem(Keys.JWT_TOKEN);

let API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/",
  timeout: 30000,
  headers: headers,
});

API.interceptors.request.use((request) => requestHandler(request));

API.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

const errorHandler = (error, props) => {
  // console.log(error.request)
  // console.log(error.response)
  // if (error.response === undefined || error.response.status === 403) {
  //     forceLogout();
  //     return Promise.reject({...error})
  // } else {
  //     return error
  // }
  // alert(error.response.data.errorMsg)
  console.log(error)
  if (error.response.status === 401) {
    forceLogout();
  }
  //  else {
  //   props.history.push({
  //     pathname: '/error',
  //     state: { error: error.response.data.errorMsg }
  //   });
  // }

  return Promise.reject(error);
};

const successHandler = (response) => {
  return response;
};

const requestHandler = (request) => {
  // console.log(request)
  return request;
};

export function forceLogout() {
  localStorage.clear();
  window.location = "/";
}

export default API;
