import axios from "axios";

const requester = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    TokenCybersoft: process.env.REACT_APP_CYBERSOFT_TOKEN,
  },
});

//interceptor
// requester.interceptors.request.use((req) => {
//   req.headers = {
//     ...req.headers,
//     Authorization: "Bearer " + localStorage.getItem("token"),
//   };

//   return req;
// });
// requester.interceptors.response.use()

export default requester;

// routing protection || Guard
