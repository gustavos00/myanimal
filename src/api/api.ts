import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://myanimalapi.herokuapp.com/api'
})

export default instance