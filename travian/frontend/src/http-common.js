import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-type": "application/json"
  }
});