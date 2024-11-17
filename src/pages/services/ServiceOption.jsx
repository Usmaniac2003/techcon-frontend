import { Button, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import ServiceContentModal from "./ServiceContentModal";
import { IoMdAdd } from "react-icons/io";
import {
  FaArrowDown,
  FaCaretDown,
  FaChevronDown,
  FaChevronUp,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { useServiceContext } from "../../contexts/ServiceContext";

const ServiceOption = ({ option }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [serviceContent, setServiceContent] = useState({});
  const [showDetails, setShowDetails] = useState(false); 
  const { values, setValues } = useServiceContext();

  const handleUpdateCount = (option, operation) => {
    if (values.addOns[option?.id]) {
      const newAddOns = { ...values.addOns };
      if (operation === "add") {
        newAddOns[option?.id].count++;
      } else {
        newAddOns[option?.id].count--;
        if (!newAddOns[option?.id].count) {
          delete newAddOns[option?.id];
        }
      }
      console.log(newAddOns);
      setValues({ ...values, addOns: newAddOns });
    } else {
      const newOption = {
        ...option,
        count: 1,
      };
      setValues({
        ...values,
        addOns: { ...values?.addOns, [option?.id]: newOption },
      });
    }
  };

  const isAdded = values?.addOns[option?.id];
  return (
    <div className={`py-5 ${isAdded && 'bg-secondary'} relative border-b border-b-gray-300`}>
      <div
        className={`flex items-start gap-x-4  ${
          isAdded && "border-l-8 pl-2 border-primary"
        }`}
      >
        {option?.image_url && (
          <div
            onck={() => {
              setServiceContent(option);
              onOpen();
            }}
            className="md:w-[25%] w-[20%] md:h-[110px] h-[70px] bg-no-repeat bg-cover rounded-md cursor-pointer"
            style={{
              backgroundImage: `url('${option?.image_url}')`,
            }}
          ></div>
        )}
        <div className="flex-1 relative">
          <div
          onClick={() => setShowDetails(!showDetails)}
            className="cursor-pointer"
            // onClick={() => {
            //   setServiceContent(option);
            //   onOpen();
            // }}
          >
            <div className="flex items-center">
              <p className="mb-2 md:text-lg">{option?.title}</p>
              {showDetails ? <FaChevronUp className="mb-2 ml-2 cursor-pointer"/> : <FaChevronDown className="mb-2 ml-2 cursor-pointer"/>}
            </div>
            <p className="md:text-sm text-xs">{option?.description}</p>
          </div>
          <div className="flex select-none items-center justify-between md:mt-1 mt-2">
            <div className="flex items-center">
              <p className="mr-3">AED {option?.price}</p>
              <p className="line-through text-gray-400">
                AED {option?.original_price}
              </p>
            </div>
            {values?.addOns[option?.id] ? (
              <div className="flex items-center">
                <div
                  onClick={() => handleUpdateCount(option, "subtract")}
                  className="flex cursor-pointer justify-center items-center border rounded-full p-2 "
                >
                  <FaMinus className="text-primary" size={14} />
                </div>
                <div className="px-4 text-lg">
                  {values?.addOns[option?.id]?.["count"] || 0}
                </div>
                <div
                  onClick={() => handleUpdateCount(option, "add")}
                  className=" flex justify-center cursor-pointer items-center border rounded-full p-2"
                >
                  <FaPlus className="text-primary" size={14} />
                </div>
              </div>
            ) : (
              <Button
                onClick={() => handleUpdateCount(option)}
                color={"white"}
                rounded={"99999"}
                style={{
                  background: "var(--primary-color)",
                }}
                rightIcon={<IoMdAdd />}
              >
                {"Add"}
              </Button>
            )}
          </div>
        </div>
        {isOpen && (
          <ServiceContentModal
            isOpen={isOpen}
            onClose={onClose}
            data={serviceContent}
          />
        )}
      </div>

      {showDetails ?  <div className="mt-5 whitespace-pre-wrap text-gray-600" dangerouslySetInnerHTML={{ __html: option?.content }} /> : <></>}
    </div>
  );
};

export default ServiceOption;
