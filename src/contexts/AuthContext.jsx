import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getApi } from "../services/api";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [USER, setUSER] = useState(null);
  const [COUNTRY, setCOUNTRY] = useState(null);
  const [ADDRESS, setADDRESS] = useState(null);


  return (
    <AuthContext.Provider
      value={{
        USER,
        setUSER,
        ADDRESS, 
        setADDRESS, 
        COUNTRY, 
        setCOUNTRY
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
