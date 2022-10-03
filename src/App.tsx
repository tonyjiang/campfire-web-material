import Home from './Home';
import Login from './components/user/Login';
import { UserContext } from './components/user/UserContext';
import { useState } from 'react';
import React from 'react';

const App = () => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{user, setUser}}>
      {user ? <Home /> : <Login />}
    </UserContext.Provider>
  );
};

export default App;
