import { MenuItem } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BiUser, BiBook, BiWallet, BiHelpCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const UserMenuList = ({ handleCloseUserMenu }) => {
  const { t } = useTranslation();
  const handleLogout = () => {
    localStorage.removeItem("buildbazm_user");
    localStorage.removeItem("buildbazm_city");
    location.href = "/";
  };

  const list = [
    {
      icon: <BiUser size={18} />,
      label: t("Profile"),
      link: "/my-account/profile",
    },
    {
      icon: <BiBook size={18} />,
      label: t("Bookings"),
      link: "/my-account/bookings",
    },
 
    {
      icon: <BiWallet size={18} />,
      label: t("Payment Methods"),
      link: "/my-account/payment-methods",
    },
    {
      icon: <BiHelpCircle size={18} />,
      label: t("Help"),
      link: "/help",
    },
  ];
  return (
    <>
      <div className="p-2 rounded">
        {list?.map((item) => {
          return (
              <Link key={item.link} onClick={handleCloseUserMenu} to={item.link}>
            <MenuItem>
              <div className="flex px-2 items-center py-3 border-b w-full">
                <span className="mr-3">{item.icon}</span>
                <p className="text-gray-600">{item.label}</p>
              </div>
            </MenuItem>
            </Link>
          );
        })}

        <div className="flex mt-3 w-full items-center justify-center">
          <p
            onClick={handleLogout}
            className="text-red-500 w-max text-center cursor-pointer underline"
          >
            {t("Logout")}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserMenuList;
