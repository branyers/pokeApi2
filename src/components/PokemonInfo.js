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
           <div className="container ">
              <div className="row-cards-two ">
                 <div className="card-one">
                    <div className="img-poke-encounter">
                        <img className="img-poke"  src={validateImg(dataRef.sprites)} alt={dataRef.name}/>
                     </div>
                     <div className="card-body">
                        <div className="info-one">
                           <div className="colum">
                              <div className="displ-flex">
                           {printTypes(dataRef.types)}
                        </div>
                              <h4 >{dataRef.name}</h4>
                              <h2 >#{dataRef.order}</h2>
                              <p className="row-hola">
                                 Height: {dataRef.height}
                              </p>
                              <p className="row-hola" >
                                 Weight: {dataRef.weight}
                              </p>
                              <div className="">
                                 {printStats(dataRef.stats)}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                 <div className="card-two">
                     <div className="info-two " >
                           <div className="row">
                              <div className="card-info-habilities">
                                 <div className="displ-flex">
                                    {printMoves(dataRef.moves)}
                                 </div>
                                 <div className="displ-flex" >
                                    {printAbilities(dataRef.abilities)}
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
