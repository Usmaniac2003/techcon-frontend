

import { useParams } from "react-router-dom";
import Profile from "../../components/my-account/Profile";
import Bookings from "../../components/my-account/Bookings";
import PaymentMethods from "../../components/my-account/PaymentMethods";
import Help from "../../components/my-account/Help";



const MyAccount = () => {
    const params = useParams(); 
const pages = {
    "profile": <Profile/>,
    "bookings": <Bookings/>, 
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
