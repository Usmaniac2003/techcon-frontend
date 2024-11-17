import React, { useEffect, useState } from "react";
import {
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { getApi } from "../../../services/api";
import QuantityInput from "./QuantityInput";

export default function PreviewEvent({ isOpen, onClose, data = {} }) {
  const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState({});
  const [tickets, setTickets] = useState([]); 

  const fetchTickets = async () => {
    try {
    const response = await getApi('api/events/tickets');
    const ticketsData = response.data?.data || []; 
    const tickets = ticketsData.filter(t => t.event === data?._id);
    setTickets(tickets); 
    } catch (error) {
        console.log(error);  
        toast.error("Something went wrong")
    }
  };

  useEffect(() => {

    if(data !== "Overview"){
        fetchTickets(); 
    }
  }, [data]); 

  console.log(tickets)

  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {/* Modal Header */}
        <ModalHeader>Event Preview</ModalHeader>

        {/* Modal Body */}
        <ModalBody>
          <div className="flex gap-4">
            <img
            src={data?.image}
              alt="Safari Tourist Train"
              width={200}
              height={150}
              className="rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-bold">
                {data?.name}
              </h2>
              <p className="text-gray-600">{data?.venue}</p>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <span>Date: {new Date(data?.date)?.toLocaleString()}</span>
              </div>
              <p className="mt-2">Note: {data?.note || "-"}</p>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Ticket Details</h3>
            <div className="space-y-4">
            {tickets?.map((ticket) => {
                return <div key={ticket?._id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{ticket?.description}</p>
                    <p className="font-semibold mt-1">Rs {ticket?.price}</p>
                  </div>
                    <QuantityInput setTotalPrice={setTotalPrice} ticket={ticket} totalPrice={totalPrice} />
                </div>
              </div>
            })}
             
            </div>
          </div>

          {/* Event Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4 mt-6">Event Details</h3>
            <p>{data?.description}</p>
           
          </div>
        </ModalBody>

        {/* Modal Footer */}
        <ModalFooter>
          <div className="mr-5">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-lg font-semibold">
              Rs {(Object.values(totalPrice).reduce((a, b) => {
                return a + b; 
              }, 0)) || "--"}
            </p>
          </div>
          <button

            size="lg"
            className="px-8 bg-primary p-2 text-white rounded"
            onClick={onClose}
          >
            Continue
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
