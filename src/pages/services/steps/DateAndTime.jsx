import { Button } from "@chakra-ui/react";
import { BiInfoCircle, BiRepeat } from "react-icons/bi";
import Logo from "../../../assets/logos/logo.png";
import { useServiceContext } from "../../../contexts/ServiceContext";
import CustomDateTimeSlider from "../components/CustomDateTimeSlider";

const frequencies = [
  {
    value: 1,
    label: "One Time",
  },
  {
    value: 7,
    label: "Weekly",
  },
  {
    value: 14, 
    label: "Every two weeks"
  }
];

function generateNext15Dates() {

  function formatDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
}

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const datesArray = [];

  for (let i = 0; i < 15; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    datesArray.push({
      day: daysOfWeek[nextDate.getDay()],
      date: nextDate.getDate(),
      formatted: formatDate(nextDate)
    });
  }

  return datesArray;
}

function generateTimeSlots() {
  const timesArray = [];
  const date = new Date(); 
  let startHour = date.getHours() + 2;
  let startMinute = 0;

  while (startHour < 21 || (startHour === 21 && startMinute === 0)) {
    let endHour = startHour;
    let endMinute = startMinute + 30;

    if (endMinute === 60) {
      endMinute = 0;
      endHour += 1;
    }

    const startTime = `${startHour.toString().padStart(2, "0")}:${startMinute
      .toString()
      .padStart(2, "0")}`;
    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute
      .toString()
      .padStart(2, "0")}`;

    timesArray.push({
      startTime: startTime,
      endTime: endTime,
    });

    startHour = endHour;
    startMinute = endMinute;
  }

  return timesArray;
}

const DateAndTime = ({ serviceId }) => {
  const { values, setValues } = useServiceContext();

  return (
    <>
      <div>
        {serviceId?.startsWith("home-cleaning") && (
          <div className="rounded-lg border border-primary bg-secondary p-4 mb-6">
            <p className="font-bold">Frequency</p>

            <div className="flex items-center mt-3">
              {frequencies?.map((l) => {
                const isActive = values?.frequency === l?.value;
                return (
                  <Button
                    onClick={() =>
                      setValues({ ...values, frequency: l?.value })
                    }
                    key={l?.value}
                    className={`mr-2 ${!isActive && "border border-gray-300"}`}
                    color={isActive && "white"}
                    rounded={"99999"}
                    style={{
                      background: isActive && "var(--primary-color)",
                    }}
                    leftIcon={<BiRepeat />}
                  >
                    {l?.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="font-bold text-lg">Which professional do you prefer?</p>
          <div className="flex items-center gap-x-3 mt-3">
            <div
              className={`rounded-lg p-4 md:w-[30%] w-[50%] cursor-pointer text-center flex flex-col items-center border border-primary bg-secondary`}
            >
              <img src={Logo} width={80} height={80} />
              <p className="mt-2 font-bold">Auto Assign</p>
              <small className="mt-7 block">
                We will assign the best professional
              </small>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="font-bold text-lg">When would you like your service?</p>
          <CustomDateTimeSlider
            data={generateNext15Dates()?.map((date) => {
              return (
                <div key={date.date}>
                  <div className="flex flex-col items-center mr-[22px]">
                    <p className="font-bold text-gray-500 mb-1">{date.day}</p>
                    <div onClick={() => setValues((values) => ({...values, date: date?.formatted}))} className={`text-lg cursor-pointer w-[20px] h-[20px] p-4 rounded-full flex items-center justify-center font-bold border ${values.date === date.formatted ? 'border-primary bg-secondary text-primary' : 'border-gray-300'}`}>
                      {date.date}
                    </div>
                  </div>
                </div>
              );
            })}
          />
        </div>
        <div className="mb-6">
          <p className="font-bold text-lg">
            What time would you like us to start?
          </p>
          <div className=" mt-4">
            <CustomDateTimeSlider
              data={generateTimeSlots()?.map((time) => {
                const isActive = values.startTime === time.startTime && values.endTime && time.endTime; 
                return (
                  <div
                    key={time.startTime}
                    onClick={() => setValues(values => ({...values, startTime: time.startTime, endTime: time.endTime}))}
                    className={`px-3 cursor-pointer py-2 border ${(isActive) && 'border-primary bg-secondary text-primary'} flex justify-center items-center font-bold text-lg rounded-[30px] w-max whitespace-nowrap mr-2`}
                  >
                    {time.startTime + "-" + time.endTime}
                  </div>
                );
              })}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-[#f5f5f5] pb-7 rounded-md p-4 text-[rgba(0,0,0,.6)] flex items-center">
            <BiInfoCircle />
            <p className="ml-2">
              Free cancellation until 12 hours before the start of your booking.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateAndTime;
