import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { postApi } from "../../../services/api";
import { useState } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useServiceContext } from "../../../contexts/ServiceContext";

const CreateVoucherModal = ({ isOpen, onClose, service}) => {
  const [code, setCode] = useState(""); 
  const {USER} = useAuthContext(); 
  const {coupon, setCoupon} = useServiceContext(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await postApi("api/coupons/validate", {
      code, 
      userId: USER?._id, 
      service
    }); 
    if(response.data?.status){

      setCoupon(response.data?.data); 
      toast.success("Coupon has been applied!"); 
      onClose(); 
    } else {
      toast.error(response?.data?.message); 
    }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-screen z-[10] flex justify-center items-center h-screen fixed top-0 left-0 transition-all backdrop-blur-[1px] bg-[#0000006f]">
      <Modal size={"lg"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalContent rounded={10}>
          <ModalCloseButton />
          <ModalHeader>Voucher Code</ModalHeader>
          <ModalBody position={"relative"} id="no-scroll-bar" p={0}>
            <form className="px-5 mx-auto" action="#" onSubmit={handleSubmit}>
              <Input
                className="w-full"
                p={"10px"}
                type="text"
                size={"lg"}
                required
                placeholder="Code"
                value={code}
                onInput={(e) => setCode(e.target.value)}
              />
              <Button
                style={{ borderRadius: "50px" }}
                className="w-full mt-3 mb-5 primary-btn text-white rounded-full"
                type="submit"
              >
                Apply
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateVoucherModal;
