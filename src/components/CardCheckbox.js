import React from 'react'

const CardCheckbox = ({ register, checkboxTypes }) => {
   return (
      <div className="menu-pokes-in-box-type">
         {
            checkboxTypes.map((value) => {
               return (
                  <>
                     <div className="name-checkbox">
                        <div className="label-color">
                           <label key={value.name} htmlFor={value.name} >{value.name}</label>
                        </div>
                        <div className="input-color">
                           <input
                              key={value.name}
                              id={value.name}
                              type="checkbox"
                              name={value.name}
                              value={value.name}
                              ref={register} />
                        </div>
                     </div>
                  </>
               )
            })
         }
      </div>
   )
}

export default CardCheckbox
