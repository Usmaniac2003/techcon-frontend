import { Modal, ModalBody, ModalCloseButton, ModalContent } from "@chakra-ui/react";

const NewAddressModal = ({ isOpen, onClose }) => {
  return (
    <div className="w-screen z-[1000] flex justify-center items-center h-screen fixed top-0 left-0 transition-all backdrop-blur-[1px] bg-[#0000006f]">
      <Modal size={"3xl"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={8}>Add a new address</ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default NewAddressModal;
