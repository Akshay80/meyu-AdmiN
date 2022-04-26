import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://52.77.236.78:8083/api/'
});

instance.interceptors.request.use((request) => {
    if (request.method === 'get') {
        request.data = true
      }
    console.log("THIS IS MY REQUEST: ",request)
    request.headers.common['Authorization'] = localStorage.getItem('token')
     return request;
})

instance.interceptors.response.use((response) => {
    console.log(response);
    return response;
})

export default instance;