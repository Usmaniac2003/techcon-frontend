import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getApi } from "../services/api";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [USER, setUSER] = useState(null);
  const [COUNTRY, setCOUNTRY] = useState(null);
  const [ADDRESS, setADDRESS] = useState(null);

  const fetchAddresses = async () => {
    try {
      const response = await getApi("api/addresses?user=" + USER?._id);
      const addresses = response.data?.data || [];

      if (addresses.length) {
        setADDRESS(addresses[0]);
        localStorage.setItem(
          "xpertfirst_address",
          JSON.stringify(addresses[0])
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // useEffect(() => {
  //   if (ADDRESS) {
  //     localStorage.setItem("xpertfirst_address", JSON.stringify(ADDRESS));
  //     document.location.reload();
  //   }
  // }, [ADDRESS]);

  useEffect(() => {
    if (USER?._id && !localStorage.getItem("xpertfirst_address")) {
      fetchAddresses();
    }
  }, [USER]);

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
