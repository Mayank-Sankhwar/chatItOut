import axios from "axios";

export const axiosInstance = axios.create({
  // httpOnly:true,
  // maxAge:3*24*60*60*1000,
  baseURL: import.meta.env.MODE === "development"
   ? "http://localhost:3002/api" : "/api",
   
  withCredentials: true,
});