import {
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { postApi } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

  const [values, setValues] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate(); 

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetPasswordLoading(true);
    const userId = searchParams.get("id");
    const token = searchParams.get("token");
    const newpassword = values.newpassword;
    const confirmpassword = values.confirmpassword;
    if (newpassword !== confirmpassword)
      toast.error(`New Password and Confirm Password do not match !`, {
        autoClose: 5000,
        position: "top-right",
      });
    else {
      const res = await postApi("api/password/resetPassword", {
        password: newpassword,
        token,
        userId,
      });

      if (res.data?.success === false) {
        toast.error(res.data?.message, {
          autoClose: 5000,
          position: "top-right",
        });
      } else {
        toast.success(res.data?.message, {
          autoClose: 5000,
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    }
      setResetPasswordLoading(false);
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
        <h1 className="my-6 text-3xl font-bold">Reset Password</h1>

        <form onSubmit={handleResetPassword} className="w-[90%] md:w-[30%]">
          <FormControl className="mt-6" isRequired>
            <FormLabel>Your New Password</FormLabel>
            <Input
              value={values.newpassword}
              required
              name="newpassword"
              onInput={(e) => setValues({ ...values,  newpassword: e.target.value })}
              type="password"
              placeholder={"New Password"}
            />
          </FormControl>
          <FormControl className="mt-3">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              value={values.confirmpassword}
              required
              name="confirmpassword"
              onInput={(e) => setValues({ ...values, confirmpassword: e.target.value })}
              type="password"
              placeholder={"Confirm Password"}
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
            {resetPasswordLoading ? (
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

export default ResetPassword;
