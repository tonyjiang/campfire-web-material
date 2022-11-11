import React from "react";
import { useRouteError } from "react-router-dom";

export const ErrorRoute = () => {
  const error: any = useRouteError();

  return(
    <div>
      <h1>
        An Error Occured
      </h1>
      <p>
        {error.message}
      </p>
    </div>
)}
