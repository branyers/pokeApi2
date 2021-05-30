import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  printAbilities,
  printMoves,
  printStats,
  printTypes,
  validateImg,
} from "../services/Functions";

function PokemonInfo() {
  let location = useLocation();
  let dataRef =
    location.state.id !== undefined
      ? location.state.dataPokemon[location.state.id]
      : location.state.dataPokemon;
  const typesUrl = () => {
    let url = "";
    location.state.search.forEach((element, index, array) => {
      if (index === array.length - 1) {
        return (url += "type=" + element);
      }
      return (url += `type=${element}&`);
    });
    return url;
  };

  return (
    <div >
      {typeof location.state?.search === "string" && (
        <>
          <Link
            to={{
              pathname: "/pokedex/search-pokemon/" + location.state.search,
              state: location.state,
            }}
            replace
          >
            back
          </Link>
          <Link
            to={{
              pathname: `/pokedex/pokemon/${location.state.dataPokemon.id}/encounters`,
              state: location.state,
            }}
            replace
          >
            Encounters
          </Link>
        </>
      )}
      {typeof location.state?.search === "object" && (
        <>
          <Link
            to={{
              pathname: "/pokedex/search-types/types?" + typesUrl(),
              state: location.state,
            }}
            replace
          >
            back
          </Link>
          <Link
            to={{
              pathname: `/pokedex/pokemon/${location.state.id}/encounters`,
              state: location.state,
            }}
            replace
          >
            Encounters
          </Link>
        </>
      )}
      {location.state?.dataPokemon && (
        <section >
          <p >#{dataRef.order}</p>
          <img
            src={validateImg(dataRef.sprites)}
            alt={dataRef.name}
          />
          <p >{dataRef.name}</p>
          <div >
            <p >
              Height: {dataRef.height}
            </p>
            <p >
              Weight: {dataRef.weight}
            </p>
          </div>
          <div >
            {printTypes(dataRef.types)}
          </div>
          <div >
            {printStats(dataRef.stats)}
          </div>
          <div >
            {printMoves(dataRef.moves)}
          </div>
          <div >
            {printAbilities(dataRef.abilities)}
          </div>
        </section>
      )}
    </div>
  );
}

export default PokemonInfo;
