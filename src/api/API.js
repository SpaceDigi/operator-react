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
  if (error.response.status === 401) {
    setTimeout(() => {
      forceLogout();
    }, 3000);
  }

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
