import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
});

axiosInstance.interceptors.request.use((config)=> {
    const token = localStorage.getItem('token');
    if (token) {
        if (config) 
            config.headers.token = token;
    }
    return config;
},(error) => {
    return Promise.reject(error);
});
export default axiosInstance;