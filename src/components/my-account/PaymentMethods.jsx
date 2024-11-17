import { useTranslation } from "react-i18next";

const PaymentMethods = () => {
  const {t} = useTranslation(); 
  return (
     <>
      <div className="mt-8 flex items-center flex-col">
        <p
          className="uppercase text-center text-gray-400 text-sm"
          style={{
            letterSpacing: 2,
          }}
        >
          {t('SETTINGS')}
        </p>
        <h1 className="my-6 text-3xl font-bold">{t('Credit Cards')}</h1>

        <div className="border border-gray-300 bg-white rounded-lg py-6 px-6 w-[90%] md:w-[30%]">
          <p>{t("You don't have a registered credit card")}</p>
        </div>
      </div>
    </> 
  );
};

export default PaymentMethods;
