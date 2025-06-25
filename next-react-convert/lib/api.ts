import axios from 'axios'

const api = axios.create({
    baseURL: `https://www.googleapis.com/blogger/v3/blogs/${process.env.NEXT_PUBLIC_BLOG_ID}`,
    params: {
        key: process.env.NEXT_PUBLIC_API_BLOG_KEY
      }
})

api.interceptors.request.use(
    function (config) {

       return config;
    },
    function (error) {
       // Do something with request error
       return Promise.reject(error);
    }
 );
 
 api.interceptors.response.use(
    function (response) {
       // Any status code that lie within the range of 2xx cause this function to trigger
       // Do something with response data
       return response;
    },
    function (error) {
       // Any status codes that falls outside the range of 2xx cause this function to trigger
       // Do something with response error
       return Promise.reject(error);
    }
 );
 
 export { api };
 