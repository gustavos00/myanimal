import axios from 'axios';

//https://myanimalapi.herokuapp.com/api
//http://localhost:3000/api
let baseURL = 'https://myanimalapi.herokuapp.com/api';

const instance = axios.create({
  baseURL,
});

export default instance;
