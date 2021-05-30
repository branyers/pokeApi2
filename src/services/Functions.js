import { useLocation } from "react-router";

export function changeName(name) {
  return name.replace(name[0], name[0].toUpperCase());
}

export function validateImg(objectImages) {
  if (objectImages.front_default) {
    return objectImages.front_default;
  }

  const images = Object.values(objectImages).reverse();
  const imageToReturn = images.find((element) => element === "string");
  if (imageToReturn) {
    return imageToReturn;
  }

  return "https://www.nicepng.com/png/detail/29-296622_0-yorum-unknown-pokemon-question-mark.png";
}

export function getStats(stats) {
  let statsValues = {};

  for (let i = 0; i < stats.length; i++) {
    if (stats[i]?.stat?.name) {
      switch (stats[i].stat.name) {
        case "hp":
          statsValues.hp = stats[i].base_stat;
          break;
        case "attack":
          statsValues.attack = stats[i].base_stat;
          break;
        case "defense":
          statsValues.defense = stats[i].base_stat;
          break;
        case "speed":
          statsValues.speed = stats[i].base_stat;
          break;
        default:
          break;
      }
    }
  }

  const template = (
    <>
      <p className="Pokedex__pokemon-info">
        HP: {statsValues?.hp ? statsValues.hp : "Undefined"}
      </p>
      <p className="Pokedex__pokemon-info">
        Attack: {statsValues?.attack ? statsValues.attack : "Undefined"}
      </p>
      <p className="Pokedex__pokemon-info">
        Defense: {statsValues?.defense ? statsValues.defense : "Undefined"}
      </p>
      <p className="Pokedex__pokemon-info">
        Speed: {statsValues?.speed ? statsValues.speed : "Undefined"}
      </p>
    </>
  );

  return template;
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function printTypes(arrayTypes) {
  const retArr = arrayTypes.map((element) => {
    return (
      <p className="Pokedex__types" key={element.type.name}>
        {element.type.name.replace(
          element.type.name[0],
          element.type.name[0].toUpperCase()
        )}
      </p>
    );
  });
  return retArr;
}

export function printStats(arrStats) {
  const retArr = arrStats.map((element) => {
    return (
      <p key={element.stat.url} className="Pokedex__pokemonInfo-stat">
        {element.stat.name}: {element.base_stat}
      </p>
    );
  });
  return retArr;
}

export function printMoves(arrMoves) {
  const retArr = arrMoves.map((element) => {
    return (
      <p key={element.move.url} className="Pokedex-pokemonInfo-move">
        {element.move.name}
      </p>
    );
  });
  return retArr;
}

export function printAbilities(arrAbilities) {
  const retArr = arrAbilities.map((element) => {
    return (
      <p key={element.ability.name} className="Pokedex-pokemonInfo-ability">
        {element.ability.name}
      </p>
    );
  });
  return retArr;
}

export async function printEncounters(arrEncounters) {
  try {
    const response = await fetch(arrEncounters);
    const data = await response.json();
    if (!data.length) {
      return [
        <p key="Encounter-undefined" className="Pokedex__pokemonInfo-encounter">
          Unknow
        </p>,
      ];
    }
    const retArr = data.map((element, index) => {
      return (
        <p key={index} className="Pokedex__pokemonInfo-encounter">
          Encounter: {element.location_area.name}
        </p>
      );
    });
    return retArr;
  } catch (err) {
    return [
      <p key="Encounter-undefined" className="Pokedex__pokemonInfo-encounter">
        Unknow
      </p>,
    ];
  }
}
