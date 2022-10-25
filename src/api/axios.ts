import axios from "axios";

const cachedUser = JSON.parse(localStorage.getItem('user') || "null");
export default axios.create({
  headers: { Authorization: `Bearer ${cachedUser?.access_token ?? ''}` }
});
