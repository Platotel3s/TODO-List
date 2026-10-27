import React, { createContext, useContext, useState } from "react";
import { darkTheme, lightTheme, theme, themed } from "./Theme";
import { useColorScheme } from "react-native";

interface themeContextType{
  themeMode:theme;
  colors:themed;
  isDark:boolean;
  setThemeMode:(mode:theme)=>void;
}

const ThemeContext=createContext<themeContextType|undefined>(undefined);

export const ThemeProvider:React.FC<{children:React.ReactNode}>=({children})=>{
  const systemColorShceme=useColorScheme();
  const [themeMode,setThemeMode]=useState<theme>('system');

  const isDark=themeMode==='system'?systemColorShceme==='dark':themeMode==='dark';
  const colors=isDark?darkTheme:lightTheme;
  return(
    <ThemeContext.Provider value={{themeMode,colors,isDark,setThemeMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme=()=>{
  const context=useContext(ThemeContext);
  if (!context) {
    throw new Error("Ada kesalahan tema");
  }
  return context;
}
