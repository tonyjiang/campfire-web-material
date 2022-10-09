import axios from "axios";

const user = JSON.parse(localStorage.getItem('user'));
export default axios.create({
  headers: { Authorization: `Bearer ${user.access_token}` }
});
