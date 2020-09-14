import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://react-burger-app-9dd55.firebaseio.com/'
});

export default instance;
