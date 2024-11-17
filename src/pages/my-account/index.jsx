

import { useParams } from "react-router-dom";
import Profile from "../../components/my-account/Profile";
import Bookings from "../../components/my-account/Bookings";
import PaymentMethods from "../../components/my-account/PaymentMethods";



const MyAccount = () => {
    const params = useParams(); 
const pages = {
    "profile": <Profile/>,
    "bookings": <Bookings/>, 
    "payment-methods": <PaymentMethods/>, 
}
  return (
    <>
      {pages[params?.page]}
    </>
  );
};

export default MyAccount;
