import { useTranslation } from "react-i18next";
import { useStateContext } from "../../contexts/StateContext";

const FamilyPoster = () => {
  const { t } = useTranslation();
  const { isRTL } = useStateContext();
  return (
    <div className="md:container md:mx-auto mt-16 mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex justify-center flex-col md:pl-[10%] bg-[#e1e1e191] text-black p-10">
          <h1 className="text-3xl font-bold mb-4">
            {t("Xpert First Makes Your Life Easier")}
          </h1>
          <p className="text-lg mb-6">
            {t("250+ on-demand services at your fingertips")}
          </p>
          <div
            className={`flex-col md:flex-row flex md:first-line:marker:space-x-8 container ${
              !isRTL && "md:pr-[20%]"
            } md:first-line:mt-8`}
          >
            <div className="flex items-center space-x-2 mb-3 md:mb-0">
              <span className="bg-gray-300 text-primary p-4 rounded-full">
                {/* Icon for Trusted verified Heroes */}
              
              </span>
              <span>{t("Trusted verified Heroes")}</span>
            </div>
            <div className="flex items-center space-x-2 mb-3 md:mb-0">
              <span className="bg-gray-300 text-primary p-4 rounded-full">
              
              </span>
              <span>{t("Convenience and transparency")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-gray-300 text-primary p-4 rounded-full">
                {/* Icon for Best price in the market */}
               
              </span>
              <span>{t("Best price in the market")}</span>
            </div>
          </div>
        </div>
        <div className="md:w-[40%] w-full">
          <img
            src="https://plus.unsplash.com/premium_photo-1661772044028-5f4676fef07a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={t("Family enjoying services")}
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyPoster;
