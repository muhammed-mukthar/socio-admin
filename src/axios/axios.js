import axios from 'axios'



const header=await JSON.parse(localStorage.getItem("user"))?{
    "authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    "x-refresh":JSON.parse(localStorage.getItem("user")).refreshToken
  }:{
    "authorization": "Bearer "
  }
export const makeRequest =  axios.create({
    baseURL:import.meta.env.VITE_AXIOS_URL,
headers:header
})
