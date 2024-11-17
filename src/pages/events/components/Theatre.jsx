import React from "react";
import { Button, Box } from "@chakra-ui/react";

const Theatre = ({ onBack }) => {
  return (
    <Box>
      <h1 className="text-3xl font-bold mb-4">Theatre Events</h1>
      <p className="text-lg mb-6">Experience the magic of live performances in the theatre.</p>
      <Button
        bg="#ff1e64"
        color="white"
        _hover={{ bg: "#e91e58" }}
        onClick={onBack}
      >
        Back to Overview
      </Button>
    </Box>
  );
};

export default Theatre;
