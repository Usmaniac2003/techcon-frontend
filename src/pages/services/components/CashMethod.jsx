import { useTranslation } from "react-i18next";
import { BiInfoCircle } from "react-icons/bi";
import { FaCreditCard } from "react-icons/fa"


const CashMethod = () => {
  const {t} = useTranslation(); 
    return  <div>
      <div className="rounded-lg border border-primary bg-secondary p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaCreditCard />
            <p className="font-bold ml-3">{t('Cash')}</p>
          </div>
        </div>
      </div>
      <div className="bg-[#f5f5f5] pb-7 rounded-md p-4 text-[rgba(0,0,0,.6)] flex items-center">
        <BiInfoCircle className="w-[5%]" />
        <small className="ml-2">{t('5 AED will be charged for Cash payment')}</small>
      </div>
    </div> 
}

export default CashMethod;