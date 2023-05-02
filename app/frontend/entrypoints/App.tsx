import React from "react";
import { Providers } from "./components/Providers";
import { Flex, Heading } from "@adobe/react-spectrum";

export const App = () => {
  return (
    <Providers>
      <Flex direction="column">
        <Heading margin={0} level={1}>App</Heading>
      </Flex>
    </Providers>
  );
};
