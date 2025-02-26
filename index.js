import "./global.css";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { detectUserLanguage } from "./utils/helper";
import api from "./services/api";

const LanguageContext = createContext();

export function App() {
  const [code,setCode] =useState(detectUserLanguage());
  const [language, setLanguage]=useState({});

  useEffect(()=>{
    const fetchTranslationLanguage=async () =>{
      const languageData=await api.fetchTranslation(code);
      setLanguage(languageData);
    }
    fetchTranslationLanguage();
  },[])
  const ctx = require.context("./app");
  return (
    <LanguageContext.Provider value={{ language }}>
    <ExpoRoot context={ctx} />
  </LanguageContext.Provider>
  );
}

registerRootComponent(App);

export const useLanguageContext = () => useContext(LanguageContext)
