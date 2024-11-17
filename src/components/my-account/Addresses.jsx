import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../contexts/AuthContext";
import { HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getApi } from "../../services/api";
import { toast } from "react-toastify";
import NewAddressModal from "./NewAddressModal";

const Addresses = () => {
  const { t } = useTranslation();
  const { USER, ADDRESS, setADDRESS } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);

  const [data, setData] = useState([]);

  const fetchAddresses = async () => {
    try {
      const response = await getApi("api/addresses?user="+USER?._id);
      const addresses = response.data?.data || [];

      setData(addresses);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const handleOpenNewAddrModal = () => {
    setOpenModal(true);
  };

  const handleChangeAddress = val => {
    const address = data?.find(addr => addr?._id?.toString() === val); 
    setADDRESS(address); 
    localStorage.setItem("buildbazm_address", JSON.stringify(address));
    document.location.reload();
  }

  useEffect(() => {
    fetchAddresses();
  }, []);
  return (
    <>
      <div className="mt-8 flex items-center flex-col">
        <p
          className="uppercase text-center text-gray-400 text-sm"
          style={{
            letterSpacing: 2,
          }}
        >
          {t("SETTINGS")}
        </p>
        <h1 className="my-6 text-3xl font-bold">{t("Addresses")}</h1>

        <div className="border bg-white border-gray-300 rounded-lg py-6 px-6 w-[90%] md:w-[30%]">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-700">
              {t("Your saved addresses")}
            </p>
            <p
              onClick={handleOpenNewAddrModal}
              className="uppercase text-sm px-3 py-1 text-gray-500 cursor-pointer bg-gray-200 rounded-full"
            >
              {t("ADD NEW")}
            </p>
          </div>

          <div className="p-5 mt-5 border rounded flex flex-col items-start">
            {data.length === 0 && (
              <p className="text-gray-500">No addresses found</p>
            )}
            <RadioGroup
              value={ADDRESS?._id}
              onChange={handleChangeAddress}
            >
              {data.map((addr) => {
                return (
                  <Radio
                    className="my-5"
                    key={addr?._id}
                    size={"lg"}
                    value={addr?._id?.toString()}
                  >
                    <p className="pl-5">{addr?.formattedAddress}</p>
                  </Radio>
                );
              })}
            </RadioGroup>
          </div>
        </div>
      </div>

      {openModal && (
        <NewAddressModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
};

export default Addresses;
