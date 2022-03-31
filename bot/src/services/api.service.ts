import axios from "axios";

const { API_SERVER } = process.env;

export const APIService = axios;

APIService.defaults.baseURL = API_SERVER;

console.log(APIService.defaults.baseURL);
