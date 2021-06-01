import React from "react";
import { useHistory } from "react-router";

function RandomButton() {
  let history = useHistory();

  const handleClick = () => {
    history.push(
      `/pokedex/search-pokemon/pokemon?search=${Math.round(
        Math.random() * 1000
      )}`
    );
  };

  return (
    <div >
      <button className="btn btn-warning" onClick={handleClick}>
        Pokemon Ramdom
      </button>
    </div>
  );
}

export default RandomButton;
