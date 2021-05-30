import React, { useContext } from "react";
import { useHistory } from "react-router";
import { authContenxt } from "../Contexts/AuthContext";
function Login() {
  let history = useHistory();

  const { signIn } = useContext(authContenxt);

  const handleClick = () => {
    signIn();
    history.replace("/");
  };

  return (
    <div>
      <button  onClick={handleClick}>
        Sign in
      </button>
    </div>
  );
}

export default Login;
