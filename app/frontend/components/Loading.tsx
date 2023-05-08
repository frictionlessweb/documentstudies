import React from "react";
import { Flex, ProgressCircle } from "@adobe/react-spectrum";

export const Loading = () => {
  return (
    <Flex width="100%" justifyContent="center">
      <ProgressCircle isIndeterminate />
    </Flex>
  );
};
