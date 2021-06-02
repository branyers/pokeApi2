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
    <div className="link-back" >
      {typeof location.state?.search === "string" && (
        <>
        <div className="links-back">
            <Link
            to={{
              pathname: "/pokedex/search-pokemon/" + location.state.search,
              state: location.state,
            }}
            replace
          >
            back
          </Link>
        </div>
        <div className="links-back" >
            <Link
            to={{
              pathname: `/pokedex/pokemon/${location.state.dataPokemon.id}/encounters`,
              state: location.state,
            }}
            replace
          >
            Encounters
          </Link>
        </div>
        </>
      )}
      {typeof location.state?.search === "object" && (
        <>
        <div className="container">
           <div className="row">
               <div className="links-back">
                  <Link
                  to={{
                  pathname: "/pokedex/search-types/types?" + typesUrl(),
                  state: location.state,
                  }}
                  replace
               >
                  back
               </Link>
               </div>
               <div className="links-back">

                     <Link
                        to={{
                        pathname: `/pokedex/pokemon/${location.state.id}/encounters`,
                        state: location.state,
                        }}
                  replace
               >
                  Encounters
                  </Link>
               </div>
           </div>
        </div>
        </>
      )}
      {location.state?.dataPokemon && (
        <section >
           <div className="container section-container">
              <div className="row">
                  <div className="card-one col-8 col-md-4 col-lg-4">
                     <div className="img-poke-encounter">
                        <h4 className="mt-1 text-center" >{dataRef.name}</h4>
                           <img className="img-poke"  src={validateImg(dataRef.sprites)} alt={dataRef.name}/>
                        </div>
                        <div className="card-body-cards">
                           <div className="info-one">
                              <h2 >#{dataRef.order}</h2>
                              <div className="titles-cards">
                                 {printTypes(dataRef.types)}
                              </div>
                              <p className="titles-cards">
                                 Height: {dataRef.height}
                              </p>
                              <p className="titles-cards" >
                                 Weight: {dataRef.weight}
                              </p>
                              <div className="titles-cards">
                                 {printStats(dataRef.stats)}
                              </div>
                           </div>
                        </div>
                     </div>

                  <div className="card-two col-md-8">
                     <h4 className="text-center" >Info poke</h4>
                        <div className="info-two " >
                           <div className="row">
                              <div className="card-info-habilities">
                                 <div className="displ-flex">
                                    {printMoves(dataRef.moves)}
                                    <div className="displ-flex" >
                                       {printAbilities(dataRef.abilities)}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

              </div>
               </div>
        </section>
      )}
    </div>
  );
}

export default PokemonInfo;
