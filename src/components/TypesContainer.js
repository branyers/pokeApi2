import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getMultipleTypes } from "../services/CallToApi";
import GridContainer from "./GridContainer";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";
import { useQuery } from "../services/Functions";

function TypesContainer() {

  let queryTypes = useQuery().getAll("type");
  const [pokemonData, setPokemonData] = useState([]);
  const [actualPage, setActualPage] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  let navigationData = useLocation();
  const numberOfElements = 4;
  
  useEffect(() => {
    if (navigationData.state?.dataPokemon && !pokemonData?.length) {
      setPokemonData(navigationData.state?.dataPokemon);
      return;
    }
    if (queryTypes.length && !pokemonData.length) {
      getMultipleTypes(queryTypes).then((res) =>
        res.length ? setPokemonData(res.sort()) : setPokemonData("Error")
      );
    }
  }, [navigationData, pokemonData?.length, queryTypes]);

  useEffect(() => {
    if (
      navigationData.state?.page &&
      navigationData.state.page !== actualPage
    ) {
      setActualPage(navigationData.state?.page);
    }
  }, [navigationData.state?.page]);

  useEffect(() => {
    if (pokemonData?.length) {
      const pokemonToGenerate = [
        actualPage * numberOfElements,
        numberOfElements * (actualPage + 1),
      ];
      setPokemonList(pokemonToGenerate);
    }
  }, [pokemonData, actualPage]);

  const handlerChangePage = (data) => {
    return setActualPage(data);
  };

  return (
    <GridContainer>
      {pokemonData.length === 0 && typeof pokemonData === "object" && (
        <p>Loading...</p>
      )}
      {pokemonList.length !== 0 &&
        pokemonData.length &&
        typeof pokemonData === "object" &&
        pokemonData
          .slice(pokemonList[0], pokemonList[1])
          .map((element, index) => {
            if (element?.name) {
              return (
                <PokemonCard
                  key={element.id}
                  pokemon={element}
                  search={
                    navigationData.state?.search
                      ? navigationData.state?.search
                      : queryTypes
                  }
                  pokemonData={pokemonData}
                  page={actualPage}
                  id={actualPage * numberOfElements + index}
                />
              );
            }
            return null;
          })}
      {pokemonList.length !== 0 && typeof pokemonData === "object" && (
        <Pagination
          handlerChangePage={handlerChangePage}
          actualPage={actualPage}
          numberOfPages={Math.ceil(pokemonData.length / numberOfElements)}
        />
      )}
      {typeof pokemonData === "string" && (
        <>
          <h2 style={{ margin: "auto" }}>Not found</h2>
          <Link
            to="/"
            style={{
              display: "block",
              textAlign: "center",
              width: "100%",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
        </>
      )}
    </GridContainer>
  );
}

export default TypesContainer;
