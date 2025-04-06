"use client";
import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken: string) => {},
});

export const AppProvider: React.FC<{
  children: React.ReactNode;
  initialSessionToken?: string;
}> = ({ children, initialSessionToken }) => {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);

  const contextValue = useMemo(
    () => ({ sessionToken, setSessionToken }),
    [sessionToken, setSessionToken]
  );

  return (
    <AppContext.Provider value={contextValue as any}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
