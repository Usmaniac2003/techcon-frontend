import React from "react";
import { Button, Box } from "@chakra-ui/react";

const Music = ({ onBack }) => {
  return (
    <Box>
      <h1 className="text-3xl font-bold mb-4">Music Events</h1>
      <p className="text-lg mb-6">Discover amazing music events happening near you.</p>
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

export default Music;
