import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { typesContext } from "../Contexts/TypesContext";
import { getTypes } from "../services/CallToApi";
import CardCheckbox from "./CardCheckbox";
import RandomButton from './RandomButton'

function SearchBox() {
   const [flag, setflag] = useState(false)
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
    <div className="container mt-2" >
      <div className="row" >
         <div className="card cards-design col-md-5 mt-5 ">
            <div className="search-by-name mt-4 " >
               <div>
                  <label><h4 >Search for Name</h4></label>
               </div>
               <div className="mt-5">
                  <input
                  type="text"
                  name="pokemon"
                  onChange={(e) => setToSearch(e.target.value)}
                  placeholder="Name or id!"
               />
               </div>
            <div>
               <button
               className="btn btn-primary mt-5"
               type="button"
               onClick={() => handlerSearch(toSearch)}
            >Buscar Pokemon</button>
            </div>
            <div className="mt-5">
               <RandomButton />
            </div>
         </div>
         </div>
         <div className="card cards-design card-search-for-type col-md-5 mt-5" >
            <div className="card-body">
               <div className="form-search-by-type" >
                  <form
                     onSubmit={handleSubmit(onSubmit)}
                     >
                        <div className="mt-2">
                           <label><h4>Search for Type</h4></label>
                        </div>
                        <div className="search-field mt-2"> 
                           <div  className="">
                              <div>
                                 <button onMouseOver={() => setflag(true)}  >
                                    <h6 className="title-menu-poke">ver los tipos de pokemones </h6>
                                 </button>
                                 <div className="box-type-poke">
                                    {
                                       flag ? <CardCheckbox  register={register} checkboxTypes={checkboxTypes} /> : ''
                                    }
                                 </div>
                              </div>
                           </div>
                     </div>
                        <div className="mt-2">
                           <input
                              className="btn btn-primary"
                              type="submit"
                              value="Search"
                           />
                        </div>  
                  </form>
               </div>
             </div>
         </div>
      </div>
    </div>
  );
}

export default SearchBox;