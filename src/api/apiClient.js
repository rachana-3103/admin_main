import axios from "axios";
import {logOutRedirectCall} from '../pages/Common/RedirectPathMange'
import Swal from 'sweetalert2'


const showMessage = (msg) => {
  Swal.fire({
    title: 'Ballina Farm Fresh',
    text: msg,
    confirmButtonText: 'Okay'
  })
}
const axiosClient = axios.create({
    baseURL: 'http://3.26.203.80:8080/',
    // baseURL: 'http://localhost:8080/',
    headers: {
      'api-key':'m1HjGv5URBT9qldbeobTEvUaqBcfsxjn',
      'token': localStorage.getItem("MAtoken"),
      'accept-language':'en',
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    }
  });

  axiosClient.interceptors.request.use(function (config) {
    config.headers['token']=localStorage.getItem("MAtoken")
    return config;
});

  axiosClient.interceptors.response.use(
    function (response) {
      if(response.data.code == -1) {
        logOutRedirectCall()  
      }
      if(response.data.code==0 ){
        showMessage(response.data.message)
      }
      return response;
    }, 
    function (error) {
      let res = error.response;
      if (res.status == 401) {
        logOutRedirectCall()
      }
      console.error("Looks like there was a problem. Status Code: " + res.status);
      return Promise.reject(error);
    }
  );

  export {
    axiosClient
  };
  
  
