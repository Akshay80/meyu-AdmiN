import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://192.168.5.115:8081/api/'
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