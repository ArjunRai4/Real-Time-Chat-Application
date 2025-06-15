
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:"http://localhost:5001/api",
  withCredentials: true, // This allows cookies to be sent with requests
});
//using this we dont have to manually set the baseURL for every request
//we can use this instance in our components or services to make API calls