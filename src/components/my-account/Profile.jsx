import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { postApi } from "../../services/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { USER, setUSER } = useAuthContext();
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postApi("api/user/" + USER?._id, values);
      const updatedUser = { ...USER, ...values };
      setUSER(updatedUser);
      localStorage.setItem("buildbazm_user", JSON.stringify(updatedUser));
      toast.success("Profile Updated Successfuly");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault(); 

    if(password.trim()) {
      try {
        const response = await postApi("api/user/changepassword/" + USER?._id, {
          password
        }) 
        toast.success("Password updated successfuly"); 
        setPassword(""); 
      } catch (error) {
        console.log(error); 
        toast.error("Something went wrong!"); 
      }
    }

  }

  useEffect(() => {
    if (USER?._id) {
      setValues({
        fullName: USER?.fullName,
        phoneNumber: USER?.phoneNumber,
        email: USER?.email,
      });
    }
  }, [USER]);
  return (
    <>
      <div className="mt-8 flex items-center flex-col">
        <p
          className="uppercase text-center text-gray-400 text-sm"
          style={{
            letterSpacing: 2,
          }}
        >
          {t("SETTINGS")}
        </p>
        <h1 className="my-6 text-3xl font-bold">{t("Profile Details")}</h1>

        <div className="border border-gray-300 bg-white rounded-lg py-6 px-4 w-[90%] md:w-[30%]">
          <form className="w-full" action="#" onSubmit={handleSubmit}>
            <div>
              <FormControl className="mt-6" isRequired>
                <FormLabel>{t("Phone Number")}</FormLabel>
                <Input
                  value={values.phoneNumber}
                  onInput={handleChange}
                  name="phoneNumber"
                  required
                  type="tel"
                  placeholder={t("Phone Number")}
                />
              </FormControl>
              <FormControl className="mt-6" isRequired>
                <FormLabel>{t("Full Name")}</FormLabel>
                <Input
                  value={values.fullName}
                  required
                  onInput={handleChange}
                  name="fullName"
                  placeholder={t("Full Name")}
                />
              </FormControl>
              <FormControl className="mt-6" isRequired>
                <FormLabel>{t("Email Address")}</FormLabel>
                <Input
                  value={values.email}
                  name="email"
                  onInput={handleChange}
                  required
                  type="email"
                  placeholder={t("Email")}
                />
              </FormControl>
            </div>

            <Button
              className="w-full mt-5"
              color={"white"}
              type={"submit"}
              rounded={"99999"}
              style={{
                background: "var(--primary-color)",
              }}
            >
              {t("Save")}
            </Button>
          </form>
        </div>

        {/* <div className="border mt-4 mb-12 border-gray-300 bg-white rounded-lg py-6 px-4 w-[90%] md:w-[30%]">
          <form
            className="w-full flex items-center justify-between"
            action="#"
            onSubmit={handleChangePassword}
          >
            <div className="w-[60%]">
              <FormControl isRequired>
                <Input
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                  name="password"
                  required
                  type="text"
                  placeholder={t("New Password")}
                />
              </FormControl>
            </div>

            <Button
              color={"white"}
              type={"submit"}
              className="min-w-max"
              rounded={"99999"}
              style={{
                background: "black",
              }}
            >
              {t("Update Password")}
            </Button>
          </form>
        </div> */}
      </div>
    </>
  );
};

export default Profile;
