import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
export default user ? axios.create({
  baseURL: 'http://localhost:3000',
  headers: { Authorization: `Bearer ${user.access_token}` }
}) : axios.create({
  baseURL: 'http://localhost:3000',
});
