import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://192.168.5.34:8081/api/'
});
instance.interceptors.request.use((request) => {
    console.log("THIS IS MY REQUEST: ",request);
    var header = {
        'content-type': "application/json",
    }

    request.headers.common = header;
     return request;
})
instance.interceptors.response.use((response) => {
    console.log("THIS IS MY RESPONSE:", response)
})
instance.defaults.headers.common['Authorization'] = localStorage.getItem('token');
// instance.defaults.headers.common["content-type"] = "application/json"
// instance.defaults.headers.common['content-type'] = "application/json; charset=utf-8"


export default instance;