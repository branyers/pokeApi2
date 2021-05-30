import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { typesContext } from "../Contexts/TypesContext";
import { getTypes } from "../services/CallToApi";

function SearchBox() {
  const [toSearch, setToSearch] = useState("");
  const { checkboxTypes, saveTypes } = useContext(typesContext);
  const { register, handleSubmit } = useForm();
  let history = useHistory();

  useEffect(() => {
    if (!checkboxTypes.length) {
      getTypes().then((res) => saveTypes(res));
    }
  });

  const handlerSearch = (data) => {
    if (data) {
      history.push(
        `/pokedex/search-pokemon/pokemon?search=${data.toLowerCase().trim()}`
      );
    }
    return;
  };

  const onSubmit = (data) => {
    const typeSearchPokemones = checkboxTypes.filter(
      (element) => data[element.name]
    );
    if (typeSearchPokemones.length) {
      let urlTypes = "/pokedex/search-types/types?";

      typeSearchPokemones.forEach((value, index) => {
        if (index === typeSearchPokemones.length - 1) {
          urlTypes += "type=" + value.name;
          return;
        }
        return (urlTypes += "type=" + value.name + "&");
      });
      history.push(urlTypes);
    }
  };

  return (
    <div >
      <div >
        <input
          type="text"
          name="pokemon"
          onChange={(e) => setToSearch(e.target.value)}
          placeholder="Search for Name or Id!"
        />
        <button
          type="button"
          onClick={() => handlerSearch(toSearch)}
        ></button>
      </div>
      <div>
        <p >Search for types</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          {checkboxTypes.length &&
            checkboxTypes.map((value) => {
              return (
                <span key={value.url}>
                  <label>
                    {value.name.toUpperCase()}{" "}
                    <input
                      type="checkbox"
                      name={value.name}
                      value={value.name}
                      ref={register}
                    />
                  </label>
                </span>
              );
            })}

          <input
            type="submit"
            value="Search"
          />
        </form>
      </div>
    </div>
  );
}

export default SearchBox;
