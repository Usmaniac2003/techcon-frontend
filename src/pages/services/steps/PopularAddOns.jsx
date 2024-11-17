import { Button } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { IoRemove } from "react-icons/io5";
import { useServiceContext } from "../../../contexts/ServiceContext";

const list = [
  {
    key: "Party Cleaning",
    amount: 25,
    image:
      "https://deax38zvkau9d.cloudfront.net/prod/assets/images/attribute-contents/17123055481712299779party_category_750x320-mobile.webp",
  },
  {
    key: "Balcony Cleaning",
    amount: 19,
    image:
      "https://deax38zvkau9d.cloudfront.net/prod/assets/images/attribute-contents/1666863636Balcony%20Cleaning.jpg",
  },
  {
    key: "Cupboard Cleaning",
    amount: 25,
    image:
      "https://deax38zvkau9d.cloudfront.net/prod/assets/images/attribute-contents/1666865305Cupboard%20Arrangement.jpg",
  },
];

const PopularAddOns = () => {
  const {values, setValues} = useServiceContext(); 
  return (
    <div>
      <p className="font-bold"> People also added</p>

      <div className="mt-3 flex items-center gap-x-3 mb-12">
        {list?.map((addon) => {
          const isAdded = values?.addOns?.find((a) => a?.key === addon?.key);
          return (
            <div
              key={addon?.key}
              className="rounded-lg relative shadow-sm h-max w-[30%] border"
            >
              <div
                className="h-[80px]"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${addon?.image})`,
                }}
              ></div>
              <div className="px-2">
                <p className="font-bold my-2">{addon?.key}</p>
                <p className="mt-1">AED {addon?.amount}</p>
              </div>

              <Button
                onClick={() =>
                  setValues({
                    ...values,
                    addOns: isAdded
                      ? values?.addOns?.filter((a) => a?.key !== addon?.key)
                      : [...values?.addOns, addon],
                  })
                }
                className="absolute -bottom-5 left-[50%] -translate-x-[50%]"
                color={"white"}
                rounded={"99999"}
                style={{
                  background: isAdded ? "red" : "var(--primary-color)",
                }}
                rightIcon={isAdded ? <IoRemove /> : <IoMdAdd />}
              >
                {isAdded ? "Remove" : "Add"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularAddOns;
