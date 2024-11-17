import { IconButton } from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useStateContext } from "../../contexts/StateContext";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../contexts/AuthContext";

const XpertFirstCredits = () => {
  const { isMobile } = useStateContext();
  const {t} = useTranslation(); 
  const {USER} = useAuthContext(); 

  return (
    <>
     <div className="mt-8 flex flex-col items-center">
      <div className="w-[90%] md:w-[30%]">
        <IconButton onClick={() => history.goBack()} bg={"transparent"}>
          <IoArrowBackOutline size={isMobile ? 20 : 30} />
        </IconButton>
        <p className="text-xl ml-3 mt-2 font-bold">{t('XpertFirst Credits')}</p>

        <div className="border bg-white border-gray-300 rounded-lg mt-6 ml-3 p-3 flex justify-center items-center">
          <p className="flex flex-col items-center"><span className="font-bold text-primary text-2xl">{Math.floor(USER?.credits)}</span><span className="font-bold mt-2">{Math.floor(USER?.credits) * 0.02} AED</span></p>
        </div>
      </div>
    </div> 
    </>
  );
};

export default XpertFirstCredits;
