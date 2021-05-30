import { createContext, useState } from "react";

export const typesContext = createContext();

const useTypes = () => {
  console.log("0");

  const [checkboxTypes, setCheckboxTypes] = useState([]);

  const saveTypes = (data) => setCheckboxTypes(data);

  return {
    checkboxTypes,
    saveTypes,
  };
};

export const ProvideTypes = ({ children }) => {
  const types = useTypes();
  return (
    <typesContext.Provider value={types}>{children}</typesContext.Provider>
  );
};
