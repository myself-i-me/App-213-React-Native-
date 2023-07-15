import { createContext, useState } from "react";

export const DocContext = createContext({
  docs: [],
  storeDocs: (docs) => {},
  currentDocId: "",
  setCurrentDocId: (id) => {},
  countries: [],
  storeCountries: (countries) => {},
  setHeaderTitles: (headr) => {},
  setHeaderShowns: (bool) => {},
  setHeaderColors: (clr) => {},
});

function DocContextProvider({ children }) {
  const [docs, setDocs] = useState([]);
  const [currentDocId, setCurrentDocId] = useState("");
  const [countries, setCountries] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("Homes");
  const [headerColor, setHeaderColor] = useState("#145C7B");
  const [headerShown, setHeaderShown] = useState(true);

  function storeDocs(docs) {
    console.log("Storing Docs");
    setDocs(docs);
  }

  function storeCountries(countries) {
    console.log("storing countries");
    setCountries(countries);
  }

  function setHeaderTitles(headr) {
    setHeaderTitle(headr);
  }

  function setHeaderColors(clr) {
    setHeaderColor(clr);
  }

  function setHeaderShowns(bool) {
    setHeaderShown(bool);
  }

  const value = {
    docs: docs,
    currentDocId: currentDocId,
    countries: countries,
    storeDocs: storeDocs,
    storeCountries: storeCountries,
    countries: countries,
    headerTitle: headerTitle,
    headerColor: headerColor,
    headerShown: headerShown,
    setHeaderTitles: setHeaderTitles,
    setHeaderColors: setHeaderColors,
    setHeaderShowns: setHeaderShowns,
  };

  return <DocContext.Provider value={value}>{children}</DocContext.Provider>;
}

export default DocContextProvider;
