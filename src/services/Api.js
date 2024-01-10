import Axios from "axios";

const apiUrl = `https://adsy.co.in/Backend`;

const token = JSON.parse(localStorage.getItem("adsyUser"))?.token;

const axios = Axios.create({
  baseURL: apiUrl,
});

axios.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${token}`;
  return config;
});

export default axios;
