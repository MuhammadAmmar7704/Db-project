import { useState } from "react";
import LoadingBarContext from "./CreateContext.js";

export const LoadingBarProvider = ({ children }) => {
    const [progress, setProgress] = useState(0);
    
    return (
      <LoadingBarContext.Provider value={{ progress, setProgress }}>
        {children}
      </LoadingBarContext.Provider>
    );
  };
  