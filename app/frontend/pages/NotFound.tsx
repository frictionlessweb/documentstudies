import React from "react";
import { Flex, Heading, Text } from "@adobe/react-spectrum";

export const NotFound = () => {
  return (
    <Flex direction="column" alignItems="center" margin={8}>
      <Flex direction="column">
        <Heading level={1}>Not Found</Heading>
        <Text>Please contact the person who sent you to this page.</Text>
        <Flex width="100%" justifyContent="center">
          <img width="100px" alt="A book." src="/Book.png" />
        </Flex>
      </Flex>
    </Flex>
  );
};
