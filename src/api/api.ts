import axios from 'axios';

//https://myanimalapi.herokuapp.com/api
//http://localhost:3000/api
let baseURL = 'http://192.168.1.8:3000/api';

const instance = axios.create({
  baseURL,
});

export default instance;
