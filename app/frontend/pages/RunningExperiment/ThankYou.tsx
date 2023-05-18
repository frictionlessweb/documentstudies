import React from "react";
import { Flex, Heading, Text } from "@adobe/react-spectrum";

export const ThankYou = () => {
  return (
    <Flex direction="column">
      <Heading level={3}>Thank you for completing the study.</Heading>
      <Text>If there are next steps, we will be in touch.</Text>
    </Flex>
  );
};
