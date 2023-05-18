import React from "react";
import { Text, Flex } from "@adobe/react-spectrum";

export const BadSchema = () => {
  return (
    <Flex justifyContent="center" width="100%" marginTop="16px">
      <Flex
        maxWidth="300px"
        UNSAFE_style={{
          backgroundColor: "#f8bbd0",
          padding: "8px",
          overflow: "wrap",
          borderRadius: "8px",
        }}
      >
        <Text maxWidth="200px">
          We do not know how to process the study assignment associated with
          this link. Please contact the people who created this study.
        </Text>
      </Flex>
    </Flex>
  );
};
