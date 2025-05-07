// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-3-87-201-29.compute-1.amazonaws.com:3000", // tu base URL
});

export default api;
