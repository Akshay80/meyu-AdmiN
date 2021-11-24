import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://192.168.5.34:8081/api/'
});

// instance.defaults.headers.common['Authorization'] = 'Bearer'+localStorage.getItem('token');

export default instance;