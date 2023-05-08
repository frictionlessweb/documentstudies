import React from "react";
import { Text, Flex } from "@adobe/react-spectrum";

export const ApiError = () => {
  return (
    <Flex
      width="100%"
      UNSAFE_style={{
        backgroundColor: "#f8bbd0",
        padding: "8px",
        overflow: "wrap",
        borderRadius: "8px",
      }}
    >
      <Text maxWidth="200px">
        An error occurred. Please refresh the page and try again.
      </Text>
    </Flex>
  );
};
