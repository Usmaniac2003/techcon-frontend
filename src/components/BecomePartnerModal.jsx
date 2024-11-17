import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  Input,
  Textarea,
  CircularProgress,
} from "@chakra-ui/react";
import { useState } from "react";
import { postApi } from "../services/api";
import { toast } from "react-toastify";

const BecomePartnerModal = ({ isOpen, onClose }) => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await postApi("api/user/become-partner", values);
      if (response.data?.status === true) {
        toast.success("Your request has been received!");
        onclose() 
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  setLoading(false); 
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-screen z-[1000] flex justify-center items-center h-screen fixed top-0 left-0 transition-all backdrop-blur-[1px] bg-[#0000006f]">
      <Modal size={"lg"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={8}>
            <form onSubmit={handleSubmit}>
              <FormControl className="mt-6" isRequired>
                <FormLabel>Enter your email</FormLabel>
                <Input
                  value={values?.email || ""}
                  required
                  name="email"
                  onInput={handleInput}
                  type="email"
                  placeholder={"Your Email"}
                />
              </FormControl>
              <FormControl className="mt-6" isRequired>
                <FormLabel>What's your good name?</FormLabel>
                <Input
                  value={values?.name || ""}
                  required
                  name="name"
                  onInput={handleInput}
                  type="text"
                  placeholder={"Your Name"}
                />
              </FormControl>

              <FormControl className="mt-6" isRequired>
                <FormLabel>What's your phone number?</FormLabel>
                <Input
                  value={values?.phoneNumber || ""}
                  required
                  name="phoneNumber"
                  onInput={handleInput}
                  type="tel"
                  placeholder={"Your Phone Number"}
                />
              </FormControl>

              <FormControl className="mt-6" isRequired>
                <FormLabel>Which services are you interested in?</FormLabel>
                <Textarea
                  value={values?.services || ""}
                  onInput={handleInput}
                  name="services"
                ></Textarea>
              </FormControl>

              <FormControl className="mt-6" isRequired>
                <FormLabel>Which cities are you interested in?</FormLabel>
                <Textarea
                  value={values?.cities || ""}
                  onInput={handleInput}
                  name="cities"
                ></Textarea>
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
                  {loading ? (
                    <CircularProgress color="black" size={6} isIndeterminate />
                  ) : (
                   "Become Partner" 
                  )}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BecomePartnerModal;
