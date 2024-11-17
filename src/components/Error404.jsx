import { useTranslation } from "react-i18next";

const Error404 = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="h-screen flex items-center flex-col justify-center">
        <h1 className="text-red-500">{t("404 - Page not found")}</h1>
        <a className="underline" href="/">
          {t("Go to Home")}
        </a>
      </div>
    </>
  );
};

export default Error404;
