import { useTranslation } from "react-i18next";

const ReferralCredits = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="mt-8 flex items-center flex-col">
        <p
          className="uppercase text-center text-gray-400 text-sm"
          style={{
            letterSpacing: 2,
          }}
        >
          {t("MY ACCOUNT")}
        </p>
        <h1 className="my-6 text-3xl font-bold">{t("Free Credit")}</h1>

        <div className="border bg-white border-gray-300 flex items-center h-[300px] justify-center rounded-lg py-6 px-4 w-[90%] md:w-[30%]">
          {t("Coming Soon!")}
        </div>
      </div>
    </>
  );
};

export default ReferralCredits;
