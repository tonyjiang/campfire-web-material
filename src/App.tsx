import Login from "./components/user/Login";
import { UserContext } from "./components/user/UserContext";
import React, { Suspense, useState } from "react";
import { createBrowserRouter, Route, RouterProvider, Routes, useNavigate } from "react-router-dom";
import Interest from "./components/interest/Interest";
import Course, { Loader as CourseLoader } from "./components/course/Course";
import Club from "./components/club/Club";
import { UnavailableRoute } from "./components/UnavailableRoute";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute redirect="/"><Home/></ProtectedRoute>,
    errorElement: <ProtectedRoute redirect="login"><UnavailableRoute/></ProtectedRoute>,
    children: [
      {
        path: "course/:courseId",
        element: <Course/>,
        loader: CourseLoader
      },
      {
        path: "club/:clubId",
        element: <Club/>
      },
      {
        path: "interest/:interestId",
        element: <Interest/>
      }
    ]
  },
  {
    path: "login",
    element: <Login/>,
  }
]);

const App = () => {
  const cachedUser = JSON.parse(localStorage.getItem("user") || "null");
  const [user, setUser] = useState(cachedUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router}/>
    </UserContext.Provider>
  );
};

export default App;
