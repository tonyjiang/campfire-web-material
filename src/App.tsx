import Login from "./components/user/Login";
import { UserContext } from "./components/user/UserContext";
import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Interest from "./components/interest/Interest";
import Course, { loader as CourseLoader } from "./components/course/Course";
import Club from "./components/club/Club";
import { ErrorRoute } from "./components/routing/ErrorRoute";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import Home from "./Home";
import { InstitutionRoute } from "./components/routing/InstitutionRoute";

const categoryGroupDetails = [
  {
    path: "channel/:channelId",
  },
  {
    path: "tab/:tabId",
  }
]

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute redirect="/"><InstitutionRoute/></ProtectedRoute>,
    errorElement: <ProtectedRoute redirect="login"><ErrorRoute/></ProtectedRoute>,
  },
  {
    path: "login",
    element: <Login/>,
    errorElement: <ProtectedRoute redirect="login"><ErrorRoute/></ProtectedRoute>,
  },
  {
    path: ":institutionSlug",
    element: <ProtectedRoute redirect="/"><Home/></ProtectedRoute>,
    children: [
      {
        path: "course/:courseId",
        element: <Course/>,
        loader: CourseLoader,
        children: categoryGroupDetails,
      },
      {
        path: "club/:clubId",
        element: <Club/>,
        children: categoryGroupDetails,
      },
      {
        path: "interest/:interestId",
        element: <Interest/>,
        children: categoryGroupDetails,
      },
      {
        path: "user/settings",
      }
    ]
  },
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
