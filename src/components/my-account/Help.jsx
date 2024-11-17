import { useTranslation } from "react-i18next";
import HelpData from "../../data/help.json";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Help = () => {
  const { t } = useTranslation();
  const [heading, setHeading] = useState("");
  const [Data, setData] = useState(HelpData);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.get("category")) {
      let data = [];
      let heading = "";
      const cat = HelpData?.find(
        (category) => category.id === Number(params.get("category"))
      );

      data = cat?.options;
      heading = cat?.display_name;

      if (params.get("option")) {
        const option = cat.options?.find(
          (option) => option.id === Number(params.get("option"))
        );

        data = option?.questions;
        heading = option?.display_name;

        if (params.get("question")) {
          const question = option?.questions?.find(
            (question) => question.id === Number(params.get("question"))
          );
          heading = question.question;
          data = question.answer.text;
        }
      }

      setHeading(heading);
      setData(data);
    } else {
      setData(HelpData);
      setHeading("We are always here to help you");
    }
  }, [params]);

  return (
    <>
      <div className="mt-8 flex items-center flex-col">
        <p
          className="uppercase text-center text-gray-400 text-sm"
          style={{
            letterSpacing: 2,
          }}
        >
          {" "}
          {t("HELP")}
        </p>
        <h1 className="my-6 text-3xl font-bold">{t("Help")}</h1>

        <div className="border bg-white mb-12 border-gray-300 rounded-lg py-6 w-[90%] md:w-[30%]">
          <p className="text-lg px-5 font-bold">{heading}</p>

          <div className="mt-5">
            {typeof Data === "string" ? (
              <div
                className="px-5"
                dangerouslySetInnerHTML={{ __html: Data }}
              ></div>
            ) : (
              Data?.map((item) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (!params.get("category")) {
                        setParams((params) => {
                          params.set("category", item.id);
                          return params;
                        });
                      } else {
                        if (!params.get("option")) {
                          setParams((params) => {
                            params.set("option", item.id);
                            return params;
                          });
                        } else {
                          if (!params.get("question")) {
                            setParams((params) => {
                              params.set("question", item.id);
                              return params;
                            });
                          }
                        }
                      }
                    }}
                    className="flex cursor-pointer items-center justify-between px-6 border-b py-4"
                  >
                    <p>{item.display_name || item?.question}</p>
                    <FaAngleRight style={{ color: "grey" }} />
                  </div>
                );
              })
            )}

            <div className="flex justify-center items-center space-x-5 text-sm mt-6">
              <a href="#" className="text-gray-400">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
