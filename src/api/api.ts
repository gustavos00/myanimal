import axios from "axios";

let baseURL = false
  ? "https://myanimalapi.herokuapp.com/api"
  : "http://localhost:3000/api";

const instance = axios.create({
  baseURL,
});

export default instance;
