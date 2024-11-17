import { CircularProgress, IconButton } from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ServiceDetailsHomeCleaning from "./steps/ServiceDetailsHomeCleaning";
import DateAndTime from "./steps/DateAndTime";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { useServiceContext } from "../../contexts/ServiceContext";
import PaymentStep from "./steps/PaymentStep";
import { useStateContext } from "../../contexts/StateContext";
import { postApi, getApi } from "../../services/api";
import { useAuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import ServiceDetails from "./steps/ServiceDetails";
// import servicesData from "../../data/index.json";
import ServiceDetailsMobileModal from "./ServiceDetailsMobileModal";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import PaymentSummary from "./components/PaymentSummary";
import { useTranslation } from "react-i18next";
import FeedbackModal from "../../components/FeedbackModal";
import { set } from "lodash";

const DISCOUNTS = {
  home_cleaning: 0.2,
  others: 0.35,
  frequencies: {
    weekly: 0.1,
    biweekly: 0.05,
  },
};

const Servicer = () => {
  const { serviceValues, values, setValues, coupon, setCoupon } =
    useServiceContext();
  const { authModal, isMobile } = useStateContext();
  const { serviceId } = useParams();
  const [serviceDetails, setServiceDetails] = useState({});
  const [mobileDetailsModal, setMobileDetailsModal] = useState(false);
  const { USER, setUSER, ADDRESS } = useAuthContext();
  const [step, setStep] = useState(0);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [steps, setSteps] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [additionalCharges, setAdditionalCharges] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState({
    subTotal: 0,
    total: 0,
    credit: 0,
  });
  const { t } = useTranslation();
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [charges, setCharges] = useState({});

  const isLastStep = step + 1 === steps?.length;
  const navigate = useNavigate();

  const handleSubmit = async (totalPayment) => {
    try {
      setLoading(true);
      let discount = !USER?.lastBooking
        ? parseFloat(
            (
              (serviceId?.startsWith("home-cleaning")
                ? DISCOUNTS.home_cleaning
                : DISCOUNTS.others) * paymentSummary?.total
            ).toFixed(2)
          )
        : 0;
      let couponDiscount = 0;
      if (coupon) {
        couponDiscount = parseFloat(
          ((coupon?.discount || 0) / 100) * paymentSummary?.total
        ).toFixed(2);
      }
      const data = {
        satus: "pending",
        customer: USER?._id?.toString(),
        type: serviceDetails?.title || "",
        price: {
          ...paymentSummary,
          total: totalPayment,
          firstOrderDiscount: discount,
          cashCharges: serviceValues.prices?.cashCharges,
          serviceFee: serviceValues.prices?.serviceFee,
          couponDiscount,
        },
        payment: {
          method: values?.paymentMethod,
        },
        address: {
          formatted: ADDRESS?.formattedAddress || "",
          lat: ADDRESS?.latlng?.split(",")[0],
          lng: ADDRESS?.latlng?.split(",")[1],
        },
        dateAndTime: {
          date: values?.date
            ? new Date(values?.date).toISOString().split("T")[0]
            : "",
          startTime: values?.startTime || "",
          endTime: values?.endTime || "",
        },
        requirements: values?.requirements || "",
        addOns: Object.values(values.addOns),
      };

      if (serviceId?.startsWith("home-cleaning")) {
        data["details"] = {
          hoursToStay: {
            label: "Duration",
            value: values?.hoursToStay,
          },
          noOfProfessionals: {
            label: "No. of cleaners",
            value: values?.noOfProfessionals,
          },
          cleaningMaterials: {
            label: "Materials Required?",
            value: values?.cleaningMaterials,
          },
          frequency: {
            label: "Frequency",
            value: values?.frequency,
          },
        };
      }

      if (coupon) {
        data["coupon"] = coupon?._id?.toString();
      }

      const response = await postApi("api/leads", data);
      if (response?.status === 200) {
        const bookingId = response.data?.response?._id;
        toast.success("Appointement submitted successfuly!");

        const updatedUser = { ...USER, lastBooking: bookingId, credits: response.data?.credits };
        setUSER(updatedUser);
        localStorage.setItem("buildbazm_user", JSON.stringify(updatedUser));

        // navigate("/");
        setFeedbackModal(true);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const handleOpenMobileDetails = () => {
    setMobileDetailsModal(!mobileDetailsModal);
  };
  const fetchData = async () => {
    try {
      const response = await getApi(`api/service/service-detail/${serviceId}`);
      if (response?.data) {
        return response.data;
      } else {
        toast.error("Service not found!");
        console.error("Invalid response structure", response);
      }
    } catch (error) {
      console.error("Error fetching service details:", error);
      toast.error("Failed to fetch service details. Please try again.");
    }
  };
  useEffect(() => {
    fetchData().then((response) => {
      console.log("Service in use effect", response);
      setServiceDetails(response);
      const steps = [
        {
          name: "Service Details",
          content: serviceId?.startsWith("home-cleaning") ? (
            <ServiceDetailsHomeCleaning
              setCharges={setCharges}
              prices={serviceValues.prices}
            />
          ) : (
            <ServiceDetails
              data={response?.details}
              setCharges={setCharges}
              prices={serviceValues.prices}
            />
          ),
        },
      ];
      steps.push(
        ...[
          {
            name: "Date & Time",
            content: <DateAndTime serviceId={serviceId} />,
          },
          {
            name: "Checkout",
            content: <PaymentStep service={serviceId} />,
          },
        ]
      );

      setSteps(steps);
    });

    // if (serviceId === "home_cleaning") {
    //   steps.push({
    //     name: "Popular Add-ons",
    //     content: <PopularAddOns setCharges={setCharges} />,
    //   });
    // }
  }, []);
  useEffect(() => {
    console.log("Updated serviceDetails:", serviceDetails);
  }, [serviceDetails]);
  useEffect(() => {
    if (serviceId?.startsWith("home-cleaning")) {
      const totalHours = values?.hoursToStay * values?.noOfProfessionals;
      const totalCharges = totalHours * serviceValues.prices.perHour;

      setCharges((prev) => ({ ...prev, professionals: totalCharges }));
    }
  }, [values?.hoursToStay, values?.noOfProfessionals]);

  useEffect(() => {
    if (serviceId?.startsWith("home-cleaning")) {
      const totalCharges =
        values?.cleaningMaterials === "yes"
          ? serviceValues.prices.cleaningMaterials
          : 0;
      setCharges((prev) => ({ ...prev, cleaningMaterials: totalCharges }));
    }
  }, [values?.cleaningMaterials]);

  useEffect(() => {
    const allAddOns = Object.values(values.addOns);
    let totalPrice = allAddOns?.reduce(
      (a, b) => a + parseFloat(b?.price) * b?.count,
      0
    );
    setCharges((prev) => ({ ...prev, addOns: totalPrice }));
  }, [values.addOns]);

  useEffect(() => {
    setPaymentLoading(true);
    setPaymentSummary((prev) => ({
      ...prev,
      subTotal: Object.values(charges)?.reduce((a, b) => a + b, 0),
      total: Object.values(charges)?.reduce((a, b) => a + b, 0),
      credit: 0,
    }));
    setTimeout(() => {
      setPaymentLoading(false);
    }, 1000);
  }, [charges]);

  useEffect(() => {
    return () => {
      setValues(serviceValues.initialValues);
      setCoupon(null);
    };
  }, []);

  useEffect(() => {
    if (step + 1 === steps.length) {
      const charges = [];
      charges.push({
        id: "serviceFee",
        amount: serviceValues.prices?.serviceFee,
      });

      if (values?.paymentMethod === "Cash") {
        charges.push({
          id: "cashPayment",
          amount: serviceValues.prices?.cashCharges,
        });
      }

      setAdditionalCharges(charges);
    } else {
      setAdditionalCharges([]);
    }
  }, [step, values?.paymentMethod]);

  let totalPayment = paymentSummary?.total;

  if (isLastStep) {
    if (!USER?.lastBooking) {
      totalPayment -= parseFloat(
        (
          (serviceId?.startsWith("home-cleaning")
            ? DISCOUNTS.home_cleaning
            : DISCOUNTS.others) * paymentSummary?.total
        ).toFixed(2)
      );
    }

    if (coupon) {
      totalPayment -= parseFloat(
        ((coupon?.discount || 0) / 100) * totalPayment
      ).toFixed(2);
    }

    totalPayment += additionalCharges?.reduce(
      (a, b) => a + (b?.amount || 0),
      0
    );
  }

  if (values?.frequency) {
    if (values?.frequency === 7) {
      totalPayment -= parseFloat(
        ((DISCOUNTS.frequencies.weekly || 0)) * totalPayment
      ).toFixed(2);
    } else if (values?.frequency === 14) {
      totalPayment -= parseFloat(
        ((DISCOUNTS.frequencies.biweekly || 0)) * totalPayment
      ).toFixed(2);
    }
  }

  const validateCoupon = async (couponCode) => {
    try {
      const response = await postApi("api/coupons/validate", {
        code: couponCode,
        userId: USER?._id,
        service: serviceId,
      });
      if (response.data?.status) {
        setCoupon(response.data?.data);
        toast.success("Coupon has been applied!");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const couponCode = searchParams.get("coupon");
    if (couponCode) {
      validateCoupon(couponCode);
    }
  }, [searchParams.get("coupon")]);

  if (serviceDetails === undefined) {
    return;
  }

  return (
    <div className="md:mt-8 mt-4 mb-8">
      <div className=" md:container md:mx-auto md:px-60 px-3">
        <div className="flex items-center">
          <IconButton
            size={isMobile ? "sm" : "md"}
            onClick={() => {
              if (step + 1 > 1) {
                setStep(step - 1);
              } else {
                navigate("/");
              }
            }}
          >
            <IoArrowBackOutline />
          </IconButton>
          <div className="w-[12px]"></div>
          <span className="text-gray-500">
            {t("Step")} {step + 1} {t("of")} {steps.length}
          </span>
        </div>
        <p className="text-xl mt-2 font-bold">{t(steps[step]?.name)}</p>

        <div className="flex items-start gap-5 md:mt-7 mt-4 mb-44 md:mb-0">
          <div className="rounded-lg border w-[100%] md:w-[60%] bg-white border-gray-200p-5 flex-1 md:p-6 p-3">
            {steps[step]?.content}

            {!isMobile &&
              (isLastStep ? values.paymentMethod === "Cash" : true) && (
                <button
                  onClick={() => {
                    if (step === steps.length - 2) {
                      const user = USER;
                      if (user) {
                        setStep(step + 1);
                      } else {
                        authModal?.onOpen();
                      }
                    } else if (!isLastStep) {
                      setStep(step + 1);
                    } else {
                      handleSubmit(totalPayment);
                    }
                  }}
                  className="w-full bg-black text-white py-3 text-center rounded-full"
                >
                  {loading ? (
                    <CircularProgress
                      size={8}
                      isIndeterminate
                      color="green.300"
                    />
                  ) : isLastStep ? (
                    t("Submit")
                  ) : (
                    t("Next")
                  )}
                </button>
              )}
          </div>
          {!isMobile && (
            <div className="w-[40%]">
              <div className="rounded-lg border border-gray-200 p-6 bg-white">
                <p className="font-[500] mb-4 text-black">
                  {t("Booking Details")}
                </p>
                <div className="flex mb-4 items-center justify-between">
                  <p className="text-[#b3b3b3]">{t("Address")}</p>
                  <p>{USER?.address || "-"}</p>
                </div>
                <div className="flex mb-4 items-center justify-between">
                  <p className="text-[#b3b3b3]">{t("Service")}</p>
                  <p>{serviceDetails?.title}</p>
                </div>
                {values?.hoursToStay &&
                  serviceId?.startsWith("home-cleaning") && (
                    <div className="flex mb-4 items-center justify-between">
                      <p className="text-[#b3b3b3]">{t("Duration")}</p>
                      <p>{values?.hoursToStay + " " + t("hours")}</p>
                    </div>
                  )}
                {values?.noOfProfessionals &&
                  serviceId?.startsWith("home-cleaning") && (
                    <div className="flex mb-4 items-center justify-between">
                      <p className="text-[#b3b3b3]">
                        {t("Number of Professionals")}
                      </p>
                      <p>{values?.noOfProfessionals}</p>
                    </div>
                  )}
                {values?.cleaningMaterials &&
                  serviceId?.startsWith("home-cleaning") && (
                    <div className="flex mb-4 items-center justify-between">
                      <p className="text-[#b3b3b3]">{t("Material")}</p>
                      <p>
                        {values?.cleaningMaterials[0]?.toUpperCase() +
                          values?.cleaningMaterials?.slice(1)}
                      </p>
                    </div>
                  )}
                {!!Object.values(values?.addOns)?.length && (
                  <div className="mb-4 items-center justify-between">
                    <p className="text-[#b3b3b3]">{t("Service Details")}</p>
                    <div className="mt-2">
                      {Object.values(values?.addOns)?.map((a) => (
                        <div className="flex items-center" key={a?.id}>
                          <span className="text-primary text-lg">
                            {a?.count}x
                          </span>{" "}
                          <p className="ml-2">{t(a?.title)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {values?.frequency &&
                  serviceId?.startsWith("home-cleaning") && (
                    <div className="flex mb-4 items-center justify-between">
                      <p className="text-[#b3b3b3]">{t("Frequency")}</p>
                      <p>
                        {
                          {
                            1: t("One Time"),
                            7: t("Weekly"),
                            14: t("Every two weeks"),
                          }[values?.frequency]
                        }
                      </p>
                    </div>
                  )}

                {(values?.date || values?.startTime || values?.endTime) && (
                  <div className="flex mb-4 items-center justify-between">
                    <p className="text-[#b3b3b3]">{t("Date & Start Time")}</p>
                    <div>
                      {values?.date && values?.date + ","}
                      <p>
                        {values?.startTime && values?.startTime}
                        {values?.endTime && " - " + values?.endTime}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="rounded-lg mt-5 border border-gray-200 p-6 bg-white">
                <PaymentSummary
                  USER={USER}
                  isLastStep={isLastStep}
                  paymentLoading={paymentLoading}
                  values={values}
                  frequencyDiscounts={DISCOUNTS.frequencies}
                  prices={serviceValues.prices}
                  discount={
                    serviceId?.startsWith("home-cleaning")
                      ? DISCOUNTS.home_cleaning
                      : DISCOUNTS.others
                  }
                  totalPayment={totalPayment}
                  paymentSummary={paymentSummary}
                />
              </div>
            </div>
          )}

          {isMobile && (
            <div className="fixed z-[1000] bg-white bottom-0 left-0 right-0">
              {mobileDetailsModal && (
                <ServiceDetailsMobileModal
                  handleClose={() => setMobileDetailsModal(false)}
                />
              )}
              <div className="flex p-5 relative z-[30] bg-white items-center justify-between border-t">
                {paymentLoading ? (
                  <div className="w-[45%]">
                    <Skeleton count={2} />
                  </div>
                ) : (
                  <div
                    onClick={handleOpenMobileDetails}
                    className="w-[50%] flex flex-col"
                  >
                    <span className="text-gray-500">{t("Total")}</span>
                    <div className="flex items-center">
                      <strong>AED {totalPayment}</strong>
                      {mobileDetailsModal ? (
                        <RxCaretDown className="ml-3" size={28} />
                      ) : (
                        <RxCaretUp className="ml-3" size={28} />
                      )}
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setMobileDetailsModal(false);
                    if (step === steps.length - 2) {
                      const user = USER;
                      if (user) {
                        setStep(step + 1);
                      } else {
                        authModal?.onOpen();
                      }
                    } else if (!isLastStep) {
                      setStep(step + 1);
                    } else {
                      handleSubmit(totalPayment);
                    }
                  }}
                  className="w-[50%] bg-black text-white py-3 text-center rounded-full"
                >
                  {loading ? (
                    <CircularProgress
                      size={8}
                      isIndeterminate
                      color="green.300"
                    />
                  ) : isLastStep ? (
                    t("Submit")
                  ) : (
                    t("Next")
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {feedbackModal && (
        <FeedbackModal
          isOpen={feedbackModal}
          onClose={() => setFeedbackModal(false)}
        />
      )}
    </div>
  );
};

export default Servicer;
