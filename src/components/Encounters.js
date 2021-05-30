import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { printEncounters } from "../services/Functions";

function Encounters() {
  const [encountersData, setEcountersData] = useState([]);

  useEffect(() => {
    if (!encountersData.length) {
      printEncounters(
        dataRef.dataPokemon.location_area_encounters
      ).then((res) => setEcountersData(res));
    }
  }, []);

  let location = useLocation();
  let dataRef = location.state;
  
  return (
    <>
      {typeof dataRef?.search === "string" && (
        <>
          <Link
            to={{
              pathname: "/pokedex/pokemon/" + dataRef.dataPokemon.id,
              state: dataRef,
            }}
            replace
          >
            back
          </Link>
          <Link to="/">
            Home
          </Link>
        </>
      )}
      {typeof dataRef?.search === "object" && (
        <>
          <Link
            to={{
              pathname: `/pokedex/pokemon/${dataRef.id}`,
              state: dataRef,
            }}
            replace
          >
            Back
          </Link>
          <Link to="/">
            Home
          </Link>
        </>
      )}
      {encountersData.length !== 0 && (
        <section >
          <div >
            {encountersData}
          </div>
        </section>
      )}
    </>
  );
}

export default Encounters;
