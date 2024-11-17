import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";

const ServiceContentModal = ({ isOpen, onClose, data }) => {
  console.log("ServiceContentModal", data);
  return (
    <div className="w-screen z-[10] flex justify-center items-center h-screen fixed top-0 left-0 transition-all backdrop-blur-[1px] bg-[#0000006f]">
      <Modal size={"lg"} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalContent rounded={10}>
          <ModalCloseButton />
          <ModalHeader>{data?.title}</ModalHeader>
          <ModalBody
            position={"relative"}
            id="no-scroll-bar"
            p={0}
          >
            <div className=" overflow-y-scroll h-[620px] pb-36" id="no-scroll-bar">
              { (
                <div
                  className="w-full h-[230px] bg-no-repeat bg-cover bg-center mb-5"
                  style={{
                    backgroundImage: `url(${data?.image_url})`,
                  }}
                ></div>
              ) 
              }
              <div className="px-5">
                <p className="mb-3">{data?.description}</p>
                <div className="flex items-center my-3">
                  <p className="mr-3">AED {data?.price}</p>
                  <p className="line-through text-gray-400">
                    AED {data?.original_price}
                  </p>
                </div>
                <hr />
                <div className="mt-5">
                  <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                </div>
              </div>
            </div>

            {/* <div className="absolute rounded-[10px] border-t bg-white bottom-0 left-0 right-0 px-5 py-6 flex flex-col items-center justify-center">
              <Button
                color={"white"}
                rounded={"99999"}
                size={"lg"}
                style={{
                  background: "var(--primary-color)",
                }}
              >
                Add for AED {data?.price}
              </Button>
            </div> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ServiceContentModal;
