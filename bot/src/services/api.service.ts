import axios from "axios";

const { API_SERVER } = process.env;

export const APIService = axios.create({
  baseURL: API_SERVER,
});
