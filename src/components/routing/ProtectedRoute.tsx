import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LandingPage } from "../LandingPage";
import { UserContext } from "../user/UserContext";

interface protectedRouteObject {
    user?: any,
    redirect: string,
    children: any,
}
export const ProtectedRoute = ({
    redirect,
    children,
}:protectedRouteObject) => {
    const user: any = useContext(UserContext);
    if (!user.user) {
        if (redirect === "/") {
            return <LandingPage/>
        }

        return <Navigate to={redirect}/>
    }
    
    return children;
  };