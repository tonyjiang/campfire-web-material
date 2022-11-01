import axios from "axios";

const cachedUser = JSON.parse(localStorage.getItem('user') || '');
export default axios.create({
  headers: { Authorization: `Bearer ${cachedUser.access_token}` },
  baseURL: process.env.REACT_APP_API_URL,
});
