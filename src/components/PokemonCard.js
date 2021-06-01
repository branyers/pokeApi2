import React from "react";
import { Link } from "react-router-dom";
import { printTypes } from "../services/Functions";
import { changeName, getStats, validateImg } from "../services/Functions";

function PokemonCard({ pokemon, search, pokemonData, page, id }) {
  return (
    <div className="container">
       <div className="row">
          <div className="col-md-2">
            <div className="card ">
               <div className="card-body">
                  <img
                     src={validateImg(pokemon.sprites)}
                     alt={pokemon.name}
                  />
                  <Link
                     to={{
                        pathname: `/pokedex/pokemon/${pokemon.id}`,
                        state: {
                           search: search,
                           dataPokemon: pokemonData ? pokemonData : pokemon,
                           page: page ? page : null,
                           id: id,
                        },
                     }}
                     replace
                  >
                     {changeName(pokemon.name)}
                  </Link>
                  <div>
                     {pokemon.types.length && printTypes(pokemon.types)}
                  </div>
                     {pokemon?.stats && getStats(pokemon.stats)}
                  </div>
               </div>
            </div>
         </div>
    </div>
  );
}

export default PokemonCard;
