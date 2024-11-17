import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ServiceProvider from "./contexts/ServiceContext.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import StateProvider from "./contexts/StateContext.jsx";
import "./index.css";
import App from "./App";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <ToastContainer />
        <AuthProvider>
          <StateProvider>
            <ServiceProvider>
              <Elements stripe={stripePromise}>
                <App />
              </Elements>
            </ServiceProvider>
          </StateProvider>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
