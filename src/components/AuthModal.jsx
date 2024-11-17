import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Input,
  CircularProgress,
} from "@chakra-ui/react";
import { postApi } from "../services/api";
import { useAuthContext } from "../contexts/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ isOpen, onClose }) => {
  const [screen, setScreen] = useState("signup");
  const [signupLoading, setSignupLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const [signupValues, setSignupValues] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const { t } = useTranslation();

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setUSER } = useAuthContext();

  const handleSignup = async (e) => {
    e.preventDefault();
      try {
        setSignupLoading(true);
        const data = {
          ...signupValues,
        };
        const response = await postApi("api/user/signup", data);
        if (response?.status !== 200) {
          toast.error(
            response.response.data?.message || "Something went wrong"
          );
        } else {
          const user = response.data?.user || null;
          toast.success("You're logged in");

          // Set the user's data
          setUSER(user);
          localStorage.setItem("buildbazm_user", JSON.stringify(user));
          onClose();
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
      setSignupLoading(false);

  };
  const handleSignupChange = (e) => {
    setSignupValues({ ...signupValues, [e.target.name]: e.target.value });
  };
  const handleLoginChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      setLoginLoading(true);
      const response = await postApi("api/user/login", loginValues);
      if (response?.status !== 200) {
        toast.error(response.response.data?.message || "Something went wrong");
      } else {
        const user = response.data?.user || null;
        toast.success("You're logged in");

        // Set the user's data
        setUSER(user);
        localStorage.setItem("buildbazm_user", JSON.stringify(user));
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
    setLoginLoading(false);
  };

  return (
    <div className="w-screen z-[1000] flex justify-center items-center h-screen fixed top-0 left-0 transition-all backdrop-blur-[1px] bg-[#0000006f]">
      <Modal size={"lg"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={8}>
            {screen === "signup" ? (
              <form action="#" onSubmit={handleSignup}>
                <div>
                  <FormControl className="mt-6" isRequired>
                    <FormLabel>{t("Phone Number")}</FormLabel>
                    <Input
                      value={signupValues.phoneNumber}
                      onInput={handleSignupChange}
                      name="phoneNumber"
                      required
                      type="tel"
                      placeholder={t("Phone Number")}
                    />
                  </FormControl>
                  <FormControl className="mt-6" isRequired>
                    <FormLabel>{t("Full Name")}</FormLabel>
                    <Input
                      value={signupValues.fullName}
                      required
                      onInput={handleSignupChange}
                      name="fullName"
                      placeholder={t("Full Name")}
                    />
                  </FormControl>
                  <FormControl className="mt-6" isRequired>
                    <FormLabel>{t("Email Address")}</FormLabel>
                    <Input
                      value={signupValues.email}
                      name="email"
                      onInput={handleSignupChange}
                      required
                      type="email"
                      placeholder={t("Email")}
                    />
                  </FormControl>
                  <FormControl className="mt-6" isRequired>
                    <FormLabel>{t("Password")}</FormLabel>
                    <Input
                      name="password"
                      value={signupValues.password}
                      onInput={handleSignupChange}
                      type="password"
                      placeholder={t("Password")}
                      required
                    />
                  </FormControl>
                </div>

                <Button
                  disabled={signupLoading}
                  className="w-full mt-5"
                  color={"white"}
                  type="submit"
                  rounded={"99999"}
                  style={{
                    background: "var(--primary-color)",
                  }}
                >
                  {signupLoading ? (
                    <CircularProgress color="black" size={6} isIndeterminate />
                  ) : (
                    t("Sign Up")
                  )}
                </Button>
                <p className="text-center mt-2">
                  {t("Already have an account?")}{" "}
                  <span
                    onClick={() => setScreen("login")}
                    className="text-primary font-bold cursor-pointer"
                  >
                    {t("Login")}
                  </span>
                </p>
              </form>
            ) : (
              <div>
                <FormControl className="mt-6" isRequired>
                  <FormLabel>{t("Email")}</FormLabel>
                  <Input
                    value={loginValues.email}
                    required
                    name="email"
                    onInput={handleLoginChange}
                    type="email"
                    placeholder={t("Email")}
                  />
                </FormControl>
                <FormControl className="mt-6" isRequired>
                  <FormLabel>{t("Password")}</FormLabel>
                  <Input
                    value={loginValues.password}
                    name="password"
                    required
                    onInput={handleLoginChange}
                    type="password"
                    placeholder={t("Password")}
                  />
                </FormControl>
                <div className="flex mt-2 text-sm justify-end">
                  <p
                    onClick={() => {
                      navigate("/forgot-password");
                      onClose();
                    }}
                    className="cursor-pointer"
                  >
                    Forgot Password?
                  </p>
                </div>
                <Button
                  onClick={handleLogIn}
                  className="w-full mt-5"
                  color={"white"}
                  rounded={"99999"}
                  style={{
                    background: "var(--primary-color)",
                  }}
                >
                  {loginLoading ? (
                    <CircularProgress color="black" size={6} isIndeterminate />
                  ) : (
                    t("Log In")
                  )}
                </Button>
                <p className="text-center mt-2">
                  {t("New to buildbazm?")}{" "}
                  <span
                    onClick={() => {
                      setScreen("signup");
                    }}
                    className="text-primary font-bold cursor-pointer"
                  >
                    {t("Signup")}
                  </span>
                </p>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AuthModal;
