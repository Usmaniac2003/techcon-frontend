import CashMethod from "../components/CashMethod";
import { useServiceContext } from "../../../contexts/ServiceContext";
import CreateVoucherModal from "./CreateVoucherModal";
import { useMemo, useState } from "react";
import { postApi } from "../../../services/api";
import { useAuthContext } from "../../../contexts/AuthContext";
import { IoClose } from "react-icons/io5";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          color: "#424770",
          letterSpacing: "0.025em",
          fontsize: 20,
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    []
  );

  return options;
};

const PaymentStep = ({ service }) => {
  const { values, setValues, coupon, setCoupon } = useServiceContext();
  const [paymentLoading, setPaymentLoading] = useState(false); 

  const { USER } = useAuthContext();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const stripeOptions = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentLoading(true); 

    if (!stripe || !elements) {
      
    setPaymentLoading(false); 
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: USER?.email,
      },
    });

    if (error) {
      setPaymentLoading(false); 
      setMessage(error.message);
      return;
    }

    const response = await postApi("api/stripe/create-payment-intent", {
      amount: 1000,
      currency: "aed",
    });
    const { clientSecret } = response.data;

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setPaymentLoading(false); 
      setMessage(confirmError.message);
      return;
    }

    setPaymentLoading(false); 
    setMessage(`Payment successful! PaymentIntent ID: ${paymentIntent.id}`);
  };

  const [createVoucherModal, setCreateVoucherModal] = useState(false);
  const options = {
    Cash: <CashMethod />,
  };


  return (
    <div className="mb-6">
      <div className="flex mb-3 justify-between items-center">
        <h2 className="font-bold text-lg">Payment Method</h2>
        {/* <p
          onClick={() =>
            setValues((values) => ({
              ...values,
              paymentMethod:
                values?.paymentMethod === "Cash" ? "Credit/Debit Card" : "Cash",
            }))
          }
          className="font-bold text-primary cursor-pointer underline mb-0"
        >
          Change
        </p> */}
      </div>
      {options["Cash"]}
      {/* {values.paymentMethod !== "Cash" && (
        <div>
          <div className="rounded-lg border border-primary bg-secondary p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FaCreditCard />
                <p className="font-bold ml-3">{t("Credit / Debit Card")}</p>
              </div>
              <div className="flex items-center">
                <img src={MasterCard} width={30} />
                <div className="w-1"></div>
                <img src={Visa} width={30} />
              </div>
            </div>
          </div>
          <div className="my-8">
            <CardElement options={stripeOptions} />
            {message && <p className="text-sm text-red-500 mt-2">{message}</p>}
          </div>
          <div className="bg-[#f5f5f5] pb-7 rounded-md p-4 text-[rgba(0,0,0,.6)] flex items-center">
            <BiInfoCircle className="w-[5%]" />
            <small className="ml-2">
              {t(
                "AED 3.67 will be charged to verify your card. The amount will be refunded immediately."
              )}
            </small>
          </div>
        </div>
      )} */}

      <div className="mt-4">
        <h2 className="font-bold text-lg">Add Voucher or buildbazm credits</h2>
        <div className="mt-5 flex items-center gap-x-3">
          {coupon ? (
            <div className="p-3 pt-6 relative border border-primary bg-secondary rounded-lg w-[180px]">
              <div className="flex items-center justify-between">
                <p className="mb-2">Voucher Code</p>
                <IoClose
                  className="cursor-pointer"
                  onClick={() => setCoupon(null)}
                  size={24}
                />
              </div>
              <p className="font-bold text-primary select-none">
                {coupon?.code}
              </p>

              <p className="w-max rounded-lg px-2 py-1 -translate-y-[50%]  text-sm bg-primary text-white absolute top-0 left-[50%] -translate-x-[50%]">
                {coupon?.discount + "%"} Discount
              </p>
            </div>
          ) : (
            <div className="p-3 border border-gray-200 rounded-lg w-[180px]">
              <p className="mb-2">Voucher Code</p>
              <p
                className="font-bold text-primary cursor-pointer select-none"
                onClick={() => setCreateVoucherModal(true)}
              >
                + Add
              </p>
            </div>
          )}
          {USER?.credits !== 0 && (
            <div className="border p-3 rounded-lg w-[180px]">
              <h3 className="text-gray-800">buildbazm Credit</h3>
              <h3 className=" text-black mt-2">
                <span className="text-primary font-bold">{Math.floor(USER?.credits)}</span> credits
              </h3>
            </div>
          )}
        </div>
      </div>

      {values.paymentMethod !== "Cash" && (
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-black text-white py-3 text-center rounded-full"
        >
          Submit
        </button>
      )}

      {createVoucherModal && (
        <CreateVoucherModal
          coupon={coupon}
          setCoupon={setCoupon}
          isOpen={createVoucherModal}
          service={service}
          onClose={() => setCreateVoucherModal(false)}
        />
      )}
    </div>
  );
};

export default PaymentStep;
