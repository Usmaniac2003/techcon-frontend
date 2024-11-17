

import { useParams } from "react-router-dom";
import Profile from "../../components/my-account/Profile";
import Bookings from "../../components/my-account/Bookings";
import XpertFirstCredits from "../../components/my-account/XpertFirstCredits";
import ReferralCredits from "../../components/my-account/ReferralCredits";
import Addresses from "../../components/my-account/Addresses";
import PaymentMethods from "../../components/my-account/PaymentMethods";
import Help from "../../components/my-account/Help";



const MyAccount = () => {
    const params = useParams(); 
const pages = {
    "profile": <Profile/>,
    "bookings": <Bookings/>, 
    "xpertfirst-credits": <XpertFirstCredits/>, 
    "referral-credits": <ReferralCredits/>, 
    "addresses": <Addresses/>, 
    "payment-methods": <PaymentMethods/>, 
    "help": <Help/>
}
  return (
    <>
      {pages[params?.page]}
    </>
  );
};

export default MyAccount;
