import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-561e6.firebaseio.com/'
});

export default instance;
