import axios from "axios";

export const API_URL = 'http://13.49.228.144/api/v1/'

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bareer ${localStorage.getItem('token')}`
  return config;
})