import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { useTranslation } from "react-i18next";

const StateContext = createContext({});

const statuses = {
  pending: {
    label: "Pending",
    text: "#a16207",
    bg: "#fef08a",
  },
  approved: {
    label: "Approved",
    text: "#3bb500",
    bg: "#9fff9f",
  },
};

export default function StateProvider({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeCity, setActiveCity] = useState(
    localStorage.getItem("buildbazm_city") || null
  );
  const isMobile = useMediaQuery("(max-width: 500px)");
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
 
  useEffect(() => {
    document.body.style.direction = i18n.language === "ar" ? "rtl" : "ltr";
    setIsRTL(i18n.language === "ar");
  }, [i18n.language]);

  return (
    <StateContext.Provider
      value={{
        authModal: { isOpen, onOpen, onClose },
        isMobile,
        isRTL,
        activeCity,
        setActiveCity,
        statuses,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
