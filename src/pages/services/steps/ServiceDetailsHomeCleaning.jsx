import { useServiceContext } from "../../../contexts/ServiceContext";

const ServiceDetailsHomeCleaning = () => {
  const {values, setValues} = useServiceContext(); 
  
  const updateValues = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  return (
    <>
      <div>
        <div className="mb-6">
          <p className="font-[500]">
            How many hours do you need your professional to stay?
          </p>
          <div className="flex items-center gap-x-3 mt-3">
            {[2, 3, 4, 5, 6, 7, 8]?.map((option) => {
              return (
                <div
                  onClick={() => updateValues("hoursToStay", option)}
                  key={option?.value}
                  className={`flex ${
                    // eslint-disable-next-line react/prop-types
                    values?.["hoursToStay"] === option &&
                    "text-primary bg-secondary"
                  } justify-center cursor-pointer select-none items-center border text-center rounded-full px-3 py-2"px-0 w-[35px] py-0 h-[35px]`}
                >
                  <strong>{option}</strong>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-[500]">How many professionals do you need?</p>
          <div className="flex items-center gap-x-3 mt-3">
            {[1, 2, 3, 4]?.map((option) => {
              return (
                <div
                  onClick={() => updateValues("noOfProfessionals", option)}
                  key={option?.value}
                  className={`flex ${
                    // eslint-disable-next-line react/prop-types
                    values?.["noOfProfessionals"] === option &&
                    "text-primary bg-secondary"
                  } justify-center cursor-pointer select-none items-center border text-center rounded-full px-3 py-2"px-0 w-[35px] py-0 h-[35px]`}
                >
                  <strong>{option}</strong>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-[500]">Need cleaning materials?</p>
          <div className="flex items-center gap-x-3 mt-3">
            <div
              onClick={() => updateValues("cleaningMaterials", "no")}
              className={`flex ${
                // eslint-disable-next-line react/prop-types
                values?.["cleaningMaterials"] === "no" &&
                "text-primary bg-secondary"
              } justify-center cursor-pointer select-none w-max items-center border text-center rounded-full px-3 py-2`}
            >
              <strong>No, I have them</strong>
            </div>
            <div
              onClick={() => updateValues("cleaningMaterials", "yes")}
              className={`flex ${
                // eslint-disable-next-line react/prop-types
                values?.["cleaningMaterials"] === "yes" &&
                "text-primary bg-secondary"
              } justify-center cursor-pointer select-none items-center border w-max text-center rounded-full px-3 py-2`}
            >
              <strong>Yes, please</strong>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <p>Any instructions or special requirements?</p>
        <textarea
          onInput={(e) =>
            updateValues("requirements", e.target.value?.trim() || "")
          }
          
          rows={6}
          className="w-full rounded resize-none border p-2 mt-2"
          placeholder={
            "Example: Key under the mat, ironing, window cleaning, etc."
          }
        ></textarea>
      </div>
    </>
  );
};

export default ServiceDetailsHomeCleaning;
