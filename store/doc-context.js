import { createContext, useState } from "react";

export const DocContext = createContext({
    docs: [],
    storeDocs: (docs) => {},
    currentDocId: "",
    setCurrentDocId: (id) => {},
    countries: [],
    storeCountries: (countries) => {},
})

function DocContextProvider({children}) {
    const [docs, setDocs] = useState([]);
    const [currentDocId, setCurrentDocId] = useState("");
    const [countries, setCountries] = useState([]);

    
    function storeDocs(docs) {
        console.log("Storing Docs");
        setDocs(docs);
    }

    function storeCountries(countries) {
        console.log('storing countries');
        setCountries(countries);
    }

    const value = {
        docs: docs,
        currentDocId: currentDocId,
        countries: countries,
        storeDocs: storeDocs,
        storeCountries: storeCountries,
        countries: countries
    }

    return <DocContext.Provider value = {value}>{children}</DocContext.Provider>
}

export default DocContextProvider;