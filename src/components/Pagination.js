import React, { useEffect, useState } from "react";
import "./Assets/styles/Pagination.css";

function Pagination({ numberOfPages, handlerChangePage, actualPage }) {
  const [elements, setElements] = useState([]);

  const generatePages = (numberOfCircles) => {
    let arrayElements = [];
    let iterator = 0;
    let iteratorB = 0;

    actualPage < 3 ? (iterator = 0) : (iterator = actualPage - 3);
    if (actualPage > numberOfPages - 4) iterator = numberOfPages - 7;
    iterator === 0 ? (iteratorB = 7) : (iteratorB = actualPage + 4);
    for (let i = iterator; i < iteratorB; i++) {
      if (i < numberOfCircles) {
        arrayElements.push(
          <span
            key={i}
            className={
              i === actualPage
                ? "Pokedex__pagination-number-active"
                : "Pokedex__pagination-number"
            }
            onClick={() => handlerChangePage(i)}
          >
            {i + 1}
          </span>
        );
      }
    }
    setElements(arrayElements);
  };

  useEffect(() => {
    if (numberOfPages) {
      generatePages(numberOfPages);
    }
  }, [actualPage,numberOfPages]);

  return (
    <div className="Pokedex__pagination">{elements.length && elements}</div>
  );
}

export default Pagination;
