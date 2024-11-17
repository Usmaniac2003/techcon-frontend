import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useState } from "react";

const QuantityInput = ({ setTotalPrice, totalPrice, ticket }) => {
  const [quantity, setQuantity] = useState(0);
  return (
    <>
      <NumberInput
        value={quantity}
        onChange={(value) => {
          setQuantity(Number(value));
          setTotalPrice({
            ...totalPrice,
            [ticket?.description]: value * ticket?.price,
          });
        }}
        min={0}
        max={20}
        className="w-28"
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
};

export default QuantityInput;
