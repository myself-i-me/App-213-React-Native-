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
  accessData: [],
  storeAccessData: (data) =>{},
  updateAccessData:(id,docs) =>{},
});

function DocContextProvider({ children }) {
  const [docs, setDocs] = useState([]);
  const [currentDocId, setCurrentDocId] = useState("");
  const [countries, setCountries] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("Homes");
  const [headerColor, setHeaderColor] = useState("#145C7B");
  const [headerShown, setHeaderShown] = useState(true);
  const [accessData,setAccessData] = useState([]);

  function storeDocs(docs) {
    setDocs(docs);
  }

  function storeCountries(countries) {
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

  function storeAccessData(data) {
    setAccessData(data)
  }

  function updateAccessData(id) {
    let newAccessData = accessData.map(i =>{
      if(i.documentId == id){
         return { ...i, isRequestAccessSent: true }
      } else {
        return i;
      }
    })
    setAccessData(newAccessData)
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
    accessData: accessData,
    storeAccessData: storeAccessData,
    updateAccessData: updateAccessData
  };

  return <DocContext.Provider value={value}>{children}</DocContext.Provider>;
}

export default DocContextProvider;
