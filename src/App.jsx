import Home from './Home';
import Login from './components/user/Login';
import { UserContext } from './components/user/UserContext';
import { useState } from 'react';

const App = () => {
  const cachedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(cachedUser);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {user ? <Home /> : <Login />}
    </UserContext.Provider>
  );
};

export default App;
