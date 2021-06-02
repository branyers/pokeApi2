import { createContext, useState } from "react";

export const typesContext = createContext();

const useTypes = () => {

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
