import React from "react";


function GridContainer({ children }) {
  return (
      <div className="container">
         <div className="row">
               {children}
         </div>
      </div>);
}

export default GridContainer;
