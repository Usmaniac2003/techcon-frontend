import { Box, Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import Logo from "../assets/logos/full_logo_light.svg";
import ShortLogo from "../assets/logos/logo.png";
import AppStore from "../assets/appstore.png";
import PlayStore from "../assets/playstore.png";
import { useStateContext } from "../contexts/StateContext";
import { useAuthContext } from "../contexts/AuthContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import UserMenuList from "./navbar/UserMenuList";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaDotCircle, FaTimes } from "react-icons/fa";
import { getApi } from "../services/api";
import { toast } from "react-toastify";
import { IoLocationSharp } from "react-icons/io5";

const languages = {
  en: "English",
  ar: "اردو",
};

const Navbar = () => {
  const { authModal, isMobile, isRTL, activeCity, setActiveCity } =
    useStateContext();
  const [userMenuList, setUserMenuList] = useState(false);
  const { USER, ADDRESS } = useAuthContext();
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(true);

  const { t, i18n } = useTranslation();

  const handleChangeCity = (c) => {
    setActiveCity(c._id);
    localStorage.setItem("buildbazm_city", c._id);
    document.location.reload();
  };

  const deselectCity = () => {
    localStorage.removeItem("buildbazm_city");
    location.href = "/";
  };

  const fetchCities = async () => {
    try {
      setCitiesLoading(true);
      const cities = await getApi("api/locations/cities");
      setCities(cities.data?.cities || []);
      setCitiesLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div className="shadow-xl sticky top-0 left-0 right-0 z-[999] border-b border-[#ddd] bg-white py-3">
      <div className="md:container md:px-40 px-5 mx-auto flex items-center justify-between">
        <div className="flex items-center w-full">
          <Link to={"/"} className="flex items-center space-x-2 ">
            <img
              alt=""
              className="md:w-[50px] object-contain"
              src={ShortLogo}
            />
            <img
              alt=""
              className="md:w-[120px] object-contain w-[2000px] "
              src={Logo}
            />
          </Link>
        </div>
        {!isMobile && (
          <div>
            <p
              onClick={() =>
                i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")
              }
              className="cursor-pointer px-3"
            >
              {languages[i18n.language === "en" ? "ar" : "en"]}
            </p>
          </div>
        )}
        <div className="flex items-center navbar">
          <div className="ml-4">
            <Menu closeOnSelect>
              <MenuButton
                background={"transparent"}
                borderRadius={30}
                onClick={() => setUserMenuList(true)}
                className="account-btn"
                border={"1px solid rgba(0,0,0,.12)"}
                as={Button}
                rightIcon={<RxHamburgerMenu fontWeight={"bold"} size={23} />}
              >
                {USER && !isMobile ? (
                  USER?.fullName
                ) : (
                  <FaCircleUser className="mr-2 text-primary" size={22} />
                )}
              </MenuButton>
              <MenuList
                width={300}
                className="shadow-lg border border-gray-200 relative"
              >
                {USER ? (
                  <UserMenuList
                    handleCloseUserMenu={() => setUserMenuList(false)}
                  />
                ) : (
                  <div className="p-4 pb-8">
                    <Button
                      onClick={() => authModal?.onOpen()}
                      className="w-full primary-btn text-white rounded-full"
                      style={{ borderRadius: "50px" }}
                    >
                      <p>{t("Sign Up or Log In")}</p>
                    </Button>
                    <div className="flex space-x-2 justify-center mt-6">
                      <div className="flex items-center space-x-2">
                        <img width={125} src={AppStore} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <img width={125} src={PlayStore} />
                      </div>
                    </div>
                  </div>
                )}
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
