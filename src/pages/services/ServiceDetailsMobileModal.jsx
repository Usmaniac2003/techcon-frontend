import { FaTimes } from "react-icons/fa";
import { useServiceContext } from "../../contexts/ServiceContext";
import { useTranslation } from "react-i18next";

const ServiceDetailsMobileModal = ({ handleClose }) => {
  const { values } = useServiceContext();
  const { t } = useTranslation();
  return (
    <div>
      <div
        onClick={handleClose}
        className="w-screen z-[15] h-screen fixed top-0 left-0 transition-all backdrop-blur-[1px] bg-[#0000006f]"
      ></div>

      <div className="z-[30] relative rounded-tl-2xl rounded-tr-2xl bg-white">
        <div className="flex items-center justify-between px-4 py-3 mt-3 border-b">
          <p className="font-medium">{t("Booking Summary")}</p>
          <FaTimes onClick={handleClose} size={18} />
        </div>

        <div className="h-[40vh] pb-20 overflow-y-scroll">
          {Object.values(values?.addOns)?.length === 0 && (
            <div className="h-full flex justify-center items-center text-gray-400">
              {t("Add items to appear here")}
            </div>
          )}
          {Object.values(values?.addOns)?.map((addOn) => {
            return (
              <div key={addOn?.id} className="px-4 py-3 border-b">
                <p className="font-medium">
                  <span className="text-primary text-lg mr-1">
                    {" "}
                    {addOn?.count}x
                  </span>
                  {t(addOn?.title)}
                </p>
                <p>AED {addOn?.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsMobileModal;
