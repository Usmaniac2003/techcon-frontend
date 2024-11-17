import { Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BiInfoCircle } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import { useServiceContext } from "../../../contexts/ServiceContext";

const PaymentSummary = ({
  paymentLoading,
  paymentSummary,
  isLastStep,
  discount,
  USER,
  values,
  totalPayment,
  prices, 
  frequencyDiscounts
}) => {
  const {t} = useTranslation(); 
  const {coupon} = useServiceContext(); 
  console.log("val::", frequencyDiscounts)
  return (
      <div>
      {paymentLoading ? (
        <Skeleton count={1} />
      ) : (
        <p className="font-[500] mb-4 text-black">{t('Payment Summary')}</p>
      )}
      {paymentLoading ? (
        <Skeleton count={3} />
      ) : (
        <div>
          <div className="flex mb-4 items-center justify-between">
            <p className="text-[#b3b3b3]">{t('Subtotal')}</p>
            <p>{paymentSummary?.subTotal} AED</p>
          </div>

          {!(USER?.lastBooking) && isLastStep && (
            <div className="flex mb-4 items-center justify-between">
              <p className="text-[#b3b3b3]">{t('First Order Discount')}</p>
              <p>-{(discount * paymentSummary?.total).toFixed(2)} AED</p>
            </div>
          )}
          {coupon && isLastStep && 
            <div className="flex mb-4 items-center justify-between">
              <p className="text-[#b3b3b3]">{coupon?.code}</p>
              <p>-{parseFloat(((coupon?.discount || 0) / 100) * paymentSummary?.total).toFixed(2)} AED</p>
            </div>
          }
           {!!paymentSummary?.credit && isLastStep && (
            <div className="flex mb-4 items-center justify-between">
              <p className="text-[#b3b3b3]">{t('buildbazm Credit')}</p>
              <p>{paymentSummary?.credit} AED</p>
            </div>
          )}

             {(values.frequency === 7 || values.frequency === 14) && (
            <div className="flex mb-4 items-center justify-between">
              <p className="text-[#b3b3b3]">{values.frequency === 7 ? "Weekly Discount" : "Bi-Weekly Discount"}</p>
              <p>{values.frequency === 7 ? frequencyDiscounts.weekly * 100 : frequencyDiscounts.biweekly * 100} %</p>
            </div>
          )}

          {isLastStep && values?.paymentMethod === "Cash" && (
            <div className="flex mb-4 items-center justify-between">
              <p className="text-[#b3b3b3]">{t('Cash Payment Charges')}</p>
              <p>{prices?.cashCharges} AED</p>
            </div>
          )}

          {isLastStep && (
            <div className="flex mb-4 items-center justify-between">
              <div className="flex items-center relative">
                <p className="text-[#b3b3b3] mr-2">{t('Service Fee')}</p>
                <Tooltip hasArrow label={t("This fee will be used to improve our platform and provide you with the best service and add new features.")} fontSize="md">
                  <span>
                    <BiInfoCircle />
                  </span>
                </Tooltip>
              </div>
              <p>{prices?.serviceFee} AED</p>
            </div>
          )}

          <div className="flex mb-4 items-center justify-between">
            <p className="text-[#b3b3b3]">{t('Total')}</p>
            <p className="font-bold">{totalPayment} AED</p>
          </div>
        </div>
      )}
    </div> 
  );
};

export default PaymentSummary;
