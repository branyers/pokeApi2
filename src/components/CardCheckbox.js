import React from 'react'

const CardCheckbox = ({ register, checkboxTypes }) => {
   console.log(checkboxTypes);
   return (
      <div className="menu-pokes-in-box-type">
         {
            checkboxTypes.map( (value) => {
               return (
                  <>
                  <div className="name-checkbox">
                     <div className="label-color">
                        <label htmlFor={value.name} >{value.name}</label>
                     </div>
                     <div className="input-color">
                        <input 
                        id={value.name}
                        type="checkbox"
                        name={value.name}
                        value={value.name}
                        ref={register}/>
                     </div>
                  </div>
                  </>
               )
            } )
         }
      </div>
   )
}

export default CardCheckbox
