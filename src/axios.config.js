import axios from "axios";
const instance = axios.create({
  withCredentials: true,
  baseURL: "https://ecomback-ynu9.onrender.com",
});
export default instance;
