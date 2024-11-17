import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { postApi } from "../../services/api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [sendEmailLoading, setSendEmailLoading] = useState(false);

  const [values, setValues] = useState({
    phoneNumber: "",
  });

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setSendEmailLoading(true); 
    const res = await postApi("api/password/forgotpassword", {
      phoneNumber: values.phoneNumber,
    });
    if (res.data.success === false) {
      toast.error(res.data.message, {
        autoClose: 5000,
        position: "top-right",
      });
    } else {
      toast.success(res.data.message, {
        autoClose: 5000,
        position: "top-right",
      });
    }
    setSendEmailLoading(false); 
  };
  return (
    <>
      <div className="mt-8 flex items-center flex-col w-full">
        <p
          className="uppercase text-center text-gray-400 text-sm"
          style={{
            letterSpacing: 2,
          }}
        >
          Account
        </p>
        <h1 className="my-6 text-3xl font-bold">Forgot Password</h1>

        <form onSubmit={handleSendEmail} className="w-[90%] md:w-[30%]">
          <FormControl className="mt-6" isRequired>
            <FormLabel>{t("Phone Number")}</FormLabel>
            <Input
              value={values.phoneNumber}
              required
              name="phoneNumber"
              onInput={(e) => setValues({ phoneNumber: e.target.value })}
              type="tel"
              placeholder={t("Phone Number")}
            />
          </FormControl>

          <Button
            type="submit"
            className="w-full mt-5"
            color={"white"}
            rounded={"99999"}
            style={{
              background: "var(--primary-color)",
            }}
          >
            {sendEmailLoading ? (
              <CircularProgress color="black" size={6} isIndeterminate />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
