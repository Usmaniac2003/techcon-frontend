import Error404 from "./components/Error404";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import "react-toastify/ReactToastify.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import AuthModal from "./components/AuthModal.jsx";
import { useStateContext } from "./contexts/StateContext.jsx";
import { useEffect, useState } from "react";
import { useAuthContext } from "./contexts/AuthContext.jsx";
import { useJsApiLoader } from "@react-google-maps/api";
import Home from "./pages/home/index.jsx";
import Events from "./pages/events/index.jsx";
import { CircularProgress } from "@chakra-ui/react";
import MyAccount from "./pages/my-account/index.jsx";
import ForgotPassword from "./pages/forgotPassword/index.jsx";
import ResetPassword from "./pages/resetPassword/index.jsx";
import "./i18n.js";

const libraries = ["places"];

export let load = null;

const App = () => {
  const { authModal } = useStateContext();
  const { setUSER, setADDRESS, setCOUNTRY } = useAuthContext();
  const [appLoading, setAppLoading] = useState(true);

  const loadMaps = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API,
    libraries,
  });

  load = loadMaps;

  useEffect(() => {
    // fetchProfile();
    const user = localStorage.getItem("buildbazm_user");
    if (user) {
      setUSER(JSON.parse(user));
    }

    const address = localStorage.getItem("buildbazm_address");

    if (address) {
      setADDRESS(JSON.parse(address) || null);
    }

    setAppLoading(false);
  }, []);

  useEffect(() => {
    function getLocationInfo(latitude, longitude) {
      const APIkey = import.meta.env.VITE_OPENCAGE_API_KEY;

      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${APIkey}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status.code === 200) {
            console.log(data.results[0]?.components?.country)
            setCOUNTRY(data.results[0]?.components?.country || ""); 
          } else {
            console.log("Reverse geolocation request failed.");
          }
        })
        .catch((error) => console.error(error));
    }
    var options = {
      enableHighAccuracy: true,
    };
    function success(pos) {
      var crd = pos.coords;

      getLocationInfo(crd.latitude, crd.longitude);
    }

    function errors(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, errors, options);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
  }, []);

  if (appLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <CircularProgress color="green.300" isIndeterminate size={"70px"} />
      </div>
    );
  }

  const user = JSON.parse(localStorage.getItem("buildbazm_user"));

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        {user?._id && (
          <Route path="/my-account/:page" element={<MyAccount />} />
        )}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {authModal?.isOpen && (
        <AuthModal isOpen={authModal?.isOpen} onClose={authModal?.onClose} />
      )}
    </>
  );
};

export default App;
