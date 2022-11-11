import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../user/UserContext";

export const InstitutionRoute = () => {
    const user: any = useContext(UserContext);
    return <Navigate to={`/${user.user.institution_slug}`}/>
}