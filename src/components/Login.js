import React, { useContext,useState } from "react";
import { useHistory } from "react-router";
import { authContenxt } from "../Contexts/AuthContext";
import '../App.css'


function Login() {
  let history = useHistory();
  const [valueInput, setValueInput] = useState('')
  const { signIn } = useContext(authContenxt);

  const handleClick = (valueInput) => {
    signIn( valueInput );
    history.replace("/");
  };

  return (
    <div className="container">
       <div className="row">
          <div className="card-image col-1 col-sm-1 col-md-4 mt-5">
             <div className="image-poke "></div>
          </div>
          <div className="card-login col-9 col-sm-8 col-md-7 mt-5">
             <h1>Pokedex</h1>
             <div className="row">
               <div>
                  <label>What is the name of the coach?</label>
               </div>
               <div className="mt-2">
                  <input type="text" onChange={(e) => setValueInput(e.target.value)} />
               </div>
               <div className="row mt-4">
                  <button className="btn btn-primary"  onClick={(e) => {
                     console.log(valueInput);
                     handleClick( valueInput )
                  }}>
                  iniciar session
                  </button>
               </div>
             </div>
          </div>
       </div>
    </div>
  );
}

export default Login;
