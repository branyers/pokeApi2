const URLBASE = "https://pokeapi.co/api/v2/";

const filterRepeatPokemons = (arrayToFilter) => {
  for (let i = 0; i < arrayToFilter.length; i++) {
    for (let o = i + 1; o < arrayToFilter.length; o++) {
      if (i?.id) {
        if (arrayToFilter[i].id === arrayToFilter[o].id) {
          arrayToFilter.splice(o, 1);
        }
      }
    }
  }
  return arrayToFilter;
};

export const getPokemonForIdOrName = async (value) => {
  try {
    const responseApi = await fetch(`${URLBASE}pokemon/${value}`);
    const dataResponse = await responseApi.json();
    return dataResponse;
  } catch (error) {
    console.log(error);
  }
};

export const getPokemonForType = async (link) => {
  try {
    const responseApi = await fetch(URLBASE + "type/" + link);
    const dataResponse = await responseApi.json();
    return dataResponse.pokemon;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPokemonOfType = async (url) => {
  const pokemonsType = await getPokemonForType(url);

  const pokemonArray = pokemonsType.map((value) => {
    return getPokemonForIdOrName(value.pokemon.name);
  });

  const ToReturn = await Promise.all(pokemonArray);
  return ToReturn;
};

export const getMultipleTypes = async (arrayTypes) => {
  let arrayReturn = [];
  for (let i = 0; i < arrayTypes.length; i++) {
    const saveData = await getAllPokemonOfType(arrayTypes[i]);
    arrayReturn.push(...saveData);
  }

  if (arrayTypes.length > 1) {
    const ToReturn = filterRepeatPokemons(arrayReturn);
    return ToReturn;
  }
  return arrayReturn;
};

export const getTypes = async () => {
  try {
    let url = URLBASE + "type/";
    let isNextPage = false;
    let typesArray = [];
    do {
      const responseData = await fetch(url);
      const responseParse = await responseData.json();
      typesArray = [...typesArray, ...responseParse.results];
      if (responseParse.next) {
        url = responseParse.next;
        isNextPage = true;
      } else {
        isNextPage = false;
      }
    } while (isNextPage);
    return typesArray;
  } catch (error) {
    console.log(error);
    return error;
  }
};
