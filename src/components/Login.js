import React, { useContext } from "react";
import { useHistory } from "react-router";
import { authContenxt } from "../Contexts/AuthContext";
import '../App.css'


function Login() {
  let history = useHistory();

  const { signIn } = useContext(authContenxt);

  const handleClick = () => {
    signIn();
    history.replace("/");
  };

  return (
    <div className="container-sign-in">
       <div className="row">
          <div>
            <button className="btn btn-primary"  onClick={handleClick}>
            iniciar session
            </button>
          </div>
       </div>

    </div>
  );
}

export default Login;
