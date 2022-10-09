import Login from "./components/user/Login";
import { UserContext } from "./components/user/UserContext";
import React, { Suspense, useState } from "react";
const Home = React.lazy(() => import("./Home"));

const App = () => {
  const cachedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(cachedUser);
  if (!user)
    return (
      <UserContext.Provider value={{ user, setUser }}>
        <Login />
      </UserContext.Provider>
    );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Suspense>
        <Home />
      </Suspense>
    </UserContext.Provider>
  );
};

export default App;
