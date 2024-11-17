import emailjs from "@emailjs/browser";
import { createContext, useContext, useState } from "react";

const ServiceContext = createContext({});

function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

const serviceValues = {
  initialValues: {
    hoursToStay: 2,
    noOfProfessionals: 1,
    cleaningMaterials: "no",
    addOns: {},
    frequency: 1,
    professional: "auto-assign",
    paymentMethod: "Cash",
    date: formatDate(new Date()),
    startTime: "09:00",
    endTime: "09:30",
  },
  prices: {
    perHour: 50,
    cleaningMaterials: 30,
    serviceFee: 9,
    cashCharges: 5,
  },
};

const handleSendEmail = async (data) => {
  try {
    await emailjs.send(
      "service_yxcxh33",
      "template_0m59b7c",
      { data },
      {
        publicKey: "oViey6tyw-x6Y7Q4p",
      }
    );

    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default function ServiceProvider({ children }) {
  const [values, setValues] = useState({ ...serviceValues.initialValues });
    const [coupon, setCoupon] = useState(null); 

  return (
    <ServiceContext.Provider
      value={{
        serviceValues,
        handleSendEmail,
        values,
        setValues,
        coupon, 
        setCoupon
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export const useServiceContext = () => useContext(ServiceContext);
