import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { authContenxt } from "../Contexts/AuthContext";

function ProtectedRoute({ children, ...props }) {
  const { user } = useContext(authContenxt);
  return (
    <Route
      {...props}
      render={() => (user ? children : <Redirect to="/login" />)}
    />
  );
}

export default ProtectedRoute;
